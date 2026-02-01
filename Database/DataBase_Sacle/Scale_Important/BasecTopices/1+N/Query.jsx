🔍 8️⃣ QUERY OPTIMIZATION (MongoDB Focus)
🏁 Purpose

Optimizing queries is about reducing compute and I/O load by:

Fetching only necessary data

Using indexes effectively

Reducing unnecessary queries (N+1 issue)

Making aggregations faster

Improving overall database and app latency

⚙️ 1. Understanding MongoDB Query Execution

MongoDB has a Query Planner that:

Analyzes available indexes

Chooses the best plan (using statistics and cardinality)

Caches the winning plan for reuse

You can inspect the planner with:

db.users.find({ city: "Delhi" }).explain("executionStats")

🧠 Output sections:

winningPlan → shows which index is used

executionStats.totalDocsExamined → how many docs were scanned

executionStats.nReturned → how many docs returned

indexName → name of index used

✅ Goal: Make totalDocsExamined ≈ nReturned
➡️ It means your query is index efficient.

🔬 2. Using EXPLAIN() for Query Optimization

Example:

db.orders.find({ status: "shipped" }).explain("executionStats")


Output:

"executionStats": {
  "nReturned": 500,
  "totalDocsExamined": 500,
  "totalKeysExamined": 500,
  "executionTimeMillis": 3
}


If totalDocsExamined is much higher than nReturned, you likely need an index.

📚 3. Avoiding N+1 Query Problems

The N+1 problem occurs when you run one query to get a list,
then run N additional queries (one per item).

Example:

const users = await db.collection('users').find().toArray();
for (const user of users) {
  const orders = await db.collection('orders').find({ userId: user._id }).toArray();
}


👉 This causes 1 + N queries.

✅ Fix: Use $lookup or batching
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  }
]);


✅ Fetch all user+orders data in one optimized query.

📦 4. Query Batching (Reducing DB Round-Trips)

Instead of fetching data one-by-one, batch requests:

const users = await db.collection('users')
  .find({ _id: { $in: [id1, id2, id3, id4] } })
  .toArray();


✅ One query instead of four separate find() calls.

🧩 5. Query Projection (Fetch Only Required Fields)
db.users.find({ city: "Delhi" }, { name: 1, age: 1, _id: 0 });


✅ Reduces data transferred
✅ MongoDB can use a covered index if all requested fields are in the index.

⚙️ 6. Sorting and Index Optimization

Sorting large collections is slow unless the sort uses an index:

db.users.find().sort({ age: 1 }); // ❌ Slow if no index

db.users.createIndex({ age: 1 });
db.users.find().sort({ age: 1 }); // ✅ Uses index for sort

🧮 7. Pagination Techniques
❌ skip() / limit() (simple but inefficient)
db.orders.find().skip(10000).limit(10);


Problem: MongoDB must scan and skip 10,000 documents first.

✅ Cursor-Based Pagination (Efficient)

Use a reference field like _id or createdAt:

db.orders.find({ _id: { $gt: lastSeenId } }).limit(10);


✅ Faster for large datasets
✅ Used by scalable APIs (like Twitter feed pagination)

🔍 8. Aggregation Query Optimization

MongoDB aggregation pipelines can become complex.
To optimize them:



| Stage      | Description      | Optimization Tip                           |
| ---------- | ---------------- | ------------------------------------------ |
| `$match`   | Filter documents | Place `$match` early                       |
| `$project` | Select fields    | Limit fields as soon as possible           |
| `$sort`    | Sort documents   | Use indexes if possible                    |
| `$group`   | Aggregate data   | Combine with `$match` to reduce input size |



Example: Optimized Aggregation
db.orders.aggregate([
  { $match: { status: "shipped", date: { $gte: ISODate("2025-01-01") } } },
  { $project: { userId: 1, totalAmount: 1 } },
  { $group: { _id: "$userId", totalSpent: { $sum: "$totalAmount" } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 }
]);


✅ $match first → reduces documents early
✅ $project removes unused fields early
✅ $group after filtering → fewer computations

🔎 9. Index Intersection

MongoDB can combine multiple single-field indexes to satisfy a query:

db.users.createIndex({ city: 1 });
db.users.createIndex({ age: 1 });

db.users.find({ city: "Delhi", age: 25 });


➡️ MongoDB can intersect indexes {city} and {age}
But compound index {city: 1, age: 1} performs better for frequent combined queries.

📊 10. Covered Queries

If a query’s filter, sort, and projection fields are all in one index,
MongoDB can serve it entirely from the index (without reading documents).

db.users.createIndex({ city: 1, age: 1, name: 1 });

db.users.find({ city: "Delhi" }, { city: 1, age: 1, name: 1, _id: 0 });


✅ This query is covered — no disk reads required.

🧠 11. Query Planner & Index Cardinality
📘 Query Planner

MongoDB tests query plans and picks the one with lowest cost.
It caches this plan for future queries (Plan Cache).

To view plan cache:

db.users.getPlanCache().list();

📈 Index Cardinality

Refers to the uniqueness of index values:

High cardinality → many unique values (e.g., _id, email)

Low cardinality → few unique values (e.g., status, gender)

✅ Indexes work best on high-cardinality fields
❌ Avoid indexing low-cardinality fields unless used with others in compound indexes.

🧠 12. Query Hints

You can force MongoDB to use a specific index:

db.users.find({ city: "Delhi" }).hint({ city: 1 });


Useful for debugging or performance testing.

🚀 13. Real-World Example: Optimizing a User Filter Query
Schema
db.users.createIndex({ city: 1, age: 1 });

Query
db.users.find({ city: "Delhi", age: { $gte: 25, $lte: 35 } });

Optimization Path

Compound index { city, age } ensures efficient filtering and sorting

Use projection { name: 1, city: 1, age: 1, _id: 0 } to reduce I/O

Use .explain("executionStats") to verify only necessary docs are scanned

⚡ 14. Query Caching in MongoDB

MongoDB does not provide traditional query caching like Redis,
but wiredTiger caches recently used data pages in memory.

For true caching, integrate Redis or in-memory caching at the app layer.

📈 15. Metrics to Monitor


| Metric                                              | Meaning                     |
| --------------------------------------------------- | --------------------------- |
| `totalDocsExamined`                                 | How many documents scanned  |
| `totalKeysExamined`                                 | How many index keys scanned |
| `nReturned`                                         | How many documents returned |
| `executionTimeMillis`                               | Query latency               |
| **Goal:** Minimize docs examined and execution time |                             |



🔥 Summary Table


| Concept                      | Goal / Description          | Tool or Method                 |
| ---------------------------- | --------------------------- | ------------------------------ |
| **Explain Plan**             | View execution details      | `.explain("executionStats")`   |
| **Avoid N+1**                | Reduce multiple DB calls    | `$lookup`, batching            |
| **Batching**                 | Query multiple IDs          | `$in`                          |
| **Projection**               | Fetch only required fields  | `{ field: 1 }`                 |
| **Pagination**               | Efficient browsing          | Cursor-based                   |
| **Aggregation Optimization** | Filter early, reduce fields | `$match`, `$project`, `$group` |
| **Index Intersection**       | Combine indexes             | `{ field1 } + { field2 }`      |
| **Covered Query**            | Index-only query            | All fields in index            |
| **Query Planner**            | Chooses best plan           | Plan cache                     |
| **Cardinality**              | Measure of uniqueness       | High = good for indexing       |

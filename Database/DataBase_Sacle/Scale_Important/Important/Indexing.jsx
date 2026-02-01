⚙️ 4️⃣ INDEXING
🏁 Purpose

Indexing is the technique of creating quick lookup structures to avoid full scans of your dataset.

Indexes:

Make queries faster (especially for filters, sorts, and joins)

Reduce CPU & I/O load on the database

Can turn O(n) lookups into O(log n) operations

Enable efficient pagination and search


📚 Analogy

Think of an index like a book’s table of contents —
Instead of flipping through every page (full scan), you jump directly to the section you need.

🧠 Core Concepts


| Concept                       | Description                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| **Index Key**                 | Field(s) used to build the index                                                           |
| **Cardinality**               | Number of **unique values** in an index column (higher cardinality = more efficient index) |
| **Selectivity**               | Ratio of unique values to total rows (helps the optimizer choose which index to use)       |
| **Query Planner / Optimizer** | The DB engine component that decides **which index or scan** to use for a given query      |
| **Covering Index**            | An index that contains **all fields needed** for a query — no table lookup required        |




🧩 INDEXING IN MONGODB
🔹 1. Single Field Index
db.users.createIndex({ city: 1 });


Sorts ascending on city

Speeds up queries like:

db.users.find({ city: "Delhi" });

🔹 2. Compound Index (Multi-field)
db.users.createIndex({ city: 1, age: -1 });


Order matters: (city, age) ≠ (age, city)

✅ Speeds up:

db.users.find({ city: "Delhi", age: { $gt: 25 } });


🚫 Won’t help much for:

db.users.find({ age: 25 }); // city not in query


Rule: Leftmost prefix must be included in query filters.

🔹 3. Text Index (Full-Text Search)
db.articles.createIndex({ content: "text", title: "text" });


Search usage:

db.articles.find({ $text: { $search: "node.js caching" } });


Great for blog posts, product descriptions

Supports stemming and scoring ($meta: "textScore")

🔹 4. TTL (Time-To-Live) Index

Automatically deletes documents after a duration — useful for logs, sessions, or temp data.

db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });


✅ Auto-deletes documents after 1 hour.

🔹 5. Sparse and Partial Indexes

Sparse Index: Only indexes documents containing the field

Partial Index: Index only documents matching a condition

db.users.createIndex({ phone: 1 }, { sparse: true });
db.orders.createIndex({ status: 1 }, { partialFilterExpression: { status: "active" } });

🧮 MongoDB Example — Filter Users by City + Age

Query:

db.users.find({ city: "Mumbai", age: { $gte: 25 } });


Best index:

db.users.createIndex({ city: 1, age: 1 });


Explain plan:

db.users.find({ city: "Mumbai", age: { $gte: 25 } }).explain("executionStats");


You’ll see:

{
  "inputStage": "IXSCAN",
  "nReturned": 120,
  "totalKeysExamined": 120,
  "totalDocsExamined": 120
}


If no index → COLLSCAN (collection scan) = very slow.

🧩 INDEXING IN SQL (PostgreSQL / MySQL)
🔹 1. B-Tree Index (Default)

Balanced tree structure for range and equality queries.

CREATE INDEX idx_users_city_age ON users (city, age);


✅ Efficient for:

SELECT * FROM users WHERE city = 'Delhi' AND age > 25;

🔹 2. Hash Index

Fast equality lookups, not range queries.

CREATE INDEX idx_user_email_hash ON users USING HASH (email);


✅ Good for:

SELECT * FROM users WHERE email = 'a@b.com';


🚫 Not good for:

SELECT * FROM users WHERE email > 'a@b.com';

🔹 3. GIN (Generalized Inverted Index)

Used for full-text search, arrays, or JSONB in PostgreSQL.

CREATE INDEX idx_post_tags ON posts USING GIN (tags);


✅ Query:

SELECT * FROM posts WHERE tags @> '{tech, ai}';

🔹 4. GiST (Generalized Search Tree)

Used for geometric, full-text, or nearest-neighbor queries.

CREATE INDEX idx_location ON stores USING GIST (geom);


✅ Useful for:

SELECT * FROM stores
WHERE ST_DWithin(geom, ST_MakePoint(77.5946, 12.9716)::geography, 5000);

🔹 5. Covering Index

If all selected columns are in the index → DB avoids table lookup.

CREATE INDEX idx_user_city_age ON users (city, age, name);


Query:

SELECT city, age, name FROM users WHERE city = 'Delhi';


✅ No need to touch the main table → read directly from index.

🔍 Index Cardinality

Definition:

Number of distinct values in a column.


| Example Column | Distinct Values | Cardinality |
| -------------- | --------------- | ----------- |
| `gender`       | 2               | Low         |
| `city`         | 500             | Medium      |
| `email`        | 1,000,000       | High        |


⚙️ Query Planner (Optimizer)

Both MongoDB and SQL use a query planner to decide:

Which index to use

Whether to perform full table/collection scans

How to sort and filter results

You can inspect it using:

MongoDB

db.users.find({ city: "Delhi" }).explain("executionStats");


PostgreSQL

EXPLAIN ANALYZE SELECT * FROM users WHERE city='Delhi';


The planner estimates:

Cost of each index

Cardinality and selectivity

Whether an index scan or sequential scan is cheaper

🧠 Example: Index Design for Users by City + Age



| Query                        | Best Index            | Notes                       |
| ---------------------------- | --------------------- | --------------------------- |
| `find users by city`         | `{ city: 1 }`         | Simple lookup               |
| `find users by city and age` | `{ city: 1, age: 1 }` | Compound index              |
| `find users by age only`     | `{ age: 1 }`          | Separate single index       |
| `sort by age within city`    | `{ city: 1, age: 1 }` | Covers both filter and sort |



📊 Performance Comparison


| Operation                 | Without Index       | With Index                               |
| ------------------------- | ------------------- | ---------------------------------------- |
| `find({ city: 'Delhi' })` | Full scan (O(n))    | Log lookup (O(log n))                    |
| Sorting large result      | Full sort in memory | Indexed order (fast)                     |
| Insert / Update           | Faster              | Slightly slower (index maintenance cost) |



⚖️ Trade-offs

| Advantage               | Disadvantage                          |
| ----------------------- | ------------------------------------- |
| Speeds up reads         | Slows down writes (must update index) |
| Reduces CPU for queries | Consumes disk/memory space            |
| Enables efficient sorts | Needs careful maintenance             |


🧩 Index Maintenance Best Practices

✅ Keep indexes small and selective
✅ Avoid redundant indexes ({a:1,b:1} + {a:1} often overlap)
✅ Periodically analyze (ANALYZE in SQL, collStats in MongoDB)
✅ Rebuild fragmented indexes
✅ Use compound indexes for multi-field filters
✅ Use TTL indexes for expiring documents
✅ Monitor using explain() or query profiler

🧭 Summary Table



| Concept       | MongoDB                         | SQL                     |
| ------------- | ------------------------------- | ----------------------- |
| Default Type  | B-tree                          | B-tree                  |
| Full-text     | Text Index                      | GIN / GiST              |
| Expiring Data | TTL Index                       | N/A (custom cron)       |
| Compound      | `{ field1: 1, field2: -1 }`     | `(field1, field2)`      |
| Covering      | Projection matches index fields | INCLUDE clause          |
| Partial       | `partialFilterExpression`       | `WHERE` clause in index |


🔥 Takeaway

Good indexing = 80% of database performance tuning.

Use compound indexes for combined filters (city + age).

Use text/GIN indexes for searches.

Use TTL indexes for expiring data.

Monitor index usage and cardinality regularly.

Rely on query planners to understand real performance.
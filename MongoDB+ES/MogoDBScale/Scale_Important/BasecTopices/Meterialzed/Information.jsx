🔹 What is a Materialized View in MongoDB?

A Materialized View is:

A pre-computed result of a query (usually an aggregation) that is stored in a collection and reused instead of recalculating every time.

📌 Unlike a normal MongoDB query:

Normal query → calculated on every request

Materialized view → calculated once and stored

🔹 Why MongoDB Needs Materialized Views?

MongoDB does not have native SQL-style views.

But:

Aggregations can be heavy

$group, $lookup, $sum, $avg on large data = 🐢 slow

Re-running same aggregation again and again = wasteful

👉 Materialized views solve this by trading storage for speed

🔹 Real-Life Example (Simple)
Collection: orders
{
  "_id": 1,
  "userId": 101,
  "amount": 500,
  "status": "PAID",
  "createdAt": "2026-01-10"
}

❌ Normal aggregation (slow if millions of docs)
db.orders.aggregate([
  { $match: { status: "PAID" } },
  {
    $group: {
      _id: "$userId",
      totalAmount: { $sum: "$amount" },
      totalOrders: { $sum: 1 }
    }
  }
])


This runs every time 😬

🔹 ✅ Materialized View Approach
Step 1️⃣ Create the Materialized View Collection

Use aggregation + $merge

db.orders.aggregate([
  { $match: { status: "PAID" } },
  {
    $group: {
      _id: "$userId",
      totalAmount: { $sum: "$amount" },
      totalOrders: { $sum: 1 }
    }
  },
  {
    $merge: {
      into: "user_order_summary",
      whenMatched: "replace",
      whenNotMatched: "insert"
    }
  }
])


📦 New collection created:

user_order_summary

Step 2️⃣ Read From Materialized View (FAST ⚡)
db.user_order_summary.find({ _id: 101 })


⏱️ Milliseconds, even with huge datasets.

🔹 How Is This Updated?

MongoDB does NOT auto-update materialized views.
You control updates in 3 common ways:

🟢 1. Scheduled Refresh (Cron Job) – Most Common

Example: refresh every 5 minutes

*/5 * * * * node refreshUserSummary.js


Good for:

Dashboards

Analytics

Reports

🟢 2. Event-Driven (Kafka / Change Streams) 🔥

Perfect for real-time systems (you like Kafka 😉)

Using Change Streams
db.orders.watch().on("change", (change) => {
  // recompute only affected user
});


Or:

Producer sends event

Consumer updates materialized view

💡 Best for scalable architecture

🟢 3. Incremental Updates (Most Efficient)

Instead of full recompute:

db.user_order_summary.updateOne(
  { _id: userId },
  {
    $inc: {
      totalAmount: orderAmount,
      totalOrders: 1
    }
  },
  { upsert: true }
)


⚡ Very fast
⚠️ Needs careful consistency handling

🔹 Where Materialized Views Are Used (Real Systems)

✅ Dashboards
✅ Analytics & reporting
✅ Leaderboards
✅ Counters (likes, views, totals)
✅ E-commerce summaries
✅ Search optimization
✅ Heavy $lookup removal

🔹 Materialized View vs Redis Cache


| Feature     | Materialized View   | Redis             |
| ----------- | ------------------- | ----------------- |
| Persistence | ✅ Yes               | ❌ No (unless AOF) |
| Queryable   | ✅ Mongo queries     | ❌ limited         |
| Storage     | MongoDB             | In-memory         |
| Use case    | Aggregation results | Hot data          |
| Cost        | Disk                | RAM               |



💡 Best practice
👉 Mongo Materialized View + Redis L1 cache

🔹 When NOT to Use It ❌

Data changes every second

Results must be 100% real-time

Simple indexed queries are enough

🔹 Resume-Friendly Line 💼

Designed and implemented MongoDB materialized views using aggregation
 pipelines and $merge to optimize heavy analytical queries, reducing API 
response time by 90%.
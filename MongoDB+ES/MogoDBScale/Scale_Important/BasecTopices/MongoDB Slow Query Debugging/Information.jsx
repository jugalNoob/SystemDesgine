Alright 🧪🔥
This is real-world MongoDB slow query debugging — exactly how seniors debug prod issues.

I’ll show:

Real slow query logs

How to read them

How to fix them

What to say in interviews

🧪 MongoDB Slow Query Debugging (Real Logs)
🧠 What is a “slow query”?

By default:

Query taking >100ms

Doing COLLSCAN

Examining too many documents

1️⃣ Enable MongoDB Profiler (Temporary)

⚠️ Never leave this ON permanently in prod

db.setProfilingLevel(1, { slowms: 100 })


Levels:

0 → OFF

1 → Slow queries only

2 → All queries (danger ⚠️)

2️⃣ Real Slow Query Log (Example)
{
  "op": "query",
  "ns": "shop.orders",
  "command": {
    "find": "orders",
    "filter": { "userId": "u123" },
    "sort": { "createdAt": -1 }
  },
  "keysExamined": 0,
  "docsExamined": 185432,
  "executionTimeMillis": 842,
  "planSummary": "COLLSCAN"
}

3️⃣ How to Read This Log (Line by Line)
🚨 Red Flags



| Field                  | Meaning                   |
| ---------------------- | ------------------------- |
| `COLLSCAN`             | No index used ❌           |
| `docsExamined: 185432` | Scanned entire collection |
| `keysExamined: 0`      | No index                  |
| `842ms`                | Very slow                 |



👉 This query is killing performance.

4️⃣ Find the Query Pattern

Query:

db.orders.find({ userId: "u123" })
  .sort({ createdAt: -1 })


Missing index ❌

5️⃣ Fix: Add Correct Index
db.orders.createIndex({ userId: 1, createdAt: -1 })

6️⃣ Verify with explain()
Before
"planSummary": "COLLSCAN",
"docsExamined": 185432,
"executionTimeMillis": 842

After
"planSummary": "IXSCAN",
"keysExamined": 20,
"docsExamined": 20,
"executionTimeMillis": 4


🔥 842ms → 4ms

7️⃣ Another Real Scenario: Bad Pagination
❌ Slow Query Log
{
  "skip": 50000,
  "limit": 10,
  "executionTimeMillis": 1200
}


Why slow?

MongoDB still scans skipped docs

✅ Fix: Cursor-Based Pagination
db.orders.find({ _id: { $lt: lastId } })
  .limit(10)

8️⃣ Aggregation Slow Query Example
🚨 Log
{
  "stage": "$group",
  "executionTimeMillis": 1500
}


Pipeline:

[
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $match: { status: "PAID" } }
]

✅ Fix: Reorder Pipeline
[
  { $match: { status: "PAID" } },
  { $group: { _id: "$status", total: { $sum: 1 } } }
]


🔥 Filters early = faster

9️⃣ Regex Query Slowness (Common Trap)
❌ Slow
db.users.find({ email: /gmail/ })

✅ Optimized
db.users.find({ email: /^abc/ })


Index works only with prefix regex

🔥 Production Debug Checklist

When you see slowness:

Check profiler logs

Look for COLLSCAN

Check docsExamined

Run explain("executionStats")

Add or fix index

Re-test

🧠 Interview One-Liner (Perfect)

“I debug MongoDB slow queries using the profiler and explain plans. If I see collection scans or high docs examined, I redesign indexes to match query patterns, optimize pagination, and reorder aggregation pipelines.”


🚀 Real-World Tools (Mention in Interviews)

MongoDB Atlas Performance Advisor

Slow query profiler

Logs + metrics dashboards

APM tools (Datadog, New Relic)
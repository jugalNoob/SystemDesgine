Alright, buckle up 🔧🔥
This is MongoDB performance tuning — the stuff that separates “it works” from “it scales”.

I’ll go layer by layer, with why, how, and interview-ready lines.

📈 MongoDB Performance Tuning (Deep & Practical)
🧠 Golden Rule

90% of MongoDB performance issues = bad schema + bad indexes

Hardware comes last.

1️⃣ Indexing (Biggest Win)
❌ Symptoms of bad indexing

Slow queries

High CPU

Collection scans

.explain() shows COLLSCAN

✅ Use explain()
db.orders.find({ userId: "u1" }).explain("executionStats")


Look for:

IXSCAN ✅

Low docsExamined

Low executionTimeMillis

🔑 Compound Index Optimization

Bad:

find({ status: "PAID", createdAt })


Good:

db.orders.createIndex({ status: 1, createdAt: -1 })


🧠 Rule:

Equality fields → first
Range / sort fields → last

🧠 Covered Queries (Zero disk reads)
db.users.createIndex({ email: 1 })
db.users.find({ email }, { email: 1, _id: 0 })


🔥 Fastest queries possible.

2️⃣ Query Optimization
❌ Avoid find() without filters
db.orders.find({})

✅ Always filter + project
db.orders.find(
  { userId },
  { items: 0 }
)

⚠️ Avoid $lookup in hot paths

Causes joins

Heavy memory usage

✅ Pre-embed or pre-compute instead

3️⃣ Pagination (Huge Performance Topic)
❌ Offset-based (slow)
.skip(100000).limit(10)

✅ Cursor-based (fast)
find({ _id: { $lt: lastId } }).limit(10)


Interview win 🏆

4️⃣ Document Size Optimization
❌ Fat documents

Large arrays

Logs

History

✅ Split collections

Orders vs OrderEvents

User vs UserActivity

5️⃣ Aggregation Performance
🔥 Pipeline Order Matters

Bad:

{ $group }, { $match }


Good:

{ $match }, { $group }


🧠 Filter early → reduce dataset.

Use $project to reduce payload
{ $project: { bigField: 0 } }

6️⃣ Write Performance Tuning
🔧 Disable unnecessary durability
writeConcern: { w: 1 }


Avoid:

w: "majority"


(for non-critical writes)

🔁 Use bulk writes
bulkWrite([
  { insertOne: {...} },
  { updateOne: {...} }
])

7️⃣ Transactions (Use Carefully)
❌ Overuse = performance killer

Locks

Memory pressure

✅ Use only for:

Payments

Inventory

Bank transfers

8️⃣ Read Scaling (Replica Sets)
Read from secondaries
readPreference: "secondaryPreferred"


Use for:

Reports

Dashboards

Analytics

9️⃣ Sharding Performance
Good shard key
{ userId: "hashed" }

Bad shard key
{ createdAt }


❌ Causes hot shards

🔥 Monitoring & Profiling
Enable profiler (temporarily)
db.setProfilingLevel(1, { slowms: 100 })

Check slow queries
db.system.profile.find().sort({ ts: -1 })

⚡ MongoDB + Redis = Speed Boost

Cache:

User profiles

Product catalog

Search results

TTL: 30–120 sec

🧠 Performance Tuning Checklist

 Query uses index?

 Covered query possible?

 Projection applied?

 Pagination optimized?

 Avoided $lookup?

 Shard key correct?

 Cache added?

🎯 Interview One-Liner

“I tune MongoDB by aligning indexes with query patterns, using projections and cursor-based pagination, avoiding large documents and $lookup in hot paths, and scaling reads with replicas and caching.”
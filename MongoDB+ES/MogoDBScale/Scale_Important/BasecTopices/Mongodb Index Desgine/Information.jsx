Perfect 🔥
Index design scenarios are pure interview gold. Let’s go scenario-by-scenario, with why, index choice, and common mistakes.

🔥 MongoDB Index Design — Real Scenarios

Goal: Match indexes to query patterns, not schema shape.

🧠 Index Design Rules (Remember This First)

Equality fields → first

Range / sort fields → last

Index supports filter + sort

Fewer indexes > many useless indexes

Index order matters

🟢 Scenario 1: User Login (Very Common)
Query
db.users.findOne({ email: "a@gmail.com" })

✅ Index
db.users.createIndex({ email: 1 }, { unique: true })

Why?

Exact match

High cardinality

Login path = hot path

❌ Mistake: indexing name

🟢 Scenario 2: Orders by User (Sorted)
Query
db.orders.find({ userId: "u1" })
  .sort({ createdAt: -1 })

✅ Index
db.orders.createIndex({ userId: 1, createdAt: -1 })

Why?

Filters first

Sort next

One index handles both

🟢 Scenario 3: Status + Date Range
Query
db.orders.find({
  status: "PAID",
  createdAt: { $gte: d1, $lte: d2 }
})

✅ Index
db.orders.createIndex({ status: 1, createdAt: 1 })

Rule applied:

Equality → Range

❌ Wrong index

{ createdAt: 1, status: 1 }

🟢 Scenario 4: Admin Dashboard (Multiple Filters)
Query
db.orders.find({
  status: "PAID",
  city: "Delhi"
}).sort({ createdAt: -1 })

✅ Index
db.orders.createIndex({
  status: 1,
  city: 1,
  createdAt: -1
})


🧠 Order matters!

🟢 Scenario 5: Search by Array Field (Multikey)
Query
db.products.find({ tags: "electronics" })

✅ Index
db.products.createIndex({ tags: 1 })


MongoDB automatically creates multikey index

🟢 Scenario 6: Partial Index (Sparse Data)
Query
db.users.find({ isDeleted: false })

✅ Index
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { isDeleted: false } }
)


🔥 Smaller index → faster

🟢 Scenario 7: TTL Index (Auto Cleanup)
Use case

OTP

Sessions

Logs

db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 300 }
)

🟢 Scenario 8: Text Search
Query
db.posts.find({ $text: { $search: "mongodb" } })

✅ Index
db.posts.createIndex({ title: "text", body: "text" })


⚠️ One text index per collection

🟢 Scenario 9: Covered Query (Ultra Fast)
Query
db.users.find(
  { email: "a@gmail.com" },
  { email: 1, _id: 0 }
)

✅ Index
db.users.createIndex({ email: 1 })


🔥 No document fetch!

🟢 Scenario 10: Sharded Collection
Query
db.orders.find({ userId: "u1" })

✅ Shard Key
{ userId: "hashed" }


Why?

High cardinality

Even distribution

🔥 Common Index Mistakes (Interview Trap)

❌ Indexing low-cardinality fields

status: "ACTIVE"


❌ Too many indexes
❌ Wrong field order
❌ Index not matching sort
❌ Using regex without index anchor

🧠 How Interviewers Evaluate You

They want to hear:

Query → Index mapping

Field order logic

Performance tradeoffs

🎯 Perfect Interview Answer

“I design MongoDB indexes by analyzing query patterns. I place equality fields first, range and sort fields last, use compound indexes to cover queries, and avoid unnecessary or low-cardinality indexes.”

Want next?

🧪 MongoDB explain() deep dive

📉 Debugging slow queries

🧠 Index vs shard key differences

❓ Tricky MongoDB interview questions
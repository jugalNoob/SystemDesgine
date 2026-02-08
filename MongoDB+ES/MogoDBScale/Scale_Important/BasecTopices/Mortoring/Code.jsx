Got it! You want a simple, practical MongoDB monitoring + stats example using Node.js / MongoDB, building on your summary table, with suggestions on what to add more. I’ll make it super simple and explain each part.

🚀 MongoDB Monitoring & Stats – Simple Example

We’ll cover:

DB stats

Server status

Collection stats

Slow queries / profiler

Node.js monitoring

1️⃣ Connect to MongoDB
const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true
  });

  await client.connect();
  console.log("✅ MongoDB connected");

  const db = client.db("testdb");
  const users = db.collection("users");

  // Call monitoring functions here
}

main();

2️⃣ DB Stats – Collection Overview
const dbStats = await db.stats();
console.log("📊 DB Stats:", dbStats);


Shows: number of collections, data size, storage size, etc.

3️⃣ Collection Stats – Index & Usage
const usersStats = await users.stats();
console.log("📋 Users Collection Stats:", usersStats);


Shows: document count, index usage, storage info

4️⃣ Server Status – Real-time metrics
const serverStatus = await db.admin().serverStatus();
console.log("⚡ Server Status:", serverStatus.connections);


Shows: connections, memory usage, network I/O

5️⃣ Slow Query / Profiler

Enable profiler in Mongo shell first:

db.setProfilingLevel(1)  // log slow queries > 100ms


Check logs:

const slowQueries = await db.collection("system.profile").find().limit(5).toArray();
console.log("🐢 Slow Queries:", slowQueries);

6️⃣ Node.js App Monitoring

If using Mongoose, you can track events:

const mongoose = require("mongoose");

mongoose.connection.on("connected", () => console.log("🔗 Mongoose connected"));
mongoose.connection.on("error", (err) => console.error("❌ Mongoose error:", err));
mongoose.connection.on("disconnected", () => console.log("⚠ Mongoose disconnected"));


Useful to monitor live connections

7️⃣ Optional – Real-time Monitoring

mongostat → query/write rates

mongotop → collection-level I/O

Grafana + Prometheus → dashboards

8️⃣ What you can add more (for production-ready monitoring)



| Area               | Tool / What to Add                         |
| ------------------ | ------------------------------------------ |
| **Replica Set**    | `rs.status()` → replication health         |
| **Connections**    | Track connections + queue size in Node     |
| **Cache Hit Rate** | Redis / Materialized views + cache metrics |
| **Slow Queries**   | Automated alerts for > 200ms               |
| **Index Usage**    | `db.collection.getIndexes()` + usage stats |
| **Error Rate**     | Log failed queries / Mongoose errors       |
| **Cluster Health** | Shard / node metrics                       |



🔹 Interview Tip

Always mention why: Monitoring = find bottlenecks, prevent downtime, optimize queries, maintain indexes, track replica health.
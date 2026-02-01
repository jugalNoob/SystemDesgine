🧭 Monitoring (MongoDB + Node.js Ecosystem)
🧠 Purpose

Monitoring ensures:

Performance visibility — see what’s slowing down queries or causing latency

Early issue detection — detect replication lag, memory pressure, etc.

Capacity planning — forecast CPU, RAM, disk, connection usage

Query optimization — track slow queries, missing indexes

Reliability — prevent outages by tracking system health

⚙️ 1️⃣ Core MongoDB Performance Metrics


| Category              | Metric                                                  | Meaning                           | Example                              |
| --------------------- | ------------------------------------------------------- | --------------------------------- | ------------------------------------ |
| **Query Performance** | `executionTimeMillis`, `nReturned`, `totalDocsExamined` | How efficiently queries run       | from `.explain("executionStats")`    |
| **Connections**       | `connections.current`, `connections.available`          | Active vs available connections   | `db.serverStatus().connections`      |
| **Memory**            | `wiredTiger.cache.bytes currently in the cache`         | How much data is cached in RAM    | `db.serverStatus().wiredTiger`       |
| **Replication**       | `replication lag`, `optimeDate`                         | Delay between primary → secondary | `rs.printSlaveReplicationInfo()`     |
| **Disk I/O**          | `opcounters`, `metrics.document.returned`               | Reads/writes per second           | `db.serverStatus().opcounters`       |
| **Locking**           | `% of time globalLock is active`                        | Indicates blocking operations     | `db.serverStatus().globalLock`       |
| **Index Usage**       | `accesses.ops`                                          | How often indexes are used        | `db.collection.stats().indexDetails` |
| **Slow Queries**      | From profiler logs                                      | Detect expensive queries          | `db.system.profile.find()`           |




🧩 2️⃣ Manual Monitoring Commands
🔍 Database Statistics
db.stats()


Gives:

Data size

Storage size

Index size

Document count

⚡ Server Status
db.serverStatus()


Gives real-time performance stats:

Connections

Cache usage

Locks

Op counters

Replication metrics

🧠 Collection Statistics
db.collection.stats()


Shows:

Storage size per collection

Index details

Number of documents

WiredTiger compression ratio

🧩 Top Command
db.adminCommand({ top: 1 })


Lists which collections are using the most CPU and I/O right now.
Extremely useful for identifying hot collections.

📊 Current Operations
db.currentOp()


Shows:

Running queries

Locking state

Query start times

Client connection info

You can kill a slow query:

db.killOp(<opid>)

🧮 Profiler

Enable MongoDB Profiler to capture slow queries:

db.setProfilingLevel(2); // 0=off, 1=slow ops, 2=all ops


Then view logs:

db.system.profile.find().sort({ ts: -1 }).limit(5).pretty();


✅ Ideal for spotting unindexed or slow aggregation queries

🧰 3️⃣ Best Monitoring Tools for MongoDB


| Tool                                        | Type                      | Highlights                                     |
| ------------------------------------------- | ------------------------- | ---------------------------------------------- |
| **MongoDB Atlas Monitoring**                | Built-in Cloud Tool       | CPU, memory, index stats, slow queries, alerts |
| **MongoDB Ops Manager**                     | Enterprise Self-hosted    | Backup, metrics, automation, custom dashboards |
| **PM2 + Node.js Metrics**                   | Node process monitor      | Tracks memory, CPU, event loop lag             |
| **Grafana + Prometheus**                    | Open-source stack         | Visual dashboards with real-time charts        |
| **Percona Monitoring and Management (PMM)** | Free, advanced            | Deep Mongo metrics + query analytics           |
| **Datadog / New Relic**                     | SaaS tools                | Full APM integration with alerts               |
| **Elastic APM (ELK)**                       | Full log + metrics system | Works well with large clusters                 |
| **mongostat / mongotop**                    | CLI tools                 | Quick monitoring in terminal                   |



🖥️ 4️⃣ CLI Tools Overview
🧾 mongostat

Shows server activity in real time:

mongostat --host localhost:27017


| Metric                                | Meaning     |                    |
| ------------------------------------- | ----------- | ------------------ |
| `insert`, `query`, `update`, `delete` | Ops/sec     |                    |
| `qr                                   | qw`         | Queue reads/writes |
| `conn`                                | Connections |                    |
| `% dirty                              | used`       | Cache health       |


📈 mongotop

Displays read/write time per collection:

mongotop 5


(Refresh every 5 seconds)

Helps identify hot collections consuming the most I/O.

⚡ 5️⃣ Node.js App-Level Monitoring

At the application level, monitor your Node.js → MongoDB connection and query performance.

Example: Using Mongoose Events
mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('disconnected', () => console.log('MongoDB Disconnected'));
mongoose.connection.on('error', (err) => console.error('MongoDB Error:', err));

Query Timing Example
mongoose.set('debug', (collectionName, method, query, doc, options) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), options);
});


✅ Helps log slow queries in Node.js itself.

📉 6️⃣ Real-Time Performance Dashboards (Recommended Setup)

Prometheus + Grafana Stack

Install MongoDB Exporter
(exports Mongo metrics in Prometheus format)

prometheus --config.file=prometheus.yml


Connect Grafana to Prometheus

Use MongoDB dashboard template (e.g., cluster ops, cache usage, index stats)

✅ You’ll get:

Real-time graphs

Query latency over time

CPU, memory, connection usage

Alerts via email/Slack

🧮 7️⃣ Database-Specific Performance Insights
🔸 WiredTiger Engine Metrics
db.serverStatus().wiredTiger.cache


Key metrics:

bytes currently in the cache

tracked dirty bytes in the cache

pages read into cache

pages written from cache

Goal:
Keep “dirty pages” low and ensure cache hit ratio > 95%.

🔸 Replication Health
rs.status()
rs.printReplicationInfo()
rs.printSlaveReplicationInfo()


Tracks:

Sync delay (replication lag)

Oplog window size

Replica state

Fix replication lag:
✅ Increase oplog size
✅ Tune network throughput
✅ Use faster disks on secondaries

🔸 Index Efficiency
db.collection.stats().indexDetails


and

db.collection.getIndexes()


Check:

Index size vs data size

Access frequency (accesses.ops)

Unused indexes (waste RAM)

Delete unused ones:

db.collection.dropIndex("indexName");

🧠 8️⃣ Important System Resource Metrics


| Resource            | What to Watch              | Why                                 |
| ------------------- | -------------------------- | ----------------------------------- |
| **CPU**             | Query spikes               | Slow aggregation or missing index   |
| **Memory (RAM)**    | WiredTiger cache pressure  | Paging → high disk I/O              |
| **Disk I/O**        | High read/write            | Lack of indexes or large sort ops   |
| **Connections**     | Connection pool saturation | Unoptimized pooling                 |
| **Replication Lag** | Behind secondary           | Risk of stale reads                 |
| **Lock Percentage** | High locking time          | Too many writes or long-running ops |



🧱 9️⃣ Alerts and Thresholds (Recommended Defaults)

| Metric                | Alert if      | Action                            |
| --------------------- | ------------- | --------------------------------- |
| **Replication Lag**   | > 10 seconds  | Investigate secondary health      |
| **Connections Used**  | > 80% of pool | Increase pool or optimize queries |
| **Cache Dirty Ratio** | > 20%         | Add RAM or reduce writes          |
| **Disk Utilization**  | > 85%         | Expand or compress data           |
| **Index Miss Ratio**  | > 10%         | Add or adjust indexes             |
| **Query Latency**     | > 100ms       | Optimize slow queries             |



🧩 10️⃣ Best Practices for Continuous Monitoring

✅ Enable profiling only temporarily (it’s heavy)
✅ Use Prometheus + Grafana for persistent metrics
✅ Regularly check index health and cache hit ratio
✅ Monitor replication lag and oplog window
✅ Track slowest queries weekly
✅ Use MongoDB Atlas performance advisor for automatic recommendations
✅ Monitor Node.js process metrics via PM2, New Relic, or Datadog

🚀 Summary Table

| Area                | Tool / Command          | Purpose                |
| ------------------- | ----------------------- | ---------------------- |
| **DB Stats**        | `db.stats()`            | Collection overview    |
| **Server Metrics**  | `db.serverStatus()`     | Real-time system state |
| **Hot Collections** | `mongotop`              | I/O usage              |
| **Ops Rate**        | `mongostat`             | Query/write rates      |
| **Slow Queries**    | Profiler                | Detect bottlenecks     |
| **Replication**     | `rs.status()`           | Replica set health     |
| **Indexes**         | `db.collection.stats()` | Index usage            |
| **Node App**        | PM2 / Mongoose events   | Monitor connections    |
| **Visualization**   | Grafana + Prometheus    | Full dashboards        |

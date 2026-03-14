Yes ✅ You must monitor sharding in a database cluster. Monitoring helps detect:

Hot shards (one shard overloaded)

Slow queries

High CPU or memory usage

Replication lag

Uneven data distribution

In a MongoDB sharded cluster, monitoring usually focuses on shards, replica sets, and routers.

1️⃣ What to Monitor in Sharding
1. Shard Data Distribution

Check if data is evenly distributed.

Example:

Shard1 → 300 GB
Shard2 → 290 GB
Shard3 → 310 GB


Balanced 👍

Bad example:

Shard1 → 700 GB
Shard2 → 100 GB
Shard3 → 50 GB


This means bad shard key.

Command:

sh.status()

2. Query Throughput

Monitor:

Queries per second
Writes per second


Example:

Shard1 → 2000 queries/sec
Shard2 → 500 queries/sec
Shard3 → 400 queries/sec


Shard1 is overloaded.

3. Replication Lag

Each shard has replicas.

Monitor:

Primary → Secondary replication delay


Example:

Primary
   |
   | 5 seconds delay
   v
Secondary


Large delay = problem.

4. CPU / Memory Usage

Example metrics:

CPU usage
Disk IO
RAM
Network traffic


High CPU on one shard means hot shard problem.

2️⃣ Monitoring Tools

Common tools used with MongoDB.

1️⃣ MongoDB Atlas Monitoring

If using cloud:

Real-time metrics
Shard health
Query latency
Replication lag

2️⃣ Prometheus + Grafana

Popular monitoring stack:

Prometheus → metrics collection

Grafana → dashboards

Example metrics:

mongodb_ops_total
mongodb_memory_usage
mongodb_replication_lag

3️⃣ MongoDB Built-in Commands

Check shard status:

sh.status()


Check database stats:

db.stats()


Check collection stats:

db.collection.stats()

3️⃣ Monitoring Architecture Example

Typical monitoring setup:

MongoDB Cluster
      |
      v
Metrics Exporter
      |
      v
Prometheus
      |
      v
Grafana Dashboard


This setup monitors:

Shard load
Query latency
Replication lag
CPU usage
Disk usage

4️⃣ Example Dashboard Metrics

Engineers track:

Query latency
Shard disk usage
Replication delay
Connections
Operations per second


Example alert:

If CPU > 80% → alert
If replication lag > 10s → alert

5️⃣ Interview Answer (Short)

Yes, sharding can be monitored by tracking shard distribution, query throughput, replication lag, and resource usage. Tools like MongoDB Atlas, Prometheus, and Grafana are commonly used to monitor sharded clusters.
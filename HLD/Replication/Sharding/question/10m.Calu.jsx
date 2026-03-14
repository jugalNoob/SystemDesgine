Let’s walk through a simple real calculation for a system with 1 million users and high traffic. This is similar to how engineers design systems using MongoDB, Node.js, and Apache Kafka.

1️⃣ Step 1 — Estimate Data Size

Assume:

Total users = 1,000,000
Data per user = 5 KB


Total data:

1,000,000 × 5 KB = 5 GB


But production systems always add extra space for indexes, logs, and growth.

Safe estimate:

≈ 15 GB

2️⃣ Step 2 — Database Server Capacity

Assume one database server safely handles:

100 GB storage
10k queries/sec


Our data:

15 GB


So storage-wise:

1 shard is enough


But traffic matters more.

3️⃣ Step 3 — Calculate Traffic

Example traffic:

50k API requests per minute


Convert to seconds:

50,000 / 60 ≈ 833 requests/sec


If one shard handles:

300 requests/sec


Required shards:

833 / 300 ≈ 3 shards


So we deploy:

3 shards

4️⃣ Step 4 — Replication Setup

Each shard usually has 3 replica nodes for high availability.

Example cluster:

3 shards
Each shard = 3 nodes


Total database servers:

3 × 3 = 9 servers


Architecture:

             mongos
               |
      ---------------------
      |         |         |
   Shard1    Shard2    Shard3
   P S S     P S S     P S S


P = Primary
S = Secondary

5️⃣ Example Data Distribution

Shard key:

hashed(userId)


Data distribution:

User 1–333k   → Shard 1
User 333k–666k → Shard 2
User 666k–1M   → Shard 3


Balanced load across shards.

6️⃣ Full Architecture Example
Users
  |
  v
Load Balancer
  |
  v
API Servers (Node.js)
  |
  v
Redis Cache
  |
  v
Kafka (events)
  |
  v
MongoDB Router (mongos)
  |
  +---------+---------+
  |         |         |
Shard1   Shard2    Shard3


Used technologies:

Backend → Node.js

Streaming → Apache Kafka

Database → MongoDB

7️⃣ Interview-Level Answer

When designing a system for 1 million users:

Estimate total data
Estimate request throughput
Divide workload by server capacity
Add shards for scaling and redundancy


Typical setup:

3 shards
3 replicas per shard


Total:

9 database nodes


✅ Important tip: Engineers usually start with 3 shards minimum because it allows horizontal scaling later without downtime.
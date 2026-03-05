Excellent 🔥

Now we are talking real distributed system engineering.

🔥 How To Scale To 1 Million Writes Per Second (1M WPS)

This is big tech level (Netflix, Amazon, Uber scale).

Let’s break it down step-by-step.

🧠 First Rule: One Database Cannot Do 1M Writes


1:: Single server limits:

CPU

Disk IOPS

Network bandwidth

Lock contention

2:: Even high-end DB servers usually handle:

20k–80k writes/sec safely

3:: So to reach 1,000,000 writes/sec, we must:

✔ Distribute load
✔ Parallelize writes
✔ Reduce synchronous bottlenecks
✔ Use partitioning





1️⃣ Massive Horizontal Sharding

If:

1 DB server = 50k writes/sec

Then:

1,000,000 / 50,000 = 20 shards


You need at least 20 primary shards.

Each shard handles:

50k writes/sec


Total:

20 × 50k = 1M writes/sec




🔥 Critical: Perfect Shard Key


Bad shard key → hot shard → failure

.. Good shard key:

High cardinality

Even distribution

Not sequential

... Example:

hash(userId)


... NOT:

createdAt (sequential)


Sequential causes:

👉 All new writes → same shard → meltdown






2️⃣ Write Through Event Streaming

Never write directly to DB from API at this scale.

Instead:

API
  ↓
Message Queue
  ↓
Consumers
  ↓
Sharded DB


Use a distributed log system like:

Apache Kafka (example)

Cloud streaming systems

The queue:
✔ Buffers spikes
✔ Protects DB
✔ Enables batching



3️⃣ Batch Writes (Huge Optimization)

Instead of:

1 write = 1 network round trip


Do:

Batch 100 writes together


Now:

Fewer disk flushes

Fewer locks

Higher throughput

Batching alone can increase throughput 5–10x.






4️⃣ Asynchronous & Eventual Consistency

At 1M writes/sec:

You cannot wait for:

Cross-region confirmation

Strong consistency everywhere

Use:

✔ Async replication
✔ Eventual consistency
✔ Background index updates




5️⃣ Multi-Region Partitioning

Global systems split traffic by region:

US → US DB cluster
EU → EU DB cluster
Asia → Asia DB cluster


Now 1M writes becomes:

US = 400k
EU = 300k
Asia = 300k


Distributed load reduces per-cluster pressure.
#



6️⃣ Storage Engine Optimization

At 1M writes/sec, disk matters.

Use:

✔ NVMe SSD
✔ Write-optimized storage engines
✔ Sequential write patterns
✔ Log-structured merge trees (LSM-based DBs)

LSM trees are designed for high write throughput.

7️⃣ Remove Secondary Bottlenecks

Common hidden killers:

❌ Too many indexes
❌ Foreign key constraints
❌ Synchronous triggers
❌ Distributed transactions

At extreme scale:

✔ Minimal indexes
✔ Denormalized data
✔ Avoid cross-shard joins

8️⃣ Parallel Consumers

If using message queue:

Topic → 100 partitions


Run:

100 consumers


Each writes to specific shard.

Parallelism increases linearly with partitions.

9️⃣ Backpressure & Load Shedding

When DB overloads:

✔ Slow down producers
✔ Reject low-priority traffic
✔ Drop non-critical writes

This prevents total system crash.

🔟 Monitoring Everything

At 1M WPS you monitor:

Write latency

Disk IOPS

Queue lag

Replication delay

Lock contention

CPU per shard

Auto-scale when thresholds hit.

🧠 Realistic Architecture for 1M Writes/sec
Load Balancer
      ↓
Stateless API Cluster
      ↓
Distributed Log (100+ partitions)
      ↓
Consumer Pool (parallel writers)
      ↓
20–50 Shards (each replicated)
      ↓
Async cross-region replication

📊 Mathematical Thinking (Interview Gold)

If interviewer asks:

“How would you scale to 1M writes?”

You say:

First, measure per-node write capacity. Suppose one node handles 50k writes/sec. To reach 1M, we need at least 20 shards. Then we distribute writes using a high-cardinality shard key, buffer traffic through a distributed log, batch writes to reduce I/O overhead, and use asynchronous replication. Finally, we monitor and auto-scale based on queue lag and disk IOPS.

🔥 What Most People Forget

The real limit is often:

Disk flush latency

Network bandwidth

Lock contention

Garbage collection

Not CPU.

🎯 Important Reality Check

...  1M writes/sec is not common for:

E-commerce

Basic SaaS

Normal CRUD apps

.... It’s for:

Telemetry

Analytics

Click tracking

Financial tick data

Streaming platforms
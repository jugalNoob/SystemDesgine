🔥 Good. Now we design 100,000 emails/min using BullMQ only (no Kafka).

Goal:

100,000 / min = 1,667 jobs/sec

BullMQ can handle this — but only if architected correctly.




🧠 First: Understand BullMQ Limitation

1:: BullMQ uses:

Redis (single-threaded core)

Memory-based storage

Lua scripts for atomic operations

2:: So the bottleneck becomes:

Redis CPU

Redis memory

Network bandwidth

If you use single Redis instance → it will crash at 100k/min.

So we must redesign.






🏗️ Final Architecture (High Scale BullMQ)
                ┌──────────────┐
                │  API Cluster │
                └──────┬───────┘
                       ↓
         ┌──────────────────────────┐
         │ Redis Cluster (Sharded)  │
         └──────────────────────────┘
                       ↓
         ┌──────────────────────────┐
         │  Worker Cluster (100+)   │
         └──────────────────────────┘
                       ↓
             Email Provider Pool



🚀 Step 1: Use Redis Cluster (NOT Single Node)

Instead of:

Redis (1 node)


Use:

Redis Cluster (6 nodes minimum)
3 masters + 3 replicas


Why?

Sharding distributes keys

Load spreads across nodes

Higher throughput

Failover support

BullMQ supports Redis cluster.



⚙️ Step 2: Multiple Queues for Sharding

Instead of 1 queue:

send-email


Use multiple queues:

send-email-1
send-email-2
send-email-3
send-email-4


Shard by:

const shard = userId % 4
queueName = `send-email-${shard}`


This spreads load across Redis slots.



🧮 Throughput Math

We need:

1,667 jobs/sec


If one worker handles:

40 emails/sec


Then:

1,667 / 40 ≈ 42 workers


Add buffer → deploy 60–80 workers.


⚡ Step 3: Worker Scaling Strategy

Run:

node worker.js (100 times)


Or in Kubernetes:

replicas: 100


Each worker:

concurrency: 20
limiter: { max: 100, duration: 1000 }


Tune carefully.




🔥 Step 4: Remove Job Data Early

At high scale, Redis memory explodes.

Use:

removeOnComplete: true,
removeOnFail: 1000


Keep only last 1000 failed jobs.

Otherwise memory = 🔥🔥🔥





🔥 Step 5: Batch Add Jobs

Instead of:

await queue.add(...)


Use:

await queue.addBulk([
  { name: "email", data: {...} },
  { name: "email", data: {...} },
  ...
]);


This reduces Redis round trips drastically.

Huge performance gain.




🔥 Step 6: Separate Redis for Cache & Queue

Do NOT use same Redis for:

L1/L2 cache

BullMQ queue

Use:

Redis #1 → Cache
Redis #2 → BullMQ


Otherwise queue load affects cache latency.

🔥 Step 7: Enable Redis Optimizations

Redis config:

appendonly no
maxmemory-policy allkeys-lru
tcp-keepalive 60


Avoid AOF if durability not required.

BullMQ jobs are retryable anyway.

🔥 Step 8: Email Provider Pool

One SMTP server cannot handle 100k/min.

Use pool:

Worker
   → Provider Router
       → SES
       → SendGrid
       → Mailgun


Distribute load.

📊 Step 9: Monitor Queue Lag

Monitor:

waiting count

active count

failed count

completed/sec

Redis CPU

If waiting increases → scale workers.

🧠 Capacity Example

Assume:

80 workers

concurrency: 20

Total parallel jobs:

80 × 20 = 1600


If each email avg time = 1 second

→ 1600 emails/sec

= 96,000 per minute

Almost target.

Increase slightly → 100k/min achieved.

🚨 What Will Break First?

Redis CPU

Network bandwidth

Email provider rate limit

Worker CPU

NOT BullMQ logic itself.

🔥 Enterprise-Grade BullMQ Setup




| Component   | Config             |
| ----------- | ------------------ |
| Redis       | Cluster mode       |
| Queue       | Sharded queues     |
| Worker      | 80–120 replicas    |
| Concurrency | 20–50              |
| Batch Add   | Yes                |
| Remove Jobs | Aggressive cleanup |
| Monitoring  | Required           |



🏆 When BullMQ Is Enough

BullMQ is good up to:

100k–300k jobs/min (with cluster)

After that → Kafka becomes safer.

🎤 Interview Answer (Short Version)

“To scale BullMQ to 100k emails per minute without Kafka, I would deploy Redis in cluster mode, shard queues across multiple keys, horizontally scale stateless workers with high concurrency, use bulk job insertion to reduce Redis round-trips, and aggressively clean completed jobs to prevent memory pressure. Monitoring queue lag and autoscaling workers ensures sustained throughput.”

That answer = strong senior backend.
🔥 Now we’re entering real distributed systems math level.

🎯 Target

1,000,000 emails / minute

First convert:

1,000,000 / 60 = 16,667 emails per second


That is serious scale.

🧠 Step 1: Understand What Must Be Calculated

We must calculate:

Worker capacity

Email provider capacity

Redis capacity

Database writes

Network bandwidth

CPU usage





🔢 Step 2: Worker Throughput Math

Assume:

One email API call takes 200ms

With concurrency = 50 per worker

Per worker throughput:

1 second / 0.2 sec = 5 emails per thread

5 × 50 concurrency = 250 emails/sec per worker


Now calculate workers needed:

16,667 / 250 ≈ 67 workers


Add buffer for spikes → deploy 100 workers





📦 Step 4: Batch Optimization (Huge Impact)

If provider supports bulk send:

Send 100 emails in one API call (200ms).

Then:

100 emails / 0.2 sec = 500 emails/sec per thread


With concurrency 20:

500 × 20 = 10,000 emails/sec per worker


Then:

16,667 / 10,000 ≈ 2 workers


This is why batching is game changer.


🧮 Step 5: Redis Load Calculation (BullMQ)

Each job roughly:

1–2 KB metadata

1M jobs/min:

1M × 2KB = 2GB/min memory churn


If you keep jobs:

Redis explodes.

So you must:

removeOnComplete: true
removeOnFail: limited


And use Redis Cluster.

1:: At 16,667 jobs/sec:

2::  Redis must handle:

16k writes/sec

16k pops/sec

Total ≈ 30k ops/sec

Modern Redis cluster can handle 100k+ ops/sec.

So Redis OK — if clustered.




🧠 Step 6: Database Idempotency Writes

1:: If using exactly-once DB tracking:

1M emails/min → 1M writes/min

1,000,000 / 60 = 16,667 writes/sec


2:: MongoDB replica set can handle this with:

Proper indexing

Sharding

Otherwise becomes bottleneck.




🌐 Step 7: Network Bandwidth

Assume:

Email payload avg 5KB

Per second:

16,667 × 5KB = 83,335 KB/sec
≈ 83 MB/sec outbound


Per minute:

~5GB/min data transfer


Your server NIC must support this.

Cloud egress cost also matters.



🔥 Step 8: Email Provider Rate Limit

1:: Most providers limit:

10k–50k/sec max per account

2:: So you need:

Multiple accounts

Multiple IP pools

Multiple providers

3:: Large companies use pools:

Amazon (SES pools)

Uber (multi-provider routing)

Stripe (idempotency + retry safety)



🏗️ Step 9: Final Architecture for 1M/min


API Cluster
    ↓
Redis Cluster (Sharded)
    ↓
Worker Cluster (100–200 pods)
    ↓
Email Router Service
    ↓
Multiple Provider Pools
    ↓
Global IP Pools


With:

Horizontal autoscaling

Queue lag monitoring

Backpressure control

Circuit breaker per provider


Math Formula🧮 Quick Interview Math Formula

You can say:

Workers required =
Target emails/sec ÷ (Concurrency × (1 / Latency))


Example:

16,667 ÷ (50 × 5) = 67 workers


That sounds strong.

🚨 What Breaks First at 1M/min?

Email provider rate limit

Network bandwidth

DB write capacity (if idempotency tracked)

Redis CPU if not clustered

Not Node.js itself.

🏆 Final Reality Check

1M/min is:

Massive marketing campaign scale

Requires distributed cluster

Requires batching

Requires multiple provider accounts

Without batching → cost explodes.

🎤 Interview Answer (Short Strong Version)

“To handle 1 million emails per minute, I calculate required throughput as 16,667 emails per second. Based on email latency and worker concurrency, I determine the number of worker instances required. I horizontally scale stateless workers, use Redis cluster for queue distribution, implement batching to reduce API overhead, and distribute load across multiple email providers to avoid rate limits. Monitoring queue lag and autoscaling ensures sustained throughput.”

That answer = very strong system design level.
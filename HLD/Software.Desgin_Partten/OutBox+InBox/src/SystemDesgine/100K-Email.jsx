100k emails/min scaling architecture


🎯 100,000 Emails Per Minute

= 1,667 emails per second

Your current single BullMQ worker cannot handle this.

We must redesign architecture.



🧠 First: Understand Bottleneck  

Sending email is slow because:

SMTP latency

Third-party rate limits

Network delay

Retry overhead



1 --- Even big companies like:

Amazon

Uber

Netflix

do NOT send directly from API servers.

They use distributed async pipelines.





🏗️ High-Level Architecture for 100k Emails/Min


              ┌──────────────┐
              │  API Layer   │
              └──────┬───────┘
                     ↓
             ┌────────────────┐
             │  Kafka / Queue │
             └────────────────┘
                     ↓
      ┌─────────────────────────────┐
      │   Email Processing Cluster  │
      │  (100+ Workers Horizontal)  │
      └─────────────────────────────┘
                     ↓
         ┌─────────────────────┐
         │ Email Provider Pool │
         └─────────────────────┘



🚀 Step 1: Replace Single Queue with Distributed Stream

For 100k/min:

👉 BullMQ works
👉 But Kafka is better


| BullMQ                  | Kafka                      |
| ----------------------- | -------------------------- |
| Redis memory-based      | Disk-based distributed log |
| Good for small-mid      | Built for massive scale    |
| Single Redis bottleneck | Partitioned & distributed  |


For 100k/min → Kafka is safer.

⚙️ Step 2: Partitioning Strategy

If using Kafka:

Topic: send-email

50 partitions

Why?

Partitions = parallelism.

If you have:

50 partitions

100 consumers

You can process 50 parallel streams.



🧠 Throughput Math

We need:

100,000 / 60 = 1,667 per second


If one worker handles:

50 emails/sec


Then:

1,667 / 50 = 34 workers minimum


In production → use 50–80 workers.



🏗️ Step 3: Worker Design

1:: Workers must:

Be stateless

Horizontally scalable

Rate-limited per email provider

Support retry & DLQ




⚡ Step 4: Use Email Provider Pool


DO NOT depend on single provider.

Instead:

Email Router
   → SendGrid
   → SES
   → Mailgun


If one fails → route to another.


Real companies do this.



🔥 Step 5: Batch Sending (Huge Performance Boost)

Instead of:

1 API call = 1 email


Do:

1 API call = batch of 100 emails


Batching reduces:

TCP overhead

TLS handshake cost

Network latency

Many providers support bulk API.



🔥 Step 6: Multi-Region Setup

For extreme scale:

Region 1 → Asia
Region 2 → Europe
Region 3 → US


Each region has:

Local queue

Local worker cluster

Local provider

Reduces latency.




📊 Step 7: Autoscaling

Deploy workers in Kubernetes:

HPA (Horizontal Pod Autoscaler)
Scale based on:
- Queue lag
- CPU usage
- Message backlog


If backlog increases → scale to 200 pods.




🔥 Step 8: Backpressure Control

If email provider rate limit hit:

Pause consumers

Slow down partition consumption

Use exponential retry

Prevents cascading failure.




🔐 Step 9: Idempotency + Exactly Once

Use:

emailId = userId + campaignId


Store in Redis or DB before sending.

If duplicate → skip.





📦 Optional Enterprise Pattern
Outbox Pattern

Mongo Transaction:

User write
Outbox event write


Background service publishes to Kafka.

Guarantees no event loss.

| Layer        | Technology           |
| ------------ | -------------------- |
| API          | Node.js cluster      |
| Event Bus    | Kafka                |
| Processing   | 50–100 worker pods   |
| Rate Control | Token bucket         |
| Retry        | Exponential backoff  |
| DLQ          | Dead letter topic    |
| Monitoring   | Prometheus + Grafana |
| Autoscale    | Kubernetes HPA       |





🔥 What Breaks at 100k/min?

Single Redis instance

Single SMTP provider

No partitioning

No autoscaling

No monitoring

🏆 Final Enterprise Architecture
API Cluster
   ↓
Kafka (50 partitions)
   ↓
Email Worker Group (autoscaling)
   ↓
Email Router Service
   ↓
Multiple Email Providers

🎤 Interview Answer (Short Version)

“To support 100k emails per minute, I would move from a single Redis-backed queue to a partitioned Kafka topic to enable horizontal scaling. I would deploy multiple stateless email worker instances across regions with autoscaling based on queue lag. I’d implement exponential backoff, DLQ handling, provider failover, batching, and idempotency keys to guarantee reliability and high throughput.”

That answer = senior-level.
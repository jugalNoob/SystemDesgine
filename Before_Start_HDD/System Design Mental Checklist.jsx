Perfect 🔥
This is exactly how senior engineers think.

Here is your System Design Mental Checklist (20 Pre-Design Perspectives)
Use this before drawing any architecture.

🧠 1️⃣ Functional Requirements

👉 What must the system do?

Example:

Upload video

Send message

Process payment

If unclear → ask questions first.

🧠 2️⃣ Non-Functional Requirements (NFR)

👉 How well must it work?

Latency (100ms?)

Availability (99.99%?)

Consistency?

Throughput?

This changes architecture completely.

🧠 3️⃣ Traffic Estimation

👉 How many users?

Requests per second?

Peak traffic?

Read vs write ratio?

Example:

1M users
10% active
= 100k active
= maybe 10k RPS


Without estimation → design is weak.

🧠 4️⃣ Read vs Write Heavy?

Read heavy → caching

Write heavy → partitioning, queue

Example:

Social media feed = read heavy

Logging system = write heavy

🧠 5️⃣ Scalability Strategy

👉 If traffic increases 10x?

Options:

Vertical scaling

Horizontal scaling

Load balancer

Auto scaling

🧠 6️⃣ Database Choice

Ask:

SQL or NoSQL?

Strong consistency needed?

Complex joins?

Example:

Payments → SQL

Chat → NoSQL

🧠 7️⃣ Caching Strategy

Where to cache?

CDN

Redis

In-memory

Browser

Ask:

What can be cached?

Cache invalidation strategy?

🧠 8️⃣ Data Partitioning / Sharding

If DB grows huge:

Shard by userId

Shard by region

Hash based

Trade-off:

Harder joins

More complexity

🧠 9️⃣ Replication Strategy

For high availability:

Primary-replica

Multi-region

Leader election

Trade-off:

Eventual consistency

🧠 🔟 Consistency Model

Ask:

Strong consistency?

Eventual consistency?

Example:

Bank → strong

Like counter → eventual OK

🧠 1️⃣1️⃣ Fault Tolerance

If system crashes:

Retry logic

Circuit breaker

Dead letter queue

Fallback cache

Never ignore failure.

🧠 1️⃣2️⃣ Rate Limiting

Prevent abuse.

Token bucket

Leaky bucket

Redis counters

🧠 1️⃣3️⃣ Idempotency

For POST / payment:

Avoid duplicate charge

Use idempotency key

🧠 1️⃣4️⃣ Security

Ask:

Authentication?

Authorization?

Encryption?

Input validation?

🧠 1️⃣5️⃣ Observability

If something fails:

Logging

Monitoring

Metrics

Tracing

Without this → production nightmare.

🧠 1️⃣6️⃣ Asynchronous Processing

If slow operation:

Use:

Queue (Kafka / RabbitMQ)

Background worker

🧠 1️⃣7️⃣ Data Growth Strategy

What if data = 10TB?

Archival?

Cold storage?

TTL?

🧠 1️⃣8️⃣ Deployment Strategy

Blue-Green

Rolling updates

Canary release

🧠 1️⃣9️⃣ Cost Awareness

More servers = more cost.

Trade-offs:

Strong consistency vs cheaper infra

Multi-region vs budget

🧠 2️⃣0️⃣ Trade-Off Awareness

Every decision has cost.

Example:

Cache improves speed but adds inconsistency

Sharding improves scale but adds complexity

Microservices improve flexibility but add network overhead

Interviewers love trade-offs.

🚀 Golden Rule For System Design

Before drawing architecture, ask:

What if traffic increases?
What if DB fails?
What if cache fails?
What if network is slow?
What if data grows huge?


If you can answer these → you are thinking like senior engineer.

🎯 Your Mental Flow In Interview

Clarify requirements

Estimate scale

High-level design

Deep dive into bottlenecks

Discuss trade-offs

Discuss failure handling



Since you're already learning:

Kafka

Redis

Idempotency

Outbox

Fault tolerance

You are already in advanced zone 🔥
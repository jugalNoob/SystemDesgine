                    ┌──────────────────────────┐
                    │        Client / App      │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Node.js API Layer    │
                    │  (Rate Limiter Middleware) │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │  Rate Limiting Algorithms     │
                 │                               │
                 │ 1️⃣ Fixed Window              │
                 │     - Admin APIs, Logging     │
                 │ 2️⃣ Sliding Window            │
                 │     - Signup, Login, OTP     │
                 │ 3️⃣ Token Bucket              │
                 │     - Public API, Notifications│
                 │ 4️⃣ Leaky Bucket              │
                 │     - Protect downstream     │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                 ┌───────────────────────────────┐
                 │ Kafka Producer / Outbox Worker │
                 │  - Stores events for reliability │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                     Kafka Topic (3 Partitions)
                                 │
                                 ▼
                    Kafka Consumer Group (signup-group)
                                 │
                                 ▼
                     ┌─────────────────────────┐
                     │  Inbox Pattern Check    │
                     │  MongoDB (dedup + idempotency) │
                     │  - Smooth writes → Leaky Bucket │
                     └─────────────┬───────────┘
                                   │
                                   ▼
                     ┌─────────────────────────┐
                     │  BullMQ Queue (Redis)   │
                     │  Email Sending Worker   │
                     │  - Leaky Bucket: smooth SMTP sends │
                     └─────────────────────────┘



                     🔹 Explanation of Rate Limiter Placement


                     | Component                    | Rate Limiter            | Why / Benefit                                                                   |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| Node.js API Layer            | Fixed / Sliding / Token | Protect API endpoints from abuse, allow bursts if needed, smooth login/OTP flow |
| Kafka Consumer → Inbox Check | Leaky Bucket            | Prevent DB overload, process events at constant rate                            |
| BullMQ Email Worker          | Leaky Bucket            | Avoid SMTP throttling, smooth email delivery                                    |
| Admin / Metrics endpoints    | Fixed Window            | Simple, easy throttling for non-critical endpoints                              |



🔹 Key Advantages of This Architecture

High throughput: Kafka partitions + consumer group handle millions of events per minute

Reliable delivery: Outbox pattern ensures no lost messages

Idempotency: Inbox pattern prevents duplicates in DB

Rate-limited: 4 types of rate limiters applied at the right layers

Burst-friendly: Token Bucket at API layer allows short bursts without overload

Smooth backend processing: Leaky Bucket prevents DB / email spikes

💡 Interview Talking Point:

“We combine different rate-limiting strategies depending on the system layer: Token Bucket or Sliding Window at API for user-friendly bursts, Fixed Window for non-critical endpoints, and Leaky Bucket for backend workers like Kafka consumer and email sending to smooth traffic and protect downstream systems.”
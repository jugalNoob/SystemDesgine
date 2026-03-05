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
                 │ 2️⃣ Token Bucket              │
                 │ 3️⃣ Leaky Bucket              │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                 ┌───────────────────────────────┐
                 │ Kafka Producer / Outbox Worker │
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
                     │  MongoDB (dedup)       │
                     └─────────────┬───────────┘
                                   │
                                   ▼
                     ┌─────────────────────────┐
                     │  BullMQ Queue (Redis)   │
                     │  Email Sending Worker   │
                     └─────────────────────────┘


                     🔹 1️⃣ Algorithm → System Mapping Table



                     | Algorithm        | How It Works                                      | Project / Use Case in System                               | Pros / Cons                                                        |
| ---------------- | ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| **Fixed Window** | Counts requests per fixed time window             | API endpoint: signup, admin endpoints, logging             | ✅ Simple, easy to implement <br> ❌ Can burst at window edges       |
| **Token Bucket** | Tokens refill at a rate; allow bursts             | Public API, OTP requests, notification/email sending       | ✅ Allows bursts, smooth long-term rate <br> ❌ Slightly complex     |
| **Leaky Bucket** | Requests processed at fixed rate; excess rejected | Kafka consumer → DB writes, Payment gateway, Email service | ✅ Smooth traffic, protects downstream <br> ❌ Does not allow bursts |



🔹 2️⃣ How Each Fits in Your Kafka + BullMQ System


| Component                    | Recommended Algorithm       | Why                                                                                      |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| API Layer                    | Fixed Window / Token Bucket | Control client request rate; Token Bucket if burst allowed, Fixed Window if simple limit |
| Kafka Consumer → Inbox check | Leaky Bucket                | Smooth consumer processing to avoid DB overload                                          |
| BullMQ Email Worker          | Leaky Bucket                | Avoid sending too many emails too fast (SMTP limits)                                     |
| OTP / Signup Requests        | Token Bucket                | Allow short bursts, prevent abuse                                                        |



🔹 2️⃣ How Each Fits in Your Kafka + BullMQ System


| Component                    | Recommended Algorithm       | Why                                                                                      |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| API Layer                    | Fixed Window / Token Bucket | Control client request rate; Token Bucket if burst allowed, Fixed Window if simple limit |
| Kafka Consumer → Inbox check | Leaky Bucket                | Smooth consumer processing to avoid DB overload                                          |
| BullMQ Email Worker          | Leaky Bucket                | Avoid sending too many emails too fast (SMTP limits)                                     |
| OTP / Signup Requests        | Token Bucket                | Allow short bursts, prevent abuse                                                        |


🔹 3️⃣ Summary / Interview Talking Points

Token Bucket: Burst allowed → public APIs, OTP, notifications

Leaky Bucket: Smooth traffic → Kafka consumer, Email worker, critical systems

Fixed Window: Simple count → admin APIs, logging, non-critical endpoints

Hybrid Approach: Many high-throughput systems combine them for different layers

Example: Token Bucket at API → Leaky Bucket for consumer → Fixed Window for admin endpoints
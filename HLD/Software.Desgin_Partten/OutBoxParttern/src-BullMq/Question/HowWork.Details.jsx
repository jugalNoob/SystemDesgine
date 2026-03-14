🔁 Detailed Event Flow
1️⃣ Client → POST /users

2️⃣ API
      └─ Start MongoDB Transaction
             ├─ Insert into users
             └─ Insert into outbox (PENDING)
      └─ Commit Transaction

3️⃣ Outbox Publisher (every 5 sec)
      └─ Find status = PENDING
      └─ Mark PROCESSING (atomic update)
      └─ Push event → BullMQ
      └─ Mark DONE

4️⃣ Worker
      └─ Receive job
      └─ Send Email
      └─ Complete job

🧠 Transaction Boundary (Important Interview Point)
 ┌────────────────────────────────────┐
 │     MongoDB Transaction            │
 │                                    │
 │   Insert User  +  Insert Outbox    │
 │                                    │
 └────────────────────────────────────┘


Everything above that line is atomic.

Everything below that line is eventually consistent.



🎯 Clean Layer Responsibility Diagram
[ Controller ]  →  HTTP Handling
[ Service ]     →  Business Logic + Transaction
[ Outbox ]      →  Event Storage
[ Publisher ]   →  Event Dispatcher
[ Queue ]       →  Message Broker
[ Worker ]      →  Async Processor
[ Email ]       →  External Service

🏢 Enterprise Upgrade Version (Optional)

If system grows:

Outbox
   ↓
Debezium (CDC)
   ↓
Kafka
   ↓
Multiple Microservices

🔥 Interview One-Line Explanation

We use MongoDB transactions to store both the domain entity and the integration event in an outbox collection. A background publisher reads pending events and pushes them to BullMQ, ensuring atomicity and preventing dual-write inconsistencies while maintaining eventual consistency.
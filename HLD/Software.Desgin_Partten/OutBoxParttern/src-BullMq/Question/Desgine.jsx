Perfect Jugal 🔥
Here is your ASCII System Design Diagram for:

🔥 Outbox Pattern + BullMQ (Production Architecture)
🏗 High-Level Architecture (Clean ASCII)



                        ┌──────────────────────┐
                        │        Client        │
                        └──────────┬───────────┘
                                   │ HTTP Request
                                   ▼
                        ┌──────────────────────┐
                        │     Express API      │
                        │  (Controller Layer)  │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │    Service Layer     │
                        │ (Transaction Logic)  │
                        └──────────┬───────────┘
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
                ▼                                     ▼
      ┌────────────────────┐              ┌────────────────────┐
      │      users         │              │      outbox        │
      │   (MongoDB Coll)   │              │   (MongoDB Coll)   │
      └────────────────────┘              └────────────────────┘
                ▲                                     │
                │                                     │
                └────────── Same DB Transaction ──────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │  Outbox Publisher    │
                        │   (Poller Service)   │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │      BullMQ Queue    │
                        │     (Redis Based)    │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │      Worker(s)       │
                        │  (Concurrency = 5)   │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │     Email Service    │
                        └──────────────────────┘

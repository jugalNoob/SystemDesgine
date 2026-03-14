🏗 2️⃣ FULL FLOW CHART (ASCII Architecture)


                ┌──────────────────────┐
                │       CLIENT         │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Express API        │
                │  user_form()         │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │  MongoDB Insert      │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Circuit Breaker      │
                │ (Opossum)            │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │  BullMQ Queue        │
                │ send-welcome-email   │
                └──────────┬───────────┘
                           │
                 Redis stores job
                           │
                           ▼
                ┌──────────────────────┐
                │      Worker          │
                │  concurrency: 5      │
                └──────────┬───────────┘
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
     Success                          Failure
           │                               │
           ▼                               ▼
 removeOnComplete                   Retry 3 times
                                           │
                                           ▼
                                 Move to DLQ Queue

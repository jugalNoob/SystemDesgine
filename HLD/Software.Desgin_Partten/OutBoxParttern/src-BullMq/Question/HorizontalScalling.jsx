                   ┌──────────────┐
                   │  API Node 1  │
                   └──────────────┘
                   ┌──────────────┐
                   │  API Node 2  │
                   └──────────────┘
                          │
                          ▼
                    MongoDB Replica Set
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
 Outbox Publisher 1                 Outbox Publisher 2
 (atomic update prevents           (safe parallel polling)
   duplicate processing)
        │                                   │
        └──────────────┬────────────────────┘
                       ▼
                   Redis (BullMQ)
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     Worker 1       Worker 2       Worker 3

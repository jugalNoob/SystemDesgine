Client
   │
   ▼
API (Producer)
   │
   ▼
Redis Queue
   │
   ▼
Worker Pool (5 concurrency)
   │
   ├── Success → Completed → Auto clean
   │
   └── Failure → DLQ
                   │
                   ▼
              Monitoring Service
                   │
                   ▼
              Alert System

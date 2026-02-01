Full Flow Chart: POST + GET + Cache Tiering + Write-Behind
                 ┌─────────────┐
                 │   Client    │
                 └─────┬───────┘
                       │
                ┌──────▼───────┐
                │ POST /add-user│
                └──────┬───────┘
                       │
               ┌───────▼────────┐
               │ Validate input │
               └───────┬────────┘
                       │
               ┌───────▼────────┐
               │ Generate shortId│
               │ Create newUser │
               └───────┬────────┘
                       │
               ┌───────▼────────┐
               │ Increment version│
               │ (students:version)│
               └───────┬────────┘
                       │
          ┌────────────▼─────────────┐
          │ Write to L2 Redis cache  │
          │ cacheKey = v<version>    │
          └────────────┬────────────┘
                       │
          ┌────────────▼─────────────┐
          │ Write to L1 Node-cache   │
          └────────────┬────────────┘
                       │
          ┌────────────▼─────────────┐
          │ Respond to Client (fast) │
          └────────────┬────────────┘
                       │
           ┌───────────▼───────────┐
           │ Async Write-Behind DB │
           │ Register.create(newUser) │
           └───────────────────────┘

GET Flow
                 ┌─────────────┐
                 │   Client    │
                 └─────┬───────┘
                       │
                ┌──────▼───────┐
                │ GET /students│
                └──────┬───────┘
                       │
           ┌───────────▼───────────┐
           │ Read current version   │
           │ from Redis             │
           └───────────┬───────────┘
                       │
          ┌────────────▼─────────────┐
          │ Check L1 cache first     │
          └───────┬─────────┬───────┘
                  │ hit     │ miss
                  ▼         ▼
         ┌─────────────┐   ┌─────────────┐
         │ Return data │   │ Check Redis │
         │ from L1     │   │ (L2 cache)  │
         └─────────────┘   └──────┬──────┘
                               hit│miss
                                ▼ │
                       ┌───────────────┐
                       │ Return data    │
                       │ from Redis     │
                       └──────┬────────┘
                              │
                              ▼
                       ┌───────────────┐
                       │ Fallback DB   │
                       │ Register.find │
                       └──────┬────────┘
                              │
                       ┌──────▼────────┐
                       │ Update caches │
                       │ L1 + Redis    │
                       └──────┬────────┘
                              │
                       ┌──────▼────────┐
                       │ Return data   │
                       │ from DB       │
                       └───────────────┘

Key Notes

POST

Writes cache first → fast response

Writes DB asynchronously → Write-Behind

Versioning ensures cache keys are always consistent

GET

Reads from L1 → Redis → DB

GET is fast because caches are updated by POST

DB only used if cache misses

Cache Tiering

L1 cache → fast, in-process (Node-cache)

L2 cache → Redis, shared across all nodes

DB → persistent, eventual consistency

Write-Behind

Guarantees fast POST and durable storage without blocking

✅ This is a complete working architecture flow for your system.
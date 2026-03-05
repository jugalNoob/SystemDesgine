Client
  │
  │ HTTP GET /users
  ▼
Node.js API
  │
  ├─▶ L1 Cache (NodeCache)
  │      ├─ Hit → return data + ETag
  │      └─ Miss → continue
  │
  ├─▶ L2 Cache (Redis)
  │      ├─ Hit → populate L1 + return data + ETag
  │      └─ Miss → continue
  │
  ├─▶ Acquire Redlock (lock: cacheKey)
  │      ├─ Lock acquired → proceed
  │      ├─ Lock failed → return 503
  │
  ├─▶ Double-check Redis (after lock)
  │      ├─ Hit → populate L1 + return data + ETag
  │      └─ Miss → proceed to DB
  │
  ├─▶ MongoDB Query (Register.find)
  │      ├─ Store result in Redis + L1 (with random TTL)
  │      └─ Return data + ETag
  │
  ▼
Client receives JSON response + ETag

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Client
  │
  ▼
Node.js API
  │
  ├─▶ L1 Cache (in-memory)
  │      ├─ Hit → return data + ETag
  │      └─ Miss → check Redis
  │
  ├─▶ Redis Cache (distributed)
  │      ├─ Hit → populate L1, return data + ETag
  │      └─ Miss → acquire Redlock
  │
  ├─▶ Redlock (distributed lock)
  │      ├─ Acquired → query DB
  │      ├─ Not acquired → return 503 / wait
  │      └─ Double-check Redis after lock
  │
  ├─▶ MongoDB (DB fallback)
  │      ├─ Store result in Redis + L1
  │      └─ Return data + ETag
  │
  ▼
Client

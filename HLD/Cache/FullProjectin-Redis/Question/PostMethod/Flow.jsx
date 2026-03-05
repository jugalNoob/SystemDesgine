⚡ Flow Summary
Client
  │
  ▼
POST /user_form
  │
  ├─ Validate Input
  ├─ Generate Short ID
  ├─ Save to MongoDB (Register.create)
  ├─ Invalidate Cache
  │    ├─ Redis.del(cacheKey)
  │    └─ L1Cache.delete(cacheKey)
  ├─ Optional: Update Redis (write-behind)
  └─ Return 201 + newUser


✅ Why it’s good for practice/interview:

Demonstrates understanding of DB → cache → client flow.

Shows awareness of cache invalidation problem (classic interview topic).

Shows how to handle multi-layer caches.

Introduces write-behind concept, which is often asked in system design questions.
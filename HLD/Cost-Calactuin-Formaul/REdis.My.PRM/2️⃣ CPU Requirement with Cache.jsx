2️⃣ CPU Requirement with Cache

Let’s assume cache hit ratio = 80% → 80% of requests served from Redis, 20% go to DB.

CPU per DB request = 100 ms

CPU per cache request = 5 ms


CPU/sec=(RPS×(1−hit_ratio)×tdb​)+(RPS×hit_ratio×tcache​)

Step Calculation:

DB requests = 20% of 1,667 ≈ 333 requests/sec → 333 × 0.1 s = 33.3 s CPU/sec

Cache requests = 80% of 1,667 ≈ 1,334 requests/sec → 1,334 × 0.005 s = 6.67 s CPU/sec

Total CPU/sec=33.3+6.67≈40sCPU/sec

Cores needed = 40 (instead of 167 without cache)

✅ Cache reduces CPU requirement drastically!
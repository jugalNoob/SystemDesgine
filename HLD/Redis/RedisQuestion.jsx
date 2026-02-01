Here are Top 10 Redis Interview Questions with clear, simple, production-ready answers (perfect for Node.js / system-design interviews).

1️⃣ What is Redis?

Answer:
Redis is an in-memory key–value data store mainly used for caching, session storage, counters, and queues.
It is extremely fast because data is stored in RAM.

✅ Used when low latency is required.

2️⃣ Is Redis a database or cache?

Answer:
Redis is primarily a cache, but it can also act as a data store using persistence (RDB/AOF).

👉 In production:

Database → Source of truth

Redis → Performance layer

3️⃣ Why is Redis faster than MongoDB/MySQL?

Answer:

Data stored in memory (RAM)

Simple data structures

Single-threaded event loop (no locking)

Result: microsecond-level response time

4️⃣ What are Redis data types?

Answer:
Redis supports multiple data structures:

String

Hash

List

Set

Sorted Set

Bitmap

HyperLogLog

Stream

📌 This makes Redis more powerful than a simple key-value cache.

5️⃣ What is TTL in Redis?

Answer:
TTL (Time To Live) defines how long a key lives in Redis.

Example use cases:

Session expiration

OTP expiry

Cache auto-cleanup

When TTL expires → key is deleted automatically.

6️⃣ How does Redis handle cache invalidation?

Answer:
Redis supports:

TTL-based expiration

Manual deletion on write (POST/PUT/DELETE)

Pattern-based invalidation (SCAN)

⚠️ Invalidation is one of the hardest problems in caching.

7️⃣ What is cache-aside pattern?

Answer:
Application controls the cache:

Check Redis

If miss → fetch DB

Store in Redis

Return response

✅ Most commonly used pattern in production.

8️⃣ What happens if Redis goes down?

Answer:
Application should:

Fall back to database

Continue working (slower but safe)

Redis failure should not crash the system.

9️⃣ What is Redis persistence?

Answer:
Redis supports:

RDB → snapshot based

AOF → append-only logs

Used to recover data after restart.

📌 Still not a replacement for primary databases.

🔟 Why is Redis single-threaded?

Answer:
Redis is single-threaded to:

Avoid locks

Reduce context switching

Maintain predictable performance

It uses event-driven non-blocking I/O.

⭐ Bonus Interview Question (Very Common)
❓ Why not use Redis KEYS in production?

Answer:
Because KEYS blocks Redis and can freeze the server.
Use SCAN instead for safe iteration.

🧠 One-Line Interview Summary

“Redis is a high-performance in-memory store used as a caching layer to reduce database load and latency.”
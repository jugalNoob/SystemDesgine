🔹 Redis System Design Interview Questions
1️⃣ Q: How would you design a caching layer for a high-traffic website?

A:

Identify read-heavy endpoints

Choose a caching pattern (Cache-aside / Read-through)

Set TTL and eviction policy (LRU / LFU)

Handle cache invalidation (on POST/PUT/DELETE)

Plan for scaling: Redis Cluster / Sharding / Replication

Handle failover: fallback to DB if Redis is down

Example: Product catalog, leaderboard, user profiles

2️⃣ Q: How do you scale Redis for millions of users?

A:

Sharding: Split keys across multiple Redis nodes

Replication: Master → replicas for read scaling

Cluster mode: High availability and partitioning

Persistence: RDB or AOF for recovery

Use consistent hashing to distribute keys

Interview tip: Always mention read vs write scaling

3️⃣ Q: How would you handle hot keys?

A:

Hot key = very popular key accessed repeatedly
Solutions:

Cache early / preload

Use local in-memory cache for hot keys

Use request throttling or rate limiting

Replication / multiple Redis instances

Example: “Trending products on Amazon”

4️⃣ Q: How do you handle cache invalidation in distributed systems?

A:

Manual invalidation on write (POST/PUT/DELETE)

Event-driven invalidation using message queues

TTL / expiration for automatic cleanup

Use versioning or ETags to validate cache

Tip: Mention trade-off between performance and consistency

5️⃣ Q: What Redis eviction policies would you use in production?

A:

LRU (Least Recently Used) – default for memory-limited cache

LFU (Least Frequently Used) – for frequently accessed data

TTL / Expiration – auto remove old keys

Random – for non-critical caches

Example: Session store → LRU, Analytics → LFU

6️⃣ Q: How would you prevent cache stampede?

A:

Use locking / mutex → only one request repopulates cache

Randomized TTL to avoid simultaneous expirations

Request coalescing → queue similar requests

Example: Flash sale product page

7️⃣ Q: How would you prevent cache penetration?

A:

Cache empty / null values with short TTL

Input validation → reject invalid IDs

Bloom Filter → probabilistic filter for valid keys

Example: Fake product IDs hitting DB

8️⃣ Q: How do you handle cache failures?

A:

Application falls back to database (graceful degradation)

Ensure retry mechanism or circuit breaker

Avoid system crashes due to cache unavailability

Tip: Interviewers check your fault-tolerance awareness

9️⃣ Q: How do you decide what TTL to set?

A:

Depends on data volatility and criticality

Hot read-heavy data → longer TTL

Frequently updated data → shorter TTL

Randomize TTL to avoid cache avalanche

🔟 Q: How would you design a leaderboard or counter system using Redis?

A:

Use Sorted Sets (ZSET) for leaderboard

Use INCR / INCRBY for counters

Apply TTL if temporary

For high traffic, use sharding and replication

Example: Gaming leaderboard, social media likes

🏗️ Bonus: Redis in Node.js Production – Key Patterns



| Pattern           | Use Case            | Node.js Implementation       |
| ----------------- | ------------------- | ---------------------------- |
| Cache-aside       | Product catalog     | Check Redis → DB → Redis     |
| Write-through     | User settings       | Write to Redis + DB together |
| Write-behind      | Likes / counters    | Redis first, DB later        |
| Session store     | Auth                | Store JWT/session in Redis   |
| Rate limiting     | API throttling      | Redis INCR + TTL             |
| Pub/Sub           | Notifications       | Redis channels for events    |
| Distributed locks | Payment / cron jobs | Redis SETNX / Redlock        |



🧠 Interview Tips

Always mention scalability, fault-tolerance, consistency

Discuss trade-offs (performance vs consistency vs complexity)

Give real-world examples like Amazon, Netflix, Twitter
🔹 Caching System Design Round – Q&A
1️⃣ Q: Why do we need caching in system design?

A:

To reduce database load

To decrease latency / response time

To handle high read traffic

To improve user experience

Example:

News feed in social media

Product catalog in e-commerce

Interview tip: Mention performance, scalability, and cost reduction.

2️⃣ Q: Where would you put a cache in an architecture?

A:

Between application servers and database (common)

At the edge (CDN) for static assets

In microservices for frequently accessed data

Example:

User → Node.js API → Redis Cache → Database

3️⃣ Q: How do you choose what to cache?

A:

Read-heavy data

Data that doesn’t change often

Expensive DB queries / computation results

Avoid sensitive or write-heavy data

Example:

Product details, leaderboard, user profile info

4️⃣ Q: How do you handle cache invalidation?

A:

TTL (time-to-live) → automatic expiry

Manual deletion on POST/PUT/DELETE

Pattern-based invalidation with SCAN

Event-based invalidation in distributed systems

Tip: Cache invalidation is one of the hardest parts. Always mention it.

5️⃣ Q: What caching patterns do you know?

A:

Cache-Aside (Lazy Loading) → App controls cache

Read-Through → Cache loads DB automatically

Write-Through → Write to cache + DB together

Write-Behind → Write to cache first, DB later

Session Store → Cache stores session

Rate Limiting / Counters → Cache stores counters

Mention examples in interviews, e.g., likes counter → write-behind

6️⃣ Q: What are cache eviction policies?

A:

LRU (Least Recently Used) → remove least used keys

LFU (Least Frequently Used) → remove least accessed keys

TTL / Expiration → remove keys after a set time

Random → remove random keys when memory full

Example:

Redis default → LRU approximation

7️⃣ Q: What happens if cache fails?

A:

Fallback to database

Application should continue working (degraded mode)

Don’t crash the system

Tip: Always mention fault-tolerance

8️⃣ Q: How do you avoid cache stampede?

A:

Locking / Mutex → Only one process populates cache

Request coalescing / queuing

Randomized TTL → avoid many keys expiring at the same time

Example:

Hot product page in e-commerce

9️⃣ Q: How do you scale Redis in production?

A:

Sharding → Split keys across multiple Redis nodes

Replication → Master → replicas for read scaling

Cluster Mode → For high availability and partitioning

Persistence (RDB / AOF) → optional durability

🔟 Q: When would you choose cache vs database query optimization?

A:

Cache → If data is read-heavy, expensive to compute, or latency sensitive

Query optimization → If write-heavy or DB can handle load efficiently

Combined → Use indexing + cache for best results

🏗️ Bonus System Design Interview Tip

When asked:

“Design a caching layer for X system”

Answer structure:

Identify read-heavy / expensive data

Choose caching pattern (cache-aside, write-behind…)

Define TTL / eviction policy

Handle invalidation

Discuss scaling & failure handling

Example: “Design cache for product catalog: Use Redis cache-aside, TTL 1 hour, LRU eviction, fallback to DB, horizontal Redis cluster for scaling.”

🧠 Quick Memory Table (Interview Cheat Sheet)



| Question                  | Answer / Key Point                                     |
| ------------------------- | ------------------------------------------------------ |
| Why cache?                | Reduce DB load, lower latency, handle high traffic     |
| Where to put?             | Between API and DB, or edge (CDN)                      |
| What to cache?            | Read-heavy, non-sensitive, expensive queries           |
| Invalidation?             | TTL, manual delete, SCAN, event-based                  |
| Patterns?                 | Cache-aside, read-through, write-through, write-behind |
| Eviction?                 | LRU, LFU, TTL, Random                                  |
| Cache failure?            | Fallback to DB, graceful degradation                   |
| Cache stampede?           | Locking, request coalescing, random TTL                |
| Scaling?                  | Sharding, replication, clustering                      |
| Cache vs DB optimization? | Cache: read-heavy, expensive; DB: write-heavy          |




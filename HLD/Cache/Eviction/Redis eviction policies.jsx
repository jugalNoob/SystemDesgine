Perfect! Let’s break down Redis eviction policies clearly — this is a key system design / interview topic. I’ll make it concise, conceptual, and real-world oriented.

🔹 What are Redis eviction policies?

Redis is an in-memory database, so memory is limited.

When memory is full, Redis needs to decide which keys to remove to make space.

This decision is governed by eviction policies.

🔹 Redis maxmemory & maxmemory-policy

maxmemory – total memory Redis can use

maxmemory-policy – what Redis should do when memory is full

🔹 Redis Eviction Policies

| Policy              | Meaning                                                 | Use Case                            |
| ------------------- | ------------------------------------------------------- | ----------------------------------- |
| **noeviction**      | Do **not evict**, return error when memory full         | Critical data that must not be lost |
| **allkeys-lru**     | Evict **least recently used** key from all keys         | General-purpose caching             |
| **volatile-lru**    | Evict **least recently used** key among keys with TTL   | Cached items with expiry            |
| **allkeys-lfu**     | Evict **least frequently used** key from all keys       | Popularity-based caching            |
| **volatile-lfu**    | Evict **least frequently used** key among keys with TTL | Mix of TTL + usage frequency        |
| **volatile-ttl**    | Evict key with **shortest remaining TTL**               | Always remove expiring keys first   |
| **volatile-random** | Evict random key with TTL                               | Rarely used, simple caching         |
| **allkeys-random**  | Evict random key from all keys                          | Rarely used, very simple            |


🔹 Key Points

LRU = Least Recently Used
Hot data stays in memory, cold data removed

LFU = Least Frequently Used
Frequently accessed data stays

TTL-aware eviction
Only keys with an expiry are considered (volatile policies)

No eviction
Redis returns error if memory full (OOM)

🔹 Real-world Examples

Session cache

TTL = 30 minutes

Policy = volatile-lru

Old/unused sessions removed first

API result cache

TTL = 5 minutes

Policy = allkeys-lru

Keeps hot queries cached

Recommendation feed

TTL = dynamic

Policy = allkeys-lfu

Popular feeds stay, unpopular removed

🔹 Interview One-liners

TTL → “Removes keys after a fixed time”

LRU → “Removes least recently accessed keys”

LFU → “Removes least frequently accessed keys”

Volatile vs Allkeys → “Volatile considers only keys with TTL, Allkeys considers all keys”

If you want, I can draw a diagram showing TTL + LRU + LFU in Redis, which is extremely useful for system design interviews.

Do you want me to make that diagram?
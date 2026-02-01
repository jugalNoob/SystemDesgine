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
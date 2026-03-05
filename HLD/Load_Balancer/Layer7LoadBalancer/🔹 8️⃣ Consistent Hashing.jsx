🔹 8️⃣ Consistent Hashing

Hash request (URL, userID, key) → route to specific server

Mainly used in caching systems (Redis Cluster, CDN)

Pros:

Minimizes cache misses if server changes

Stable distribution

Cons: More complex

Need hash ring

Best use case: Distributed caches, sharded databases
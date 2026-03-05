🚨 Cache Avalanche — Simple Meaning

Cache Avalanche happens when many cached keys expire at the same time, causing a sudden flood of requests to hit the database, which can overload or crash the system.

🧠 Easy Example

Suppose you cache 1,000 product records like this:

redis.set(key, value, { EX: 60 });


All keys have TTL = 60 seconds.

After exactly 60 seconds:

❌ All 1,000 keys expire together

🔥 Thousands of user requests come in

💥 Redis returns MISS for all

🚨 All requests hit MongoDB

📈 DB CPU spikes → system slows down or crashes

That sudden traffic spike is Cache Avalanche.

📌 One-Line Definition

Cache Avalanche = Many cache keys expire simultaneously → massive DB traffic spike.

🔍 Why It Happens

Same TTL for many keys

Redis restart (all cache cleared)

Redis crash/failure

Large batch data cached at same time

✅ How to Prevent It
1️⃣ Add Random TTL (Most Common Fix)

Instead of:

EX: 60


Use:

const ttl = 60 + Math.floor(Math.random() * 30);
redis.set(key, value, { EX: ttl });


Now keys expire between 60–90 seconds, not all together.

2️⃣ Multi-Level Cache (Like You Use)
L1 (Memory) → L2 (Redis) → DB


Even if Redis expires many keys, L1 reduces DB load.

3️⃣ Cache Prewarming

Refresh important keys before they expire using background jobs.

4️⃣ Use Redis Cluster / Replication

Prevents full cache loss if Redis crashes.

🆚 Compare with Other Cache Problems


| Problem           | What Happens                                     |
| ----------------- | ------------------------------------------------ |
| Cache Penetration | Requests for non-existing data hit DB repeatedly |
| Cache Breakdown   | One hot key expires → traffic spike              |
| Cache Avalanche   | Many keys expire together → huge DB spike        |



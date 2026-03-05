| Data Type             | Description                                   | Example                                   | Use Case                               |
| --------------------- | --------------------------------------------- | ----------------------------------------- | -------------------------------------- |
| **String**            | Simple key-value pair                         | `SET key "value"` → `"value"`             | Cache, counters, tokens, sessions      |
| **List**              | Ordered collection of strings                 | `LPUSH mylist "a"` → `LRANGE mylist 0 -1` | Message queue, task list, timelines    |
| **Set**               | Unordered collection of unique strings        | `SADD myset "a"` → `SMEMBERS myset`       | Unique values, tags, followers         |
| **Sorted Set (ZSet)** | Set with **score** → elements sorted by score | `ZADD leaderboard 100 "Alice"`            | Leaderboards, ranking, priority queue  |
| **Hash**              | Key-value pairs stored under **one key**      | `HSET user:1 name "Alice" age 25`         | User profile, object storage, metadata |





🔥 Examples
1️⃣ String
SET token:123 "abcdef"
GET token:123
INCR counter


Use for caching API responses, counters, JWT tokens

2️⃣ List
LPUSH tasks "task1"
LPUSH tasks "task2"
LRANGE tasks 0 -1


Works as queue (LPUSH / RPOP) or stack (LPUSH / LPOP)

3️⃣ Set
SADD followers user1
SADD followers user2
SMEMBERS followers
SISMEMBER followers user1


Unique collection, unordered, can do intersections / unions

4️⃣ Sorted Set (ZSet)
ZADD leaderboard 100 Alice
ZADD leaderboard 200 Bob
ZREVRANGE leaderboard 0 1 WITHSCORES
ZINCRBY leaderboard 50 Alice


Auto-sorted by score → perfect for leaderboards

5️⃣ Hash
HSET user:1 name "Alice" age 25
HGETALL user:1
HINCRBY user:1 age 1


Store object-like structures efficiently

6️⃣ Bitmaps
SETBIT online:users 1001 1
GETBIT online:users 1001


Track on/off states efficiently in memory

7️⃣ HyperLogLog
PFADD visitors user1 user2 user3
PFCOUNT visitors


Estimate unique elements → very memory-efficient

8️⃣ Streams
XADD mystream * user Alice action login
XREAD COUNT 2 STREAMS mystream 0


Store append-only logs → event sourcing, messaging

9️⃣ Geo
GEOADD cities 13.4 52.5 Berlin
GEORADIUS cities 13 52 100 km


Track locations and calculate distances

🔑 Key Notes

Choose data type based on your access pattern

Leaderboards → ZSet

Sessions → Hash or String

Unique visitors → HyperLogLog

Messaging → List or Stream

Most advanced types are memory-efficient → Streams, HyperLogLog, Bitmaps

Combining types gives powerful designs (e.g., ZSet + Hash for user score + metadata)
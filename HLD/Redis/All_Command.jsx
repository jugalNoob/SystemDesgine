🧰 Redis Commands by Data Type

| Data Type          | Commands                                                                    | Explanation                                                                 |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **String**         | `SET`, `GET`, `DEL`, `INCR`, `DECR`, `APPEND`, `MGET`, `MSET`, `SETEX`      | Store simple values, counters, or small JSON; supports TTL (`SETEX`)        |
| **Hash**           | `HSET`, `HGET`, `HGETALL`, `HDEL`, `HEXISTS`, `HINCRBY`, `HKEYS`, `HVALS`   | Store structured objects (like JSON) efficiently                            |
| **List**           | `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`, `LLEN`, `LREM`                  | Ordered collection; queues, chat logs, timelines                            |
| **Set**            | `SADD`, `SREM`, `SMEMBERS`, `SISMEMBER`, `SUNION`, `SINTER`                 | Unordered unique collection; followers, tags, feature flags                 |
| **Sorted Set**     | `ZADD`, `ZREM`, `ZRANGE`, `ZREVRANGE`, `ZRANK`, `ZREMRANGEBYRANK`, `ZCOUNT` | Unique items with score, automatically sorted; leaderboards, priority tasks |
| **HyperLogLog**    | `PFADD`, `PFCOUNT`, `PFMERGE`                                               | Approximate count of unique items; analytics at scale                       |
| **Streams**        | `XADD`, `XRANGE`, `XREAD`, `XREADGROUP`, `XACK`, `XDEL`                     | Event logs, message queues, multiple consumers                              |
| **Pub/Sub**        | `PUBLISH`, `SUBSCRIBE`, `UNSUBSCRIBE`, `PSUBSCRIBE`, `PUNSUBSCRIBE`         | Real-time messaging, notifications, chat; ephemeral (no persistence)        |
| **Key Management** | `DEL`, `EXPIRE`, `TTL`, `RENAME`, `TYPE`, `EXISTS`, `KEYS`                  | Operate on keys, check existence, set expiration, delete keys               |
| **Transactions**   | `MULTI`, `EXEC`, `WATCH`, `DISCARD`                                         | Execute multiple commands atomically                                        |
| **Scripting**      | `EVAL`, `EVALSHA`                                                           | Run Lua scripts on Redis server for atomic or complex operations            |



🔹 Quick Summary

SET / GET / DEL → Work on any key (mostly Strings)

HSET / HGET → Work on Hash

LPUSH / LRANGE → Work on List

SADD / SMEMBERS → Work on Set

ZADD / ZRANGE → Work on Sorted Set

PFADD / PFCOUNT → Work on HyperLogLog

XADD / XREAD → Work on Streams

PUBLISH / SUBSCRIBE → Work on Pub/Sub


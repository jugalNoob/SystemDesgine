| Eviction Policy     | Meaning                     | How It Works                                                 | When to Use                                     | Pros                              | Cons                                         |
| ------------------- | --------------------------- | ------------------------------------------------------------ | ----------------------------------------------- | --------------------------------- | -------------------------------------------- |
| **noeviction**      | Do not evict keys           | Returns an error when memory limit is reached                | Critical data where you never want to lose keys | Safe, no data loss                | Writes fail if memory full                   |
| **allkeys-lru**     | Least Recently Used (LRU)   | Evicts the **least recently used key** among all keys        | General caching, web sessions, hot data         | Keeps recently accessed data      | Doesn’t consider access frequency            |
| **volatile-lru**    | LRU for keys with TTL       | Evicts **least recently used keys that have expiration set** | Expiring cache or session storage               | Keeps non-expiring keys safe      | Only applies to keys with TTL                |
| **allkeys-lfu**     | Least Frequently Used (LFU) | Evicts the key with **lowest access frequency**              | Caching hot items that are accessed often       | Frequently used items stay longer | Slightly more complex, approximate algorithm |
| **volatile-lfu**    | LFU for keys with TTL       | Evicts **lowest frequency keys that have TTL**               | Expiring hot data, predictive caching           | Protects permanent keys           | Only works on keys with expiration           |
| **allkeys-random**  | Random eviction             | Evicts a random key                                          | Rarely used, simple cache                       | Very simple to implement          | Unpredictable, may evict hot data            |
| **volatile-random** | Random for TTL keys         | Evicts a random key with TTL                                 | Limited expiration cache                        | Simple                            | Only applies to TTL keys                     |
| **volatile-ttl**    | Evict shortest TTL first    | Removes key with **earliest expiration**                     | Short-lived session / temporary cache           | Ensures oldest keys go first      | Doesn’t consider usage frequency             |



🔥 Quick Notes

LRU → good for “recently used data matters”

LFU → good for “frequently used data matters”

TTL-based eviction → useful when keys have natural expiration

Random → simple but unpredictable, rarely used in production

🧠 Interview Tip

If asked:

“Which Redis eviction policy will you use for caching popular API responses?”

Answer:

“I would use allkeys-lfu because frequently accessed items stay longer, and less-used keys are evicted automatically.”
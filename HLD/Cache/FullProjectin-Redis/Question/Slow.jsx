⚡ This system solves:

| Problem                 | Solution in Your System                         |
| ----------------------- | ----------------------------------------------- |
| Cache avalanche         | Randomized TTL                                  |
| Cache stampede          | Redlock + double-check Redis                    |
| Stale cache after write | Cache invalidation in POST (`user_form`)        |
| Hot key                 | Redlock lock per key                            |
| High bandwidth          | ETag + 304 Not Modified                         |
| Monitoring              | Logs for cache hits, DB time, ETag, lock events |

🧩 Components You Are Using

1:: L1 Cache (NodeCache / In-Memory)

Very fast, local memory cache per Node.js instance.

TTL is randomized per key: 60 + Math.random() * 30 to avoid cache avalanche.

Prevents hitting Redis for repeated requests in the same Node process.

2::: L2 Cache (Redis / Shared Cache)

Shared across all Node instances.

Acts as a central cache for distributed apps.

Randomized TTL also prevents cache avalanche.

Double-check after acquiring lock prevents multiple DB hits (hot key / stampede).

3:: Redlock (Distributed Lock / Mutex)

Protects hot keys from simultaneous rebuilds (stampede).

Ensures only one request fetches from DB while others wait or retry.

Lock is short-lived (5s in your code).

4:: MongoDB (DB fallback)

The ultimate source of truth.

Only queried when cache misses occur or first build.

Query time is logged for monitoring.

5:: ETag (HTTP caching / Conditional GET)

Generates hash of cached data (md5) to detect changes.

If client sends If-None-Match header and ETag matches → returns 304 Not Modified.

Saves bandwidth and improves performance.

6:: Randomized TTL + Logging

Prevents cache avalanche.

Logging shows cache hits, misses, ETag values, and DB query time → good for monitoring.
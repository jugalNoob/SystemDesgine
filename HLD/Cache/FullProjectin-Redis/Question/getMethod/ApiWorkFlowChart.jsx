🔄 Flow / How the GET API Works

We can describe it in steps:

1:: Check L1 Cache

If found: return with ETag.

Log [Cache Hit] L1 cache + ETag.

2:: Check L2 Cache (Redis)

If found: set L1 cache (with random TTL), return with ETag.

Log [Cache Hit] Redis cache + ETag.

3:: Acquire Redlock (Hot Key Protection)

Prevents multiple simultaneous DB queries for the same key.

Lock expires after 5s.

If lock acquisition fails → return 503.

4:: Double-check Redis after acquiring lock

If cache was rebuilt by another request → return it.

Log [Cache Hit after lock] Redis.

5:: DB Fallback (MongoDB)

Query DB (Register.find({})).

Calculate query time (dbTime).

Log [Cache Miss] DB query.

6:: Update Cache

Store result in Redis + L1 cache with random TTL.

Return data with ETag header.
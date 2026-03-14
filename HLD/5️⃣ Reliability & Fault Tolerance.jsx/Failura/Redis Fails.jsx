🔥 2️⃣ What Happens If Redis Fails?

Redis is usually used for:

Caching

Rate limiting

Sessions

💥 Scenario A: Redis Down (Cache Only)

If Redis is cache only:

Without fallback:

API crashes if code not handled

With proper handling:

Skip cache

Fetch directly from Mongo

Slightly slower response

System still works.

💥 Scenario B: Redis Used for Rate Limiting

If Redis fails:

Rate limiter may break

Either block all users

Or allow unlimited traffic

Proper strategy:

Fail-open (allow traffic)

Or fail-closed (block traffic)

Depends on system.

💥 Scenario C: Redis Memory Full

Keys evicted

Cache misses increase

DB load increases

Mongo becomes bottleneck

This causes cascading failure.
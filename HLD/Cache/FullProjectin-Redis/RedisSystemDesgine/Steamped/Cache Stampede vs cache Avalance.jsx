Ah! This is a very common confusion — let’s clarify carefully because Cache Avalanche and Cache Stampede are related but not exactly the same, even if you use random TTL.

1️⃣ Cache Avalanche

Definition:

Occurs when many keys expire at the same time

Causes sudden high load on DB

Example:

You have 1000 users, each with cached data with fixed TTL = 60s

At second 60, all 1000 keys expire together

DB gets hit all at once → overload → potential crash

Prevention:

Randomized TTL / jitter ✅

const ttl = 60 + Math.floor(Math.random() * 30);


Soft TTL (rebuild slightly before expiry)

L1 cache / multiple layers

Random TTL prevents all keys from expiring simultaneously → solves Avalanche



2️⃣ Cache Stampede (Hot Key Problem)

Definition:

Occurs when a single very popular key expires

Hundreds or thousands of requests try to rebuild the same key at the same time

DB gets thousands of simultaneous hits

Example:

"students:list" key expires

500 concurrent users request it at the same time

All 500 hit DB → overload

Prevention:

Mutex / Lock (Redlock) ✅

Double-check cache after lock ✅

Soft TTL (background rebuild before expiry)

Random TTL alone does not prevent stampede if one hot key is very popular


🔑 Key Difference


| Feature    | Cache Avalanche                         | Cache Stampede / Hot Key Problem         |
| ---------- | --------------------------------------- | ---------------------------------------- |
| Scope      | Many keys expiring together             | One very popular key                     |
| Cause      | TTL alignment / simultaneous expiry     | Concurrent requests to same key          |
| Prevention | Random TTL, soft TTL, multi-layer cache | Mutex lock, soft TTL, double-check cache |



⚡ TL;DR

Random TTL → good for Avalanche

Redlock / Mutex → good for Stampede

Often you combine both to fully protect your system, especially for popular hot keys
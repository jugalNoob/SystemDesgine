1️⃣ What is Cache Tiering?

Cache tiering is the idea of using multiple layers (tiers) of cache to optimize performance, reduce latency, and prevent overload on the database.

Think of it like fast local cache → slightly slower shared cache → database.

Typical 2-tier cache setup:


| Tier                           | Where                                       | Speed                    | Size          | Scope                           |
| ------------------------------ | ------------------------------------------- | ------------------------ | ------------- | ------------------------------- |
| **Tier 1: Local memory cache** | Node.js process memory (`Map`, `LRU Cache`) | Ultra-fast (nanoseconds) | Limited (MBs) | Single process only             |
| **Tier 2: Distributed cache**  | Redis / Memcached                           | Fast (sub-millisecond)   | Large (GBs)   | Shared across processes/servers |
| **Tier 3: Database**           | MongoDB / PostgreSQL                        | Slower (ms)              | Very large    | Source of truth                 |




Flow:

App tries Tier 1 (local cache) first.

If miss, checks Tier 2 (Redis).

If miss, fetches from Tier 3 (DB) and populates caches.

This approach reduces DB load and network calls while keeping the fastest possible access for frequent data.

2️⃣ Why it’s useful

Ultra-low latency: Most reads hit the local cache → no network call.

Scalable: Redis handles shared state across multiple servers.

DB protection: Database only gets requests on cache misses.

Flexible expiration: Local cache can have short TTL, Redis longer TTL.

3️⃣ Simple Node.js Example (2-tier)
import LRU from "lru-cache";
import redis from "redis";
import { promisify } from "util";

const localCache = new LRU({ max: 500, ttl: 5000 }); // 5 sec
const redisClient = redis.createClient();
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);

async function getUser(id) {
  // 1️⃣ Check local memory cache
  if (localCache.has(id)) {
    console.log("✅ Local cache hit");
    return localCache.get(id);
  }

  // 2️⃣ Check Redis
  const redisData = await redisGet(id);
  if (redisData) {
    console.log("✅ Redis cache hit");
    localCache.set(id, JSON.parse(redisData)); // populate local cache
    return JSON.parse(redisData);
  }

  // 3️⃣ Fetch from DB (simulated)
  console.log("⛏️ DB fetch");
  const dbData = { id, name: "Jugal" };

  // Save to caches
  localCache.set(id, dbData);
  await redisSet(id, JSON.stringify(dbData), "EX", 60); // Redis TTL 60 sec

  return dbData;
}


✅ Behavior:

First request → DB fetch.

Second request → Redis hit + local cache populated.

Third request → Local cache hit (fastest).

4️⃣ Optional Advanced Tiering

Some big systems add 3+ tiers:

L1 → in-process cache (ultra-fast)

L2 → shared distributed cache (Redis/Memcached)

L3 → CDN or edge cache (for web content)

L4 → database / storage



1️⃣ Facebook / Instagram

Tier 1: Memcached on app servers (ultra-fast local cache).

Tier 2: Redis or Memcached clusters for shared cache.

Database: MySQL / Cassandra.

Purpose: Reduce DB load, speed up news feed queries, user profiles, and session data.

2️⃣ Twitter

Tier 1: Local in-memory cache for hot tweets and timelines.

Tier 2: Distributed cache (Redis / Memcached) across multiple nodes.

Database: MySQL / Manhattan (internal DB).

Purpose: Handle millions of requests per second while keeping latency under a few milliseconds.

3️⃣ Amazon / eCommerce

Tier 1: In-process LRU caches for frequent product lookups.

Tier 2: Redis clusters for session info, cart data, inventory caches.

Database: DynamoDB / RDS.

Purpose: Reduce DB writes/reads during high-traffic events like Black Friday.

4️⃣ Netflix

Tier 1: Local caches on Node.js/Java services for video metadata.

Tier 2: Redis / EVCache (Netflix’s own Redis-based caching layer).

Database: Cassandra / S3.

Purpose: Reduce latency for billions of streaming requests daily.
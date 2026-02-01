1️⃣ What is Cache Tiering?

Definition:
Cache Tiering is the practice of having multiple layers of cache, each with different latency, size, and scope, to reduce load on the main database and improve performance.

Common pattern:

Request → L1 Cache (Local memory) → L2 Cache (Redis) → Database


3️⃣ Cache Tiering Design Pattern (L1 + L2)
Flow diagram:
          ┌───────────────┐
          │   Request     │
          └──────┬────────┘
                 │
                 ▼
          ┌───────────────┐
          │ L1 Cache      │  (Node-cache, in-memory)
          └──────┬────────┘
                 │ miss
                 ▼
          ┌───────────────┐
          │ L2 Cache      │  (Redis, distributed)
          └──────┬────────┘
                 │ miss
                 ▼
          ┌───────────────┐
          │ Database      │
          └───────────────┘



          import NodeCache from "node-cache";
import redisClient from "./redis.js";
import User from "./models/User.js";

// L1 cache: local
const l1Cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // 10s TTL

export const getUsers = async () => {
  const cacheKey = "users:all";

  // 1️⃣ Check L1 cache
  let data = l1Cache.get(cacheKey);
  if (data) return { source: "L1", data };

  // 2️⃣ Check L2 cache (Redis)
  data = await redisClient.get(cacheKey);
  if (data) {
    l1Cache.set(cacheKey, JSON.parse(data)); // populate L1 cache
    return { source: "L2", data: JSON.parse(data) };
  }

  // 3️⃣ Fetch from DB
  data = await User.find();
  // Update L2 cache
  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 }); // 60s TTL
  // Update L1 cache
  l1Cache.set(cacheKey, data);
  return { source: "DB", data };
};




6️⃣ Extra optimizations

Read-through cache

Fetch from cache first, populate if missing

Write-through cache

Write to cache + DB together

Cache aside

What we just implemented (most common)

Hot key protection

Use mutex / locking to avoid multiple DB fetches at once
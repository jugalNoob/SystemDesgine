Perfect! 🚀 Let’s design a production-ready GET API using L1 + L2 cache with stampede prevention, explained step by step for future projects and interviews.

🏗 L1 + L2 Cache with Stampede Prevention (Node.js + Redis + Local Cache)

Goal:

Ultra-fast reads (L1: in-memory local cache)

Shared cache (L2: Redis)

Prevent cache stampede

Multi-server safe

🔹 1️⃣ Architecture
Client
  ↓
Server
  ↓
[L1 Cache: Local Memory]
  ↓
[L2 Cache: Redis Distributed]
  ↓
Database (MongoDB)


L1: Super fast, per server, limited memory

L2: Shared across servers, persistent

DB: Single source of truth

Lock: Prevent stampede on L2 rebuild

🔹 2️⃣ Setup
L1 Cache (simple JS object)
// cache/l1Cache.js
const L1Cache = new Map();

function get(key) {
  const record = L1Cache.get(key);
  if (!record) return null;

  // Check TTL
  if (record.expiry < Date.now()) {
    L1Cache.delete(key);
    return null;
  }

  return record.value;
}

function set(key, value, ttlSec = 60) {
  L1Cache.set(key, { value, expiry: Date.now() + ttlSec * 1000 });
}

function del(key) {
  L1Cache.delete(key);
}

module.exports = { get, set, del };

L2 Cache (Redis)
// cache/redisClient.js
const redis = require("redis");
const client = redis.createClient({ url: "redis://localhost:6379" });
client.connect();
module.exports = client;

🔹 3️⃣ GET API with L1 + L2 + Stampede Prevention
const express = require("express");
const L1Cache = require("../cache/l1Cache");
const redis = require("../cache/redisClient");
const Product = require("../models/product");

const router = express.Router();

router.get("/products", async (req, res) => {
  const cacheKey = "products:list";
  const lockKey = "lock:products:list";

  try {
    // 1️⃣ Check L1 cache
    const l1 = L1Cache.get(cacheKey);
    if (l1) return res.json({ source: "L1", data: l1 });

    // 2️⃣ Check L2 cache (Redis)
    const l2 = await redis.get(cacheKey);
    if (l2) {
      const data = JSON.parse(l2);
      // Update L1 for faster next read
      L1Cache.set(cacheKey, data, 30);
      return res.json({ source: "L2", data });
    }

    // 3️⃣ Acquire Redis lock to prevent stampede
    const lock = await redis.set(lockKey, "1", { NX: true, EX: 5 });

    if (!lock) {
      // Another request is rebuilding cache
      // Option: wait & retry or return stale (here we return 429)
      return res.status(429).json({ message: "Cache rebuilding, try again" });
    }

    // 4️⃣ Fetch from DB
    const products = await Product.find();

    // 5️⃣ Save to L2 cache
    await redis.set(cacheKey, JSON.stringify(products), { EX: 60 });

    // 6️⃣ Save to L1 cache
    L1Cache.set(cacheKey, products, 30);

    // 7️⃣ Release lock
    await redis.del(lockKey);

    res.json({ source: "DB", data: products });

  } catch (err) {
    await redis.del(lockKey); // ensure lock released
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

🔹 4️⃣ How It Works Step-by-Step

Check L1 cache → super fast, in-memory

Check L2 cache (Redis) → shared cache across servers

Acquire Redis lock → prevents stampede

Fetch from DB → only one request goes to DB

Update caches → L2 + L1

Release lock → other requests can now read fresh cache

🔹 5️⃣ Why This is Production-Ready





| Feature          | Benefit                                |
| ---------------- | -------------------------------------- |
| L1 cache         | Ultra-fast response, reduce Redis load |
| L2 cache         | Shared cache, distributed safe         |
| Redis lock       | Prevent cache stampede in GET method   |
| TTL & L1 refresh | Avoid avalanche, keep hot data ready   |
| Fallback         | Other servers wait or use stale cache  |



| Feature          | Benefit                                |
| ---------------- | -------------------------------------- |
| L1 cache         | Ultra-fast response, reduce Redis load |
| L2 cache         | Shared cache, distributed safe         |
| Redis lock       | Prevent cache stampede in GET method   |
| TTL & L1 refresh | Avoid avalanche, keep hot data ready   |
| Fallback         | Other servers wait or use stale cache  |




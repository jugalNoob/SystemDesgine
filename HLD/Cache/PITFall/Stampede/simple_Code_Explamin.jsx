Perfect! Let’s explain Cache Stampede prevention in GET methods with simple, practical code using Node.js + Redis, so it’s interview-ready and production-friendly.

🐘 Cache Stampede Prevention in GET

Goal:
Prevent many requests from hitting the DB at the same time when cache expires.

🔹 1️⃣ Concept

Normal GET (Problem):

Cache miss → Many requests → DB overload


Solution (Stampede Prevention):

One request rebuilds cache

Others wait or return stale cache

Redis lock used to control concurrency

🔹 2️⃣ Simple Code (Node.js + Redis)
const express = require("express");
const redis = require("./redisClient");
const Product = require("./models/product"); // MongoDB model

const router = express.Router();

router.get("/products", async (req, res) => {
  const cacheKey = "products:list";
  const lockKey = "lock:products:list";

  try {
    // 1️⃣ Try to read cache
    const cached = await redis.get(cacheKey);
    if (cached) return res.json({ source: "cache", data: JSON.parse(cached) });

    // 2️⃣ Acquire Redis lock to prevent stampede
    const lock = await redis.set(lockKey, "1", { NX: true, EX: 5 });

    if (!lock) {
      // Another request is rebuilding cache
      // Option 1: wait a bit and retry
      // Option 2: return stale data (if available)
      return res.status(429).json({ message: "Cache rebuilding, try again" });
    }

    // 3️⃣ Fetch from DB
    const products = await Product.find();

    // 4️⃣ Save to cache
    await redis.set(cacheKey, JSON.stringify(products), { EX: 60 });

    // 5️⃣ Release lock
    await redis.del(lockKey);

    res.json({ source: "db", data: products });
  } catch (err) {
    await redis.del(lockKey); // Ensure lock released on error
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

🔹 3️⃣ How It Works Step-by-Step

Client GETs /products

Server checks cache:

If exists → return ✅

If not → go to step 3

Server tries to acquire Redis lock:

Lock success → rebuild cache from DB

Lock fails → another server is rebuilding → wait or return “try again”

Cache updated → lock released

Future GETs hit fresh cache

🔹 4️⃣ Why This Prevents Stampede

Only one request fetches DB at a time

Others don’t overwhelm DB

Lock automatically expires (EX: 5 sec)

Works in multi-server environments

🔹 5️⃣ Extra Tips (Production Ready)

TTL jitter: Add random seconds to cache expiration to avoid many keys expiring together

Return stale cache instead of error → better UX

Use queue or promise wait instead of 429 in high traffic

🔹 6️⃣ Simple Real-Life Analogy

Cache = water tank

DB = underground water source

Lock = one person refilling tank

Others wait → tank doesn’t overflow the source

✅ Golden Interview Line

“Cache stampede occurs when many GET requests hit the DB after cache expires. We prevent it using a distributed lock so only one request rebuilds the cache while others wait or use stale data.”

If you want, I can make a next-level version showing:

L1 + L2 cache + stampede prevention

Returning stale cache instead of error

Perfect for high-traffic production GET APIs



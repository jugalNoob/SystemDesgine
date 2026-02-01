.

🧹 Cache Invalidation – Simple Node.js Example

Goal:

Invalidate cache when DB data changes (POST/PATCH/DELETE)

Update both L1 (local) and L2 (Redis) cache

🔹 1️⃣ L1 Cache (Local Memory)
// cache/l1Cache.js
const L1Cache = new Map();

function get(key) {
  const record = L1Cache.get(key);
  if (!record) return null;
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

🔹 2️⃣ Redis Client (L2 Cache)
// cache/redisClient.js
const redis = require("redis");
const client = redis.createClient({ url: "redis://localhost:6379" });
client.connect();
module.exports = client;

🔹 3️⃣ GET API (Read with L1 + L2 cache)
const express = require("express");
const L1Cache = require("../cache/l1Cache");
const redis = require("../cache/redisClient");
const Register = require("../model/student");

const router = express.Router();

router.get("/students", async (req, res) => {
  const cacheKey = "students:list";

  // 1️⃣ Check L1 cache
  let data = L1Cache.get(cacheKey);
  if (data) return res.json({ source: "L1 cache", data });

  // 2️⃣ Check L2 cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    data = JSON.parse(cached);
    L1Cache.set(cacheKey, data, 60); // refresh L1
    return res.json({ source: "Redis", data });
  }

  // 3️⃣ DB fallback
  data = await Register.find();

  // 4️⃣ Update caches
  L1Cache.set(cacheKey, data, 60);
  await redis.set(cacheKey, JSON.stringify(data), { EX: 60 });

  res.json({ source: "DB", data });
});

module.exports = router;

🔹 4️⃣ POST/PATCH API (Invalidate Cache)
router.post("/students", async (req, res) => {
  try {
    const { name, age } = req.body;

    // 1️⃣ Save to DB
    const newStudent = await Register.create({ name, age });

    // 2️⃣ Invalidate cache
    const cacheKey = "students:list";
    L1Cache.del(cacheKey);                  // clear L1 cache
    await redis.del(cacheKey);              // clear Redis cache

    res.status(201).json({ message: "Student added", data: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

🔹 5️⃣ How It Works

GET request:

Check L1 → if miss, check Redis → if miss, query DB → update caches

POST/PATCH/DELETE request:

Update DB

Invalidate caches (L1 + Redis) → next GET fetches fresh data

🔹 6️⃣ Real-Life Analogy

Cache = fridge

DB = supermarket

POST/PATCH = buy new groceries → old fridge items removed

GET = eat from fridge → always get fresh food after invalidation


🔹 ✅ Interview-Friendly Explanation

“When data changes (POST/PATCH/DELETE), we invalidate cache to prevent stale data. We remove both L1 (local) and L2 (Redis) caches, so next GET fetches fresh data from DB and updates caches.”
🧹 Cache Penetration Prevention – Node.js Example

Goal:

Prevent repeated DB hits for non-existent data

Store “empty result” in cache temporarily

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

🔹 3️⃣ GET API with Cache Penetration Prevention
const express = require("express");
const L1Cache = require("../cache/l1Cache");
const redis = require("../cache/redisClient");
const Register = require("../model/student");

const router = express.Router();

router.get("/student/:id", async (req, res) => {
  const id = req.params.id;
  const cacheKey = `student:${id}`;

  // 1️⃣ Check L1 cache
  let data = L1Cache.get(cacheKey);
  if (data) return res.json({ source: "L1 cache", data });

  // 2️⃣ Check L2 Redis cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    data = JSON.parse(cached);
    L1Cache.set(cacheKey, data, 60);
    return res.json({ source: "Redis", data });
  }

  // 3️⃣ Query DB
  data = await Register.findById(id);

  if (!data) {
    // 🔹 Cache penetration prevention
    const emptyData = null;
    L1Cache.set(cacheKey, emptyData, 30);         // cache empty result in L1
    await redis.set(cacheKey, JSON.stringify(emptyData), { EX: 30 }); // cache empty in Redis
    return res.status(404).json({ message: "Student not found" });
  }

  // 4️⃣ Save real data in caches
  L1Cache.set(cacheKey, data, 60);
  await redis.set(cacheKey, JSON.stringify(data), { EX: 60 });

  res.json({ source: "DB", data });
});

module.exports = router;

🔹 How It Works

Check L1 → if hit, return

Check L2 Redis → if hit, return

Query DB → if exists, cache normally

If DB returns null → cache empty value temporarily (30 seconds)

Next request for the same wrong ID → hits cache, DB not queried

🔹 Real-Life Analogy

You ask for a non-existent book in a library

Library records “not found” for some time

Next person asking the same book → library quickly replies not found, warehouse not checked again

🔹 Interview Explanation

“To prevent cache penetration, we cache empty or null results for keys that do not exist. This ensures repeated requests for invalid IDs don’t hit the database and overload it.”
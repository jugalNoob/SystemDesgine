const shortid = require('shortid');
const Register = require('../../../model/student');
const redisClient = require('../../../Redis/redisClient');
const l1Cache = require("../cache");


const shortid = require("shortid");
const Register = require("../model/student");
const redisClient = require("../Redis/redisClient");
const l1Cache = require("../cache"); // Node-cache

async function socketHandler(req, res) {
  try {
    const { value, email } = req.body;

    if (!value || !email) {
      return res.status(400).json({
        success: false,
        message: "value and email are required",
      });
    }

    // ✅ Generate unique shortId
    const shortId = shortid.generate();

    // 1️⃣ Create the record object
    const newUser = {
      value,
      email,
      shortId,
      createdAt: Date.now(),
    };

    // 2️⃣ Increment version (used for cache key)
    const version = await redisClient.incr("students:version");
    const cacheKey = `students:list:v${version}:page:1`;

    // 3️⃣ Write to L2 Redis
    await redisClient.set(cacheKey, JSON.stringify([newUser]), "EX", 60);

    // 4️⃣ Write to L1 cache
    l1Cache.set(cacheKey, [newUser]);

    // 5️⃣ Flush L1 cache for safety
    // (optional: depends on whether you cache multiple keys)
    // l1Cache.flushAll();

    // 6️⃣ Async DB write (Write-Behind)
    setImmediate(async () => {
      try {
        await Register.create(newUser);
        console.log("✅ Write-Behind: DB updated");
      } catch (err) {
        console.error("❌ Write-Behind: DB write failed", err);
        // Optional: push failed write to queue for retry
      }
    });

    // 7️⃣ Respond to client immediately
    return res.status(201).json({
      success: true,
      message: "User created successfully (cached)",
      data: newUser,
      version,
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = socketHandler;



// 5️⃣ Key points

// ✅ L1 cache → super fast, per process (Node-cache)
// ✅ L2 cache → Redis, shared across Node instances
// ✅ Versioning → automatically invalidates old Redis cache
// ✅ Write-Behind → async DB writes, ultra-fast POST response
// ✅ TTL → short TTL in L1, longer TTL in Redis
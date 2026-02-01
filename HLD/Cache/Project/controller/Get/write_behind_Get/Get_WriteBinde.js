const Register = require("../model/student");
const redisClient = require("../Redis/redisClient");
const l1Cache = require("../cache"); // Node-cache

exports.getStudents = async (req, res) => {
  try {
    // 1️⃣ Read current version from Redis
    let version = await redisClient.get("students:version");
    if (!version) {
      version = "1"; // default if first time
      await redisClient.set("students:version", version);
    }

    // 2️⃣ Build cache key
    const cacheKey = `students:list:v${version}:page:1`;

    // 3️⃣ Check L1 cache first
    let cachedData = l1Cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        source: "L1 cache",
        data: cachedData,
      });
    }

    // 4️⃣ Check L2 Redis cache
    cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);

      // Populate L1 cache for next reads
      l1Cache.set(cacheKey, parsedData);

      return res.status(200).json({
        source: "Redis",
        data: parsedData,
      });
    }

    // 5️⃣ Fallback to DB (may lag if Write-Behind is used)
    const data = await Register.find();

    // Update caches for next requests
    await redisClient.set(cacheKey, JSON.stringify(data), "EX", 60);
    l1Cache.set(cacheKey, data);

    return res.status(200).json({
      source: "DB",
      data,
    });

  } catch (err) {
    console.error("❌ GET Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

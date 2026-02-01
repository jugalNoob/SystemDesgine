const Register = require("../model/student");
const redisClient = require("../Redis/redisClient");
const l1Cache = require("../cache"); // local cache
exports.GetIo = async (req, res) => {
  try {
    // 1️⃣ Read version from Redis
    let version = await redisClient.get("students:version");
    if (!version) {
      version = "1";
      await redisClient.set("students:version", version);
    }

    const currentETag = `v${version}`;

    // 🔥 ETag check (VERY FAST)
    const clientETag = req.headers["if-none-match"];
    if (clientETag === currentETag) {
      return res.status(304).end();
    }

    const cacheKey = `students:list:v${version}:page:1`;

    // 2️⃣ L1 cache
    let cachedData = l1Cache.get(cacheKey);
    if (cachedData) {
      return res
        .set("ETag", currentETag)
        .status(200)
        .json({ source: "L1 cache", data: cachedData });
    }

    // 3️⃣ L2 Redis
    cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      l1Cache.set(cacheKey, parsedData);

      return res
        .set("ETag", currentETag)
        .status(200)
        .json({ source: "Redis", data: parsedData });
    }

    // 4️⃣ DB fallback
    const data = await Register.find();

    await redisClient.set(cacheKey, JSON.stringify(data), "EX", 60);
    l1Cache.set(cacheKey, data);

    return res
      .set("ETag", currentETag)
      .status(200)
      .json({ source: "DB", data });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


// ✅ Explanation:

// First check L1 → super-fast, in-process

// Miss → check L2 Redis → distributed cache

// Miss → query DB, populate both L2 + L1
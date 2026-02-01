const Register = require('../../model/student');

const NodeCache = require("node-cache");

exports.GetIo = async (req, res) => {
  try {
    // 1️⃣ Read version (NO incr)
    let version = await redisClient.get("students:version");

    if (!version) {
      version = "1";
      await redisClient.set("students:version", version);
    }

    // 2️⃣ Build cache key
    const cacheKey = `students:list:v${version}:page:1`;

    // 3️⃣ Try Redis first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        source: "redis",
        data: JSON.parse(cachedData),
      });
    }

    // 4️⃣ DB fallback
    const data = await Register.find();

    // 5️⃣ Save to Redis (with TTL)
    await redisClient.set(
      cacheKey,
      JSON.stringify(data),
      "EX",
      60
    );

    res.status(200).json({
      source: "db",
      data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

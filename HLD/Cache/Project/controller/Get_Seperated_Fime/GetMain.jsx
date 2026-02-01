const Register = require("../models/student");
const redisClient = require("../cache/redisClient");
const { buildETag, isETagMatch } = require("../etag/etagHelper");
const { getFromCache, setCache } = require("../services/studentCache");

exports.GetIo = async (req, res) => {
  try {
    // 1️⃣ Get version
    let version = await redisClient.get("students:version");
    if (!version) {
      version = "1";
      await redisClient.set("students:version", version);
    }

    const currentETag = buildETag(version);

    // 2️⃣ ETag check (FASTEST PATH)
    const clientETag = req.headers["if-none-match"];
    if (isETagMatch(clientETag, currentETag)) {
      return res.status(304).end();
    }

    const cacheKey = `students:list:v${version}:page:1`;

    // 3️⃣ Cache lookup
    const cached = await getFromCache(cacheKey);
    if (cached) {
      return res
        .set("ETag", currentETag)
        .status(200)
        .json(cached);
    }

    // 4️⃣ DB fallback
    const data = await Register.find();

    await setCache(cacheKey, data);

    return res
      .set("ETag", currentETag)
      .status(200)
      .json({ source: "DB", data });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

import crypto from "crypto";

export const user_Get = asyncHandler(async (req, res) => {

  const cacheKey = "students:list";

  // 1️⃣ L1 Cache Check
  const l1Data = l1Cache.get(cacheKey);
  if (l1Data) {
    const etag = generateETag(l1Data);

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    return res
      .set("ETag", etag)
      .json({ source: "L1 cache", data: l1Data });
  }

  // 2️⃣ L2 (Redis) Cache Check
  const redisData = await redis.get(cacheKey);
  if (redisData) {
    const parsed = JSON.parse(redisData);

    l1Cache.set(cacheKey, parsed); // warm L1

    const etag = generateETag(parsed);

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    return res
      .set("ETag", etag)
      .json({ source: "redis", data: parsed });
  }

  // 3️⃣ DB Fallback
  const data = await Register.find({});

  await redis.set(cacheKey, JSON.stringify(data), { EX: 60 }); // 60 sec TTL
  l1Cache.set(cacheKey, data);

  const etag = generateETag(data);

  return res
    .set("ETag", etag)
    .json({ source: "db", data });
});


// 🔥 ETag generator
function generateETag(data) {
  return crypto
    .createHash("md5")
    .update(JSON.stringify(data))
    .digest("hex");
}
 
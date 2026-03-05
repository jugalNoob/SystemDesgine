import { asyncHandler } from '../../util/try-catch/try-catch.js';
import redis from '../../config/redis/redisClient.js'
import l1Cache  from '../../config/redis/CachL1.js'
// import  { getFromCache, setCache } from "../services/studentCache";
// ---------------->With Etage Use --------------------------->>
import {Register} from '../../model/Student.js'

export const user_Get = asyncHandler(async (req, res) => {




  // 1️⃣ Version (source of truth)
  let version = await redis.get("students:version");
  if (!version) {
    version = "1";
    await redis.set("students:version", version);
  }

  const cacheKey = `students:list:v${version}:page:1`;
  const etag = `"v${version}"`; // ETag MUST be quoted

  // 2️⃣ Client cache check
  if (req.headers["if-none-match"] === etag) {
    return res.status(304).end();
  }

  // 3️⃣ L1 cache
  const l1Data = l1Cache.get(cacheKey);
  if (l1Data) {
    return res
      .set("ETag", etag)
      .json({ source: "L1 cache", data: l1Data });
  }

  // 4️⃣ L2 cache
  const redisData = await redis.get(cacheKey);
  if (redisData) {
    const parsed = JSON.parse(redisData);

    l1Cache.set(cacheKey, parsed);

    return res
      .set("ETag", etag)
      .json({ source: "redis", data: parsed });
  }

  // 5️⃣ DB fallback
  const data = await Register.find({});

  await redis.set(cacheKey, JSON.stringify(data), "EX", 60);
  l1Cache.set(cacheKey, data);

  return res
    .set("ETag", etag)
    .json({ source: "db", data });
});


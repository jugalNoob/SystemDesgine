import {Register} from '../../model/Student.js'

import { generateETag } from "./Practies/Etag.js";

import Redlock from "redlock";

const redlock = new Redlock([redis], {
  retryCount: 3,        // retry 3 times if lock not acquired
  retryDelay: 100,      // wait 100ms between retries
  retryJitter: 50,      // random jitter to prevent thundering herd
});

export const user_Get = asyncHandler(async (req, res) => {
  const cacheKey = "students:list";

  // 1️⃣ L1 Cache Check
  const l1Data = l1Cache.get(cacheKey);
  if (l1Data !== undefined) {
    const etag = generateETag(l1Data);
    console.log("[Cache Hit] L1 cache", { cacheKey, etag });

    if (req.headers["if-none-match"] === etag) {
      console.log("[ETag] 304 Not Modified");
      return res.status(304).end();
    }

    return res
      .set("ETag", etag)
      .json({ source: "L1 cache", data: l1Data });
  }

  // 2️⃣ L2 Cache Check (Redis)
  const redisData = await redis.get(cacheKey);
  if (redisData !== null) {
    const parsed = JSON.parse(redisData);
    const ttl = 60 + Math.floor(Math.random() * 30);
    l1Cache.set(cacheKey, parsed, ttl);

    const etag = generateETag(parsed);
    console.log("[Cache Hit] Redis cache", { cacheKey, etag });

    if (req.headers["if-none-match"] === etag) {
      console.log("[ETag] 304 Not Modified");
      return res.status(304).end();
    }

    return res
      .set("ETag", etag)
      .json({ source: "Redis cache", data: parsed });
  }

  // 3️⃣ Acquire Redlock (Hot Key Protection)
  let lock;
  try {
    lock = await redlock.acquire([`lock:${cacheKey}`], 5000); // lock expires after 5s
    console.log("[Redlock] Acquired lock for key:", cacheKey);

    // Double-check Redis after acquiring lock
    const retryRedis = await redis.get(cacheKey);
    if (retryRedis) {
      const parsed = JSON.parse(retryRedis);
      const etag = generateETag(parsed);
      console.log("[Cache Hit after lock] Redis", { cacheKey, etag });
      return res
        .set("ETag", etag)
        .json({ source: "Redis-after-lock", data: parsed });
    }

    // 🔥 DB Fallback
    const startTime = Date.now();
    const data = await Register.find({});
    const dbTime = Date.now() - startTime;

    const finalData = data.length ? data : [];
    const etag = generateETag(finalData);

    console.log("[Cache Miss] DB query", { cacheKey, etag, dbTime: dbTime + "ms" });


    
    const ttl = 60 + Math.floor(Math.random() * 30);

    // Store in Redis and L1 cache
    await redis.set(cacheKey, JSON.stringify(finalData), "EX", ttl);
    l1Cache.set(cacheKey, finalData, ttl);

    return res
      .set("ETag", etag)
      .json({ source: "Database", data: finalData });
  } catch (err) {
    console.error("[Redlock] Failed to acquire lock:", err.message);
    return res.status(503).json({ message: "Server busy, try again" });
  } finally {
    if (lock) {
      try {
        await lock.release();
        console.log("[Redlock] Released lock for key:", cacheKey);
      } catch (releaseErr) {
        console.error("[Redlock] Failed to release lock:", releaseErr.message);
      }
    }
  }
});

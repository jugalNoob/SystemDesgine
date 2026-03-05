3️⃣ Redis Implementation (Distributed Counting)
import Redis from "ioredis";
const redis = new Redis();

async function slidingWindowCount(userId, limit, windowSec) {
  const key = `rate:${userId}`;
  const now = Date.now();

  // 1️⃣ Remove old requests
  await redis.zremrangebyscore(key, 0, now - windowSec * 1000);

  // 2️⃣ Count requests in current window
  const count = await redis.zcard(key);

  if (count < limit) {
    // 3️⃣ Allow request → add current timestamp
    await redis.zadd(key, now, now);
    await redis.expire(key, windowSec);
    return true; // allowed
  } else {
    return false; // rejected
  }
}


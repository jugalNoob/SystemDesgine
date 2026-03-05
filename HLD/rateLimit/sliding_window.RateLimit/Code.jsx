import Redis from "ioredis";
const redis = new Redis();

async function slidingWindowRateLimit(userId, limit, windowSizeSec) {
  const key = `rate:${userId}`;
  const now = Date.now();

  // Remove timestamps older than window
  await redis.zremrangebyscore(key, 0, now - windowSizeSec * 1000);

  // Count remaining requests
  const count = await redis.zcard(key);

  if (count < limit) {
    // Add current request
    await redis.zadd(key, now, now);
    await redis.expire(key, windowSizeSec);
    return true; // allow
  } else {
    return false; // reject
  }
}

// Example: 5 requests per 60s
slidingWindowRateLimit("user123", 5, 60);

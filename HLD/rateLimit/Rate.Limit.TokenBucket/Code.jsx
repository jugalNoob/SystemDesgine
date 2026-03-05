import Redis from "ioredis";

const redis = new Redis();

async function tokenBucket(key, capacity, refillRate) {
  const now = Date.now();
  const bucket = await redis.hgetall(key);

  let tokens = bucket.tokens ? parseFloat(bucket.tokens) : capacity;
  let lastRefill = bucket.lastRefill ? parseInt(bucket.lastRefill) : now;

  // Refill tokens
  const delta = (now - lastRefill) / 1000 * refillRate;
  tokens = Math.min(capacity, tokens + delta);
  lastRefill = now;

  if (tokens >= 1) {
    tokens -= 1;
    await redis.hmset(key, { tokens, lastRefill });
    return true; // allow
  } else {
    await redis.hmset(key, { tokens, lastRefill });
    return false; // reject
  }
}

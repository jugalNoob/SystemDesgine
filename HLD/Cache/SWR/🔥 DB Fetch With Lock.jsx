
🔥 DB Fetch With Lock (Prevents Stampede)

async function fetchWithLock(cacheKey, lockKey, FRESH_TTL, STALE_TTL) {
  const lock = await redis.set(lockKey, "1", "NX", "EX", 10);

  if (!lock) {
    // another request is fetching → wait briefly
    await new Promise(resolve => setTimeout(resolve, 100));
    const retry = await redis.get(cacheKey);
    if (retry) return JSON.parse(retry).data;
  }

  try {
    const data = await RegisterGet.find();

    const payload = {
      data,
      expiresAt: Date.now() + FRESH_TTL * 1000,
      staleUntil: Date.now() + STALE_TTL * 1000
    };

    await redis.set(cacheKey, JSON.stringify(payload), "EX", STALE_TTL);

    return data;
  } finally {
    await redis.del(lockKey);
  }
}

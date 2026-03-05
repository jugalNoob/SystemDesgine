async function refreshCacheInBackground(cacheKey, lockKey, FRESH_TTL, STALE_TTL) {
  const lock = await redis.set(lockKey, "1", "NX", "EX", 10);
  if (!lock) return;

  try {
    const data = await RegisterGet.find();

    const payload = {
      data,
      expiresAt: Date.now() + FRESH_TTL * 1000,
      staleUntil: Date.now() + STALE_TTL * 1000
    };

    await redis.set(cacheKey, JSON.stringify(payload), "EX", STALE_TTL);
  } catch (err) {
    console.error("Background refresh failed:", err);
  } finally {
    await redis.del(lockKey);
  }
}

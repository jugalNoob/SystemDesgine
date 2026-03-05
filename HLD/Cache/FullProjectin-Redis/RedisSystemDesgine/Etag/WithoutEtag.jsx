export const user_Get = asyncHandler(async (req, res) => {

  const cacheKey = "students:list";

  // 1️⃣ L1 Cache Check (In-Memory)
  const l1Data = l1Cache.get(cacheKey);
  if (l1Data) {
    return res.json({
      source: "L1 cache",
      data: l1Data
    });
  }

  // 2️⃣ L2 Cache Check (Redis)
  const redisData = await redis.get(cacheKey);
  if (redisData) {
    const parsed = JSON.parse(redisData);

    // Warm L1 cache
    l1Cache.set(cacheKey, parsed);

    return res.json({
      source: "Redis cache",
      data: parsed
    });
  }

  // 3️⃣ DB Fallback
  const data = await Register.find({});

  // Store in Redis with TTL
  await redis.set(cacheKey, JSON.stringify(data), { EX: 60 });

  // Store in L1
  l1Cache.set(cacheKey, data);

  return res.json({
    source: "Database",
    data
  });
});




🏆 Interview Explanation (Short)

If interviewer asks:

Why L1 + L2?

You say:

L1 → fastest (process memory)

L2 → shared across instances

DB → source of truth

TTL prevents stale forever

🚀 Next Level Question

Now I test you:

If you have 5 Node servers behind NGINX,

and one server updates cache,

Will other 4 servers' L1 update automatically?

👉 Answer? (This is system design level question)
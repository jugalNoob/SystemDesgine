🔥 FULL PRODUCTION VERSION

🔥 FULL PRODUCTION VERSION (L1 + L2 + SWR + Lock)

Replace your function with this:


export const ApigetQuearyAdavanceRedis = async (req, res) => {
  try {
    const cacheKey = "students:list";
    const lockKey = `lock:${cacheKey}`;

    const FRESH_TTL = 60;     // 1 min fresh
    const STALE_TTL = 300;    // 5 min stale window
    const L1_TTL = 60;

    let finalData;

    // 🔹 1️⃣ L1 Cache
    const l1Data = l1Cache.get(cacheKey);
    if (l1Data) {
      console.log("[L1] Cache Hit");
      finalData = l1Data;
    } else {
      console.log("[L1] Miss → Checking L2");

      const redisRaw = await redis.get(cacheKey);

      if (redisRaw) {
        const parsed = JSON.parse(redisRaw);
        const now = Date.now();

        // ✅ Fresh
        if (now < parsed.expiresAt) {
          console.log("[SWR] Fresh");
          finalData = parsed.data;
        }

        // ⚠️ Stale but allowed
        else if (now < parsed.staleUntil) {
          console.log("[SWR] Stale → Serve + Background Refresh");
          finalData = parsed.data;

          refreshCacheInBackground(cacheKey, lockKey, FRESH_TTL, STALE_TTL);
        }

        // ❌ Fully expired
        else {
          console.log("[SWR] Expired → Fetch DB");
          finalData = await fetchWithLock(cacheKey, lockKey, FRESH_TTL, STALE_TTL);
        }

      } else {
        console.log("[L2] Miss → Fetch DB");
        finalData = await fetchWithLock(cacheKey, lockKey, FRESH_TTL, STALE_TTL);
      }

      // 🔹 Update L1
      l1Cache.set(cacheKey, finalData, L1_TTL);
    }

    // 🔹 ETag
    const etag = generateETag(finalData);
    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    const jsonData = JSON.stringify(finalData);
    const acceptEncoding = req.headers["accept-encoding"] || "";

    if (acceptEncoding.includes("gzip")) {
      zlib.gzip(jsonData, (err, compressedData) => {
        if (err) return res.status(500).json({ error: "Compression failed" });

        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("ETag", etag);
        res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");

        res.status(200).send(compressedData);
      });
    } else {
      res.setHeader("ETag", etag);
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      res.status(200).json(finalData);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import zlib from "node:zlib";
import { RegisterGet } from "../model/student.js";
import { generateETag } from "./Practies/Etag.js";
import redis from "../config/redis.js";
import l1Cache from "../config/l1Cache.js";






export const ApigetQuearyAdavanceRedis = async (req, res) => {
  try {
    const cacheKey = "students:list";
    const ttl = 60; // L1 TTL (seconds)

    let finalData;

    // 🔹 1️⃣ L1 Cache Check (Memory)
    const l1Data = l1Cache.get(cacheKey);

    if (l1Data) {
      console.log("[L1] Cache Hit");
      finalData = l1Data;
    } else {
      console.log("[L1] Miss → Checking L2");

      // 🔹 2️⃣ L2 Cache Check (Redis)
      let redisData = await redis.get(cacheKey);

      if (redisData) {
        console.log("[L2] Cache Hit");
        finalData = JSON.parse(redisData);
      } else {
        console.log("[L2] Miss → Fetching DB");

        // 🔹 3️⃣ DB Fetch
        finalData = await RegisterGet.find();

        // 🔹 4️⃣ Update L2
        await redis.set(
          cacheKey,
          JSON.stringify(finalData),
          "EX",
          2000
        );
      }

      // 🔹 5️⃣ Update L1
      l1Cache.set(cacheKey, finalData, ttl);
    }

    // 🔹 6️⃣ Generate ETag
    const etag = generateETag(finalData);

    // 🔹 7️⃣ Compare ETag
    if (req.headers["if-none-match"] === etag) {
      console.log("[ETag] 304 Not Modified");
      return res.status(304).end();
    }

    const jsonData = JSON.stringify(finalData);
    const acceptEncoding = req.headers["accept-encoding"] || "";

    // 🔹 8️⃣ Gzip
    if (acceptEncoding.includes("gzip")) {
      zlib.gzip(jsonData, (err, compressedData) => {
        if (err) {
          return res.status(500).json({ error: "Compression failed" });
        }

        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("ETag", etag);
        res.setHeader("Cache-Control", "public, max-age=60");

        res.status(200).send(compressedData);
      });
    } else {
      res.setHeader("ETag", etag);
      res.setHeader("Cache-Control", "public, max-age=60");

      res.status(200).json(finalData);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

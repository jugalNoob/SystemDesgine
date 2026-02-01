🔹 Cache Stampede – Simple Explanation
🧠 What is it?

A Cache Stampede happens when many clients request the same
 cache key at the same time, and that key is missing or expired.

All requests hit the database at once.

Can overload DB → cause slowdowns or outages.

Think:

“Cache missed → 1000 users request same data → DB gets flooded.”

⚠️ Why is it important?

Prevents database overload

Ensures system reliability under high traffic

Essential for hot keys (popular data like trending products)

🔹 Example Scenario

Product page “iPhone” cache expires at 12:00

1000 users request page simultaneously

All 1000 hit DB → DB stress / downtime

🔹 How to Prevent Cache Stampede
1️⃣ Locking / Mutex

Only one request populates cache

Others wait or use stale cache

2️⃣ Randomized TTL

Spread expiration times → avoid all keys expiring at once

3️⃣ Request Coalescing

Queue similar requests

First request fetches DB → others wait

🔹 Simple Node.js + Redis Example (Locking)
const redis = require("redis");
const client = redis.createClient();

async function getProduct(productId) {
  const cacheKey = `product:${productId}`;

  // 1. Try cache
  let data = await client.get(cacheKey);
  if (data) return JSON.parse(data);

  // 2. Acquire lock to prevent stampede
  const lockKey = `lock:${productId}`;
  const lock = await client.set(lockKey, "locked", { NX: true, EX: 5 });
  
  if (!lock) {
    // Another request is populating cache, wait a bit
    await new Promise(r => setTimeout(r, 100));
    return getProduct(productId); // retry
  }

  // 3. Fetch from DB
  data = await db.getProduct(productId);

  // 4. Store in cache with TTL
  await client.set(cacheKey, JSON.stringify(data), { EX: 60 });

  // 5. Release lock
  await client.del(lockKey);

  return data;
}

✅ How it works

First request sets a lock in Redis

Other requests wait or retry

Only one request queries DB → cache is populated

Reduces DB load → prevents stampede

🔹 Interview Answer (Simple)

“Cache stampede happens when many clients request missing cache simultaneously, overloading the database.
We prevent it using locking, randomized TTL, or request coalescing.”

🧠 Quick Notes

Always important for hot keys (popular products, trending posts)

Combine TTL + locks for best reliability

Used in e-commerce, social media, ticketing apps

If you want, I can make a full “Caching pitfalls & solutions table” including:

Cache Stampede

Cache Penetration

Cache Avalanche

With simple Node.js + Redis patterns



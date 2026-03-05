🔹 Cache Penetration – Simple Explanation
🧠 What is it?

Cache Penetration happens when requests ask for data that doesn’t
 exist in cache or database.

Cache misses every time

Requests hit the database repeatedly

Can overload DB → potential downtime

Think:

“User requests a fake product ID → cache miss → DB 
queried → repeated fake requests overload DB.”

⚠️ Why is it important?

Protects the database from malicious or invalid requests

Ensures system reliability under heavy traffic

Important for APIs that accept arbitrary IDs or queries

🔹 Example Scenario

API: /product/:id

User requests ID 999999 → doesn’t exist

Cache miss → DB queried → repeated requests flood DB

🔹 How to Prevent Cache Penetration
1️⃣ Cache empty results

Store null or “not found” in cache with a short TTL

2️⃣ Validate input

Reject invalid IDs before hitting DB

3️⃣ Use Bloom Filter

Probabilistic structure to filter invalid requests

Very memory efficient for large key sets

🔹 Simple Node.js + Redis Example (Cache Empty Result)
const redis = require("redis");
const client = redis.createClient();

async function getProduct(productId) {
  const cacheKey = `product:${productId}`;

  // 1. Try cache
  let data = await client.get(cacheKey);
  if (data) return JSON.parse(data); // could be null too

  // 2. Validate input (optional)
  if (!isValidId(productId)) return null;

  // 3. Fetch from DB
  data = await db.getProduct(productId);

  // 4. Store result in cache (even if null) with short TTL
  await client.set(cacheKey, JSON.stringify(data || null), { EX: 30 });

  return data;
}

function isValidId(id) {
  return Number.isInteger(id) && id > 0;
}

✅ How it works

First time a non-existent key is requested → cached as null

Subsequent requests → cache hit, DB not queried

Protects DB from repeated fake requests

🔹 Interview Answer (Simple)

“Cache penetration happens when requests ask for data that doesn’t exist, causing repeated DB hits.
We prevent it by caching empty results, validating input, or using Bloom Filters.”

🔹 Quick Notes

Penetration = requests for invalid data

Stampede = too many requests on missing key

Avalanche = many keys expire at once → DB overload
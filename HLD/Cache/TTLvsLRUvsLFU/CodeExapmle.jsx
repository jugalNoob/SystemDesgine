🧹 Node.js + Redis Cache Example
1️⃣ Install Redis Client
npm install redis

2️⃣ Connect Redis
const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => console.log("✅ Redis connected"));
client.on("error", (err) => console.error("❌ Redis error:", err));

await client.connect();

3️⃣ TTL (Time-to-Live)
// Cache user data for 10 seconds
await client.set("user:1", JSON.stringify({ name: "Alice" }), {
  EX: 10 // TTL = 10 seconds
});

console.log("🕒 User cached with TTL 10s");

// After 10s, Redis automatically removes the key


✅ Auto-expire → good for frequently changing data

4️⃣ LRU (Least Recently Used)

Redis default eviction policy can be LRU when memory is full

// Configure in redis.conf or in code
// maxmemory 50mb
// maxmemory-policy allkeys-lru


When cache is full → Redis automatically deletes least recently used keys

Example: if user:1 was not accessed recently, it’s removed first

✅ No extra code needed

5️⃣ LFU (Least Frequently Used)

Similar to LRU but removes least accessed keys

// Configure in redis.conf or code
// maxmemory 50mb
// maxmemory-policy allkeys-lfu


Keys accessed less frequently → removed first when memory is full

✅ Good for “hot vs cold” data

6️⃣ Manual Invalidation
// Delete cache when DB updates
await client.del("user:1"); 
console.log("🗑 Cache manually invalidated");


Example: update user profile → delete cache → next read fetches fresh data from DB

// Update DB
const user = { name: "Alice Updated" }; 
// Then invalidate cache
await client.del("user:1"); 


✅ Gives full control, usually used with DB triggers or after writes

7️⃣ Full Flow Example (TTL + Manual)
async function getUser(userId) {
  // 1️⃣ Check cache
  let cachedUser = await client.get(`user:${userId}`);
  if (cachedUser) {
    console.log("📌 Cache hit");
    return JSON.parse(cachedUser);
  }

  // 2️⃣ If not in cache → fetch from DB (mocked)
  console.log("📌 Cache miss, fetching from DB");
  const userFromDB = { id: userId, name: "Alice" };

  // 3️⃣ Save to cache with TTL
  await client.set(`user:${userId}`, JSON.stringify(userFromDB), { EX: 10 });
  return userFromDB;
}

// Example usage
await getUser(1); // Cache miss → fetch + store
await getUser(1); // Cache hit → return cached

🔹 Summary – Simple



| Strategy | How it works                         | Node.js / Redis Example                |
| -------- | ------------------------------------ | -------------------------------------- |
| TTL      | Auto-delete after fixed time         | `client.set("key", value, { EX: 10 })` |
| LRU      | Remove least recently used when full | Redis `maxmemory-policy allkeys-lru`   |
| LFU      | Remove least accessed when full      | Redis `maxmemory-policy allkeys-lfu`   |
| Manual   | Delete cache on DB update            | `client.del("key")`                    |

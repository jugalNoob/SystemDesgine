Perfect! Let’s do a super simple Node.js + Redis example using SCAN ✅

This will show how to safely iterate cache keys.

1️⃣ Install Redis
npm install redis

2️⃣ Connect Redis
const redis = require("redis");
const client = redis.createClient();

client.on("connect", () => console.log("✅ Redis connected"));
client.on("error", (err) => console.error("❌ Redis error:", err));

await client.connect();

3️⃣ Add some sample cache keys
await client.set("user:1", "Alice");
await client.set("user:2", "Bob");
await client.set("post:1", "Hello World");
await client.set("post:2", "Redis SCAN");
console.log("💾 Sample keys added");

4️⃣ Use SCAN to find keys safely
let cursor = 0;

do {
  // Scan keys starting with "user:"
  const res = await client.scan(cursor, { MATCH: "user:*", COUNT: 2 });
  cursor = res.cursor;    // next cursor
  const keys = res.keys;  // keys returned
  console.log("Keys batch:", keys);

} while (cursor !== 0);


✅ Explanation:

MATCH → filter keys (like user:*)

COUNT → number of keys returned per batch

cursor → keep calling until 0 → all keys scanned

Safe for large caches → doesn’t block Redis

5️⃣ Delete keys manually using SCAN (optional)
cursor = 0;

do {
  const res = await client.scan(cursor, { MATCH: "user:*", COUNT: 2 });
  cursor = res.cursor;
  for (let key of res.keys) {
    await client.del(key);
    console.log("🗑 Deleted key:", key);
  }
} while (cursor !== 0);


Combines SCAN + Manual Invalidation

Good for cleaning stale cache without freezing Redis

✅ Summary – Simple

SCAN → iterate keys in batches

MATCH → filter keys

COUNT → batch size

Use with del() → clean cache safely
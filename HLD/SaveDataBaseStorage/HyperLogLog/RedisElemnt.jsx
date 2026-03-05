Add element:
PFADD key element

Get approximate count:
PFCOUNT key


🔥 Node.js Example
import Redis from "ioredis";

const redis = new Redis();

// Add unique user
await redis.pfadd("daily:visitors:2026-02-13", "user123");

// Get unique count
const count = await redis.pfcount("daily:visitors:2026-02-13");

console.log("Unique visitors:", count);


// SECOND Project  --------------------->>>


🔵 2️⃣ Using HyperLogLog (Redis)

HyperLogLog does NOT store actual users.

It only estimates count using hashing math.

📦 Install Redis Client
npm install ioredis

🟣 Simple HLL Code (Node.js)
import Redis from "ioredis";

const redis = new Redis();

async function run() {
  // Add users
  await redis.pfadd("daily:users", "user1");
  await redis.pfadd("daily:users", "user2");
  await redis.pfadd("daily:users", "user3");
  await redis.pfadd("daily:users", "user1"); // duplicate

  // Get unique count (approximate)
  const count = await redis.pfcount("daily:users");

  console.log("Unique Users (HLL):", count);
}

run();

✅ Output:
Unique Users (HLL): 3

🧠 What Is Happening Internally?

Instead of storing:

["user1", "user2", "user3"]


It stores:

Some mathematical hash pattern (12KB fixed memory)


Even if:

1 million users

100 million users

Memory stays ~12KB
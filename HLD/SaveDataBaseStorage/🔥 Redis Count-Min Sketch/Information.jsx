🔥 Redis Count-Min Sketch (CMS) Implementation

Redis supports Count-Min Sketch through the RedisBloom module (which includes Bloom, Cuckoo, CMS, TopK, etc.).

CMS = fast, fixed-memory, approximate frequency counter
Perfect for trending search, API hit counting, fraud attempts, etc.

🧠 Why Use Redis CMS Instead of Map?

If you track frequency like:

map["iphone"]++


❌ Memory grows with unique keys
❌ Not scalable in distributed system
❌ Hard to share across microservices

With Redis CMS:

✅ Fixed memory
✅ Distributed ready
✅ O(1) update
✅ Works with Kafka pipelines

📦 Step 1: Install RedisBloom

If using Docker:

docker run -p 6379:6379 redis/redis-stack


redis-stack includes RedisBloom module.

🔧 Step 2: Create a Count-Min Sketch
Command
CMS.INITBYDIM key width depth


Example:

CMS.INITBYDIM search:cms 2000 5


width = number of counters per row

depth = number of hash functions

More width → less error

More depth → higher confidence

➕ Step 3: Add Elements
CMS.INCRBY search:cms iphone 1
CMS.INCRBY search:cms iphone 1
CMS.INCRBY search:cms samsung 1

🔎 Step 4: Query Count
CMS.QUERY search:cms iphone samsung


Output:

2
1

🚀 Node.js Implementation

Install:

npm install redis

Example Code
import { createClient } from 'redis';

const client = createClient();
await client.connect();

// 1️⃣ Initialize CMS
await client.sendCommand([
  'CMS.INITBYDIM',
  'search:cms',
  '2000',
  '5'
]);

// 2️⃣ Increment counts
await client.sendCommand([
  'CMS.INCRBY',
  'search:cms',
  'iphone', '1',
  'iphone', '1',
  'samsung', '1'
]);

// 3️⃣ Query counts
const counts = await client.sendCommand([
  'CMS.QUERY',
  'search:cms',
  'iphone',
  'samsung'
]);

console.log("Counts:", counts);

await client.quit();

📊 Error Behavior

CMS guarantees:

Never underestimates

May slightly overestimate

Error ≈ width dependent
Confidence ≈ depth dependent

🏗 Production Architecture (Your Kafka System)

You are building:

User → Node API → Kafka → Analytics Service

Goal:

Track most searched keywords (100k/min)

Architecture:
Kafka Consumer
      ↓
Redis CMS
      ↓
TopK (Redis module)
      ↓
Dashboard API


CMS counts frequency
TopK finds trending items

🔥 Real Example: Trending Search System

User searches:

iphone
iphone
iphone
samsung
pixel


Flow:

API → CMS.INCRBY search:cms keyword 1


Dashboard:

CMS.QUERY search:cms iphone


Fast. Distributed. Scalable.

🏢 Companies Using Similar Techniques

Large-scale systems use similar frequency sketches:

Google → search trends

Twitter → trending topics

Facebook → content ranking

Cloudflare → traffic analysis

📊 CMS vs HyperLogLog




| Feature           | CMS | HyperLogLog |
| ----------------- | --- | ----------- |
| Counts frequency  | ✅   | ❌           |
| Counts unique     | ❌   | ✅           |
| Overestimates     | Yes | Approx      |
| Used for trending | ✅   | ❌           |




🎯 When To Use Redis CMS

✅ Trending keywords
✅ API rate analytics
✅ Fraud attempt tracking
✅ Login attempts per user
✅ Clickstream counting

❌ When NOT To Use

❌ Billing
❌ Exact financial reporting
❌ When exact count required

🧠 Interview One-Line Answer

Redis Count-Min Sketch is a probabilistic frequency estimation data structure provided by RedisBloom that allows fixed-memory, fast, approximate counting of high-volume streaming data.

🚀 Advanced Combo (Industry Pattern)

Best real-world pattern:

Stream → Redis CMS → Redis TopK → Redis Cache → API


CMS → count frequency
TopK → get trending
Cache → fast dashboard
🔥 Implement Real-Time Trending System (Easy Version)

We’ll build a simple system to detect trending hashtags / search terms in real time.

Think:

Twitter trends

YouTube trending searches

Zomato trending dishes

🧠 What Is “Trending”?

Trending means:

Items with highest frequency in a recent time window.

Example:

#nodejs → 1200 mentions
#react → 900 mentions
#ai → 5000 mentions  ← TRENDING

🔥 Simple Architecture (Beginner Friendly)
Client
   ↓
Node.js API
   ↓
Redis (Store counters)
   ↓
Trending API


We’ll use:

Node.js

Redis

🔵 Step 1: Install
npm init -y
npm install express redis

🔵 Step 2: Server Code
const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

const client = redis.createClient();
client.connect();

// User posts hashtag
app.post("/post", async (req, res) => {
  const { hashtag } = req.body;

  if (!hashtag) {
    return res.status(400).json({ error: "Hashtag required" });
  }

  // Increment counter
  await client.zIncrBy("trending", 1, hashtag);

  res.json({ message: "Hashtag recorded" });
});

// Get trending list
app.get("/trending", async (req, res) => {
  const trending = await client.zRangeWithScores(
    "trending",
    0,
    9,
    { REV: true }
  );

  res.json(trending);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

🧠 Why We Use Redis Sorted Set?

We use:

ZINCRBY
ZRANGE


Redis Sorted Set:

Stores (member, score)

Auto-sorted by score

Very fast O(log n)

Perfect for trending systems.

🔥 Example Usage
Add data:
POST /post
{
  "hashtag": "#nodejs"
}


Call multiple times.

Get trending:
GET /trending


Output:

[
  { value: "#ai", score: 50 },
  { value: "#nodejs", score: 30 }
]

🧠 How This Works

Every post:

ZINCRBY trending 1 #nodejs


Redis internally keeps sorted ranking.

🔥 Make It Real-Time (Auto Expire After 1 Hour)

If you want trending in last 1 hour only:

Instead of single key:

trending:2026-02-13:14


Create time-based keys and set TTL:

await client.expire(key, 3600);


Now trending resets automatically.

🏗 Scalable Architecture (Production Style)
Users
   ↓
Load Balancer
   ↓
Node.js Cluster
   ↓
Redis Cluster
   ↓
Kafka (optional for streaming)


For large scale like:

Twitter

YouTube

They combine:

Kafka

Stream processing

Sliding window aggregation

🔥 Interview Answer

If asked:

Design real-time trending system

You say:

Use Redis sorted sets

Increment counters on every event

Fetch top K using ZRANGE

Use TTL for sliding window

Scale with Redis cluster

That’s clean and practical.
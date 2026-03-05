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

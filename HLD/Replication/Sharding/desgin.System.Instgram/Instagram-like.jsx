1️⃣ Example: Social Media App (Instagram-like)
Problem

Millions of users uploading photos, following people,
 and reading feeds.

Example scale:

10M users
100k requests per second


One database cannot handle this load.

2️⃣ Solution: User-Based Sharding

Shard key:

userId


Data distribution:

Shard 1 → Users 1–1M
Shard 2 → Users 1M–2M
Shard 3 → Users 2M–3M
Shard 4 → Users 3M–4M


Every user’s data stays in one shard.

Example document:

{
  "userId": 204534,
  "name": "Alex",
  "posts": [],
  "followers": []
}

3️⃣ Architecture Flow
User App
   |
   v
API Servers
(Node.js)
   |
   v
Cache (Redis)
   |
   v
Database Router
(mongos)
   |
   +----------------+
   |                |
Shard 1         Shard 2
Users 1–1M      Users 1M–2M
   |                |
Shard 3         Shard 4
Users 2M–3M      Users 3M–4M


Technologies often used:

Node.js → API servers

Redis → caching

MongoDB → sharded database

Apache Kafka → event streaming

4️⃣ Example Request

User opens profile:

GET /user/204534


Steps:

API receives request

Cache checked first

Router calculates shard

Query goes to correct shard

Example:

userId 204534 → Shard 3


Only one shard queried, so it is fast.

5️⃣ Feed Generation Using Kafka

When user posts a photo:

User uploads photo
        |
        v
API server
        |
        v
Kafka event
        |
        v
Feed service updates followers


This avoids heavy database operations.

6️⃣ Why This Architecture Scales

Benefits:

Horizontal scaling
Even load distribution
Faster queries
Independent shard growth


Example:

Shard 1 → 1M users
Shard 2 → 1M users
Shard 3 → 1M users


When traffic grows:

Add Shard 5
Add Shard 6


No downtime required.

7️⃣ Common Interview Question

Q: What happens if one shard becomes overloaded?

Answer:

MongoDB automatically splits chunks
and rebalances data across shards.

8️⃣ Best Shard Key for Social Media

Most platforms use:

hashed(userId)


Command example in MongoDB:

sh.shardCollection("social.users", { userId: "hashed" })


This ensures even distribution across shards.

✅ Simple Interview Answer

Large platforms like Instagram shard data by userId. Each shard stores a subset of users. API servers route requests to the correct shard through a database router. This allows horizontal scaling and supports millions of users.

If you want, I can also show you a complete high-throughput architecture (100k requests/sec) using Node.js + Kafka + MongoDB sharding, which is a very strong system-design interview example.
Here is a high-throughput architecture (≈100k requests/sec) similar to systems used by large companies like Netflix, Uber, and Instagram. This kind of design is great for system-design interviews.

1️⃣ High-Throughput System Architecture
                Users / Mobile / Web
                         |
                         v
                      CDN
                         |
                         v
                   Load Balancer
                         |
                         v
                API Servers (Node.js)
                         |
        +----------------+----------------+
        |                                 |
        v                                 v
      Redis Cache                     Kafka Queue
        |                                 |
        v                                 v
   MongoDB Router (mongos)        Background Workers
        |                                 |
        +-----------+---------------------+
                    |
                    v
            MongoDB Sharded Cluster


Technologies used:

API → Node.js

Cache → Redis

Event streaming → Apache Kafka

Database → MongoDB

2️⃣ Request Flow
Step 1 — Client Request
User → GET /posts


Request goes through:

CDN → Load Balancer → API Server

Step 2 — Check Cache

API checks Redis.

Example:

cache: userFeed:2045


If found:

Return response immediately


Cache reduces database load by ~80%.

Step 3 — Query Database

If cache miss:

API → mongos router


Router determines shard using shard key.

Example shard key:

hashed(userId)


Then query goes to correct shard.

3️⃣ MongoDB Sharded Cluster

Example data distribution:

Shard 1 → Users 1–2M
Shard 2 → Users 2M–4M
Shard 3 → Users 4M–6M
Shard 4 → Users 6M–8M


Router:

mongos


Used in MongoDB sharding.

4️⃣ Kafka for Heavy Operations

When a user posts content:

POST /createPost


Flow:

User → API
      |
      v
   Save to DB
      |
      v
Publish Event → Kafka


Example event:

post_created


Consumers process:

Feed generation
Notifications
Analytics
Search indexing


Kafka tool:

Apache Kafka

5️⃣ Throughput Example

Example traffic:

100k requests/sec


Distribution:

10 API servers → 10k req/sec each
4 database shards → balanced load
Redis cache → 80% read reduction
Kafka → async processing

6️⃣ Why This Architecture Works

Benefits:

Horizontal scaling
High availability
Fault tolerance
Low latency


If traffic grows:

Add more API servers
Add more shards
Add more Kafka partitions


System continues scaling.

7️⃣ Example Node.js API (Simplified)
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const cached = await redis.get(id);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const user = await db.collection("users").findOne({ userId: id });

  await redis.set(id, JSON.stringify(user), "EX", 60);

  res.json(user);
});


API built with Node.js.

8️⃣ Best Shard Key in This Architecture

Best choice:

hashed(userId)


Why:

High cardinality
Even distribution
Fast lookups

9️⃣ Interview Summary

Strong answer:

To handle 100k requests per second, we use load balancers and horizontally scaled API servers. Redis caches frequent queries. MongoDB runs as a sharded cluster to distribute data across shards. Kafka handles asynchronous processing like notifications and feed generation.
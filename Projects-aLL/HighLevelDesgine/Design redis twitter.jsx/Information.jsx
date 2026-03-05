Love this 🔥 — this is a classic system design interview question.

Let’s design:

🚀 Design Twitter Using Redis (Scalable Architecture)

We’ll focus on:

Tweet storage strategy

Feed generation

Like/retweet counters

Followers system

Trending system

Scaling to millions of users

🎯 Step 1️⃣ Requirements
Functional:

Post tweet

Follow/unfollow

View timeline

Like / Retweet

Trending hashtags

Non-Functional:

Millions of users

Low latency (<100ms)

Highly available

Scalable

Eventually consistent acceptable

🏗 High-Level Architecture
Users
  ↓
API Gateway
  ↓
Stateless API Servers
  ↓
Redis Cluster (Hot Data)
  ↓
Distributed DB (Persistent Storage)


Redis = speed layer
DB = durable storage

🔥 1️⃣ Tweet Storage Design
Persistent Storage:

Store full tweet in database:

tweet_id
user_id
text
created_at

Redis:

Store minimal metadata only:

tweet:123 → {user_id, timestamp}


Or use Hash:

HSET tweet:123 user_id 45 timestamp 170000000


Avoid storing full large text in Redis at scale.

🔥 2️⃣ Follow System Design

Store followers:

followers:user:123 → SET


Store following:

following:user:123 → SET


Commands:

SADD followers:user:123 456
SADD following:user:456 123


Redis SET is perfect here.

🔥 3️⃣ Timeline (Most Important Part)

Two main strategies:

🟢 Option A: Fanout-on-Write (Fast Reads)

When user posts tweet:

Get all followers
Push tweet_id into their timeline


Timeline key:

timeline:user:456 → ZSET


Score = timestamp

ZADD timeline:user:456 170000000 tweet_123


Read timeline:

ZREVRANGE timeline:user:456 0 20


⚡ Very fast reads
⚠️ Heavy writes for celebrities

🟢 Option B: Fanout-on-Read (Better for Celebrities)

Store only:

tweets:user:123 → ZSET


When reading timeline:

Fetch tweets from all followed users

Merge at API level

⚡ Lower write cost
⚠️ Higher read cost

🔥 Real Twitter Strategy

Hybrid model:

Normal users → Fanout-on-write

Celebrities → Fanout-on-read

Threshold example:
If followers > 1M → switch strategy.

🔥 4️⃣ Like System

Key:

likes:tweet:123 → SET


Add like:

SADD likes:tweet:123 user456


Count:

SCARD likes:tweet:123


Or faster:

INCR tweet:123:like_count


Batch sync to DB every few seconds.

🔥 5️⃣ Retweet System

Use:

retweets:tweet:123 → SET


Or simply create new tweet referencing original.

🔥 6️⃣ Trending Hashtags

Use ZSET:

ZINCRBY trending:hashtags 1 #AI


Add decay:

score = (old_score * 0.9) + new_count


Periodic job:

Remove old hashtags

Recalculate ranking

🔥 7️⃣ Rate Limiting

Prevent spam:

INCR tweet_limit:user:123
EXPIRE 60


Limit tweets per minute.

🔥 8️⃣ Handling 1M+ RPS

Use:

Redis Cluster (sharded)

Read replicas

Pipelining

Connection pooling

Shard by user_id:

user_id % shard_count


Distributes load evenly.

🔥 9️⃣ Hot Key Problem

If Elon Musk tweets:

Millions of timeline updates happen.

Solution:

Switch to fanout-on-read

Cache only top 100 tweets

Use batching

🔥 🔟 Final Architecture Diagram
Users
  ↓
Load Balancer
  ↓
Stateless API Servers
  ↓
Redis Cluster (Sharded + Replicated)
  ↓
Distributed Database (Sharded)


Redis stores:

Timeline cache

Followers

Like counters

Trending

Rate limits

DB stores:

Permanent tweet data

📊 Scaling Example

If:

100M users

10M DAU

200M timeline reads/day

Redis handles:

~2300 reads/sec average


Peak much higher → cluster required.

🎯 Interview-Ready Explanation

“For Twitter design using Redis, I would use sorted sets to maintain per-user timelines, sets for followers and likes, and a hybrid fanout strategy to balance write and read load. Redis Cluster would be used for horizontal scaling with replicas for read-heavy workloads. Persistent data would be stored in a distributed database, while Redis acts as the high-speed access layer.”

🔥 That’s strong mid-to-senior level answer.

If you want next:

🔥 Design Twitter with Kafka + Redis

🔥 Deep dive into fanout tradeoffs

🔥 Multi-region Twitter architecture

🔥 Failure scenario (Redis crash) design

🔥 30-minute full mock interview simulation

Tell me your next level 🚀
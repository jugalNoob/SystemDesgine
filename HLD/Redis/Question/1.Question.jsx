🌐 Redis Q&A – From Basics to Advanced + System Design
1️⃣ Basics of Redis

Q1: What is Redis?
A: Redis is an in-memory, key-value database known for spee
d, low latency, and versatility.

Supports data structures like strings, hashes, lists, sets,
 sorted sets, bitmaps, streams, and hyperloglogs.

Commonly used for caching, session storage, message 
queues, leaderboards.

Q2: Difference between Redis and Memcached?


| Feature     | Redis                                                  | Memcached               |
| ----------- | ------------------------------------------------------ | ----------------------- |
| Data Types  | Strings, Lists, Sets, Sorted Sets, Hash, Streams, etc. | Strings only            |
| Persistence | ✅ AOF & RDB                                            | ❌ None (in-memory only) |
| Replication | ✅ Yes                                                  | ❌ No                    |
| Eviction    | ✅ LRU, LFU                                             | ✅ LRU                   |



Q3: How to connect Redis with Node.js?

const redis = require('redis');
const client = redis.createClient();
await client.connect();

await client.set('user:1', 'Alice');
const value = await client.get('user:1');
console.log(value); // Alice

2️⃣ Data Structures in Redis

Q4: Explain Redis Strings and use-cases

Simple key-value storage

Use-cases: caching API responses, JWT tokens, counters

Q5: Redis Hash

Stores field-value pairs under one key

Example: user profile

await client.hSet('user:1', { name: 'Alice', age: '25' });
const name = await client.hGet('user:1', 'name'); // Alice


Q6: Redis List

Ordered collection of strings

Use-case: task queues, timeline feeds

Commands: LPUSH, RPUSH, LPOP, RPOP

Q7: Redis Set

Unordered unique collection

Use-case: followers, tags, permissions

Q8: Redis Sorted Set (ZSet)

Set with score for automatic ordering

Use-case: leaderboards, trending items

Example:

await client.zAdd('leaderboard', [{ score: 100, value: 'Alice' }]);


Q9: Bitmaps & HyperLogLog

Bitmaps → Track boolean flags like online/offline

HyperLogLog → Approximate unique counts, like unique visitors


Q10: Redis Streams vs Pub/Sub


| Feature         | Streams                | Pub/Sub                  |
| --------------- | ---------------------- | ------------------------ |
| Persistence     | ✅ Durable              | ❌ Real-time only         |
| Consumer Groups | ✅ Yes                  | ❌ No                     |
| Use-case        | Job queues, event logs | Chat, live notifications |
| Replay          | ✅ Yes                  | ❌ No                     |




3️⃣ Advanced Redis Concepts

Q11: What is AOF and RDB?

AOF → Logs every write command, ensures durability, can replay data

RDB → Snapshot at intervals, faster recovery, not real-time

Q12: What is Redis Eviction?

When memory exceeds maxmemory, Redis removes keys based on policies: LRU, LFU, TTL, random

Q13: LRU vs LFU


| Policy | Meaning               | Use-case                   |
| ------ | --------------------- | -------------------------- |
| LRU    | Least Recently Used   | Cache with frequent reads  |
| LFU    | Least Frequently Used | Cache with stable hot keys |



Q14: Redis Cluster vs Sharding vs Replication


| Concept     | Description                                 |
| ----------- | ------------------------------------------- |
| Replication | Primary + replicas → read scaling, HA       |
| Sharding    | Split dataset across nodes → large datasets |
| Cluster     | Auto sharding + replication → scalable + HA |





Q15: Multi-AZ Deployment

Redis nodes across different availability zones

Ensures fault tolerance and disaster recovery

4️⃣ Redis System Design Questions

Q16: How would you design a real-time leaderboard using Redis?

Use ZSET for scores

Primary operations: ZADD, ZREVRANGE

Optional: Use replicas for read-heavy dashboards

Q17: How to design a scalable session store with Redis?

Use Redis strings or hashes for session data

Enable AOF or RDB for persistence

Use cluster + replication for HA & scalability

Q18: Design a real-time chat system using Redis

Pub/Sub for live message delivery

Streams for storing message history

Use consumer groups to allow multiple clients to process messages reliably

Q19: How to prevent cache stampede in Redis?

Techniques:

Cache aside pattern

Mutex locks → Only one request populates cache

TTL + jitter → Avoid all keys expiring simultaneously

Q20: How to handle millions of events per minute in Redis?

Use Streams + Consumer Groups for event processing

Sharded / Clustered Redis for horizontal scaling

AOF for durability if events are critical

5️⃣ Practical Node.js Example (Cluster + Streams + Pub/Sub)
const Redis = require('ioredis');
const cluster = new Redis.Cluster([
  { host: 'redis-node1', port: 6379 },
  { host: 'redis-node2', port: 6379 },
]);

// Streams - event queue
await cluster.xAdd('orders', '*', { orderId: '123', status: 'new' });

// Pub/Sub - real-time notification
cluster.publish('notifications', 'New Order Created');

// Leaderboard - ZSet
await cluster.zAdd('leaderboard', [{ score: 150, value: 'Alice' }]);


✅ Tips for Interviews:

Start from basic concepts (data types, cache vs database)

Then explain persistence, replication, clustering

Show system design examples: leaderboard, chat, event queues

Mention trade-offs (durability vs performance, LRU vs LFU, cluster vs sharding)
Perfect 🔥 This is advanced system design level.

Now we talk about:

🚀 Redis Distributed Semaphore
🧠 Why We Need It?

Normal semaphore (in-memory):

const semaphore = new Semaphore(10);


❌ Problem:

Works only in one Node.js instance

If you use cluster mode (8 workers) → each worker allows 10 → total = 80 ❌

Not safe in distributed systems

So we use:

👉 Redis as central coordination system

🏗 Architecture
Client
   ↓
Nginx
   ↓
Node.js (8 instances)
   ↓
Redis (Distributed Semaphore)
   ↓
MongoDB


Redis ensures:

Across all servers combined → only N concurrent executions allowed.

🧩 How Redis Distributed Semaphore Works

We use:

SETNX

INCR

DECR

EXPIRE

Lua script (atomic operations)

There are 2 common approaches:

Counter-based semaphore

Sorted-set (ZSET) based semaphore (better)

✅ Method 1: Counter Based Semaphore (Simple Version)
Concept

We maintain a counter in Redis:

Key: semaphore:db
Value: current_active_requests


If value < limit → allow
Else → reject or wait

🔥 Implementation (Node.js + Redis)
import Redis from "ioredis";

const redis = new Redis();
const LIMIT = 10;
const SEM_KEY = "semaphore:db";

async function acquire() {
  const count = await redis.incr(SEM_KEY);

  if (count > LIMIT) {
    await redis.decr(SEM_KEY);
    return false;
  }

  return true;
}

async function release() {
  await redis.decr(SEM_KEY);
}

Usage
app.get("/users", async (req, res) => {
  const allowed = await acquire();

  if (!allowed) {
    return res.status(503).send("Server Busy");
  }

  try {
    const users = await User.find();
    res.json(users);
  } finally {
    await release();
  }
});

🚨 Problem With Counter Method

If server crashes before release():

❌ Counter never decreases
❌ Semaphore stuck
❌ Deadlock

So we need expiry.

✅ Method 2: ZSET Based Distributed Semaphore (Production Level)

This is safer.

Idea:

Each request:

Generates unique ID

Adds to Redis sorted set

Score = timestamp

If rank < limit → allowed

Also:

Remove expired entries (TTL safety)

🔥 Production Safe Version (With Expiry)
import { v4 as uuidv4 } from "uuid";

const LIMIT = 10;
const SEM_KEY = "semaphore:zset";
const TIMEOUT = 5000;

async function acquire() {
  const id = uuidv4();
  const now = Date.now();

  const multi = redis.multi();

  multi.zremrangebyscore(SEM_KEY, 0, now - TIMEOUT);
  multi.zadd(SEM_KEY, now, id);
  multi.zrank(SEM_KEY, id);

  const results = await multi.exec();
  const rank = results[2][1];

  if (rank < LIMIT) {
    return id;
  }

  await redis.zrem(SEM_KEY, id);
  return null;
}

async function release(id) {
  await redis.zrem(SEM_KEY, id);
}

Why This Is Better?

✅ No deadlock
✅ Auto cleanup expired locks
✅ Crash safe
✅ Works across cluster
✅ Industry pattern

🔥 Real Production Pattern (Advanced)

In companies like:

Netflix

Amazon

They combine:


| Layer           | Purpose                       |
| --------------- | ----------------------------- |
| Nginx           | Basic rate limit              |
| API Gateway     | Global rate limit             |
| Redis           | Distributed semaphore         |
| Circuit Breaker | Dependency failure protection |
| Autoscaling     | Increase pods                 |



🧠 When To Use Distributed Semaphore?

Use it when:

DB connection pool is limited

External API has concurrency limit

Email sending limit

Kafka consumer concurrency control

Payment processing limit

🆚 Rate Limit vs Distributed 

Semaphore| Feature   | Rate Limit         | Distributed Semaphore |
| --------- | ------------------ | --------------------- |
| Controls  | Requests per time  | Concurrent execution  |
| Redis Key | Counter per window | ZSET or counter       |
| Use Case  | Traffic spikes     | Resource safety       |

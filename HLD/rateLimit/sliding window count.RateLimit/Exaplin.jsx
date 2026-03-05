Ah! You want to focus specifically on how Sliding Window “counts” requests for rate limiting — the core mechanism. Let’s break it down carefully. 🔥

🧠 Sliding Window Counting Explained

The main idea:

Instead of just counting requests in a fixed time window, Sliding Window counts all requests in the last X seconds dynamically.

1️⃣ How the Counting Works

Store timestamps of requests

Each request stores its timestamp somewhere (memory, Redis, or DB).

Example: Redis Sorted Set is perfect for distributed systems:

ZADD key timestamp timestamp


When a new request arrives

Remove old timestamps outside the window:

ZREMRANGEBYSCORE key 0 now - window_size_in_ms


Count remaining requests:

ZCARD key  -> number of requests in sliding window


Decision

If count < limit → allow request → add current timestamp

If count >= limit → reject request

2️⃣ Example Timeline

Assume:

Window size: 60 seconds

Limit: 5 requests

Request timestamps (seconds):

t = 0, 10, 20, 50, 59


New request at t = 61:

Remove timestamps < 61-60=1 → remove t=0

Remaining timestamps: 10, 20, 50, 59 → count = 4

Allow request → count = 5

New request at t = 62:

Remove timestamps < 62-60=2 → remove t=10

Remaining timestamps: 20, 50, 59, 61 → count = 4

Allow request → count = 5

✅ Smooth, no sudden bursts at window edges.

3️⃣ Redis Implementation (Distributed Counting)
import Redis from "ioredis";
const redis = new Redis();

async function slidingWindowCount(userId, limit, windowSec) {
  const key = `rate:${userId}`;
  const now = Date.now();

  // 1️⃣ Remove old requests
  await redis.zremrangebyscore(key, 0, now - windowSec * 1000);

  // 2️⃣ Count requests in current window
  const count = await redis.zcard(key);

  if (count < limit) {
    // 3️⃣ Allow request → add current timestamp
    await redis.zadd(key, now, now);
    await redis.expire(key, windowSec);
    return true; // allowed
  } else {
    return false; // rejected
  }
}


ZADD → Add request timestamp

ZREMRANGEBYSCORE → Remove expired timestamps

ZCARD → Count requests in the sliding window

4️⃣ Advantages of Counting via Sliding Window

Accurate rate limiting → avoids edge burst problem of Fixed Window

Distributed-friendly → Redis allows multiple servers to share counters

Dynamic → constantly moves forward as requests arrive

5️⃣ When to Use

APIs where precise limits matter (login, signup, OTP)

Preventing brute-force attacks

Anywhere you want smooth rolling limits, not just fixed blocks

✅ Key takeaway:

Sliding Window counts by storing timestamps and always counting the number of requests in the last window_size seconds.
This is what gives it precision and avoids bursts at window edges.
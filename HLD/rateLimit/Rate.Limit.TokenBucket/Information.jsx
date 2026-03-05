🧠 1️⃣ What is Rate Limiting?

Rate limiting is a technique to control how many requests a client/user/service can make in a given time window.

Prevent abuse (DDoS, spam, bots)

Protect downstream systems (databases, APIs)

Ensure fair usage

🟢 2️⃣ Token Bucket Algorithm

One of the most popular rate-limiting algorithms is Token Bucket.

Concept:

Imagine a bucket that holds tokens.

Each request consumes 1 token.

Tokens are refilled at a fixed rate.

If the bucket is empty → request is rejected or queued.

How it Works (Step-by-Step)

1️⃣ Define bucket parameters:

capacity = 10 tokens
refill_rate = 1 token per second


2️⃣ When a request comes:

If bucket has ≥ 1 token → allow request → remove 1 token

If bucket empty → reject request

3️⃣ Tokens refill over time:

Every second → 1 token added (up to max capacity)

Example

Capacity = 5 tokens

Refill rate = 1 token/sec

t=0s: 5 tokens → 5 requests allowed
t=1s: refill 1 token → 1 request allowed
t=2s: refill 1 token → 1 request allowed
t=3s: refill 1 token → 1 request allowed


Bursts allowed (up to bucket capacity)
Sustained rate limited to refill rate

🔹 3️⃣ When to Use Token Bucket?

Token Bucket is ideal when:

You want to allow bursts

But limit sustained traffic

E.g., APIs that are hit sporadically, but occasional spikes happen

🟡 4️⃣ Compare With Fixed Window

Fixed Window: limit per fixed time unit (e.g., 100 requests/min)

Problem: spikes at window edges → can exceed limit

Token Bucket: smooth burst handling

🔹 5️⃣ Projects / Use Cases
1️⃣ Public APIs

Rate-limit external users: 1000 requests/hour

Allow short bursts → smooth traffic

2️⃣ Login / OTP Systems

Limit: 5 OTP requests per hour per user

Prevent brute force attacks

3️⃣ Messaging / Notifications

Limit: max 50 emails per minute per service

Avoid getting blacklisted by email provider

4️⃣ Microservices / Kafka Consumers

Limit how fast a consumer reads messages

Avoid overloading downstream DB or service




🟡 4️⃣ Compare With Fixed Window

Fixed Window: limit per fixed time unit (e.g., 100 requests/min)

Problem: spikes at window edges → can exceed limit

Token Bucket: smooth burst handling

🔹 5️⃣ Projects / Use Cases


1️⃣ Public APIs

Rate-limit external users: 1000 requests/hour

Allow short bursts → smooth traffic

2️⃣ Login / OTP Systems

Limit: 5 OTP requests per hour per user

Prevent brute force attacks

3️⃣ Messaging / Notifications

Limit: max 50 emails per minute per service

Avoid getting blacklisted by email provider

4️⃣ Microservices / Kafka Consumers

Limit how fast a consumer reads messages

Avoid overloading downstream DB or service

🔹 6️⃣ Example Implementation (Node.js + Redis)
import Redis from "ioredis";

const redis = new Redis();

async function tokenBucket(key, capacity, refillRate) {
  const now = Date.now();
  const bucket = await redis.hgetall(key);

  let tokens = bucket.tokens ? parseFloat(bucket.tokens) : capacity;
  let lastRefill = bucket.lastRefill ? parseInt(bucket.lastRefill) : now;

  // Refill tokens
  const delta = (now - lastRefill) / 1000 * refillRate;
  tokens = Math.min(capacity, tokens + delta);
  lastRefill = now;

  if (tokens >= 1) {
    tokens -= 1;
    await redis.hmset(key, { tokens, lastRefill });
    return true; // allow
  } else {
    await redis.hmset(key, { tokens, lastRefill });
    return false; // reject
  }
}



key = userId or IP

capacity = burst limit

refillRate = sustained rate

🔹 7️⃣ Interview-Level Explanation

If asked:

What is Token Bucket and why use it?

Answer:

Token Bucket is a rate-limiting algorithm that allows a system to handle bursts while limiting sustained request rates. Tokens accumulate over time, each request consumes a token, and requests are rejected if no token is available. This is ideal for APIs, login systems, messaging services, and distributed microservices to prevent abuse or overload.

⚡ 8️⃣ Quick Comparison Table


| Algorithm      | Burst Allowed | Best Use Case                       |
| -------------- | ------------- | ----------------------------------- |
| Fixed Window   | ❌             | Simple per-minute limits            |
| Sliding Window | ✅             | Smooth rate limiting                |
| Token Bucket   | ✅             | Allow bursts + limit sustained rate |
| Leaky Bucket   | ✅             | Smooth out traffic at constant rate |


🧠 1️⃣ What is Fixed Window Rate Limiting?

Fixed Window limits the number of requests per fixed time window.

Example: 100 requests per minute per user

Count resets at the end of each time window

🟢 2️⃣ How It Works (Step by Step)

1️⃣ Define parameters:

window_size = 60 seconds
limit = 100 requests per window


2️⃣ Track request count per user:

requests[userId] = current_count


3️⃣ When a request arrives:

If count < limit → allow → increment count

If count >= limit → reject

Reset count when the window ends

Example

Limit = 5 requests per minute

t=0s → 5 requests allowed
t=30s → 6th request → rejected
t=60s → window resets
t=61s → requests allowed again

🔹 3️⃣ Key Points

Simple to implement (good for small systems)

Counts reset at fixed window boundaries

Problem: Spike at window edges

Window Edge Problem:

Limit = 100 requests/min

User sends 100 requests at 59th second + 100 at 0th second → effectively 200 requests in 2 seconds

🟡 4️⃣ When to Use Fixed Window

Good for:

1️⃣ Simple API rate limiting:

Small internal API

Admin endpoints

Non-critical features

2️⃣ Projects where slight burst is acceptable:

Analytics logging

Metrics collection

Free-tier API quotas

3️⃣ Temporary throttling:

Quick throttling rules (not mission-critical)

🔹 5️⃣ Node.js Example
const requests = {};

function fixedWindowRateLimit(userId, limit, windowSizeMs) {
  const now = Date.now();

  if (!requests[userId]) {
    requests[userId] = { count: 1, windowStart: now };
    return true;
  }

  const user = requests[userId];

  if (now - user.windowStart < windowSizeMs) {
    if (user.count < limit) {
      user.count += 1;
      return true; // allow
    } else {
      return false; // reject
    }
  } else {
    // Reset window
    requests[userId] = { count: 1, windowStart: now };
    return true;
  }
}

// Usage: limit = 5, window = 60s
fixedWindowRateLimit("user123", 5, 60000);

🔹 6️⃣ Fixed Window vs Other Algorithms


| Feature           | Fixed Window      | Token Bucket       | Leaky Bucket       |
| ----------------- | ----------------- | ------------------ | ------------------ |
| Allows bursts     | ❌ No              | ✅ Yes              | ❌ No               |
| Smooth rate       | ❌ No              | ✅ Yes              | ✅ Yes              |
| Easy to implement | ✅ Very simple     | ❌ Slightly complex | ❌ Slightly complex |
| Best use case     | Non-critical APIs | Bursty APIs        | Critical systems   |


🔹 7️⃣ Real Projects / Use Cases



| Project / Scenario                       | Why Fixed Window                 |
| ---------------------------------------- | -------------------------------- |
| Free-tier API quota                      | Simple, resets every month/hour  |
| Metrics logging                          | Allow large spikes, non-critical |
| Temporary throttling for admin endpoints | Easy to implement                |
| Analytics / IoT non-critical endpoints   | Simple rate limit suffices       |


🟢 8️⃣ Interview-Level Answer

If asked:

What is Fixed Window Rate Limiting and when do you use it?

Answer:

Fixed Window limits the number of requests per user in a fixed time window. It’s easy to implement and works well for non-critical APIs, logging, or admin endpoints. However, it can allow bursts at window edges, unlike Token Bucket or Leaky Bucket which handle bursts or smooth traffic.

💡 Rule of Thumb for Interviewers:

Token Bucket → burst allowed, sustained rate

Leaky Bucket → smooth, constant rate

Fixed Window → simple, occasional burst acceptable
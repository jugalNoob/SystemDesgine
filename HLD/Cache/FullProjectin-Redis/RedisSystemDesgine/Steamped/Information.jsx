Good 🔥 this is very important system design topic.

You’re building L1 + L2 caching already, so now let’s level up.

🔴 What is Cache Stampede?
Simple Meaning:

When many requests hit at same time
and the cache expires,
all requests go to database at once.

👉 DB becomes overloaded
👉 System slows or crashes

This is called:

🔥 Cache Stampede

🧠 Real Example

Imagine:

Redis key TTL = 60 seconds

10,000 users request /students

At second 60 → cache expires

Now:

All 10,000 requests → DB at same time ❌


DB receives sudden spike.

This is stampede.

🟢 What is Redis?

Before protection, quick meaning:

Redis is an in-memory data store used as cache, message broker, and fast key-value storage.

It is:

Super fast (RAM)

Used for caching

Used for sessions

Used for rate limiting

Used for distributed locks

🔥 Cache Stampede Protection (Without Code)

Now important part.

There are 5 main techniques used in real companies.

1️⃣ Mutex Lock (Most Common)

👉 Only ONE request is allowed to rebuild cache.
Others must wait.

Flow:

Request 1 → Cache expired → gets LOCK → goes to DB → rebuilds cache
Request 2 → sees LOCK → waits
Request 3 → sees LOCK → waits


After cache is rebuilt → all get data from cache.

✅ Prevents DB overload
Used in big systems

2️⃣ Set Random Expiry (Jitter)

Instead of:

TTL = 60 seconds


Use:

TTL = 60 + random(0–10)


So all keys don’t expire at same time.

This prevents traffic spike.

Very common technique.

3️⃣ Background Cache Refresh (Pro Technique)

Before cache expires:

Background worker refreshes cache

Users never see empty cache

Example:

TTL = 60

At 55 sec → refresh in background

Used in high-scale systems.

4️⃣ Stale-While-Revalidate

If cache expired:

Serve OLD data temporarily

Rebuild cache in background

User gets fast response
DB doesn’t get overloaded

Very modern strategy.

5️⃣ Rate Limiting

If too many requests:

Limit incoming traffic

Protect database

Often combined with Redis.

🏆 Interview-Level Explanation

If interviewer asks:

How do you prevent cache stampede?

You say:

"I use distributed locking in Redis so only one request rebuilds cache, others wait. Additionally, I add TTL jitter and background refresh to avoid simultaneous expiration spikes."

🔥 That answer is senior-level.

🚀 Now System Design Thinking

If you have:

10 Node servers

1 Redis

1 MongoDB

Which method is best?

👉 Correct Answer:

Distributed Lock in Redis

Because L1 lock won’t work across servers.
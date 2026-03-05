
Excellent 🔥 this is a real production caching problem.

You’re describing:


1:: GET API uses Redis cache

2:: After POST (create new user) → GET still returns old data

3:: Because Redis cache did not expire

✅ This is called cache invalidation problem.

One of the hardest problems in system design 😄

🎯 Why This Happens

Flow:

.. User calls GET

.. Data stored in Redis (cached)

.. User creates new POST

.. DB updated

.. Redis still contains old cached data

.. GET returns stale data

Because:

👉 Redis doesn’t automatically know your DB changed.

🔥 Proper Solutions (Production Patterns)

You have 3 main strategies:


✅ 1️⃣ Cache Invalidation (Recommended)

After POST success:

👉 Delete the Redis key used in GET

Example:

await redis.del("users:list");


So next GET:

Cache miss

Fetch fresh DB data

Set cache again




✅ 2️⃣ Versioning Strategy (Advanced & Better)

Instead of deleting cache:

You increment a version number.

Example:

users:list:v1
users:list:v2


When POST happens:

await redis.incr("users:version");


GET API uses:

const version = await redis.get("users:version") || 1;
const cacheKey = `users:list:v${version}`;


Now old cache is ignored automatically.

This is very scalable.

✅ 3️⃣ TTL (Expiration Time)

Set expiry:

await redis.set("users:list", data, { EX: 60 });


Cache auto-expires after 60 seconds.


⚠️ But TTL alone is not perfect for real-time systems.

🧠 Interview-Level Answer

If interviewer asks:

How do you handle cache consistency?

Answer:

I use cache invalidation or versioning strategy to ensure stale data is 
not served after write operations.

That’s a strong system design answer.

🚀 Production Best Practice

Most companies use:

Write → invalidate cache

Read → cache aside pattern

This is called:

🏆 Cache Aside Pattern

Flow:

GET:

Check cache

If miss → fetch DB

Store in cache

Return response

POST/PUT/DELETE:

Update DB

Invalidate cache

⚠️ Important Note

Never rely only on TTL in critical systems.

Example:

Ecommerce stock

Banking data

Order management

Must invalidate immediately.
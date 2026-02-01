
2️⃣ Caching/

Purpose: Improve response times and reduce load on the main DB.

Include:

Redis and in-memory caching (Node.js + Redis code)

Cache invalidation strategies (LRU, LFU, TTL)

Query-level vs application-level caching

Write-through vs write-behind caches

Example: Cached product search results



🧠 2️⃣ CACHING
🏁 Purpose

Caching temporarily stores frequently accessed data in faster storage (like memory) to:

Reduce latency and improve response time

Decrease load on databases or APIs

Handle higher read throughput

Improve scalability and fault tolerance



⚙️ Types of Caching

| Type                        | Description                                                                    | Example Tools                      |
| --------------------------- | ------------------------------------------------------------------------------ | ---------------------------------- |
| **In-memory cache**         | Data stored in local process memory (RAM). Fastest access but lost on restart. | `Map()`, `node-cache`, `lru-cache` |
| **Distributed cache**       | Data stored in external cache accessible by multiple servers.                  | `Redis`, `Memcached`               |
| **Application-level cache** | Stored in the app process (e.g., cached query results).                        | Node.js memory store               |
| **Database-level cache**    | DB engines like MySQL/Postgres have query caching internally.                  | MySQL query cache                  |
| **CDN caching**             | Edge caching for static assets (HTML, CSS, JS, images).                        | Cloudflare, Akamai                 |
| **Browser caching**         | Uses `Cache-Control`, `ETag` headers to store assets.                          | Client-side cache                  |


🧩 Common Caching Strategies


| Strategy                           | Description                                                                  | Use Case                      |
| ---------------------------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Read-Through Cache**             | App reads data via cache; if not found, cache fetches from DB and stores it. | Product search, user profiles |
| **Write-Through Cache**            | Writes go to cache first, then DB.                                           | Real-time dashboards          |
| **Write-Behind (Write-Back)**      | Writes go to cache and are asynchronously persisted to DB.                   | High-write scenarios          |
| **Cache-Aside (Lazy Loading)**     | App checks cache first, loads from DB if missing, and updates cache.         | Most common in web APIs       |
| **TTL-Based Cache (Time-To-Live)** | Each key expires after a set time.                                           | News feeds, search results    |



🧹 Cache Invalidation Strategies

Keeping the cache fresh and accurate is the hardest part of caching.


| Strategy                        | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| **TTL (Time-to-Live)**          | Automatically expires after a fixed duration.       |
| **LRU (Least Recently Used)**   | Removes least recently accessed data when full.     |
| **LFU (Least Frequently Used)** | Removes least accessed (by count) data when full.   |
| **Manual Invalidation**         | Manually delete cache when underlying data changes. |


🔍 Query-Level vs Application-Level Caching

| Level                 | Example                          | When to Use                                                 |
| --------------------- | -------------------------------- | ----------------------------------------------------------- |
| **Query-Level**       | Cache a specific DB query result | e.g., Cache `SELECT * FROM products WHERE category='shoes'` |
| **Application-Level** | Cache complex computed responses | e.g., Cache aggregated API responses or transformed data    |




💻 Node.js + Redis Example: Cached Product Search

Let’s simulate a product search API that caches query results in Redis.

🧱 Setup

Install dependencies:

npm install express redis

🧩 server.js
const express = require('express');
const { createClient } = require('redis');
const app = express();
const PORT = 3000;

// Create Redis client
const redisClient = createClient();
redisClient.connect();

// Simulated DB query (slow)
async function getProductsFromDB(category) {
  console.log('Fetching from DB...');
  return [
    { id: 1, name: 'Nike Air Zoom', category },
    { id: 2, name: 'Adidas Ultraboost', category },
  ];
}

// Cache middleware
async function cache(req, res, next) {
  const { category } = req.query;
  const cacheKey = `products:${category}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log('Serving from cache');
    return res.json(JSON.parse(cached));
  }
  next();
}

// API route with caching
app.get('/products', cache, async (req, res) => {
  const { category } = req.query;
  const cacheKey = `products:${category}`;

  const data = await getProductsFromDB(category);

  // Store in cache with TTL = 30 seconds
  await redisClient.setEx(cacheKey, 30, JSON.stringify(data));

  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


✅ Flow

User requests /products?category=shoes

Cache checked → if miss → DB query runs → data stored in Redis

Next call within 30 seconds → served directly from Redis

⚡ Advanced: Write-Through Cache Example
app.post('/products', async (req, res) => {
  const product = req.body;

  // Write to DB
  const saved = await saveToDB(product);

  // Write to cache
  const cacheKey = `products:${product.category}`;
  await redisClient.del(cacheKey); // invalidate related cache

  res.json(saved);
});


🧠 When data changes (write/delete), always invalidate or update the cache.

🧮 Cache Metrics to Monitor


| Metric           | Why It Matters                       |
| ---------------- | ------------------------------------ |
| **Hit Ratio**    | Higher means better cache efficiency |
| **Miss Ratio**   | Indicates DB load                    |
| **Evictions**    | Tracks how often data is removed     |
| **Latency**      | Redis/Memory read-write speed        |
| **Memory Usage** | Prevent OOM (Out Of Memory) errors   |


🧠 Real-World Examples

| Use Case                       | Cache Type         | Description                           |
| ------------------------------ | ------------------ | ------------------------------------- |
| **Product Search (eCommerce)** | Redis TTL cache    | Cache category/product search results |
| **User Profile Lookup**        | Read-through cache | Store user details for quick auth     |
| **Leaderboards / Analytics**   | Write-behind cache | Keep fast scoreboard updates          |
| **API Rate Limiting**          | Redis counters     | Track user hits                       |
| **Session Management**         | Redis store        | Manage login sessions                 |
| **Feed Systems**               | TTL cache          | Cache newsfeeds, posts, etc.          |


🔗 Cache Hierarchy (Layered Caching)
Browser Cache (static assets)
        ↓
CDN Cache (HTML, CSS, images)
        ↓
Application Cache (Redis)
        ↓
Database (source of truth)


Each layer reduces load on the next one.

🚀 Best Practices

✅ Choose cache key patterns carefully (e.g., user:{id}:profile)

✅ Set TTLs to avoid stale data

✅ Invalidate cache after updates/deletes

✅ Monitor hit/miss ratios

✅ Avoid over-caching dynamic or user-specific data

✅ Use cluster mode in Redis for scalability


| Concept        | Description                                  |
| -------------- | -------------------------------------------- |
| **Goal**       | Speed up reads, reduce DB load               |
| **Tech**       | Redis, Memcached, In-memory                  |
| **Strategies** | Read-through, Write-through, Cache-aside     |
| **Eviction**   | TTL, LRU, LFU                                |
| **Example**    | Product search caching                       |
| **Level**      | Query-level or Application-level             |
| **Challenges** | Cache invalidation and stale data management |

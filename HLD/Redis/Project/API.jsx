1️⃣ Basic Counting with Redis
Approach: Simple Key-Value Counter

For each API endpoint, you can store a counter in Redis:

Key: api:<api_name>:count
Value: integer (number of hits)


Example in Node.js:

import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

async function incrementApiCount(apiName) {
    const key = `api:${apiName}:count`;
    // Increment by 1
    const count = await redisClient.incr(key);
    return count;
}

// Example usage
app.get('/api1', async (req, res) => {
    const count = await incrementApiCount('api1');
    res.send(`API1 has been called ${count} times`);
});


✅ Simple, fast, works for any number of APIs.

2️⃣ Counting With Expiry (Time-based Count)

If you want daily, hourly, or per-minute counts, add TTL:

const key = `api:${apiName}:count:${new Date().toISOString().slice(0,10)}`; // Daily
await redisClient.incr(key);
await redisClient.expire(key, 86400); // Expires in 1 day


For hourly: use slice(0,13) and expire(key, 3600)

For minute: use slice(0,16) and expire(key, 60)

✅ Perfect for rate limiting or analytics.

3️⃣ Advanced Counting With HyperLogLog (HLL)

If you want unique users per API:

const key = `api:${apiName}:users`;
await redisClient.pfAdd(key, userId);  // userId is unique
const uniqueCount = await redisClient.pfCount(key);


HLL uses minimal memory (~12 KB per key) even for millions of users.

Perfect for analytics dashboards.

4️⃣ Using Sorted Sets (ZSET) for Time-decayed Counts

If you want recent API activity and rankings:

const key = `api:${apiName}:hits`;
const timestamp = Date.now();
await redisClient.zAdd(key, { score: timestamp, value: userId });
await redisClient.zRemRangeByScore(key, 0, timestamp - 3600*1000); // last 1 hour
const count = await redisClient.zCard(key); // hits in last hour


✅ Useful for leaderboards, recent usage, or time-decayed analytics.

5️⃣ Production Considerations for 20+ APIs

Namespace keys: api:<api_name>:count → avoids collisions.

Use TTL: avoids Redis memory bloat.

Use pipelines: increment multiple APIs in one request for speed.

Combine with metrics system (Prometheus, Grafana) for dashboards.

Cluster/Replication: if high throughput (millions of hits), use Redis Cluster + AOF for persistence.

Example Table for 20 APIs
API Name	Key in Redis	Counter Type	Expiry / TTL
api1	api:api1:count	Simple Int	Optional
api2	api:api2:count:2026-02-22	Daily Counter	1 day
api3	api:api3:users	HyperLogLog	Optional
api4	api:api4:hits	ZSET (timestamp)	last 1 hour
...	...	...	...
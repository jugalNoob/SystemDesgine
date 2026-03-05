
npm install ioredis


Connection example:

import Redis from "ioredis";

const redis = new Redis.Cluster([
  { host: "redis-node-1", port: 7000 },
  { host: "redis-node-2", port: 7001 },
  { host: "redis-node-3", port: 7002 }
], {
  redisOptions: {
    maxRetriesPerRequest: 3
  }
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis Cluster");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});


Cluster automatically:

Routes key to correct master

Handles failover

Reconnects automatically

🔥 Production Hardening (5-Nines Settings)

Add to redis.conf:

maxmemory 4gb
maxmemory-policy allkeys-lru
tcp-keepalive 300
timeout 0


Important:

Setting	Why
AOF	Prevent data loss
LRU	Avoid OOM crash
Replica	Auto failover
Multi AZ	Survive datacenter failure
⚠️ What Happens If Master Fails?

Cluster detects failure (5 sec default)

Replica promotes itself

Cluster updates routing

Node.js auto reconnects

Downtime = usually 1–3 seconds.
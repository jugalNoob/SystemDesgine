🌐 2️⃣ Redis Sharding (Client-Side / Application Sharding)

Definition:

Sharding = split your dataset across multiple Redis instances

Done at the application/client level, each shard stores a subset of keys

Use-case: Large datasets, memory limits, scale horizontally

Node.js Example with ioredis Sharding:

const Redis = require('ioredis');

// Define multiple shards
const shards = [
  new Redis({ host: 'redis-shard1', port: 6379 }),
  new Redis({ host: 'redis-shard2', port: 6379 })
];

// Simple hash-based sharding
function getShard(key) {
  return shards[key.charCodeAt(0) % shards.length];
}

// Write
await getShard('user:1').set('user:1', 'Alice');

// Read
const value = await getShard('user:1').get('user:1');
console.log(value);


Key Notes:

Client decides which shard holds the key

Memory is distributed

Failover is manual unless combined with replication
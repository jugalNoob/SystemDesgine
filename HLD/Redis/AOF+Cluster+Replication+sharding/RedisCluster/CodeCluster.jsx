🌐 3️⃣ Redis Cluster

Definition:

.. Cluster = built-in Redis solution for automatic sharding + 
replication + high availability

.. Nodes are divided into slots (0-16383) → each key maps to a slot

.. Each slot has primary + replicas

.. Automatic failover if primary fails

Use-case: Large datasets, horizontal scaling, high availability

Node.js Example with ioredis Cluster:

const Redis = require('ioredis');

const cluster = new Redis.Cluster([
  { host: 'redis-node1', port: 6379 },
  { host: 'redis-node2', port: 6379 },
  { host: 'redis-node3', port: 6379 },
]);

// Write
await cluster.set('user:1', 'Alice');

// Read
const value = await cluster.get('user:1');
console.log(value); // 'Alice'


Key Notes:

Redis Cluster handles sharding + replication + failover

No need for client-side sharding

Highly available and scalable



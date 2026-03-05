🌐 1️⃣ Redis Replication

Definition:

Replication = one primary (master) node + one or more replica (slave) nodes

Primary handles writes, replicas handle reads and keep in sync

Failover → replica can be promoted to primary if primary fails

Use-case: Read scaling, high availability

Node.js Example (Primary → Replica reads):

// Primary Node (Writes)
const primary = redis.createClient({ host: 'redis-primary', port: 6379 });
await primary.connect();
await primary.set('user:1', 'Alice');

// Replica Node (Reads)
const replica = redis.createClient({ host: 'redis-replica', port: 6379 });
await replica.connect();
const value = await replica.get('user:1');
console.log(value); // 'Alice'


Key Notes:

Simple replication setup

Read scaling possible

No automatic sharding
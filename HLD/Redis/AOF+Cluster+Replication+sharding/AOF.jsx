🌐 What is AOF (Append-Only File) in Redis?

AOF = Append-Only File

It is a persistence mechanism in Redis that logs every
 write operation to a file.

The idea: every command that changes the data
 (SET, HSET, LPUSH, ZADD, etc.) is appended to a file immediately or periodically.

On Redis restart, Redis replays this file to restore 
the dataset to its last state.

Think of it as a journal of all changes in Redis.



🔹 How AOF Works



.. Write Operation → User executes a write (SET key value)

.. Append to AOF → Command is written as text to appendonly.aof

.. Flush to Disk → Redis flushes it based on policy (everysec, always, no)

.. Recovery → On restart, Redis reads AOF line by line and replays commands




🔹 AOF vs RDB (Redis Database Snapshot)


| Feature        | AOF                                | RDB                                    |
| -------------- | ---------------------------------- | -------------------------------------- |
| Persistence    | Logs every write command           | Snapshot of dataset at intervals       |
| Durability     | Higher, can configure every write  | Lower, can lose data between snapshots |
| File size      | Larger than RDB                    | Smaller                                |
| Recovery speed | Slower (replay commands)           | Faster (load snapshot)                 |
| Use-case       | Critical data, near-zero data loss | Fast startup, less critical data       |



🔹 AOF Policies (appendfsync)

always → Write and flush to disk every command

✅ Most durable, ❌ Slowest

everysec → Flush to disk every second

✅ Good balance of speed and durability

✅ Commonly used in production

no → OS decides when to flush

❌ Fastest, ❌ Risk of losing data

🔹 Example in redis.conf

appendonly yes

appendfilename "appendonly.aof"

# Flush every second

appendfsync everysec


🔹 Advantages of AOF


Durable → Minimal data loss, can configure
 for almost real-time persistence

Readable → The file contains plain Redis 
commands, easy to inspect

Rewrites → Redis can rewrite AOF in 
background to compact file size



🔹 When to Enable AOF

Projects where data loss must be minimized:

Payment systems

User sessions

Caches that must survive restart

Can combine with RDB → snapshot + AOF for fast recovery + durability


🔹 Node.js Consideration

Node.js apps using Redis don’t change AOF config; Redis handles persistence.

Ensure Redis persistence is enabled for critical systems.

const redis = require('redis');
const client = redis.createClient();
await client.connect();

await client.set('user:1', 'Alice'); // Logged in AOF if enabled


Even if Redis crashes, the user:1 key can be restored by replaying AOF.


🔑 Interview Tip

“Enabling AOF in Redis ensures data durability by logging every write operation.
 With appendfsync everysec, we get a good balance between speed and persistence. 
 AOF is best for production systems where losing data even for a few seconds is unacceptable.”

If you want, I can make a 🔥 full diagram showing Redis Persistence: RDB + AOF 
+ Node.js flow so you can explain how Redis survives crashes in production visually in 1 minute.

Do you want me to make that?



🌐 4️⃣ Redis AOF (Append-Only File)

Definition:

AOF = persistence mechanism logging every write operation

Ensures data durability

Can be combined with replication/cluster

Node.js Example (AOF enabled on Redis server):

const redis = require('redis');
const client = redis.createClient({ host: 'redis-cluster-primary' });
await client.connect();

await client.set('user:1', 'Alice'); // Logged in AOF
await client.hSet('user:1:profile', { name: 'Alice', age: '25' });


Server-side config (redis.conf):

appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec


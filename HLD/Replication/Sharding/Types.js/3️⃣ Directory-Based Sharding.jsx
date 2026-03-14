3️⃣ Directory-Based Sharding

A lookup table (directory) decides where data is stored.

Example:

UserID → Shard Mapping Table

1001 → Shard 1
1002 → Shard 3
1003 → Shard 2


System checks the mapping table before querying.

Pros

Very flexible

Can move data easily

Cons

Extra lookup overhead

Real Example (MongoDB Sharding)

In MongoDB cluster:

Client
   |
   v
mongos (router)
   |
   v
---------------------
Shard 1
Shard 2
Shard 3
---------------------


Components:

Shard → Stores data

Config Server → Metadata about shards

mongos → Router that directs queries




Example for Your Architecture

Since you are building Node.js + MongoDB + Kafka system, sharding helps when:

10k API requests/min
50k DB reads/writes


Example sharding key:

userId
email
region


Example:

Shard 1 → India users
Shard 2 → US users
Shard 3 → Europe users


Your MongoDB cluster + Apache Kafka + Node.js architecture
 becomes high-throughput and scalable.

✅ Simple Interview Answer

Sharding is a database scaling technique where data is
 split across multiple servers.
Types of sharding are:

Range-based sharding

Hash-based sharding

Directory-based sharding.
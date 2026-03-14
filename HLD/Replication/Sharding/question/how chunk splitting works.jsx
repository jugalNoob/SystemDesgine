Understanding how chunk splitting works in MongoDB is important for sharding because MongoDB moves chunks (small pieces of data) between shards to keep the system balanced.

1️⃣ What is a Chunk?

In a sharded collection, MongoDB does not move individual documents.

Instead it moves chunks of documents.

Think of a chunk as:

A small block of data inside a shard


Example:

users collection
Shard 1
   |
   +-- Chunk A (userId 1–500)
   +-- Chunk B (userId 501–1000)


Each chunk stores many documents.

2️⃣ Default Chunk Size

Default chunk size in MongoDB:

64 MB


So when data inside a chunk grows larger than 64 MB, MongoDB splits it into two chunks.

3️⃣ Example of Chunk Splitting

Before splitting:

Chunk A
userId 1 – 1000
size = 70 MB


MongoDB splits it.

After splitting:

Chunk A → userId 1 – 500
Chunk B → userId 501 – 1000


Now each chunk is about 35 MB.

4️⃣ Why Chunk Splitting Happens

Reasons:

Prevent very large chunks
Allow better load distribution
Enable rebalancing between shards


Small chunks are easier to move.

5️⃣ Example Cluster

Suppose we have 3 shards.

Initial state:

Shard 1
   Chunk A
   Chunk B

Shard 2
   Chunk C

Shard 3
   Chunk D


If Shard1 becomes large:

Chunk B → moved to Shard 2


This is rebalancing.

6️⃣ Full Sharding Flow
Write data
   |
Chunk grows
   |
Chunk size > 64MB
   |
MongoDB splits chunk
   |
Balancer moves chunks
   |
Cluster becomes balanced

7️⃣ Example Shard Key Distribution

Shard key:

userId


Chunks:

Chunk1 → userId 1–1000
Chunk2 → userId 1001–2000
Chunk3 → userId 2001–3000
Chunk4 → userId 3001–4000


MongoDB distributes chunks across shards.

8️⃣ Internal Components

Chunk management involves:

mongos → query router
config servers → store chunk metadata
shards → store chunk data
balancer → moves chunks


All part of **MongoDB sharding architecture.

9️⃣ Interview Answer (Simple)

In MongoDB sharding, data is divided into chunks. The default chunk size is 64 MB. When a chunk grows beyond this size, MongoDB automatically splits it into smaller chunks. The balancer can then move these chunks across shards to maintain even data distribution.
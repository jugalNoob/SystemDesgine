1️⃣ MongoDB Rebalancing (Auto Balancing)
Simple Meaning

Rebalancing means MongoDB automatically moves data chunks between shards so that all shards have equal data and load.

Example Before Rebalancing

Suppose we have 3 shards.

Shard 1 → 600 GB
Shard 2 → 200 GB
Shard 3 → 200 GB


Shard 1 is overloaded.

What MongoDB Does

MongoDB moves some chunks from Shard 1 to other shards.

After balancing:

Shard 1 → 330 GB
Shard 2 → 330 GB
Shard 3 → 340 GB


Now the cluster is balanced.

How It Works Internally

In a MongoDB cluster:

mongos
  |
Config Server
  |
Balancer Service
  |
Move Chunks Between Shards


Steps:

1️⃣ Check shard sizes
2️⃣ Detect imbalance
3️⃣ Move data chunks
4️⃣ Update metadata in config server

Example Chunk Movement
Chunk A → Shard 1
Chunk B → Shard 1
Chunk C → Shard 2


Balancer moves:

Chunk B → Shard 3

Important Point

Rebalancing does NOT change the shard key.

It only moves data chunks.

2️⃣ Resharding
Simple Meaning

Resharding means changing the shard key of a collection.

Example:

Old shard key:

userId


New shard key:

email


This requires redistributing all data across shards again.

Example

Before resharding:

Shard Key → userId


Distribution:

Shard1 → userId 1–1M
Shard2 → userId 1M–2M
Shard3 → userId 2M–3M


After resharding:

Shard Key → region


Distribution:

Shard1 → Asia users
Shard2 → US users
Shard3 → Europe users


Data gets fully redistributed.
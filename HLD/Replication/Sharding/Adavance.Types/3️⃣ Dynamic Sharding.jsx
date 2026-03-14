3️⃣ Dynamic Sharding

Shards automatically split when they become too large.

Example:

Shard 1 → 1M users
Shard 2 → 1M users
Shard 3 → 1M users


When Shard 1 becomes overloaded:

Shard 1 → split into
   Shard 1A
   Shard 1B


Benefits:

Automatic scaling

Prevents overloaded servers

Example in MongoDB:

MongoDB splits chunks automatically when data grows.
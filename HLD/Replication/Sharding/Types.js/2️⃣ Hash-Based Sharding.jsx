2️⃣ Hash-Based Sharding

The database calculates a hash of the shard key and distributes data evenly.

Example:

hash(userId) % 3


Result:

Shard 1 → hash remainder 0
Shard 2 → hash remainder 1
Shard 3 → hash remainder 2


Example:

User 100 → hash → Shard 2
User 101 → hash → Shard 1
User 102 → hash → Shard 3

Pros

Even distribution

Prevents hotspot

Cons

Range queries become slow

Example:

Find users between 1000–2000


Database must check all shards.
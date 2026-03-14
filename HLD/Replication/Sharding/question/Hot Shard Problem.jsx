The Hot Shard Problem happens when one shard receives much more traffic than the others in a sharded database like MongoDB.

Because of this, one server becomes overloaded while other shards are mostly idle.

1️⃣ Simple Meaning

Imagine you have 3 shards:

Shard 1
Shard 2
Shard 3


Traffic example:

Shard 1 → 90% requests 🔥
Shard 2 → 5% requests
Shard 3 → 5% requests


Shard 1 becomes HOT (overloaded).

This is called the Hot Shard Problem.

2️⃣ Why It Happens

Usually caused by a bad shard key.

Example shard key:

createdAt (date)


New data always goes to latest timestamp.

So writes go to one shard only.

Example:

Shard1 → old data
Shard2 → old data
Shard3 → new data (all writes)


Shard3 becomes hot.

3️⃣ Real Example

Suppose users are sharded by country.

Shard 1 → USA
Shard 2 → India
Shard 3 → Europe


Traffic:

USA users = 80%
India users = 10%
Europe users = 10%


Result:

Shard 1 overloaded


Hot shard problem.

4️⃣ Symptoms

Engineers notice:

High CPU on one shard
Slow queries
Uneven data distribution
High disk usage


Example:

Shard1 CPU → 90%
Shard2 CPU → 20%
Shard3 CPU → 25%

5️⃣ How Engineers Fix It
1️⃣ Use Hashed Sharding

Example:

hashed(userId)


Data distributes evenly.

2️⃣ Better Shard Key

Good shard keys:

userId
email
orderId


High-cardinality values.

3️⃣ Add More Shards

Example:

3 shards → 6 shards


Traffic spreads better.

6️⃣ Simple Visual

Normal sharding:

Shard1 → 33%
Shard2 → 33%
Shard3 → 33%


Hot shard problem:

Shard1 → 80% 🔥
Shard2 → 10%
Shard3 → 10%

7️⃣ Interview Answer (Short)

The Hot Shard Problem occurs when one shard receives most of the traffic due to a poor shard key, causing that shard to become overloaded while others remain underutilized.
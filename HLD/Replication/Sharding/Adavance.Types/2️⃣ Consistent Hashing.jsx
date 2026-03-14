2️⃣ Consistent Hashing

Used to distribute data evenly across servers and reduce rebalancing when a new server is added.

Basic idea:

hash(userId) → position on hash ring


Example:

User 101 → Server A
User 102 → Server C
User 103 → Server B


When a new server is added:

Only small portion of data moves


Benefits:

Good for distributed systems

Minimizes data movement

Used in:

Apache Cassandra

Redis clusters

Apache Kafka partitioning
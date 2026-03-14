4️⃣ Entity-Based Sharding

Data is split by entity type or business domain.

Example:

Shard 1 → Users
Shard 2 → Orders
Shard 3 → Payments


Or

Shard 1 → User profile data
Shard 2 → User activity
Shard 3 → Analytics


Benefits:

Better microservice architecture

Easier scaling for specific services

Used by large platforms like:

Facebook

Twitter
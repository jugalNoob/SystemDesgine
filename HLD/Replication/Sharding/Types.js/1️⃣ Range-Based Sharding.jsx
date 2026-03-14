Types of Sharding
1️⃣ Range-Based Sharding

Data is divided based on ranges of a key.

Example (User ID):

Shard 1 → ID 1 – 1,000
Shard 2 → ID 1,001 – 2,000
Shard 3 → ID 2,001 – 3,000


Example query:

db.users.find({ userId: 1500 })


Router knows it is in Shard 2.

Pros

Simple

Easy to understand

Cons

Hotspot problem
Example: If most new users have higher IDs, last shard gets heavy traffic.
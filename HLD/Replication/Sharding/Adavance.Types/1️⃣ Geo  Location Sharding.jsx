1️⃣ Geo / Location Sharding

Data is split based on geographic region.

Example structure:

Shard 1 → India users
Shard 2 → US users
Shard 3 → Europe users


Example request:

User from India → API → India shard


Benefits:

Faster response (data near users)

Reduced latency

Complies with regional data laws

Used by:

Netflix

Amazon

Uber

Example query:

db.users.find({ region: "India" })

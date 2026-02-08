
🔟 Sharding/

Purpose: Distribute data across multiple servers to scale horizontally.

Include:

Shard key selection strategy

MongoDB sharding example (3 shards + config server)

Rebalancing shards

Global user data use case (per region)

Node.js app connecting to multiple shards




Excellent 🔥 — now let’s go all-in on MongoDB Sharding (Horizontal Scaling) — one of the most powerful and advanced parts of MongoDB architecture.

You’ll get:

Full concept explanation

Internal architecture

Shard key strategy

Real-world examples (global users per region)

Node.js connection examples

Rebalancing and monitoring commands

Advanced sharding insights

🔟 Sharding in MongoDB
🎯 Purpose

Sharding = Distributing a single dataset across multiple servers (shards) to scale horizontally.

MongoDB uses sharding to handle massive datasets and high throughput that can’t fit on one machine.

⚙️ Why Sharding Is Needed


| Problem (Without Sharding)              | Sharding Solution              |
| --------------------------------------- | ------------------------------ |
| Database grows too large for one server | Data split across shards       |
| High query latency due to load          | Parallel queries across shards |
| Single write bottleneck                 | Distributed writes             |
| Storage limits on one disk              | Scaled storage capacity        |
| Failover limitations                    | Independent shard scaling      |



🧱 MongoDB Sharding Architecture

A sharded MongoDB cluster has three key components:


          +---------------------------------+
          |          Application            |
          |     (Node.js / Driver Layer)    |
          +---------------------------------+
                            |
                            ▼
                   +------------------+
                   |   mongos Router  |
                   | (Query Router)   |
                   +------------------+
                      /      |      \
                     /       |       \
         +-----------+   +-----------+   +-----------+
         |  Shard 1  |   |  Shard 2  |   |  Shard 3  |
         | (Subset)  |   | (Subset)  |   | (Subset)  |
         +-----------+   +-----------+   +-----------+
               \               |               /
                \              |              /
                 +---------------------------+
                 |   Config Servers (3x)     |
                 |   Metadata + Chunk Maps   |
                 +---------------------------+


⚙️ 1️⃣ Sharding Components Explained


| Component          | Description                                              |
| ------------------ | -------------------------------------------------------- |
| **Shard**          | Holds a subset of data (can be replica set)              |
| **mongos**         | Query router that directs requests to the correct shard  |
| **Config servers** | Store cluster metadata (chunk ranges, shard keys, zones) |


⚙️ 2️⃣ Enable Sharding
Step 1️⃣: Enable on the Database
sh.enableSharding("userDB")

Step 2️⃣: Shard the Collection
sh.shardCollection("userDB.users", { region: 1 })


✅ MongoDB will now split users collection into chunks and distribute them across multiple shards based on the field region.

🧩 3️⃣ Shard Key Selection Strategy

The shard key decides how data is distributed and accessed.
Choosing it carefully is the most critical decision.

✅ Good Shard Key Properties


| Property              | Description                          |
| --------------------- | ------------------------------------ |
| **High Cardinality**  | Many unique values to ensure balance |
| **Even Distribution** | Avoid data skew / hot shards         |
| **Query Targeting**   | Commonly used in filters or joins    |
| **Immutability**      | Shard key field cannot change        |



⚙️ Example Shard Key Choices


| Use Case          | Shard Key                  | Why                                      |
| ----------------- | -------------------------- | ---------------------------------------- |
| Global Users      | `region`                   | Keeps users in same region on one shard  |
| E-commerce Orders | `{ customerId: "hashed" }` | Distributes evenly                       |
| IoT Logs          | `{ timestamp: 1 }`         | Ordered range queries                    |
| Analytics Data    | `{ userId: 1, date: 1 }`   | Compound key supports range + uniqueness |



🧩 4️⃣ Types of Sharding in MongoDB

MongoDB supports 3 types of sharding strategies.

1️⃣ Range-Based Sharding

Distributes documents based on ranges of shard key values.

sh.shardCollection("ordersDB.orders", { orderDate: 1 })


✅ Great for range queries (e.g., date, numeric ranges)
⚠️ Beware of hot shards when inserting sequentially (latest dates)

2️⃣ Hash-Based Sharding

Distributes based on the hashed value of shard key.

sh.shardCollection("shop.orders", { userId: "hashed" })


✅ Ensures even data distribution
✅ Avoids hotspots
⚠️ Slower for range queries because of random distribution

3️⃣ Zone-Based (Tag-Aware) Sharding

Assign specific data ranges to particular shards.

Example
sh.addShardTag("shard1", "ASIA")
sh.addShardTag("shard2", "EUROPE")

sh.addTagRange(
  "userDB.users",
  { region: "India" },
  { region: "Japan" },
  "ASIA"
)

sh.addTagRange(
  "userDB.users",
  { region: "France" },
  { region: "Spain" },
  "EUROPE"
)


✅ Used for regional data isolation, GDPR compliance, and latency optimization.

🧮 5️⃣ Chunk Splitting & Balancing

MongoDB automatically splits collections into chunks (~128MB)

Each chunk maps to a range of shard key values

Balancer evenly distributes chunks across shards

sh.status()


Displays:

Chunk distribution

Shard status

Balancer info

⚙️ Manual Rebalancing Commands
sh.startBalancer()
sh.stopBalancer()
sh.isBalancerRunning()
sh.getBalancerState()

⚙️ Manual Chunk Move
sh.moveChunk("userDB.users", { region: "Europe" }, "shard2")


✅ Useful for rebalancing or moving specific regions manually.

🧠 6️⃣ Example: Global User Data
📦 Collection
{
  _id: ObjectId("..."),
  userId: 1001,
  name: "Amit",
  region: "India",
  email: "amit@example.com",
  signupDate: ISODate("2025-10-20")
}

⚙️ Shard Key
sh.shardCollection("userDB.users", { region: 1 })

⚙️ Distribution

| Region  | Shard   |
| ------- | ------- |
| Asia    | Shard 1 |
| Europe  | Shard 2 |
| America | Shard 3 |


✅ Each shard stores only users from its region.
✅ Queries filtered by region are routed directly to the correct shard.

🧠 Example Query Routing
db.users.find({ region: "Asia" })


→ Routed only to Shard 1, not the entire cluster.
⏱ Faster, less network overhead.

🧩 7️⃣ Node.js Application with Sharded MongoDB
Step 1️⃣: Connect via Connection String
import mongoose from 'mongoose';

const uri = "mongodb://mongos1:27017,mongos2:27017,mongos3:27017/userDB?replicaSet=rs0&readPreference=nearest";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to Sharded MongoDB Cluster'))
.catch(err => console.error(err));


✅ Connection goes through mongos routers —
MongoDB automatically decides which shard(s) to route requests to.

Step 2️⃣: Define Schema and Model
const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  region: String,
  email: String,
  signupDate: Date
});

const User = mongoose.model('User', userSchema);

Step 3️⃣: Insert and Query
await User.create({ userId: 1, name: 'Jugal', region: 'India' });

const asiaUsers = await User.find({ region: 'Asia' });


✅ The query router (mongos) automatically sends:

Insert → to shard for region: "India"

Find → only to shard storing "Asia" data

⚙️ 8️⃣ Balancing & Monitoring in Production

| Command                                | Description                       |
| -------------------------------------- | --------------------------------- |
| `sh.status()`                          | Cluster overview                  |
| `db.printShardingStatus()`             | Shard distribution and ranges     |
| `db.collection.getShardDistribution()` | Check specific collection balance |
| `sh.getBalancerState()`                | Check if balancer is running      |
| `db.adminCommand({ balancerStop: 1 })` | Stop balancer manually            |


🧮 9️⃣ Shard Key Design – Deep Dive

| Shard Key                      | Use Case                          |
| ------------------------------ | --------------------------------- |
| `{ userId: "hashed" }`         | Evenly distribute users           |
| `{ region: 1, signupDate: 1 }` | Regional + time-based queries     |
| `{ email: 1 }`                 | Unique lookups (high cardinality) |



⚠️ Bad Examples
Shard Key


| Shard Key           | Issue                          |
| ------------------- | ------------------------------ |
| `{ country: 1 }`    | Low cardinality (few values)   |
| `{ signupDate: 1 }` | Sequential inserts = hotspots  |
| `{ gender: 1 }`     | Very low uniqueness (2 values) |


🔄 10️⃣ Scaling Operations

| Task                 | Command                                           |
| -------------------- | ------------------------------------------------- |
| Add new shard        | `sh.addShard("host:port")`                        |
| Remove shard         | `sh.removeShard("shardName")`                     |
| Check balancing      | `sh.isBalancerRunning()`                          |
| Split chunk manually | `sh.splitAt("userDB.users", { region: "India" })` |



🧰 11️⃣ Common Use Cases

| Use Case                    | Shard Key                 | Strategy           |
| --------------------------- | ------------------------- | ------------------ |
| **Global user data**        | `{ region: 1 }`           | Zone sharding      |
| **Large e-commerce orders** | `{ orderId: "hashed" }`   | Hash sharding      |
| **IoT sensor data**         | `{ timestamp: 1 }`        | Range sharding     |
| **Analytics system**        | `{ userId: 1, date: 1 }`  | Compound sharding  |
| **Financial transactions**  | `{ accountId: "hashed" }` | Hash for even load |


⚙️ 12️⃣ Combining Sharding + Replication

Each shard is usually a replica set itself:

Shard 1 → Primary + 2 Secondaries  
Shard 2 → Primary + 2 Secondaries  
Shard 3 → Primary + 2 Secondaries  


✅ Benefits:

High availability

Auto failover

Data redundancy

Distributed reads

This is called a Sharded Cluster with Replica Sets — the real production-grade setup.

📉 13️⃣ Sharding Challenges & Solutions

| Challenge                  | Solution                                  |
| -------------------------- | ----------------------------------------- |
| Wrong shard key choice     | Use compound or hashed key                |
| Uneven data distribution   | Run balancer regularly                    |
| Query routing inefficiency | Always include shard key in query filters |
| Cross-shard joins          | Avoid `$lookup` across shards             |
| Chunk migration load       | Schedule balancing during off-peak hours  |


🧠 14️⃣ Key Monitoring Metrics

✅ Check:

Chunk distribution uniformity

Shard disk usage

Balancer operation logs

Query routing patterns

Network latency between shards and config servers

Use:

db.printShardingStatus()
sh.status()
db.users.getShardDistribution()

🧩 15️⃣ Summary Table

| Concept            | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| **Technique**      | Horizontal partitioning (data distributed across multiple shards) |
| **Components**     | mongos router, config servers, shards                             |
| **Shard Key**      | Determines how data is split                                      |
| **Chunk**          | Smallest unit of sharding (~128MB)                                |
| **Balancer**       | Redistributes chunks evenly                                       |
| **Types**          | Range, Hash, Zone                                                 |
| **Best Use**       | Large datasets, global apps, massive writes                       |
| **Node.js Access** | Connect via mongos router for transparent scaling                 |


🌍 16️⃣ Real-World Example: Global Social App
Use Case

Users from all over the world

Want low latency reads and writes

Compliance with data laws


| Region  | Shard   | Location  |
| ------- | ------- | --------- |
| Asia    | Shard 1 | Singapore |
| Europe  | Shard 2 | Germany   |
| America | Shard 3 | US-East   |



Setup
sh.enableSharding("socialApp")
sh.shardCollection("socialApp.users", { region: 1 })


✅ region chosen as shard key
✅ Queries like find({ region: "Europe" }) routed to Germany shard
✅ Each shard replicated for HA

⚖️ 17️⃣ Best Practices

✅ Choose shard key with high cardinality
✅ Avoid monotonically increasing fields (_id, timestamp)
✅ Monitor balancer status regularly
✅ Always include shard key in queries
✅ Place replica sets in different zones
✅ Combine zone sharding + replication for global scale
✅ Test sharding in staging before production

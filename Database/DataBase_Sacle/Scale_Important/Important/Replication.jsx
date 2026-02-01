🧩 9️⃣ Replication in MongoDB
🎯 Purpose

Replication = Copying data across multiple MongoDB servers for fault tolerance, high availability, and scalability.

If one node fails, another automatically takes over.
It’s the backbone of MongoDB’s reliability and data redundancy.

⚙️ Core Concept

A replica set is a group of MongoDB servers that maintain identical copies of data.

🧱 Replica Set Components


| Role                   | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Primary**            | Receives all write operations                  |
| **Secondary**          | Replicates data from primary (can serve reads) |
| **Arbiter (optional)** | Doesn’t store data, only votes in elections    |



🧭 Architecture Diagram (Conceptual)
                 +---------------------+
                 |     Application     |
                 |  (MongoDB Driver)   |
                 +----------+----------+
                            |
                            ▼
                    +---------------+
                    |   PRIMARY     |
                    |   (Writes)    |
                    +---------------+
                      /           \
                     /             \
          +---------------+   +---------------+
          | SECONDARY #1  |   | SECONDARY #2  |
          | (Reads)       |   | (Reads)       |
          +---------------+   +---------------+
                     \
                      \
                  +-----------+
                  | ARBITER   |
                  | (Votes)   |
                  +-----------+

⚙️ 1️⃣ Setting Up MongoDB Replica Set (Local Example)
Step 1️⃣: Start multiple MongoDB instances
mongod --port 27017 --dbpath /data/rs1 --replSet "rs0"
mongod --port 27018 --dbpath /data/rs2 --replSet "rs0"
mongod --port 27019 --dbpath /data/rs3 --replSet "rs0"

Step 2️⃣: Connect to one node and initialize replica set
mongo --port 27017

Step 3️⃣: Initiate configuration
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
})


✅ This creates a replica set named rs0 with one primary and two secondaries.

🧩 2️⃣ How Replication Works Internally
🔁 Replication Flow:

Primary writes data and records operations in the oplog (operations log)

Secondaries continuously pull oplog entries from primary

Apply these operations to maintain an identical data state

📂 Example: Oplog Entry
{
  "ts": Timestamp(172, 1),
  "op": "i",
  "ns": "shop.orders",
  "o": { "_id": 101, "item": "Laptop", "price": 1200 }
}


✅ Secondaries reapply these operations → data stays synchronized.

🧮 3️⃣ Read & Write Behavior
Operation	Description
Writes	Always go to the primary
Reads	By default from primary
Option	Can configure read preference to use secondaries
🧠 Read Preference Modes
db.getMongo().setReadPref("secondary")


| Mode                 | Description                    | Use Case                   |
| -------------------- | ------------------------------ | -------------------------- |
| `primary`            | Default, strongest consistency | Writes or consistent reads |
| `secondary`          | Reads from secondary           | Offload reads, analytics   |
| `nearest`            | Chooses lowest-latency node    | Global apps                |
| `primaryPreferred`   | Primary if available           | Balanced reads             |
| `secondaryPreferred` | Secondary if available         | Reporting apps             |



⚙️ 4️⃣ Example: Scalable Read Setup

Scenario:

Global e-commerce system

Primary in Singapore

Read replicas in USA and Europe

Client Connection:
mongodb+srv://cluster0.example.mongodb.net/?readPreference=nearest


✅ Automatically routes reads to nearest replica → faster global reads.
✅ Writes still go to primary (Singapore).

⚖️ 5️⃣ Leader Election (Automatic Failover)

If primary fails, MongoDB automatically holds an election.

Replica set members vote for a new primary

Election takes ~5–10 seconds

New primary takes over, accepts writes

Old primary rejoins as a secondary when it recovers

⚙️ Example: Checking Replica State
rs.status()


Sample Output:

{
  set: "rs0",
  members: [
    { name: "localhost:27017", stateStr: "PRIMARY" },
    { name: "localhost:27018", stateStr: "SECONDARY" },
    { name: "localhost:27019", stateStr: "SECONDARY" }
  ]
}

🧰 6️⃣ Handling Replication Lag
📉 What Is Replication Lag?

The delay between primary write and secondary applying the same operation.

Measured via:

rs.printSlaveReplicationInfo()


Sample Output:

source: localhost:27018
syncedTo: Fri Oct 23 2025 11:45:12 GMT+0530
0 secs (0 hrs) behind the primary

⚠️ Causes of Lag

Slow disk/network on secondary

Heavy load (large oplog entries)

Under-provisioned hardware

Large index builds or slow queries

🧠 How to Reduce Lag

✅ Ensure oplog size is large enough
✅ Use wiredTiger cache tuning
✅ Use SSD disks and fast network
✅ Avoid large bulk writes
✅ Monitor lag via MongoDB Atlas Metrics or Prometheus

🧩 7️⃣ Write Concern — Control Data Durability

Define how many replicas must confirm a write before it’s considered successful.

db.collection.insertOne(
  { orderId: 1, status: "paid" },
  { writeConcern: { w: "majority", wtimeout: 2000 } }
)


| Option              | Meaning                          |
| ------------------- | -------------------------------- |
| `{ w: 1 }`          | Acknowledged by primary only     |
| `{ w: "majority" }` | Acknowledged by most nodes       |
| `{ w: 0 }`          | Unacknowledged (fire and forget) |



✅ Use majority for safe writes in production.

📖 8️⃣ Example: MongoDB Replica Set with Arbiter

Arbiter adds voting without holding data — used for odd number of votes.

rs.addArb("localhost:27020")


✅ Ensures election votes remain odd (avoid ties).
⚠️ Arbiter doesn’t store any data or accept reads/writes.

⚙️ 9️⃣ Monitoring Replication Health


| Command                          | Description                             |
| -------------------------------- | --------------------------------------- |
| `rs.status()`                    | Shows member roles and states           |
| `rs.printReplicationInfo()`      | Shows oplog window and timestamps       |
| `rs.printSlaveReplicationInfo()` | Shows delay of secondaries              |
| `db.serverStatus().repl`         | Low-level replication metrics           |
| `db.isMaster()`                  | Shows current primary or secondary role |



📊 10️⃣ Replication Setups & Examples


| Type                           | Description                           | Example                         |
| ------------------------------ | ------------------------------------- | ------------------------------- |
| **Single Replica Set**         | 1 Primary, 2 Secondary                | Local HA setup                  |
| **Replica Set with Arbiter**   | 1 Arbiter + 2 Data nodes              | Cost-effective quorum           |
| **Replica Set Across Regions** | Primary in Asia, Secondaries in US/EU | Global low-latency reads        |
| **Delayed Replica**            | Secondary delayed intentionally       | Backup / rollback protection    |
| **Hidden Replica**             | Secondary hidden from clients         | Analytics without impacting app |



🕒 Example: Delayed Replica
rs.add({
  host: "localhost:27019",
  priority: 0,
  slaveDelay: 3600, // 1 hour delay
  hidden: true
})


✅ Used for rollback safety (can recover 1-hour old state).

💡 11️⃣ Handling Failover in Application Layer

Use connection string with replica set awareness:

mongodb://host1,host2,host3/?replicaSet=rs0&readPreference=primaryPreferred


✅ The MongoDB driver automatically:

Detects new primary after failover

Re-routes writes to the correct node

Keeps app running with minimal disruption



| Feature    | Replication                        | Sharding                                 |
| ---------- | ---------------------------------- | ---------------------------------------- |
| Purpose    | High availability, data redundancy | Scalability, partitioning large datasets |
| Data       | Same on all nodes                  | Split across shards                      |
| Node Roles | Primary + Secondaries              | Multiple shards (data partitions)        |
| Failover   | Automatic                          | Not applicable                           |
| Example    | 3-node replica set                 | 3-shard cluster                          |



🧠 13️⃣ Best Practices

✅ Always have odd number of members (3, 5, 7…)
✅ Monitor replication lag regularly
✅ Avoid long-running reads on secondaries
✅ Use hidden secondaries for backups/analytics
✅ Use writeConcern: "majority" for safety
✅ Distribute replicas across different availability zones
✅ Use delayed replica for disaster recovery
✅ Keep arbiter only when necessary (no data protection)

🧩 14️⃣ Summary Table


| Concept          | Description                              |
| ---------------- | ---------------------------------------- |
| **Technique**    | Primary-secondary replication            |
| **Purpose**      | High availability + fault tolerance      |
| **Write Flow**   | Always to primary                        |
| **Read Flow**    | Primary or secondary based on preference |
| **Failover**     | Automatic via election                   |
| **Data Sync**    | Via oplog replication                    |
| **Lag Handling** | Optimize hardware + monitor oplog        |
| **Example**      | 1 Primary + 2 Secondary Replica Set      |




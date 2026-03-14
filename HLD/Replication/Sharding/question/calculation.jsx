1️⃣ Basic Formula to Estimate Shards

Simple estimation:

Number of Shards = Total Data Size / Data Capacity per Server


Example:

Total Data = 3 TB
One server capacity = 1 TB

Shards needed = 3 TB / 1 TB = 3 shards


But real systems also consider traffic and throughput.

2️⃣ Calculate Based on Requests (Traffic)

Example system:

100k requests/sec


If one database shard can handle 20k requests/sec:

100k / 20k = 5 shards


So you need at least 5 shards.

3️⃣ Calculate Based on Write Throughput

Example:

Total writes = 50k writes/sec


If one shard handles 10k writes/sec:

50k / 10k = 5 shards

4️⃣ Real Example (Large System)

System stats:

Users = 20 million
Data per user = 5 KB


Total data:

20M × 5 KB = 100 GB


Server capacity:

50 GB per shard (safe usage)


Shards needed:

100 GB / 50 GB = 2 shards


But engineers usually add extra shards for growth.

Final decision:

3–4 shards

5️⃣ Typical Production Setup

Example cluster:

3 shards
Each shard = 3 replica nodes


Total database servers:

3 × 3 = 9 nodes


Structure:

            mongos
              |
     ---------------------
     |         |         |
   Shard1    Shard2    Shard3
   P S S     P S S     P S S


Used in **MongoDB sharding architecture.

6️⃣ Rule Used by Engineers

Many companies start with:

3 shards minimum


Then scale like this:

3 shards → small traffic
6 shards → medium traffic
10+ shards → large systems

7️⃣ Example for Your Node.js System

If your architecture uses:

API → Node.js

Queue → Apache Kafka

Database → MongoDB

Traffic example:

10k requests/min


One shard capacity:

5k requests/min


Shards needed:

10k / 5k = 2 shards


Engineers usually deploy:

3 shards for scaling

8️⃣ Interview Answer (Short)

The number of shards is calculated based on data size, read/write throughput, and server capacity. Engineers divide total workload by the capacity of a single server and add extra shards for future growth.
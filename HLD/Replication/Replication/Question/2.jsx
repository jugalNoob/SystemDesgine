Here are 10 very important replication interview questions with simple answers for systems using MongoDB.

1️⃣ What is Replication?

Answer:

Replication means copying the same database data to multiple servers.

Purpose:

High availability
Data backup
Fault tolerance
Read scaling


Example:

Primary → Secondary → Secondary


All nodes contain same data.

2️⃣ What is a Replica Set?

Answer:

A Replica Set is a group of MongoDB servers that maintain the same dataset.

Example:

Node 1 → Primary
Node 2 → Secondary
Node 3 → Secondary


Used in **MongoDB clusters.

3️⃣ What is Primary Node?

Answer:

The Primary node handles:

All write operations


Example:

Insert
Update
Delete


Then the primary replicates changes to secondaries.

4️⃣ What is Secondary Node?

Answer:

Secondary nodes:

Copy data from primary


Purpose:

Backup
Failover
Read scaling

5️⃣ What Happens if Primary Fails?

Answer:

MongoDB performs automatic election.

Example:

Primary crashes
     |
     v
Secondary becomes new Primary


This process is called Failover.

6️⃣ What is Oplog?

Answer:

Oplog (Operation Log) stores all operations performed on the primary.

Example:

Insert
Update
Delete


Secondaries read oplog and apply changes.

7️⃣ What is Replication Lag?

Answer:

Replication lag means delay between primary and secondary data synchronization.

Example:

Primary update → 5 seconds later → Secondary update


Lag occurs due to:

Network delay
Heavy writes
Slow hardware

8️⃣ What is Arbiter Node?

Answer:

An Arbiter participates in elections but does not store data.

Example replica set:

Primary
Secondary
Arbiter


Used when:

Need odd number of votes


In **MongoDB replication.

9️⃣ Difference Between Replication and Sharding

| Feature  | Replication            | Sharding                 |
| -------- | ---------------------- | ------------------------ |
| Purpose  | Data copy              | Data distribution        |
| Data     | Same data on all nodes | Different data per shard |
| Use case | High availability      | Horizontal scaling       |



🔟 How Replication Works Internally

Process:

Client writes data
        |
        v
Primary node
        |
        v
Operation saved in Oplog
        |
        v
Secondary nodes read Oplog
        |
        v
Apply changes

Simple Architecture Diagram
        Client
          |
          v
       Primary
        /   \
       v     v
  Secondary Secondary


All nodes replicate same dataset.

⭐ Short Interview Summary

Replication in MongoDB uses replica sets, where a primary node handles writes and secondary nodes replicate data using the oplog. If the primary fails, a secondary automatically becomes the new primary.
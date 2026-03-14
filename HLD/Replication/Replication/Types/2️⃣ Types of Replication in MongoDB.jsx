2️⃣ Types of Replication in MongoDB
A) Replica Set (Primary type of replication)

A replica set is a group of MongoDB servers (nodes) that maintain 
the same dataset.

Components of a Replica Set:

:-: Primary

Handles all write operations.

Only one primary exists at a time.

Example: Primary Node receives insert/update requests.

:-: Secondary

Copies data from the primary using oplog (operation log).

Can serve read requests if read preference allows.

Multiple secondaries can exist for redundancy.

:-: Arbiter (Optional)

Votes in elections but does not store data.

Used to maintain an odd number of voting nodes for failover.

           +------------------+
           |     Primary       |
           |  (writes here)   |
           +---------+--------+
                     |
      Replication via Oplog (oplog.rs)
                     |
    +----------------+----------------+
    |                |                |
+--------+       +--------+       +--------+
|Secondary|       |Secondary|       |Arbiter |
+--------+       +--------+       +--------+
(reads allowed)  (reads allowed)   (votes only)



Features:

Automatic failover: If primary fails, secondaries elect a new primary.

Data redundancy: Multiple copies ensure no data loss.

Read scaling: Secondaries can handle read-heavy workloads.



B) Master-Slave Replication (Deprecated)

Older method before replica sets.

Master node handles writes.

Slave nodes replicate data from the master.

No automatic failover; manual intervention required.

Not recommended in modern MongoDB versions (use replica sets instead).
    mongos
                   |
        ---------------------------
        |            |           |
      Shard1       Shard2      Shard3
    (ReplicaSet) (ReplicaSet) (ReplicaSet) 
 
 
 +----------------+
                   |    Primary     |
                   |  (Writes here) |
                   +--------+-------+
                            |
                 Replication via Oplog
                            |
       +---------+----------+-----------+---------+
       |         |                      |         |
+-------------+  +-------------+  +-------------+ +-------------+
| Secondary 1 |  | Secondary 2 |  | Hidden Node | | Delayed Node|
| (Read ops)  |  | (Read ops)  |  | (Invisible) | | (Replicates|
+-------------+  +-------------+  +-------------+ |   with delay)|
                                                 +-------------+
       
                    +-------------+
                    |   Arbiter   |
                    | (Votes only)|
                    +-------------+




                    Explanation:

1: Primary

Handles all writes.

Sends operations to secondaries via oplog.

2: Secondary 1 & 2

Replicate data from primary.

Can serve read requests if allowed.

3: Hidden Node

Holds full data but not visible to normal reads.

Useful for reporting or backups.

4: Delayed Node

Replicates after a set delay (e.g., 1 hour).

Useful to recover from accidental deletes.

5: Arbiter

Doesn’t store data.

Only votes in primary elections to ensure quorum.



6: 💡 Key Notes for Interviews:

Minimum replica set: 1 primary + 1 secondary (or + arbiter).

Maximum practical: Usually 7 voting nodes.

All writes go to primary, reads can be distributed.

Automatic failover ensures high availability.

If you want, I can also make a simpler “flow diagram” showing 
how a write and read propagate in this replica set — super helpful for whiteboard explanations.
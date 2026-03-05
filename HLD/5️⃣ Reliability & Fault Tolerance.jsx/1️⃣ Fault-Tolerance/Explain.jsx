1️⃣ Fault-Tolerance

Meaning: System continues to work even if some components fail.

How your system is fault-tolerant:

Kafka replication (Leader & Follower) → if a broker fails, a follower becomes the leader automatically.

Consumer groups → if a consumer fails, other consumers in the group take over its partitions.

DLQ → failed messages don’t block processing; can be retried later.

Outbox pattern → ensures events aren’t lost if Kafka is temporarily down.

Example answer in an interview:

“Our system is fault-tolerant because Kafka replicates messages across multiple brokers. If a broker fails, followers take over as leaders. Consumers are grouped, so if one crashes, another picks up its partitions. Failed messages go to DLQ, and the outbox pattern guarantees no events are lost during temporary failures.”
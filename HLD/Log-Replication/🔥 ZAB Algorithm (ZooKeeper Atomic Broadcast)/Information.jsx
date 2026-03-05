🔥 ZAB Algorithm (ZooKeeper Atomic Broadcast)

ZAB stands for:

ZooKeeper Atomic Broadcast

It is the consensus + replication protocol used internally by:

Apache ZooKeeper

ZAB ensures:

✅ Strong consistency
✅ Ordered message delivery
✅ Leader-based replication
✅ Crash recovery

🧠 Why ZAB Exists?

ZooKeeper is used for:

Leader election

Distributed locks

Service discovery

Config management

So it MUST guarantee:

All nodes see updates in the same order.

That’s what ZAB provides.

🔥 Core Idea

ZAB is a:

Leader-based atomic broadcast protocol.

Unlike Paxos (multi-leader possible), ZAB always has:

One Leader
Multiple Followers

🏗 ZAB Architecture
           Leader
        /     |      \
Follower1  Follower2  Follower3


All writes go to leader.

🔵 ZAB Has 2 Modes
1️⃣ Leader Election & Recovery Phase

When cluster starts or leader crashes:

Nodes elect new leader

Leader syncs state

Ensures no committed data lost

2️⃣ Broadcast Phase (Normal Operation)

Leader:

Receives write request

Assigns transaction ID (zxid)

Sends proposal to followers

Waits for majority ACK

Commits

Broadcasts commit

🧠 What is zxid?

Zxid = ZooKeeper Transaction ID

Format:

Epoch + Counter


Example:

2:15


Epoch = leader term

Counter = transaction number


This ensures:

Total ordering

Crash recovery consistency



🔥 ZAB Write Flow

Step by step:

Client → Leader

Leader creates zxid

Leader sends PROPOSAL

Followers write to disk (but not commit)

Followers send ACK

If majority ACK:

Leader sends COMMIT

Everyone applies change

📊 Majority Rule

If 5 nodes:

Majority = 3

Leader must receive 3 ACKs before commit.

🧠 Why ZAB Is Different from Paxos?


| Feature        | Paxos                     | ZAB                 |
| -------------- | ------------------------- | ------------------- |
| Leader model   | Not strictly leader-based | Strict leader       |
| Ordering       | Per value                 | Total ordered log   |
| Designed for   | Generic consensus         | ZooKeeper           |
| Crash recovery | Complex                   | Built-in epoch sync |


ZAB is optimized for:

Log replication systems

🔥 What Happens If Leader Crashes?

Followers detect timeout

New leader election starts

Highest zxid wins

New leader syncs missing transactions

Broadcast resumes

No committed data lost.

🏢 Where ZAB Is Used

Apache ZooKeeper (Core protocol)

Apache Kafka (Older versions used ZooKeeper)

Apache HBase (Uses ZooKeeper)

Apache Hadoop (Uses ZooKeeper)

LinkedIn (Heavy ZooKeeper usage)

Netflix (Service coordination systems)

🔥 ZAB vs Raft vs Paxos


| Feature            | ZAB       | Raft         | Paxos            |
| ------------------ | --------- | ------------ | ---------------- |
| Easy to understand | Medium    | Easy         | Hard             |
| Log replication    | Yes       | Yes          | With Multi-Paxos |
| Used in            | ZooKeeper | etcd, Consul | Google systems   |
| Leader election    | Yes       | Yes          | Indirect         |



🧠 CAP Theorem Position

ZAB chooses:

Consistency + Partition Tolerance


Minority partition cannot write.

🎯 When ZAB is Perfect

Use ZAB-like systems when:

✅ Distributed locks
✅ Leader election
✅ Metadata service
✅ Service registry
✅ Configuration system

Not for:

❌ Analytics
❌ Logging systems
❌ Event streaming (Kafka uses different replication now)

🚀 Interview-Ready Definition

ZAB is a leader-based atomic broadcast protocol used by ZooKeeper to guarantee totally ordered, strongly consistent log replication across distributed nodes.

🧠 Advanced Insight (For You)

Since you're learning:

Kafka

Distributed systems

High availability

Understanding ZAB helps you understand:

Why ZooKeeper needs majority quorum

Why Kafka moved away from ZooKeeper (toward KRaft)

Why leader-based replication is simpler than Paxos


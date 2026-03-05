🔥 Let’s build a Mini ZAB (ZooKeeper Atomic Broadcast) Simulation
 in Node.js

We’ll simulate:

1 Leader

3 Followers

Majority quorum = 2

zxid (epoch:counter)

Proposal → ACK → Commit flow

This is a conceptual simulation of how Apache ZooKeeper replicates data internally.

🧠 What We Are Simulating

ZAB Normal Broadcast Phase:

Client → Leader
Leader → PROPOSAL(zxid)
Followers → ACK
Leader → COMMIT
Followers apply change

📁 Project Structure
mini-zab/
 ├── follower.js
 ├── leader.js
 └── index.js

1️⃣ follower.js
class Follower {
  constructor(id) {
    this.id = id;
    this.log = [];
    this.lastZxid = null;
  }

  // Receive proposal
  receiveProposal(zxid, value) {
    console.log(`Follower ${this.id} received PROPOSAL zxid=${zxid}`);

    // Write to local log (but not commit yet)
    this.log.push({ zxid, value, committed: false });
    this.lastZxid = zxid;

    return true; // ACK
  }

  // Receive commit
  receiveCommit(zxid) {
    const entry = this.log.find(e => e.zxid === zxid);
    if (entry) {
      entry.committed = true;
      console.log(`Follower ${this.id} COMMITTED zxid=${zxid}`);
    }
  }
}

module.exports = Follower;

2️⃣ leader.js
class Leader {
  constructor(followers) {
    this.followers = followers;
    this.epoch = 1;      // leader term
    this.counter = 0;    // transaction counter
    this.log = [];
  }

  generateZxid() {
    this.counter++;
    return `${this.epoch}:${this.counter}`;
  }

  // Client write
  propose(value) {
    const zxid = this.generateZxid();
    console.log(`\nLeader proposing value=${value} with zxid=${zxid}`);

    // Add to leader log (uncommitted)
    this.log.push({ zxid, value, committed: false });

    // Send proposal to followers
    let ackCount = 1; // leader counts itself
    for (let follower of this.followers) {
      const ack = follower.receiveProposal(zxid, value);
      if (ack) ackCount++;
    }

    const majority = Math.floor((this.followers.length + 1) / 2) + 1;

    if (ackCount >= majority) {
      console.log(`Majority ACK received (${ackCount}). COMMITTING...`);
      this.commit(zxid);
    } else {
      console.log("Not enough ACKs. Proposal failed.");
    }
  }

  commit(zxid) {
    const entry = this.log.find(e => e.zxid === zxid);
    if (entry) {
      entry.committed = true;
    }

    // Send commit to followers
    for (let follower of this.followers) {
      follower.receiveCommit(zxid);
    }

    console.log(`Leader COMMITTED zxid=${zxid}`);
  }
}

module.exports = Leader;

3️⃣ index.js
const Follower = require("./follower");
const Leader = require("./leader");

// Create followers
const followers = [
  new Follower(1),
  new Follower(2),
  new Follower(3)
];

// Create leader
const leader = new Leader(followers);

// Simulate client writes
leader.propose("Set x = 10");
leader.propose("Set y = 20");

🧪 Run
node index.js

🖥 Expected Output
Leader proposing value=Set x = 10 with zxid=1:1
Follower 1 received PROPOSAL zxid=1:1
Follower 2 received PROPOSAL zxid=1:1
Follower 3 received PROPOSAL zxid=1:1
Majority ACK received (4). COMMITTING...
Follower 1 COMMITTED zxid=1:1
Follower 2 COMMITTED zxid=1:1
Follower 3 COMMITTED zxid=1:1
Leader COMMITTED zxid=1:1

🧠 What This Demonstrates

✅ Leader assigns ordered zxid
✅ Followers write before commit
✅ Majority quorum required
✅ Commit happens only after majority

This is how ZAB ensures:

Strong consistency + total ordering

🔥 How Real ZooKeeper Extends This

Real ZAB also includes:

Leader election

Epoch increment after crash

Log synchronization

Crash recovery

Disk persistence

Network transport (TCP)

🧠 Why ZAB Is Easier Than Paxos

ZAB:

Strict leader model

Sequential log replication

Built for ZooKeeper

Paxos:

More generic

Harder to reason about

More flexible

🏢 Where This Matters

Systems that historically relied on ZooKeeper:

Apache Kafka (pre-KRaft mode)

Apache HBase

Apache Hadoop

🚀 Next Level (Advanced)

If you want, I can now build:

🔥 Add leader crash + re-election simulation

🔥 Compare ZAB vs Raft in code

🔥 Add network delay simulation

🔥 Build distributed lock using this

🔥 Connect to MongoDB for real persistence
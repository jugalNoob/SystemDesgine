🔥 Let’s build a Mini Raft Simulation in Node.js (educational version)

⚠️ This is a concept simulation, not production-ready.
We’ll simulate:

Leader election

Heartbeats

Basic log replication

All running in one Node.js process.

🧠 What We’ll Simulate

Cluster of 3 nodes:

Node A
Node B
Node C


Each node can be:

follower

candidate

leader

We simulate:

Random election timeout

Leader election

Heartbeats

Simple log replication

🟣 Step 1: Create Node Class
class RaftNode {
  constructor(id, cluster) {
    this.id = id;
    this.cluster = cluster;
    this.state = "follower";
    this.term = 0;
    this.votedFor = null;
    this.log = [];
    this.resetElectionTimer();
  }

  logMessage(msg) {
    console.log(`[Node ${this.id}] ${msg}`);
  }

  resetElectionTimer() {
    clearTimeout(this.electionTimeout);
    const timeout = Math.random() * 3000 + 2000;

    this.electionTimeout = setTimeout(() => {
      if (this.state !== "leader") {
        this.startElection();
      }
    }, timeout);
  }

  startElection() {
    this.state = "candidate";
    this.term++;
    this.votedFor = this.id;
    let votes = 1;

    this.logMessage(`Starting election (Term ${this.term})`);

    this.cluster.forEach(node => {
      if (node.id !== this.id) {
        if (node.requestVote(this.term, this.id)) {
          votes++;
        }
      }
    });

    if (votes > this.cluster.length / 2) {
      this.becomeLeader();
    } else {
      this.state = "follower";
      this.resetElectionTimer();
    }
  }

  requestVote(term, candidateId) {
    if (term > this.term) {
      this.term = term;
      this.state = "follower";
      this.votedFor = null;
    }

    if (!this.votedFor) {
      this.votedFor = candidateId;
      this.logMessage(`Voted for Node ${candidateId}`);
      return true;
    }

    return false;
  }

  becomeLeader() {
    this.state = "leader";
    this.logMessage(`🔥 Became Leader (Term ${this.term})`);
    this.startHeartbeat();
  }

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.cluster.forEach(node => {
        if (node.id !== this.id) {
          node.receiveHeartbeat(this.term);
        }
      });
    }, 1000);
  }

  receiveHeartbeat(term) {
    if (term >= this.term) {
      this.term = term;
      this.state = "follower";
      this.resetElectionTimer();
      this.logMessage(`Received heartbeat from leader`);
    }
  }

  appendLog(command) {
    if (this.state !== "leader") {
      this.logMessage("Not leader, cannot append log");
      return;
    }

    this.log.push({ term: this.term, command });
    this.logMessage(`Appended command: ${command}`);

    this.cluster.forEach(node => {
      if (node.id !== this.id) {
        node.replicateLog(this.log);
      }
    });
  }

  replicateLog(leaderLog) {
    this.log = [...leaderLog];
    this.logMessage(`Log replicated`);
  }
}

🟢 Step 2: Create Cluster
const cluster = [];

for (let i = 1; i <= 3; i++) {
  cluster.push(new RaftNode(i, cluster));
}

🟢 Step 3: Simulate Client Write

After few seconds:

setTimeout(() => {
  const leader = cluster.find(node => node.state === "leader");
  if (leader) {
    leader.appendLog("SET x = 10");
  }
}, 8000);

🧠 What Happens When You Run This?

1️⃣ All nodes start as followers
2️⃣ Random timeout triggers election
3️⃣ One becomes leader
4️⃣ Leader sends heartbeat
5️⃣ After 8 seconds → client command appended
6️⃣ Log replicated to followers

📊 Console Output Example
[Node 2] Starting election (Term 1)
[Node 1] Voted for Node 2
[Node 3] Voted for Node 2
[Node 2] 🔥 Became Leader (Term 1)
[Node 1] Received heartbeat from leader
[Node 3] Received heartbeat from leader
[Node 2] Appended command: SET x = 10
[Node 1] Log replicated
[Node 3] Log replicated

🧠 What This Simulation Covers

✅ Leader election
✅ Majority vote
✅ Heartbeats
✅ Log replication
❌ Log consistency checks
❌ Network partition handling
❌ Crash recovery
❌ Commit index
❌ Persistent storage

This is just conceptual.

🏗 Real Systems Using Raft

Raft powers:

etcd (used by Kubernetes)

Consul

CockroachDB

HashiCorp tools

🎯 Why This Matters for You

Since you're learning:

Kafka

Distributed systems

High throughput design

Understanding Raft helps with:

Leader election

Replication

High availability

Cluster coordination

Database internals
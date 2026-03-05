Response 2

Alright. Let’s build a mini Raft simulation in Node.js 🧠⚙️

This is not production Raft.
It’s a small in-memory simulation to understand:

Leader election

Heartbeats

Log replication (basic idea)

No networking. Just simulated nodes talking to each other.


🔥 What We’ll Simulate

We’ll create:

3 Nodes

Leader election

Leader sends heartbeats

Leader replicates a log entry

🏗 Basic Node Structure

Each node has:

id

role (follower | candidate | leader)

term

votedFor

log

peers

🟣 Mini Raft Simulation Code
class RaftNode {
  constructor(id) {
    this.id = id;
    this.role = "follower";
    this.term = 0;
    this.votedFor = null;
    this.log = [];
    this.peers = [];
    this.votes = 0;
  }

  setPeers(peers) {
    this.peers = peers;
  }

  startElection() {
    this.role = "candidate";
    this.term++;
    this.votedFor = this.id;
    this.votes = 1;

    console.log(`Node ${this.id} starts election for term ${this.term}`);

    this.peers.forEach(peer => {
      if (peer.requestVote(this.term, this.id)) {
        this.votes++;
      }
    });

    if (this.votes > (this.peers.length + 1) / 2) {
      this.becomeLeader();
    } else {
      this.role = "follower";
    }
  }

  requestVote(term, candidateId) {
    if (term > this.term) {
      this.term = term;
      this.votedFor = candidateId;
      this.role = "follower";
      console.log(`Node ${this.id} voted for ${candidateId}`);
      return true;
    }
    return false;
  }

  becomeLeader() {
    this.role = "leader";
    console.log(`Node ${this.id} becomes LEADER (term ${this.term})`);
  }

  sendHeartbeat() {
    if (this.role !== "leader") return;

    console.log(`Leader ${this.id} sending heartbeat`);

    this.peers.forEach(peer => {
      peer.receiveHeartbeat(this.term);
    });
  }

  receiveHeartbeat(term) {
    if (term >= this.term) {
      this.term = term;
      this.role = "follower";
      console.log(`Node ${this.id} received heartbeat`);
    }
  }

  appendEntry(command) {
    if (this.role !== "leader") return;

    this.log.push({ term: this.term, command });
    console.log(`Leader ${this.id} appends log:`, command);

    this.peers.forEach(peer => {
      peer.replicateLog(this.log);
    });
  }

  replicateLog(log) {
    this.log = [...log];
    console.log(`Node ${this.id} replicated log`);
  }
}

🚀 Run Simulation
// Create nodes
const node1 = new RaftNode(1);
const node2 = new RaftNode(2);
const node3 = new RaftNode(3);

// Set peers
node1.setPeers([node2, node3]);
node2.setPeers([node1, node3]);
node3.setPeers([node1, node2]);

// Start election
node1.startElection();

// Leader sends heartbeat
node1.sendHeartbeat();

// Leader appends log entry
node1.appendEntry("SET balance=500");

🧠 What You’ll See

1️⃣ Node 1 starts election
2️⃣ Other nodes vote
3️⃣ Node 1 becomes leader
4️⃣ Leader sends heartbeat
5️⃣ Log entry replicated

You just simulated:

Leader election

Majority voting

Log replication

🔥 What This Simulation Simplifies

Real Raft also includes:

Election timeout

Persistent logs

Commit index

Crash recovery

Log consistency checks

Network partitions

This example shows only the core concept.

🏢 Where This Happens in Real Systems

Systems using Raft internally:

HashiCorp → Consul

CoreOS → etcd

Docker → Swarm

Cockroach Labs → CockroachDB

Kubernetes stores cluster state in etcd → etcd uses Raft.

🎯 How This Connects to Your Learning

Since you're working on:

Distributed systems

Kafka leader partitions

High availability backend

Understanding Raft helps you understand:

Leader election in Kafka

Replica sets in MongoDB

Distributed database consistency

🧠 Interview One-Line Explanation

In Raft, nodes elect a leader via majority voting. The leader replicates log entries to followers and commits once majority acknowledges, ensuring strong consistency.
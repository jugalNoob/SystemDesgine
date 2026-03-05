🔥 Paxos Algorithm (Deep Explanation)

Paxos is a distributed consensus algorithm.

👉 It ensures multiple distributed nodes agree on one consistent value, even if:

Some nodes crash

Messages are delayed

Network partitions happen

It solves the Consensus Problem.

🧠 The Core Problem Paxos Solves

Imagine:

You have 5 servers storing account balance.

Client says:

Set balance = 500


Questions:

What if 2 servers crash?

What if network splits?

What if two leaders try writing at same time?

Paxos ensures:

✅ Only one value gets chosen
✅ Majority agreement
✅ Safety over availability

🔥 Paxos Roles

There are 3 main roles:

1️⃣ Proposer

Suggests a value.

2️⃣ Acceptor

Votes on proposals.

3️⃣ Learner

Learns final chosen value.

A single node can play multiple roles.

🏗 Basic Paxos Flow (Single-Decree Paxos)

Paxos happens in 2 phases.

🔵 Phase 1: Prepare Phase

Proposer sends:

PREPARE(n)


Where n = proposal number (must be unique and increasing).

Acceptor replies:

PROMISE


If:

It has not already promised a higher number.

If acceptor already accepted a value:

It returns the accepted value.

🔴 Phase 2: Accept Phase

Proposer sends:

ACCEPT(n, value)


Acceptors accept if:

They have not promised a higher number.

If majority accept → value chosen.

📊 Majority Rule

If total nodes = 5
Majority = 3

Once 3 accept → consensus achieved.

🧠 Why Proposal Numbers Matter?

To prevent:

Two proposers choosing different values.

Split brain.

Higher proposal number always wins.

🎯 Paxos Guarantees

Safety

Only one value chosen.

Liveness

Eventually a value gets chosen (if network stable).

🔥 Example Scenario

Nodes: A, B, C

Proposer 1 proposes value = 10
Proposer 2 proposes value = 20

If proposal number of 2 is higher →
20 wins.

🟣 Simple Conceptual Code (Simulation Idea)
class Acceptor {
  constructor() {
    this.promised = null;
    this.accepted = null;
  }

  prepare(n) {
    if (!this.promised || n > this.promised) {
      this.promised = n;
      return { promise: true, accepted: this.accepted };
    }
    return { promise: false };
  }

  accept(n, value) {
    if (n >= this.promised) {
      this.accepted = value;
      return true;
    }
    return false;
  }
}


This is very simplified. Real Paxos is much more complex.
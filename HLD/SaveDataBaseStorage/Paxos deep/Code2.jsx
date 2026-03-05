🔥 Let’s build a Mini Paxos Simulation in Node.js

We’ll simulate:

1 Proposer

3 Acceptors

Majority = 2

In-memory (no real network)

Single value consensus (Single-Decree Paxos)

This is perfect for system design understanding.

🧠 Architecture
        Proposer
           |
  ---------------------
  |        |         |
Acceptor1 Acceptor2 Acceptor3


If 2 accept → value chosen ✅

📁 Simple Project Structure
mini-paxos/
 ├── acceptor.js
 ├── proposer.js
 └── index.js

1️⃣ acceptor.js
class Acceptor {
  constructor(id) {
    this.id = id;
    this.promisedNumber = null;
    this.acceptedNumber = null;
    this.acceptedValue = null;
  }

  // Phase 1: Prepare
  receivePrepare(proposalNumber) {
    if (
      this.promisedNumber === null ||
      proposalNumber > this.promisedNumber
    ) {
      this.promisedNumber = proposalNumber;

      console.log(`Acceptor ${this.id} PROMISE for proposal ${proposalNumber}`);

      return {
        promise: true,
        acceptedNumber: this.acceptedNumber,
        acceptedValue: this.acceptedValue
      };
    }

    console.log(`Acceptor ${this.id} REJECT prepare ${proposalNumber}`);
    return { promise: false };
  }

  // Phase 2: Accept
  receiveAccept(proposalNumber, value) {
    if (proposalNumber >= this.promisedNumber) {
      this.acceptedNumber = proposalNumber;
      this.acceptedValue = value;

      console.log(`Acceptor ${this.id} ACCEPTED value: ${value}`);
      return true;
    }

    console.log(`Acceptor ${this.id} REJECT accept ${proposalNumber}`);
    return false;
  }
}

module.exports = Acceptor;

2️⃣ proposer.js
class Proposer {
  constructor(id, acceptors) {
    this.id = id;
    this.acceptors = acceptors;
    this.proposalNumber = 0;
  }

  propose(value) {
    this.proposalNumber++;

    console.log(`\nProposer ${this.id} proposing value: ${value}`);
    console.log(`Proposal number: ${this.proposalNumber}`);

    // Phase 1: Prepare
    let promises = [];

    for (let acc of this.acceptors) {
      const response = acc.receivePrepare(this.proposalNumber);
      if (response.promise) {
        promises.push(response);
      }
    }

    const majority = Math.floor(this.acceptors.length / 2) + 1;

    if (promises.length < majority) {
      console.log("❌ Not enough promises. Proposal failed.");
      return;
    }

    // Check if any acceptor already accepted a value
    let highestAccepted = null;

    for (let p of promises) {
      if (p.acceptedNumber !== null) {
        highestAccepted = p.acceptedValue;
      }
    }

    const finalValue = highestAccepted || value;

    // Phase 2: Accept
    let acceptedCount = 0;

    for (let acc of this.acceptors) {
      if (acc.receiveAccept(this.proposalNumber, finalValue)) {
        acceptedCount++;
      }
    }

    if (acceptedCount >= majority) {
      console.log(`\n✅ CONSENSUS REACHED! Final Value = ${finalValue}`);
    } else {
      console.log("❌ Consensus failed in accept phase.");
    }
  }
}

module.exports = Proposer;

3️⃣ index.js
const Acceptor = require("./acceptor");
const Proposer = require("./proposer");

// Create 3 acceptors
const acceptors = [
  new Acceptor(1),
  new Acceptor(2),
  new Acceptor(3),
];

// Create proposer
const proposer = new Proposer("P1", acceptors);

// Propose value
proposer.propose(100);

🧪 Run It
node index.js


You’ll see:

Proposer P1 proposing value: 100
Acceptor 1 PROMISE
Acceptor 2 PROMISE
Acceptor 3 PROMISE
Acceptor 1 ACCEPTED value: 100
Acceptor 2 ACCEPTED value: 100
Acceptor 3 ACCEPTED value: 100

✅ CONSENSUS REACHED! Final Value = 100

🧠 What This Simulation Teaches You
1️⃣ Prepare Phase prevents split brain

Acceptors promise not to accept smaller numbers.

2️⃣ Accept Phase ensures majority agreement
3️⃣ Proposal numbers solve concurrency conflict
🔥 Now Let’s Simulate Conflict

Add another proposer:

const proposer2 = new Proposer("P2", acceptors);
proposer2.propose(200);


If proposal number is higher → new value wins.

That’s Paxos safety guarantee.

🚨 What This Simulation Does NOT Cover

Real Paxos has:

Network delays

Node crash recovery

Message retransmission

Multi-Paxos log replication

Leader optimization

This is conceptual understanding only.

🏢 Real-World Usage

Paxos-style consensus is used in:

Google → Chubby & Spanner

Microsoft → Azure distributed storage

Apache Cassandra → Lightweight transactions

Amazon → Dynamo-like systems

🎯 When This Matters in Interviews

If interviewer asks:

“How does distributed database ensure only one leader writes?”

You explain:

Majority quorum

Proposal numbers

Prepare + Accept phase

Safety guarantee

And mention Paxos.
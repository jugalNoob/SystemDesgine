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

🔥 Multi-Paxos (Used in Real Systems)

Single Paxos chooses one value.

Multi-Paxos:

Elects stable leader

Leader proposes multiple values

Avoids repeating full prepare phase every time

More efficient.

📊 Paxos vs Raft


| Feature            | Paxos    | Raft     |
| ------------------ | -------- | -------- |
| Hard to understand | Yes      | Easier   |
| Production use     | Yes      | Yes      |
| Leader election    | Implicit | Explicit |
| Log replication    | Complex  | Clear    |





Raft was designed to be easier than Paxos.

🏢 Real Systems Using Paxos

Many distributed systems use Paxos (or Paxos-like algorithms):

Google → Chubby lock service

Microsoft → Azure Storage

Amazon → Dynamo-style systems (Paxos variants)

Apple → Distributed services

Apache Cassandra → Lightweight transactions

Spanner → Paxos-based replication

🔥 Paxos in Google Chubby

Google’s distributed lock service:

Client → Chubby → Paxos consensus


Ensures:

Only one master lock holder

Strong consistency

🧠 Why Paxos Is Difficult

Because:

No single clear leader in basic Paxos

Many edge cases

Hard to reason about

Paper is mathematically written

Raft simplified this.

🔥 CAP Theorem Relation

Paxos chooses:

Consistency + Partition Tolerance


If network split:

Minority partition cannot accept writes.

🎯 When To Use Paxos

✅ Distributed database
✅ Strong consistency required
✅ Leader election
✅ Financial-grade distributed system
✅ Metadata coordination

❌ When NOT To Use

❌ Simple REST API
❌ Stateless services
❌ Analytics systems
❌ Event logging

🧠 Interview One-Line Answer

Paxos is a distributed consensus algorithm that ensures a group of unreliable nodes agree on a single value using a two-phase majority-based voting protocol.

🚀 Deep System Design Insight (For You)

Since you’re learning:

Kafka

Distributed systems

High availability

Microservices

Understanding Paxos helps you understand:

How distributed databases maintain consistency

How leader election works

Why majority quorum is important

Why consistency costs performance







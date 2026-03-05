Perfect 🔥 Let’s build a Mini Gossip Protocol in Node.js (simple but powerful).

We’ll simulate:

Multiple Node.js servers (nodes)

Each node knows some peers

Every few seconds, a node randomly gossips its state

Eventually all nodes know the same information

🏗 Architecture
Node A  ←→  Node B
   ↑         ↓
Node D  ←→  Node C


Each node:

Has its own state

Periodically sends state to random peer

Merges received state

🎯 Goal

Spread this message across all nodes:

{ version: 1, message: "Hello Cluster" }

✅ Step 1 — Install Dependencies
npm init -y
npm install express axios

✅ Step 2 — Create node.js
import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// Unique node ID
const PORT = process.env.PORT || 3001;
const NODE_ID = `Node-${PORT}`;

// List of peers (other nodes)
const peers = (process.env.PEERS || "").split(",");

// Local state
let state = {
  version: 1,
  message: "Hello Cluster",
  timestamp: Date.now()
};

// 📨 Endpoint to receive gossip
app.post("/gossip", (req, res) => {
  const incoming = req.body;

  // Merge rule → latest timestamp wins
  if (incoming.timestamp > state.timestamp) {
    console.log(`${NODE_ID} updated state from peer`);
    state = incoming;
  }

  res.send({ status: "ok" });
});

// 🔁 Gossip periodically
setInterval(async () => {
  if (peers.length === 0) return;

  const randomPeer = peers[Math.floor(Math.random() * peers.length)];

  try {
    await axios.post(`${randomPeer}/gossip`, state);
    console.log(`${NODE_ID} gossiped to ${randomPeer}`);
  } catch (err) {
    console.log(`${NODE_ID} failed to reach ${randomPeer}`);
  }
}, 5000);

app.get("/", (req, res) => {
  res.send({
    node: NODE_ID,
    state
  });
});

app.listen(PORT, () => {
  console.log(`${NODE_ID} running on port ${PORT}`);
});

✅ Step 3 — Run Multiple Nodes

Open 3 terminals:

Terminal 1
PORT=3001 PEERS=http://localhost:3002,http://localhost:3003 node node.js

Terminal 2
PORT=3002 PEERS=http://localhost:3001,http://localhost:3003 node node.js

Terminal 3
PORT=3003 PEERS=http://localhost:3001,http://localhost:3002 node node.js

🧪 Test Gossip

Modify state manually in one node (change message).

Within 5–10 seconds, other nodes will update automatically.

Check:

http://localhost:3001
http://localhost:3002
http://localhost:3003


All nodes converge to same state.

🧠 What Just Happened?

Each node:

Randomly selected peer

Sent its state

Merged newer version

Eventually all nodes synced

This is the core idea used by:

Apache Cassandra

Consul

HashiCorp Serf

🔥 Improvements (Production Level)

To make it real-world ready:

1️⃣ Add heartbeat

Mark nodes as dead if no gossip received.

2️⃣ Add version numbers (vector clocks)

Instead of timestamp-only.

3️⃣ Use UDP instead of HTTP

Gossip protocols are often UDP-based for speed.

4️⃣ Limit fan-out

Send to 2–3 peers per round.

5️⃣ Add anti-entropy sync

Periodic full state reconciliation.

🎯 Interview Explanation

In a mini gossip implementation, each Node.js instance periodically selects a random peer and exchanges its state. The receiving node merges the state based on a conflict resolution rule (e.g., latest timestamp wins). Over time, this ensures eventual consistency across the cluster without central coordination.

⚠️ Important

This demo is:

Educational

Eventually consistent

Not strongly consistent

Not optimized

Real systems like Apache Cassandra use advanced failure detection + state digests + vector clocks.
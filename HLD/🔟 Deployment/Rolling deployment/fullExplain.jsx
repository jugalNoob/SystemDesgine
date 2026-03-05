Perfect Jugal 👍
Let’s make Rolling Deployment for Kafka Consumers very simple + small code example.

No heavy theory.

🔄 Rolling Deployment (Simple Meaning)

Rolling =

👉 Update consumers one by one
👉 Kafka keeps processing messages
👉 No downtime

Example:

You have 3 consumers running.

Instead of stopping all 3, you:

Stop 1

Start new version

Repeat

System always alive.

🧠 Simple Real Example

You have:

Topic: orders

3 consumers (v1)

Same group: order-group

Kafka distributes partitions automatically.

Now you want to deploy v2.

You do:

Stop consumer-1
Start consumer-1 (v2)
Stop consumer-2
Start consumer-2 (v2)
Stop consumer-3
Start consumer-3 (v2)


That’s Rolling.

🧩 Important: Graceful Shutdown (Very Important)

If you just kill process ❌
Messages may duplicate.

Instead do this:

🧑‍💻 Simple Kafka Consumer Code (Node.js)

Using kafkajs

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "order-group" });

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Processing:", message.value.toString());

      // Simulate DB save
      await new Promise(res => setTimeout(res, 100));
    },
  });
}

start();

🛑 Add Graceful Shutdown (For Rolling)
process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await consumer.disconnect();
  process.exit(0);
});


This ensures:

Offsets committed

No message loss

Safe rebalance

🐳 Rolling With Docker (Simple Way)

If running 3 containers:

docker ps


Stop one:

docker stop consumer-1


Start new version:

docker run my-new-image


Then repeat for next container.

That’s it.

📊 Why Kafka Supports Rolling?

Because Kafka:

Tracks offsets

Reassigns partitions automatically

Handles rebalance

So system keeps running.

🆚 Very Simple Difference


| Deployment | What Happens         |
| ---------- | -------------------- |
| Blue-Green | Switch all at once   |
| Canary     | Send small % traffic |
| Rolling    | Replace one by one   |

🎯 Interview Short Answer

If asked:

What is Rolling Deployment?

You say:

Rolling deployment updates application instances one at a time while others continue running, ensuring zero downtime.

If asked about Kafka:

Kafka automatically rebalances partitions when a consumer instance is replaced.

That’s clean and correct.
🌐 What is Redis Pub/Sub?

Pub/Sub = Publish / Subscribe messaging system inside Redis.

It allows real-time communication between processes, services, or servers.

Unlike Streams, messages are not persisted → subscribers must be online to receive messages.

Think of it as instant messaging where publishers send messages to channels, and subscribers receive them in real-time.

🧠 Core Concepts


| Concept                  | Explanation                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| **Publisher**            | Sends messages to a channel using `PUBLISH`                             |
| **Subscriber**           | Listens to a channel using `SUBSCRIBE`                                  |
| **Channel**              | Named message topic; messages are sent to channels                      |
| **Pattern Subscription** | `PSUBSCRIBE` → subscribe to multiple channels using patterns (`news.*`) |
| **Delivery**             | Messages are **real-time only**, no persistence                         |
| **Broadcast**            | Multiple subscribers can receive the same message                       |



🔥 Core Commands
1️⃣ SUBSCRIBE

Listen to a channel

SUBSCRIBE mychannel


Subscriber waits for messages published to this channel

2️⃣ PUBLISH

Send a message to a channel

PUBLISH mychannel "Hello, world!"


All subscribers to mychannel receive the message instantly

3️⃣ UNSUBSCRIBE

Stop listening to a channel

UNSUBSCRIBE mychannel

4️⃣ PSUBSCRIBE

Subscribe using a pattern

PSUBSCRIBE news.*


Receives messages from all channels matching news.*

Example: news.sports, news.weather

5️⃣ PUNSUBSCRIBE

Stop pattern subscription

PUNSUBSCRIBE news.*

🔹 Node.js Example
const redis = require('redis');

// Subscriber
const subscriber = redis.createClient();
await subscriber.connect();

subscriber.subscribe('mychannel', (message) => {
    console.log('Received:', message);
});

// Publisher
const publisher = redis.createClient();
await publisher.connect();

setTimeout(async () => {
    await publisher.publish('mychannel', 'Hello Subscribers!');
}, 1000);


Output (Subscriber):

Received: Hello Subscribers!


You can have multiple subscribers receiving the same message

🔹 Pub/Sub Use-Cases

Real-time notifications

Chat apps, alerts, push notifications

Event broadcasting

Update multiple services when an event occurs

Live dashboards / feeds

Real-time stats, stock tickers, game scores

Microservices communication

Lightweight event-driven communication

Pattern-based messaging

Subscribe to groups of channels dynamically

🔹 Key Differences: Pub/Sub vs Streams


🔥 Core Commands
1️⃣ SUBSCRIBE

Listen to a channel

SUBSCRIBE mychannel


Subscriber waits for messages published to this channel

2️⃣ PUBLISH

Send a message to a channel

PUBLISH mychannel "Hello, world!"


All subscribers to mychannel receive the message instantly

3️⃣ UNSUBSCRIBE

Stop listening to a channel

UNSUBSCRIBE mychannel

4️⃣ PSUBSCRIBE

Subscribe using a pattern

PSUBSCRIBE news.*


Receives messages from all channels matching news.*

Example: news.sports, news.weather

5️⃣ PUNSUBSCRIBE

Stop pattern subscription

PUNSUBSCRIBE news.*

🔹 Node.js Example
const redis = require('redis');

// Subscriber
const subscriber = redis.createClient();
await subscriber.connect();

subscriber.subscribe('mychannel', (message) => {
    console.log('Received:', message);
});

// Publisher
const publisher = redis.createClient();
await publisher.connect();

setTimeout(async () => {
    await publisher.publish('mychannel', 'Hello Subscribers!');
}, 1000);


Output (Subscriber):

Received: Hello Subscribers!


You can have multiple subscribers receiving the same message



🔹 Pub/Sub Use-Cases

1:: Real-time notifications

Chat apps, alerts, push notifications

2:: Event broadcasting

Update multiple services when an event occurs

3:: Live dashboards / feeds

Real-time stats, stock tickers, game scores

4:: Microservices communication

Lightweight event-driven communication

5:: Pattern-based messaging

Subscribe to groups of channels dynamically

🔹 Key Differences: Pub/Sub vs Streams


🔹 Key Differences: Pub/Sub vs Streams

| Feature         | Pub/Sub                               | Streams                                |
| --------------- | ------------------------------------- | -------------------------------------- |
| Persistence     | ❌ No                                  | ✅ Yes (append-only)                    |
| Reliability     | ❌ Messages lost if subscriber offline | ✅ Messages retained until acknowledged |
| Consumer Groups | ❌ No                                  | ✅ Yes, supports multiple consumers     |
| Use Case        | Real-time notifications               | Event queues, logging, processing      |




🔑 Key Notes

Pub/Sub is real-time, broadcast messaging, lightweight but not durable

Best for live updates and event notifications

If you need reliable delivery, consider Streams with Consumer Groups
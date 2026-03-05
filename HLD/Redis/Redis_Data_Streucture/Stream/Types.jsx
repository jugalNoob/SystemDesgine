🌐 What is Redis Streams?

Streams = an append-only log of messages in Redis.

Each message has:

ID → unique, auto-generated (timestamp-sequence)

Fields → key-value pairs (like a small object)

Supports consumer groups, so multiple consumers can read messages without missing any.

Think of Redis Streams as Kafka-lite inside Redis for event queues and messaging.



🧠 Core Concepts


| Concept        | Explanation                                    |
| -------------- | ---------------------------------------------- |
| **XADD**       | Add message to stream                          |
| **XREAD**      | Read messages from a stream                    |
| **XGROUP**     | Create a consumer group                        |
| **XREADGROUP** | Consumers read messages in a group             |
| **XACK**       | Acknowledge message processing                 |
| **XPENDING**   | Check pending (unprocessed) messages           |
| **XTRIM**      | Trim stream to limit memory usage              |
| **Stream ID**  | Auto-generated unique ID: `timestamp-sequence` |


🔥 Core Commands
1️⃣ XADD

Add a message to the stream

XADD mystream * user Alice action login


* → auto-generate ID

Fields = key-value pairs (user, action)

2️⃣ XREAD

Read messages from stream (like polling)

XREAD COUNT 2 STREAMS mystream 0


0 → read from beginning

COUNT 2 → read 2 messages

3️⃣ XGROUP

Create a consumer group

XGROUP CREATE mystream mygroup 0


mygroup → name of consumer group

0 → read from start

4️⃣ XREADGROUP

Read messages as a consumer in a group

XREADGROUP GROUP mygroup Alice COUNT 2 STREAMS mystream >


> → only get new messages

Alice → consumer name

Supports multiple consumers

5️⃣ XACK

Acknowledge a message after processing

XACK mystream mygroup 1607515091701-0


Marks message as processed

Keeps pending messages for reliability

6️⃣ XPENDING

Check pending messages

XPENDING mystream mygroup


Shows messages delivered but not yet acknowledged

7️⃣ XTRIM

Trim stream to limit memory usage

XTRIM mystream MAXLEN 1000


Keep only latest 1000 messages

Prevent unbounded memory growth

🏗 Node.js Example
const redis = require('redis');
const client = redis.createClient();
await client.connect();

// Add message to stream
await client.xAdd('mystream', '*', { user: 'Alice', action: 'login' });

// Read all messages from beginning
const messages = await client.xRead(
    [{ key: 'mystream', id: '0' }],
    { COUNT: 10 }
);
console.log(messages);

// Create consumer group
try { await client.xGroupCreate('mystream', 'mygroup', '0'); } catch(e){}

// Read messages as consumer 'Alice'
const groupMessages = await client.xReadGroup(
    'mygroup',
    'Alice',
    [{ key: 'mystream', id: '>' }],
    { COUNT: 2 }
);
console.log(groupMessages);

// Acknowledge message
await client.xAck('mystream', 'mygroup', '1607515091701-0');

🔹 Project Use-Cases

Event queues / job queues

Background jobs, order processing, email queues

Messaging / chat apps

Real-time messages with multiple consumers

Activity logs / audit logs

Append-only event storage for analytics

Microservices communication

Reliable message delivery between services

Real-time analytics pipelines

Combine streams + consumer groups to process events in near real-time

🔑 Key Notes

Supports durable, ordered messages → ideal for distributed systems

Consumer groups allow multiple consumers to share load without losing messages

Can trim streams to prevent memory growth

Integrates well with Node.js for real-time apps
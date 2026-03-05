The Mediator Pattern is used when many objects need to communicate, but you don’t want them to depend directly on each other.

Instead of:

User A → User B
User B → User C
User C → User D


Everything goes through one central object (Mediator).

User → Mediator → Other Users


This reduces coupling and makes systems easier to maintain.

1️⃣ Simple Meaning

Mediator = Central Controller

It manages communication between objects.

Example in Chat System

User A sends message
       ↓
ChatRoom (Mediator)
       ↓
ChatRoom forwards message to User B, User C


Users do not talk directly to each other.

2️⃣ Real World Example
Chat Application

Apps like:

WhatsApp

Slack

Discord

Architecture:

User → Chat Server (Mediator) → Other Users


Users never connect directly.

3️⃣ Structure Diagram
        +-------------+
        |  Mediator   |
        |  ChatRoom   |
        +-------------+
          ↑     ↑
          |     |
      +------+ +------+
      |User A| |User B|
      +------+ +------+
           ↑
        +------+
        |User C|
        +------+


Users send message to Mediator, mediator distributes message.

4️⃣ Node.js Example (Chat Mediator)
Step 1 — Mediator
class ChatRoom {
  constructor() {
    this.users = [];
  }

  register(user) {
    this.users.push(user);
  }

  send(message, sender) {
    this.users.forEach(user => {
      if (user !== sender) {
        user.receive(message, sender.name);
      }
    });
  }
}

Step 2 — User Class
class User {
  constructor(name, chatRoom) {
    this.name = name;
    this.chatRoom = chatRoom;
  }

  send(message) {
    console.log(this.name + " sends: " + message);
    this.chatRoom.send(message, this);
  }

  receive(message, sender) {
    console.log(this.name + " received from " + sender + ": " + message);
  }
}

Step 3 — Use Mediator
const chatRoom = new ChatRoom();

const user1 = new User("Alice", chatRoom);
const user2 = new User("Bob", chatRoom);
const user3 = new User("Charlie", chatRoom);

chatRoom.register(user1);
chatRoom.register(user2);
chatRoom.register(user3);

user1.send("Hello everyone!");

Output
Alice sends: Hello everyone!
Bob received from Alice: Hello everyone!
Charlie received from Alice: Hello everyone!

5️⃣ Real Backend Example

Mediator pattern is used in:

Microservices Event Hub
Service A
   ↓
Event Bus (Mediator)
   ↓
Service B
Service C
Service D


Technologies used as Mediator

Apache Kafka

RabbitMQ

Redis Pub/Sub

6️⃣ Chat System Architecture (Real)
Client (WebSocket)
      ↓
Chat Server (Mediator)
      ↓
Redis Pub/Sub
      ↓
Other Users

7️⃣ When to Use Mediator

Use when:

✔ Many objects communicate
✔ Too many dependencies
✔ Want centralized communication

Example systems


| System        | Mediator      |
| ------------- | ------------- |
| Chat app      | Chat Server   |
| Microservices | Event Bus     |
| Air traffic   | Control Tower |
| UI components | Controller    |


8️⃣ Interview Answer (Short)

Mediator Pattern

A behavioral design pattern that centralizes communication between objects so they do not communicate directly.

Example:

Chat Room

Event Bus

Message Broker

✅ Mediator vs Observer vs Proxy (Interview favorite)


| Pattern  | Purpose                      |
| -------- | ---------------------------- |
| Proxy    | Control access (cache, auth) |
| Observer | Notify subscribers           |
| Mediator | Central communication        |

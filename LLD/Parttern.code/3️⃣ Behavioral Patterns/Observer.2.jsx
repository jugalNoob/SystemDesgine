🔹 What is Observer Pattern?

The Observer Pattern is when one object (Subject) notifies many other objects (Observers) when something changes.

Simple idea:

1 Event  →  Many Listeners


Example:

YouTube Channel
     │
 ┌───┼────┐
User1 User2 User3


When a new video uploads, all users get notifications.

🔹 Structure

Observer pattern has two main parts:

1️⃣ Subject (Publisher)

The object that generates events.

Example:

Chat server

Notification service

Kafka topic

YouTube channel

2️⃣ Observers (Subscribers)

Objects that listen for updates.

Example:

Users

Email service

SMS service

Push notification service

🔹 Architecture
          Subscribers
        ┌─────────────┐
        │  User A     │
        │  User B     │
        │  User C     │
        └──────▲──────┘
               │
               │ notify()
               │
         Chat Server
           (Subject)


When chat message arrives, server notifies all users.

🔹 JavaScript Example (Chat Notification)
Step 1 — Observer (User)
class User {

  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(this.name + " received message: " + message);
  }

}

Step 2 — Subject (ChatRoom)
class ChatRoom {

  constructor() {
    this.users = [];
  }

  subscribe(user) {
    this.users.push(user);
  }

  sendMessage(message) {
    this.notifyUsers(message);
  }

  notifyUsers(message) {
    this.users.forEach(user => user.update(message));
  }

}

Step 3 — Client Code
const chat = new ChatRoom();

const user1 = new User("Alice");
const user2 = new User("Bob");

chat.subscribe(user1);
chat.subscribe(user2);

chat.sendMessage("Hello everyone!");

🔹 Output
Alice received message: Hello everyone!
Bob received message: Hello everyone!


One message → multiple users notified.

🔹 Real System Example (Very Important)
Chat System
User A sends message
        │
        ▼
Chat Server (Subject)
        │
 ┌──────┼────────┐
 ▼      ▼        ▼
User B  User C  User D


Server broadcasts message to all subscribers.

🔹 Observer in Modern Backend Systems

| System              | Observer Example           |
| ------------------- | -------------------------- |
| Kafka               | Producer → many consumers  |
| Notification system | Event → email + SMS + push |
| Chat apps           | Message → all participants |
| Microservices       | Event-driven architecture  |
| Webhooks            | Event → external services  |


Example:

Order Created Event
      │
 ┌────┼─────┬─────┐
 ▼    ▼     ▼     ▼
Email SMS Analytics Inventory


All services get notified.

🔹 Observer vs Pub/Sub

They are very similar.

| Pattern  | Example                               |
| -------- | ------------------------------------- |
| Observer | Objects inside application            |
| Pub/Sub  | Distributed systems (Kafka, RabbitMQ) |


Example:

Producer → Kafka Topic → Multiple Consumers


This is Observer pattern at scale.

🔹 Why Interviewers Like This Pattern

Because many real systems depend on events:

notifications

microservices

event-driven architecture

Kafka systems

chat systems

🔹 LLD Example

Design Notification System

Event: OrderPlaced
        │
        ▼
NotificationService
        │
 ┌──────┼────────┬────────┐
 ▼      ▼        ▼        ▼
Email   SMS    Push     Analytics


Observer pattern sends notifications to multiple services.

💡 Interview One-Line Answer

Observer Pattern defines a one-to-many dependency, where when one object changes state, all its subscribers are automatically notified.
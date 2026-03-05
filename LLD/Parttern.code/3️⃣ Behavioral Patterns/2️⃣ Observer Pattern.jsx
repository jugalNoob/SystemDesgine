2️⃣ Observer Pattern
Example: Notification System
Meaning

Observer pattern is Publish-Subscribe.

When one object changes, all subscribers get notified.

Example:

YouTube Channel
     │
 ┌───┼────┐
User1 User2 User3


When a video uploads → all users get notifications.

Code Example

Subject

class Channel {

  constructor() {
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }

  notify(video) {
    this.subscribers.forEach(user => user.update(video));
  }

}


Observer

class User {

  constructor(name) {
    this.name = name;
  }

  update(video) {
    console.log(this.name + " notified about " + video);
  }

}


Client

const channel = new Channel();

const user1 = new User("Alice");
const user2 = new User("Bob");

channel.subscribe(user1);
channel.subscribe(user2);

channel.notify("New Video Uploaded");

Output
Alice notified about New Video Uploaded
Bob notified about New Video Uploaded

Real Systems Using Observer


| System              | Observer Example          |
| ------------------- | ------------------------- |
| Kafka               | Producer → Consumers      |
| Notification system | Event → users notified    |
| Microservices       | Event driven architecture |
| Webhooks            | Event → external systems  |

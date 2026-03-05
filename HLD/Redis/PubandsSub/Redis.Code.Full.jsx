🔹 Advanced Pattern Subscription
Publisher sends: PUBLISH news.sports "New Football Match"
Publisher sends: PUBLISH news.weather "Rain Alert"

Subscriber subscribes:
PSUBSCRIBE news.*
  → Receives both messages matching the pattern


Pattern subscription allows dynamic channel grouping.

Example: news.*, alerts.*, chat.*

🔹 Node.js Example (Pub/Sub + Pattern)
const redis = require('redis');

// Subscriber 1: Specific channel
const subscriber1 = redis.createClient();
await subscriber1.connect();
subscriber1.subscribe('chat', (message) => {
  console.log('Subscriber1 got:', message);
});

// Subscriber 2: Pattern subscription
const subscriber2 = redis.createClient();
await subscriber2.connect();
subscriber2.pSubscribe('news.*', (message, channel) => {
  console.log(`Subscriber2 got from ${channel}:`, message);
});

// Publisher
const publisher = redis.createClient();
await publisher.connect();

// Send messages
await publisher.publish('chat', 'Hello Chat Subscribers!');
await publisher.publish('news.sports', 'Football Match Tonight!');
await publisher.publish('news.weather', 'Rain Alert!');


Output:

Subscriber1 got: Hello Chat Subscribers!
Subscriber2 got from news.sports: Football Match Tonight!
Subscriber2 got from news.weather: Rain Alert!

🔹 Key Points / Production Tips

Real-time only → Subscribers must be online to receive messages

Multiple subscribers → Broadcast messages to all in real-time

Pattern subscriptions → Dynamically listen to groups of channels

Not durable → Use Streams if you need persistence and replay

Use-case → Chat apps, live notifications, stock tickers, live dashboards

🔹 When to Use


| Scenario                           | Use Pub/Sub?    | Notes                            |
| ---------------------------------- | --------------- | -------------------------------- |
| Live chat messages                 | ✅               | Real-time delivery               |
| Real-time notifications            | ✅               | Broadcast instantly              |
| Event queue with persistence       | ❌               | Use Streams instead              |
| Microservices eventing             | ✅ (small scale) | For small / fast events          |
| Multi-consumer reliable processing | ❌               | Use Streams with consumer groups |







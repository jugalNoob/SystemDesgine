| Feature      | List              | Pub/Sub                               |
| ------------ | ----------------- | ------------------------------------- |
| History      | ✅ Yes             | ❌ No                                  |
| Real-time    | ❌ No              | ✅ Yes                                 |
| Offline safe | ✅ Can read later  | ❌ If offline, message lost            |
| Best for     | Chat logs, queues | Instant notifications to online users |


💡 Interview Tip:

“In real-time chat systems, we store messages in a Redis List for history and use 
Pub/Sub to notify online clients. This ensures no data is lost while still enabling instant notifications.”


Perfect! Let’s combine Redis List + Pub/Sub so that:

Messages are stored in a List (history)

New messages trigger a Pub/Sub notification to subscribers

This is exactly like a real-time chat system.

🔹 Node.js Example: Chat with List + Pub/Sub
const redis = require("redis");

// Create Redis clients
const client = redis.createClient(); // For List operations
const publisher = client.duplicate(); // For Pub/Sub publish
const subscriber = client.duplicate(); // For Pub/Sub subscribe

async function main() {
  await client.connect();
  await publisher.connect();
  await subscriber.connect();

  const chatRoom = "chat:room1";

  // Subscriber listens for new messages
  await subscriber.subscribe(chatRoom, (msg) => {
    console.log("📢 New notification:", msg);
  });

  // Function to send a message
  async function sendMessage(user, message) {
    const msgObj = { user, message, timestamp: Date.now() };

    // 1️⃣ Save to List (chat history)
    await client.rPush(chatRoom, JSON.stringify(msgObj));

    // Optional: keep only last 50 messages
    await client.lTrim(chatRoom, -50, -1);

    // 2️⃣ Publish notification
    await publisher.publish(chatRoom, `${user} sent a new message: "${message}"`);
  }

  // Send messages
  await sendMessage("Alice", "Hi!");
  await sendMessage("Bob", "Hello!");
  
  // Get last 10 messages (history)
  const messages = await client.lRange(chatRoom, -10, -1);
  console.log("📝 Chat history:");
  messages.forEach(msg => console.log(JSON.parse(msg)));
}

main();

🔹 How It Works

List (rPush) → Stores all messages in order → you can retrieve chat history anytime.

Pub/Sub (publish) → Notifies all online subscribers instantly when a new message is sent.

Trim (lTrim) → Keeps List size limited → prevents memory overflow.

🔹 Output Example
📢 New notification: Alice sent a new message: "Hi!"
📢 New notification: Bob sent a new message: "Hello!"
📝 Chat history:
{ user: 'Alice', message: 'Hi!', timestamp: 1680000000000 }
{ user: 'Bob', message: 'Hello!', timestamp: 1680000000001 }



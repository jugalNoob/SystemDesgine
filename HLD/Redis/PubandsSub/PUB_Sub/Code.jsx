🔹 Quick Examples

Queue (List):

await client.lPush("queue:jobs", JSON.stringify({ job: "sendEmail", user: 101 }));
const job = await client.rPop("queue:jobs");
console.log(JSON.parse(job)); // { job: 'sendEmail', user: 101 }


Pub/Sub (Notifications):

// Publisher
await client.publish("notify:101", "You have a new message");

// Subscriber
const subscriber = client.duplicate();
await subscriber.connect();
await subscriber.subscribe("notify:101", (msg) => {
  console.log("Notification received:", msg);
});


Chat (List):

await client.rPush("chat:room1", JSON.stringify({ user: "Alice", message: "Hi!" }));
const messages = await client.lRange("chat:room1", 0, -1);
console.log(messages);

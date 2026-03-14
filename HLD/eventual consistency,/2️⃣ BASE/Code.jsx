I’ll show a simple code example of a BASE-style design using Node.js + MongoDB + Apache Kafka.
This demonstrates eventual consistency and asynchronous processing, which are key parts of BASE systems.

1️⃣ Scenario

User likes a post.

Instead of updating everything immediately, the system:

1 API receives request
2 Save basic data
3 Send event to Kafka
4 Background service updates other systems


This creates eventual consistency.

2️⃣ API Server (Node.js)

Example API endpoint:

app.post("/like", async (req, res) => {
  const { userId, postId } = req.body;

  // Save like in database
  await db.collection("likes").insertOne({
    userId,
    postId,
    createdAt: new Date()
  });

  // Send event to Kafka
  await producer.send({
    topic: "post-liked",
    messages: [
      { value: JSON.stringify({ userId, postId }) }
    ]
  });

  res.json({ message: "Like received" });
});


Explanation:

User sends like request
API saves basic data
Event sent to Kafka
Response returned immediately


System stays available and fast.

3️⃣ Kafka Consumer (Background Worker)

Another service processes events.

await consumer.subscribe({ topic: "post-liked" });

await consumer.run({
  eachMessage: async ({ message }) => {
    const data = JSON.parse(message.value);

    // Update post like count
    await db.collection("posts").updateOne(
      { _id: data.postId },
      { $inc: { likeCount: 1 } }
    );
  }
});


Explanation:

Kafka receives event
Consumer processes event
Post like count updated


This update may happen later.

4️⃣ Data Flow
User
  |
  v
API Server (Node.js)
  |
  v
MongoDB (likes collection)
  |
  v
Kafka Event
  |
  v
Background Worker
  |
  v
MongoDB posts collection updated


Technologies used:

Backend → Node.js

Database → MongoDB

Event streaming → Apache Kafka

5️⃣ Why This Is BASE

This system follows BASE because:

Basically Available → API responds quickly
Soft State → replicas may differ temporarily
Eventual Consistency → all data eventually syncs

6️⃣ Example Delay

Timeline:

User clicks like
   |
API saves like
   |
Kafka event sent
   |
Consumer updates post count (after few ms)


For a short time:

likes collection → updated
posts likeCount → not yet updated


Later both match.

7️⃣ Interview Summary

In a BASE system, we often use asynchronous event processing. The API writes data and publishes an event to Kafka. Background consumers process the event and update other services, allowing the system to remain highly available and eventually consistent.
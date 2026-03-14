🔥 Step 5: Kafka Consumer (Cache Invalidation)

Separate service or same service consumer:

consumer.run({
  eachMessage: async ({ message }) => {
    const event = JSON.parse(message.value.toString());

    if (event.type === "ORDER_UPDATED") {
      await redis.del(`order:${event.orderId}`);
    }
  }
});


Now we have:

👉 Event-driven cache invalidation
👉 Decoupled system
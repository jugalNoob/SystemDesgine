🏆 BEST Enterprise Version (Atomic + Batch)

The safest way in MongoDB is:

Use findOneAndUpdate in a loop until 100 claimed.

const BATCH_SIZE = 100;

const processOutbox = async () => {
  const claimedEvents = [];

  for (let i = 0; i < BATCH_SIZE; i++) {

    const event = await Outbox.findOneAndUpdate(
      { status: "PENDING" },
      { $set: { status: "PROCESSING" } },
      { new: true }
    );

    if (!event) break;

    claimedEvents.push(event);
  }

  for (const event of claimedEvents) {
    try {
      await emailQueue.add("send-welcome-email", event.payload);

      await Outbox.updateOne(
        { _id: event._id },
        { $set: { status: "SENT" } }
      );

    } catch (err) {

      await Outbox.updateOne(
        { _id: event._id },
        { $set: { status: "FAILED" } }
      );
    }
  }
};

// 🧠 Which Version Should You Use?
// Scale	Recommended
// Small project	Simple find + loop
// Medium scale	Batch (find + updateMany)
// High scale production	Atomic claim loop
// Enterprise	CDC (Debezium)
// 🔥 How Big Companies Do It

// Instead of polling:

// They use:

// Debezium

// Apache Kafka

// That removes polling completely.

// 🎯 Interview Answer (Short)

// For high throughput systems, I use batch claiming with atomic findOneAndUpdate to avoid race conditions. It allows horizontal scaling and prevents duplicate event processing.
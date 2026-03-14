import Outbox from "../models/Outbox.js";
import { emailQueue } from "../queue/emailQueue.js";



/// Adavance  ---------------------------->>



import Outbox from "../models/Outbox.js";
import { emailQueue } from "../queue/emailQueue.js";

const processOutbox = async () => {
  while (true) {
    const event = await Outbox.findOneAndUpdate(
      { status: "PENDING" },
      { status: "PROCESSING" },
      { new: true }
    );

    if (!event) break;

    try {
      const email = event.payload.email;

      await emailQueue.add(
        "send-welcome-email",
        event.payload,
        {
          jobId: email  // ✅ idempotent
        }
      );

      event.status = "SENT";
      await event.save();

      console.log(`✅ Event ${event._id} sent`);

    } catch (err) {
      event.status = "FAILED";
      await event.save();

      console.log(`❌ Event ${event._id} failed`, err.message);
    }
  }
};

setInterval(processOutbox, 5000);

console.log("📤 Outbox Processor Running");

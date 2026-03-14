import { Outbox } from "./outbox.model.js";
import { emailQueue } from "../queues/email.queue.js";

export async function processOutbox() {
  const events = await Outbox.find({ status: "PENDING" }).limit(10);

  for (const event of events) {
    try {
      await Outbox.findOneAndUpdate(
        { _id: event._id, status: "PENDING" },
        { status: "PROCESSING" }
      );

      await emailQueue.add(
        event.type,
        event.payload,
        { jobId: event._id.toString() }
      );

      event.status = "DONE";
      await event.save();

    } catch (error) {
      event.retryCount += 1;
      event.status = "FAILED";
      await event.save();
    }
  }
}

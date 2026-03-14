import { Queue } from "bullmq";
import { connection } from "../queue/queuebullmq.js";

const deadLetterQueue = new Queue("send-welcome-email_DLQ", {
  connection
});

export default deadLetterQueue;

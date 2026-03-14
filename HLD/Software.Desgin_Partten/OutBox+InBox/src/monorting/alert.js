import { Queue } from "bullmq";
import { connection } from "../queue/queuebullmq.js";

const dlq = new Queue("send-welcome-email_DLQ", { connection });

const ALERT_THRESHOLD = 10;

const now = () => new Date().toISOString();

async function monitorDLQ() {
  const counts = await dlq.getJobCounts();

  if (counts.waiting > ALERT_THRESHOLD) {
    console.log(
      `[${now()}] 🚨 ALERT: DLQ has ${counts.waiting} failed jobs!`
    );
  } else {
    console.log(
      `[${now()}] ✅ DLQ Healthy → ${counts.waiting} jobs`
    );
  }
}

setInterval(monitorDLQ, 30000);

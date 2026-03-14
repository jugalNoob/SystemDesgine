

import { Queue } from "bullmq";
import connection from "../queues/redisConnection.js";

const dlq = new Queue("send-welcome-email:DLQ", { connection });

const ALERT_THRESHOLD = 10; // if more than 10 failed jobs

const now = () => new Date().toISOString();

async function monitorDLQ() {
  const counts = await dlq.getJobCounts();

  if (counts.waiting > ALERT_THRESHOLD) {
    console.log(
      `[${now()}] 🚨 ALERT: DLQ has ${counts.waiting} failed jobs!`
    );

    // Here you can:
    // 1. Send Slack alert
    // 2. Send admin email
    // 3. Push to monitoring system
  } else {
    console.log(
      `[${now()}] ✅ DLQ Healthy → ${counts.waiting} jobs`
    );
  }
}

// Run every 30 seconds
setInterval(monitorDLQ, 30000);

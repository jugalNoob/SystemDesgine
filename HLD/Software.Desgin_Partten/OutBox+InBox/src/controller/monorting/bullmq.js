app.get("/worker-health", async (req, res) => {
  const counts = await emailQueue.getJobCounts();

  if (counts.failed > 100) {
    return res.status(500).json({ status: "unhealthy" });
  }

  res.json({ status: "healthy" });
});


import emailQueue from "./emailQueue.js";

const now = () => new Date().toISOString();

const logQueueStats = async () => {
  const counts = await emailQueue.getJobCounts();

  console.log(
    `[${now()}] 📊 Waiting:${counts.waiting} Active:${counts.active} Completed:${counts.completed} Failed:${counts.failed}`
  );
};

// Clean only completed jobs every 1 min
const cleanCompleted = async () => {
  await emailQueue.clean(60000, 1000, "completed");
};

setInterval(logQueueStats, 5000);
setInterval(cleanCompleted, 60000);




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

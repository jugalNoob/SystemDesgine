🔥 Let’s build Automatic DLQ Monitoring for your email system using BullMQ + Redis.

Goal:

🚨 If DLQ has jobs → Alert immediately
📊 Track failure trend
🧹 Prevent DLQ overflow

🧠 1️⃣ What We Want

Automatic system should:

Check DLQ job count every X seconds

Send alert if count > threshold

Log metrics

Optionally auto-retry DLQ jobs

🏗 Architecture
Main Queue
     ↓ (failed after retries)
Dead Letter Queue
     ↓
DLQ Monitor Service
     ↓
Alert (Email / Slack / Log / Dashboard)

✅ 2️⃣ Simple DLQ Monitor Code

Create:

monitor/dlqMonitor.js

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

🚨 3️⃣ Production Level Monitoring
Instead of console.log use:

Slack webhook

Email alert

Prometheus metrics

Grafana dashboard

📊 Advanced Monitoring Strategy


Track:


| Metric            | Why            |
| ----------------- | -------------- |
| DLQ job count     | Detect spikes  |
| Failure rate %    | System health  |
| Top error message | Root cause     |
| Time in DLQ       | Aging failures |



🧮 Failure Rate Calculation
Failure Rate = (Failed Jobs / Total Processed Jobs) × 100


Example:

1000 jobs processed
50 failed
Failure rate = 5%


If > 5% → alert 🚨

🔥 4️⃣ Auto-Retry DLQ Jobs (Optional)

You can build a replay service:

async function replayDLQ() {
  const jobs = await dlq.getJobs(["waiting"], 0, 20);

  for (const job of jobs) {
    await mainQueue.add("send-welcome-email", job.data);
    await job.remove();
  }

  console.log("♻️ Replayed DLQ jobs");
}


⚠️ Only replay after fixing root cause.

🧠 Interview Answer

If asked:

How do you monitor Dead Letter Queue in production?

You say:

I run a scheduled DLQ monitor service that checks job counts periodically. If failed jobs exceed a threshold, it triggers alerts via Slack or monitoring tools. I also track failure rate and error patterns to detect system degradation early.

🚀 Production Best Practice

✅ Separate DLQ monitor service
✅ Alert threshold
✅ Failure percentage alert
✅ Dashboard metrics
✅ Manual replay system
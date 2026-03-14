Great 🔥
Monitoring workers is mandatory in production — especially when you're scaling with BullMQ.

If you don’t monitor:

Worker may crash ❌

Jobs may get stuck ❌

Redis may overload ❌

Emails may silently fail ❌

Let’s break this properly 👇

🔥 1️⃣ Basic Monitoring (Built-in Events)

BullMQ workers emit lifecycle events.

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err);
});

worker.on('stalled', jobId => {
  console.log(`⚠️ Job ${jobId} stalled`);
});

Why important?

Detect crashes

Detect retry loops

Detect long processing jobs

🔥 2️⃣ Detect Worker Crash

Add process-level monitoring:

process.on('uncaughtException', err => {
  console.error("🚨 Uncaught Exception:", err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error("🚨 Unhandled Rejection:", err);
  process.exit(1);
});


Then run with:

pm2 start worker.js


Using PM2
→ Auto restarts crashed workers.

🔥 3️⃣ Queue Metrics Monitoring

You can check queue stats:

const counts = await emailQueue.getJobCounts();
console.log(counts);


Returns:

{
  waiting: 1200,
  active: 20,
  completed: 5000,
  failed: 30,
  delayed: 10
}

Alert if:

waiting > 10,000

failed increasing rapidly

active always 0 (worker dead)

🔥 4️⃣ Use Bull Board (UI Dashboard)

For production UI dashboard use:

📊 Bull Board

Install:

npm install @bull-board/api @bull-board/express


It gives:

Live job view

Retry failed jobs

See stuck jobs

See queue size

Delete jobs

This is VERY useful in real systems.

🔥 5️⃣ Production Monitoring (Enterprise Level)

In serious systems (100k+ jobs/min):

You integrate with:

Prometheus

Grafana

You track:

Jobs per second

Success rate

Failure rate

Processing latency

Redis memory usage

CPU usage

🔥 6️⃣ Health Check Endpoint

Create worker health endpoint:

app.get("/worker-health", async (req, res) => {
  const counts = await emailQueue.getJobCounts();

  if (counts.failed > 100) {
    return res.status(500).json({ status: "unhealthy" });
  }

  res.json({ status: "healthy" });
});


Kubernetes / Load balancer can use this.

🔥 7️⃣ Detect Stalled Jobs

BullMQ automatically detects stalled jobs.

Why jobs stall?

Worker crashed mid-process

Long blocking code

Redis connection issue

Set:

new Worker("queue", processor, {
  connection,
  lockDuration: 30000,
  stalledInterval: 30000
});

🔥 8️⃣ Horizontal Scaling Monitoring

If running 5 workers:

Add log identifier:

console.log(`Worker PID: ${process.pid}`);


Now you can see:

Worker 1234 processed job 1
Worker 5678 processed job 2


You confirm load balancing is working.

🔥 What To Monitor (Checklist)



| Metric          | Why               |
| --------------- | ----------------- |
| Waiting Jobs    | Backlog detection |
| Failed Jobs     | Error spike       |
| Active Jobs     | Worker alive      |
| Processing Time | Performance       |
| Redis Memory    | Capacity          |
| Worker CPU      | Scaling decision  |



🚀 Interview-Level Answer

If interviewer asks:

“How do you monitor BullMQ workers?”

Answer:

“I monitor worker lifecycle events, track queue job counts, use Bull Board for visualization, integrate Prometheus & Grafana for metrics, add health checks, and run workers under PM2 or Kubernetes for auto-restart and crash recovery.”

🔥 Advanced Tip

At 100k+ jobs/min:

Use:

Separate monitoring service

Alerting (Slack/Email)

Dead Letter Queue (DLQ)

Failure threshold auto pause queue
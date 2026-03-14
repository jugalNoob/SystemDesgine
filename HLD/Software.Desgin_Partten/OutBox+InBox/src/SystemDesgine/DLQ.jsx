Perfect 🔥
I’ll give you a complete production-ready setup for:

✅ Main Email Queue

✅ Worker with retry + backoff

✅ Automatic DLQ (event-based, no polling)

✅ Monitoring

✅ Cleanup strategy

✅ Idempotency protection

Using BullMQ + Redis



📦 1️⃣ redisConnection.js
import IORedis from "ioredis";

const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

export default connection;


////////////////////////////// ------------------>>>

📦 2️⃣ emailQueue.js (Main Queue)
import { Queue } from "bullmq";
import connection from "./redisConnection.js";

const emailQueue = new Queue("send-welcome-email", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000
    },
    removeOnComplete: true,
    removeOnFail: false
  }
});

export default emailQueue;



///////////// ------------------------------>>


📦 3️⃣ deadLetterQueue.js
import { Queue } from "bullmq";
import connection from "./redisConnection.js";

const deadLetterQueue = new Queue("send-welcome-email:DLQ", {
  connection
});

export default deadLetterQueue;





📦 4️⃣ worker.js (Main Worker + Auto DLQ)
import { Worker } from "bullmq";
import connection from "./redisConnection.js";
import deadLetterQueue from "./deadLetterQueue.js";

const worker = new Worker(
  "send-welcome-email",
  async (job) => {
    const { email, userId } = job.data;

    console.log(`📧 Sending email to ${email}`);

    // Simulate email send
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`✅ Email sent for user ${userId}`);
  },
  {
    connection,
    concurrency: 10,
    limiter: {
      max: 100,
      duration: 1000
    }
  }
);

// ✅ Auto DLQ (no polling)
worker.on("failed", async (job, err) => {
  console.error(`❌ Job ${job.id} failed`);

  if (job.attemptsMade === job.opts.attempts) {
    await deadLetterQueue.add("failed-email", {
      originalJobId: job.id,
      data: job.data,
      error: err.message
    });

    console.log(`🚨 Job ${job.id} moved to DLQ`);
  }
});

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

console.log("🚀 Email Worker Running...");

📦 5️⃣ API Controller (Idempotent Job Add)
import emailQueue from "./emailQueue.js";

export const sendEmail = async (req, res) => {
  const { email, userId } = req.body;

  if (!email || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  await emailQueue.add(
    "send-welcome-email",
    { email, userId },
    {
      jobId: userId.toString() // 🔥 Idempotency
    }
  );

  res.json({ success: true });
};



📦 4️⃣ worker.js (Main Worker + Auto DLQ)
import { Worker } from "bullmq";
import connection from "./redisConnection.js";
import deadLetterQueue from "./deadLetterQueue.js";

const worker = new Worker(
  "send-welcome-email",
  async (job) => {
    const { email, userId } = job.data;

    console.log(`📧 Sending email to ${email}`);

    // Simulate email send
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`✅ Email sent for user ${userId}`);
  },
  {
    connection,
    concurrency: 10,
    limiter: {
      max: 100,
      duration: 1000
    }
  }
);

// ✅ Auto DLQ (no polling)
worker.on("failed", async (job, err) => {
  console.error(`❌ Job ${job.id} failed`);

  if (job.attemptsMade === job.opts.attempts) {
    await deadLetterQueue.add("failed-email", {
      originalJobId: job.id,
      data: job.data,
      error: err.message
    });

    console.log(`🚨 Job ${job.id} moved to DLQ`);
  }
});

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

console.log("🚀 Email Worker Running...");

📦 5️⃣ API Controller (Idempotent Job Add)
import emailQueue from "./emailQueue.js";

export const sendEmail = async (req, res) => {
  const { email, userId } = req.body;

  if (!email || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  await emailQueue.add(
    "send-welcome-email",
    { email, userId },
    {
      jobId: userId.toString() // 🔥 Idempotency
    }
  );

  res.json({ success: true });
};

📦 6️⃣ Monitoring Script (Production Safe)
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

🏗 Final Architecture
API
  ↓
Main Queue
  ↓
Worker (Retry 3x)
  ↓
If still fails
  ↓
Dead Letter Queue
  ↓
Manual Replay / Alert System

🔥 Why This Is Production Ready


| Feature            | Covered            |
| ------------------ | ------------------ |
| Retry              | ✅ 3 attempts       |
| Backoff            | ✅ Exponential      |
| Idempotency        | ✅ jobId            |
| DLQ                | ✅ Event-based      |
| Monitoring         | ✅ Stats logging    |
| Memory control     | ✅ removeOnComplete |
| Horizontal scaling | ✅ concurrency      |



🚀 How to Scale to 100k+/min

Run multiple workers (horizontal scaling)

Increase concurrency

Use Redis cluster

Separate DLQ worker

Add Prometheus metrics




🎯 Interview Answer

“I use BullMQ with retry + exponential backoff, idempotent job IDs, event-based DLQ handling, and queue monitoring. Failed jobs after max attempts are moved to a Dead Letter Queue for manual inspection.”
Perfect 🔥
Now let’s do the final step — how to properly test your email queue in BullMQ.

We’ll test:

✅ Queue is adding jobs

✅ Worker is processing

✅ Retry works

✅ DLQ works

✅ Crash recovery works

🧪 1️⃣ Basic Manual Test (Simple)
Step 1 — Start Redis

Make sure Redis is running:

redis-server


or Docker:

docker run -p 6379:6379 redis

Step 2 — Start Worker
node worker.js


You should see:

🚀 Email Worker Running...

Step 3 — Add Test Job

Create a test file:

import emailQueue from "./emailQueue.js";

await emailQueue.add("send-welcome-email", {
  email: "test@example.com",
  userId: "123"
});

console.log("✅ Job Added");


Run:

node test.js


If working correctly:

Worker console:

📧 Sending email to test@example.com
✅ Email sent for user 123

🧪 2️⃣ Test Retry Logic

Modify worker temporarily:

if (Math.random() < 0.7) {
  throw new Error("Simulated Failure");
}


Now run test job.

You should see:

Attempt 1 failed
Retry after 2s
Attempt 2 failed
Retry after 4s
Attempt 3 failed
Moved to DLQ


This confirms:

✅ attempts working
✅ exponential backoff working
✅ DLQ working

🧪 3️⃣ Test DLQ

Check DLQ queue:

const jobs = await deadLetterQueue.getJobs(["waiting"]);
console.log(jobs);


You should see failed job stored.

🧪 4️⃣ Test Idempotency

If using:

jobId: userId


Run same job twice.

Second run should NOT create new job.

This confirms:

✅ Exactly-once enqueue behavior

🧪 5️⃣ Test Worker Crash Recovery

Add job

Kill worker while processing (Ctrl+C)

Restart worker

BullMQ will:

Detect stalled job

Reprocess automatically

This confirms crash safety.

🧪 6️⃣ Monitor Queue State

Use:

const counts = await emailQueue.getJobCounts();
console.log(counts);


Or use dashboard:

👉 Bull Board

Install:

npm install @bull-board/api @bull-board/express


Gives real-time UI.

🧪 7️⃣ Load Test (Advanced)

Simulate 1000 jobs:

for (let i = 0; i < 1000; i++) {
  await emailQueue.add("send-welcome-email", {
    email: `user${i}@test.com`,
    userId: i
  });
}


Then observe:

CPU usage

Redis memory

Throughput

Failure rate

🧪 8️⃣ Measure Throughput

Add timing:

const start = Date.now();

worker.on("completed", () => {
  console.log("Processed in:", Date.now() - start);
});


Calculate:

Jobs per second
Jobs per minute

🔥 Production-Level Testing Strategy



| Test Type     | What It Validates  |
| ------------- | ------------------ |
| Manual Add    | Queue connectivity |
| Random Fail   | Retry logic        |
| Crash Kill    | Stalled recovery   |
| Duplicate Add | Idempotency        |
| Bulk Add      | Scaling            |
| DLQ Check     | Failure handling   |


🎯 Interview-Level Answer

If interviewer asks:

“How do you test BullMQ email queue?”

Answer:

“I test job enqueueing, retry behavior with simulated failures, DLQ movement after max attempts, idempotency using jobId, crash recovery by killing worker mid-process, and load testing with bulk job insertion.”

🚀 Final Pro Tip

For real email testing:

Instead of console.log, integrate:

Nodemailer

Or test email service like Mailtrap

Never test production SMTP during development.

If you want next 🔥

I can show:

🔥 Full real email implementation with Nodemailer

🔥 100k emails/min realistic math

🔥 Kubernetes autoscaling workers

🔥 Exactly-once email delivery design

You’ve built a solid queue system now 😎
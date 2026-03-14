Excellent 🔥 this is core distributed system knowledge.

You’re using BullMQ with Redis, so let’s break this properly.

🧠 Problem

What happens if:

Worker crashes

Server restarts

Process killed

Email API hangs

Network failure

How does BullMQ:

Detect crash?

Retry automatically?

Prevent duplicate processing?

🔥 1️⃣ How BullMQ Detects Worker Crash

BullMQ uses Redis locks (heartbeat mechanism).

When a worker picks a job:

Job → status = active
Redis → lock created


Worker sends heartbeat every few seconds.

If:

Worker dies ❌
Heartbeat stops ❌
Lock expires ❌


Then Redis marks job as:

stalled


Then BullMQ automatically re-queues the job.

This is called Stalled Job Recovery.

🔥 2️⃣ Enable Auto Retry (Production Setup)

When adding job:

await queue.add("send-welcome-email", data, {
  attempts: 5,              // retry 5 times
  backoff: {
    type: "exponential",    // delay increases
    delay: 2000             // 2 sec base
  },
  removeOnComplete: true,
  removeOnFail: false
});

🧠 Retry Flow

Example:

Attempt 1 → fail
Wait 2s
Attempt 2 → fail
Wait 4s
Attempt 3 → fail
Wait 8s
...

Exponential backoff prevents overload.

🔥 3️⃣ Worker Crash Example

If worker crashes while processing:

await new Promise(resolve => setTimeout(resolve, 2000));


Before completion:

Lock expires

Job becomes stalled

Another worker picks it

No manual recovery needed.

🔥 4️⃣ Configure Stalled Job Detection

In worker:

const worker = new Worker(
  'send-welcome-email',
  async (job) => {
    // process
  },
  {
    connection,
    concurrency: 5,
    stalledInterval: 30000,     // check every 30 sec
    maxStalledCount: 3          // retry max 3 stall times
  }
);

🔥 5️⃣ Prevent Duplicate Email (IMPORTANT)

Crash recovery can cause duplicate execution.

To make it SAFE:

✅ Use Idempotency

Example:

const alreadySent = await redis.get(`email-sent:${userId}`);
if (alreadySent) return;

await sendEmail();
await redis.set(`email-sent:${userId}`, 1);


Now even if retry happens → email not sent twice.

🔥 6️⃣ Monitoring Failures
worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});


For production monitoring use:

Prometheus

Grafana

Or BullMQ UI dashboard

🔥 7️⃣ Full Production Architecture
API → Queue → Redis
           ↓
   Worker1  Worker2  Worker3
           ↓
     Email Provider


If Worker2 crashes:

Redis detects

Job requeued

Worker1 processes

System survives.

🔥 8️⃣ Interview Explanation (Very Important)

If interviewer asks:

“How do you handle worker crash in BullMQ?”

Answer:

“BullMQ uses Redis-based distributed locks with heartbeat. If a worker crashes, the lock expires and the job is marked stalled and re-queued. We configure retries with exponential backoff and ensure idempotent job processing to prevent duplicate side effects.”

🚀 Advanced Level (Next Step)

If you want ultra production design:

🔥 Dead Letter Queue

🔥 Circuit Breaker + Retry combined

🔥 Outbox Pattern

🔥 Exactly-once email delivery architecture

🔥 1M emails/min scaling strategy

Tell me which one next 😎
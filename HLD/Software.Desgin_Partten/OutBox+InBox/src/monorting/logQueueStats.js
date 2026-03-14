
import {emailQueue} from "../queue/queuebullmq.js";

const now = () => new Date().toISOString();

const logQueueStats = async () => {
  const counts = await emailQueue.getJobCounts();

  // console.log(counts);

  console.log(
    `[${now()}] 📊 Waiting:${counts.waiting} Active:${counts.active} Completed:${counts.completed} Failed:${counts.failed}`
  );
};

// Clean only completed jobs every 1 min
const cleanCompleted = async () => {
  await emailQueue.clean(60000, 1000, "completed");
  // await emailQueue.clean(0, 1000, "failed");
};

setInterval(logQueueStats, 5000);
setInterval(cleanCompleted, 60000);

//////////////////// ---------------------------------------------------------->>>


// 🎯 Why Completed Shows 0?

// Because you configured:

// removeOnComplete: true


// So BullMQ deletes completed jobs automatically.

// That’s why completed count is always 0.



// ------------------------------------------------------------------------>>>>


// Perfect 👍 nothing is broken.

// Those Failed: 22 jobs are just old failed jobs still stored in Redis.

// Your new jobs are completing (we saw ✅ Job completed), but BullMQ keeps failed jobs because you configured:

// removeOnFail: false


// So Redis still contains those 22 failed jobs from earlier crashes.

// ✅ Why Counts Show:
// Waiting: 0
// Active: 0
// Completed: 0
// Failed: 22


// Because:

// You set removeOnComplete: true → completed jobs are auto deleted

// You set removeOnFail: false → failed jobs stay forever

// No new jobs currently waiting

// So stats are correct.


/// ---------------->>>
// [2026-02-15T05:21:15.080Z] 📊 Waiting:0 Active:3 Completed:0 Failed:22



/////// ------------------------------------ >>>>> 


// Good question 👍 this is very important to understand.

// You saw:

// 📊 Waiting:0 Active:3 Completed:0 Failed:22

// 🎯 What “Active: 3” Means

// Active = jobs currently being processed by workers right now.

// So:

// Active: 3


// means:

// 👉 3 jobs are currently inside the worker function
// 👉 They have been taken from the queue
// 👉 They are not completed yet

// 🔥 Why 3? (Because of Concurrency)

// In your worker config you set:

// concurrency: 5


// That means:

// Worker can process up to 5 jobs in parallel

// Right now only 3 jobs were available

// So 3 are active

// If you send 10 requests quickly, you may see:

// Active: 5
// Waiting: 5


// Because:

// 5 running

// 5 waiting for a free worker slot

// 🧠 Queue States Meaning (Very Important)


// | State     | Meaning                     |
// | --------- | --------------------------- |
// | Waiting   | Jobs waiting in queue       |
// | Active    | Jobs currently processing   |
// | Completed | Successfully finished jobs  |
// | Failed    | Jobs that exhausted retries |



// 🔄 Example Timeline

// You send 3 jobs.

// Worker picks them immediately.

// For 2 seconds (because you added delay):

// Active: 3


// After 2 seconds:

// Active: 0
// Completed: 3


// But since you set:

// removeOnComplete: true


// Completed becomes 0 again (because they get deleted).

// 🚀 Why Active Is Important in Production

// If you ever see:

// Active: 1000
// Waiting: 50000


// That means:

// Workers are overloaded

// Queue is growing

// You need horizontal scaling

// 🧩 In Your Case
// Waiting: 0
// Active: 3
// Completed: 0
// Failed: 22


// Means:

// No jobs waiting

// 3 currently processing

// Completed auto-removed

// 22 old failed jobs still stored

// System is healthy.

// 🔥 Want to Test Concurrency?

// Change:

// concurrency: 1


// Then send 5 requests quickly.

// You will see:

// Active: 1
// Waiting: 4


// That proves concurrency working.
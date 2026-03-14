import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import deadLetterQueue from "../DLQ/deadLetterQueue.js"; // ✅ ADD THIS
console.log('jugal')

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  'send-welcome-email',
  async (job) => {
    const { email, userId } = job.data;

    
 
  console.log(email , userId)
  
    console.log(`📧 Sending welcome email to ${email}`);

    // simulate email send
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`✅ Email sent for user ${userId}`);
  },
  {
    connection,
    concurrency: 5,
      stalledInterval: 30000,     // check every 30 sec
    maxStalledCount: 3  ,        // retry max 3 stall times
    limiter: {
      max: 10,
      duration: 1000
    }
  }
);




worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});



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


worker.on('stalled', jobId => {
  console.log(`⚠️ Job ${jobId} stalled`);
});



console.log("🚀 Email Worker running...");


// worker.on('failed', (job, err) => {
//   console.error(`❌ Job ${job?.id} failed`, err);
// });


// worker.on('failed', async (job) => {
//   if (job.attemptsMade === job.opts.attempts) {
//     await deadLetterQueue.add('failed-email', job.data);
//   }
// });

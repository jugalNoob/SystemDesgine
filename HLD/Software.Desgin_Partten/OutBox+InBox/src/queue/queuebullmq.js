//  queues/emailQueue.js
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

 export const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

export const emailQueue = new Queue('send-welcome-email', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    },
    removeOnComplete: 45,
    removeOnFail: false
  }
});

// export default emailQueue;



// defaultJobOptions: {
//   attempts: 3,
//   backoff: { type: "exponential", delay: 2000 },
//   removeOnComplete: 100,
//   removeOnFail: 500  // keep only last 500 failed
// }

//  queues/emailQueue.js

import { Queue } from 'bullmq';
import  IORedis  from 'ioredis'


const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

const emailQueue = new Queue('emailQueue', {
  connection,
  // Optional: sensible defaults for all jobs
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'fixed', delay: 3000 },
    removeOnComplete: true,    // keep Redis clean
    removeOnFail: false        // keep failed jobs for DLQ inspection
  },
});

console.log(emailQueue.jobsOpts)

export default emailQueue


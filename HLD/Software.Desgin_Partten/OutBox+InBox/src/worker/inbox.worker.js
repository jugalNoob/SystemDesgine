

Example: processEventJob.js

import { Worker } from 'bullmq';
import { redisConnection } from '../bullmqConnection.js';
import { checkAndProcessInbox } from './inbox/inboxService.js';

const worker = new Worker(
  'events',
  async (job) => {
    await checkAndProcessInbox(job.data);
  },
  { connection: redisConnection }
);

export default worker;
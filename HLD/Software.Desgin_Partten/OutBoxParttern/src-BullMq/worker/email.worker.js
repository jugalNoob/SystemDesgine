import { Worker } from "bullmq";
import IORedis from "ioredis";
import { sendEmail } from "../services/email.service.js";

const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

new Worker(
  "emailQueue",
  async (job) => {
    await sendEmail(job.data.email);
  },
  { connection, concurrency: 5 }
);

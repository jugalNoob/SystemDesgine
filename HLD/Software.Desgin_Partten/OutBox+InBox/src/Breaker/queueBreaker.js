import CircuitBreaker from "opossum";
import {emailQueue} from "../queue/queuebullmq.js";

const addJobToQueue = async (data) => {
  return emailQueue.add("send-welcome-email", data, {
    jobId: data.userId.toString()
  });
};



const queueBreaker = new CircuitBreaker(addJobToQueue, {
  timeout: 2000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000
});

 console.log()

queueBreaker.fallback((data) => {
  console.log("⚠ Queue unavailable, storing locally");
  return { status: "queued-later" };
});

export default queueBreaker;

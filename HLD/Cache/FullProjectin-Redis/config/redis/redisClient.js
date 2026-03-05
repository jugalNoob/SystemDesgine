
// redisClient.js


// import redis from 'redis'

// const redisClient = redis.createClient();

// redisClient.on('error', (error) => {
//   console.error(`Redis connection error: ${error}`);
// });

// (async () => {
//   await redisClient.connect();
//   console.log('Connected to Redis mern');
// })();


// export default redisClient




// redisClient.js
import IORedis from "ioredis";

const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

console.log("Redis connected:", redis.isOpen || redis.status);


redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error", err));

export default redis;



// // redisClient.js
// import IORedis from "ioredis";

// const redis = new IORedis({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: process.env.REDIS_PORT || 6379,
// });

// redis.on("connect", () => {
//   console.log("✅ Redis connected");
// });

// export default redis;

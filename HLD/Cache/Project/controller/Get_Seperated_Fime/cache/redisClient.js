const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error", err);
});

module.exports = redisClient;


// 👉 Shared across servers
// 👉 Durable cache
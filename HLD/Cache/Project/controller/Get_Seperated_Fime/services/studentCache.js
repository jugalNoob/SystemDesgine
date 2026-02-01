const redisClient = require("../cache/redisClient");
const l1Cache = require("../cache/l1Cache");

exports.getFromCache = async (key) => {
  // L1
  let data = l1Cache.get(key);
  if (data) return { source: "L1 cache", data };

  // L2
  const redisData = await redisClient.get(key);
  if (redisData) {
    const parsed = JSON.parse(redisData);
    l1Cache.set(key, parsed);
    return { source: "Redis", data: parsed };
  }

  return null;
};

exports.setCache = async (key, data) => {
  await redisClient.set(key, JSON.stringify(data), "EX", 60);
  l1Cache.set(key, data);
};

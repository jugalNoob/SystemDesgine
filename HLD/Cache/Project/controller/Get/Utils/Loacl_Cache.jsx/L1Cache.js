// cache.js
const NodeCache = require("node-cache");
const l1Cache = new NodeCache({ stdTTL: 10, checkperiod: 20 }); // 10 sec TTL
module.exports = l1Cache;

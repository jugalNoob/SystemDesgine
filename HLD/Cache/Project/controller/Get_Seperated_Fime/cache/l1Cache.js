const NodeCache = require("node-cache");

const l1Cache = new NodeCache({
  stdTTL: 60,      // 60 seconds
  checkperiod: 120
});

module.exports = l1Cache;


// 👉 Super fast, in-process
// 👉 Clears automatically when app restarts
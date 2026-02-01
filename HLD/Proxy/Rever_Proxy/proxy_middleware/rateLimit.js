// rateLimiter.js (or inline in proxy.js)
const rateLimitStore = new Map();

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  const WINDOW_TIME = 10 * 1000; // 10 seconds
  const MAX_REQUESTS = 5;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  const data = rateLimitStore.get(ip);

  if (now - data.startTime > WINDOW_TIME) {
    // reset window
    rateLimitStore.set(ip, { count: 1, startTime: now });
    return next();
  }

  if (data.count >= MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests. Please try again later."
    });
  }

  data.count++;
  rateLimitStore.set(ip, data);
  next();
};

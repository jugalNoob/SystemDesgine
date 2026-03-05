const rateLimitMap = new Map();
const LIMIT = 100; // 100 requests
const WINDOW = 1000; // per 1 second

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip).filter(
    ts => now - ts < WINDOW
  );

  if (timestamps.length >= LIMIT) {
    return res.status(429).send("Too Many Requests");
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
}

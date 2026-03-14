
import redis from '../../config/redis/redisClient.js'

export const rateLimiter = () => {
  return async (req, res, next) => {
    let limit=5 
    let window=60
    
    const key = `rate:${req.ip}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, window);
    }

    if (current > limit) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests',
      });
    }

    next();
  };
};

// Usage:

// app.post('/form', rateLimiter(5, 60), user_form);

// 4️⃣ Interview-grade improvement (fail-open)

// If Redis is down, don’t block users.

// let current;

// try {
//   current = await redisClient.incr(key);
//   if (current === 1) await redisClient.expire(key, window);
// } catch (err) {
//   console.error('Redis error:', err);
//   current = 1; // allow request
// }


// 🔥 Interviewers love this.
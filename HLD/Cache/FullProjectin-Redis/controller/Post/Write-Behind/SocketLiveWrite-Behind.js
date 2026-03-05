// import { asyncHandler } from '../../util/try-catch/try-catch.js';
import redis from '../../../config/redis/redisClient.js'
import l1Cache  from '../../../config/redis/CachL1.js'
// import {Register} from '../../model/Student.js'
import  shortid  from  'shortid'

import { getIO } from "../../../config/socket/socketIo.js";
import { initProducer, PostsendMessage } from '../../producer/live.producer.js'


export const startLiveNumbers = () => {


  console.log("🚀 Live number generator started");

  setInterval(async () => {
    try {
      const value = Math.floor(Math.random() * 100);

      // 1️⃣ Emit to all clients (REAL-TIME)
      const io = getIO();
      io.emit("randomNumber", value);

      // 2️⃣ Cache in Redis + L1
      const version = await redis.incr("students:version");
      const newKey = `students:list:v${version}:page:1`;
      const oldKey = `students:list:v${version - 1}:page:1`;

      let users = [];
      const oldCache = await redis.get(oldKey);
      if (oldCache) users = JSON.parse(oldCache);

      const payload = {
        value,
        shortId: shortid.generate(),
        timestamp: new Date().toISOString(),
      };

      users.push(payload);

      l1Cache.set(newKey, users);
      await redis.set(newKey, JSON.stringify(users), "EX", 60);


      try {
  await PostsendMessage("socket-random-number", payload);
   console.log("📤 Sent to Kafka:", payload.value);
} catch (err) {
  console.error("Kafka down, buffering locally");
}

    } catch (err) {
      console.error("🔥 Live number error:", err);
    }
  }, 2000);
};

// start once at server boot
await initProducer();






/// MongoDb Connection  ------------------------->>

 // 🔹 Async DB write
  //   setTimeout(async () => {
  //     try {
  //       await Register.create(newUser);
  //       console.log("✅ DB updated:", newUser);
  //     } catch (err) {
  //       console.error("❌ DB write failed", err);
  //     }
  //   }, 5000);

  // }, 2000);




///////////// ----------------------------------------- >>>>>>>>>>>

// export const user_form = asyncHandler(async (req, res) => {
//   const { name, email } = req.body;

//   // use email or IP as key
//   const key = email || req.ip;

//   const allowed = formThrottle(key, 2000);

//   if (!allowed) {
//     return res.status(429).json({
//       success: false,
//       message: "Too many submissions. Please wait 2 seconds.",
//     });
//   }

//   console.log("📩 Form submitted:", name, email);

//   return res.status(200).json({
//     success: true,
//     message: "Form submitted successfully",
//   });
// });

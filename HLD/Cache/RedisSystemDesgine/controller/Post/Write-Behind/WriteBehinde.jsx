import { asyncHandler } from '../../../util/try-catch/try-catch.js';
import redis from '../../../config/redis/redisClient.js'
import l1Cache  from '../../../config/redis/CachL1.js'
import {Register} from '../../model/Student.js'
import  shortid  from  'shortid'




export const user_form = asyncHandler(async (req, res) => {
  const { value, email } = req.body;

  if (!value || !email) {
    return res.status(400).json({ message: "value and email are required" });
  }

  const shortId = shortid.generate();

  const newUser = {
    value,
    email,
    shortId,
    createdAt: Date.now(),
  };

  // 1️⃣ Increment version
  const version = await redis.incr("students:version");

  const newKey = `students:list:v${version}:page:1`;
  const oldKey = `students:list:v${version - 1}:page:1`;

  // 2️⃣ Read old cache
  let users = [];
  const oldCache = await redis.get(oldKey);
  if (oldCache) {
    users = JSON.parse(oldCache);
  }

  // 3️⃣ Append
  users.push(newUser);

  // 4️⃣ Write caches (FIXED)
  l1Cache.set(newKey, users);
  await redis.set(newKey, JSON.stringify(users), "EX", 60);

  // 5️⃣ Async DB write (TEST ONLY)
  setTimeout(async () => {
    try {
      await Register.create(newUser);
      console.log("✅ Test write-behind: DB updated");
    } catch (err) {
      console.error("❌ DB write failed", err);
    }
  }, 10000);

  return res.status(201).json({
    success: true,
    source: "cache",
    data: newUser,
    version,
  });
});







export const user_form = asyncHandler(async (req, res) => {
  const { value, email } = req.body;

  if (!value || !email) {
    return res.status(400).json({ message: "value and email are required" });
  }


   let lastRandomNumber = null;
  let isConnected = true;

  const emitInterval = setInterval(async () => {
    lastRandomNumber = Math.floor(Math.random() * 100);
    socket.emit('randomNumber', lastRandomNumber);

  }, 2000);


  const shortId = shortid.generate();

  const newUser = {
    value,
    email,
    shortId,
    createdAt: Date.now(),
    
  };

  // 1️⃣ Increment version
  const version = await redis.incr("students:version");

  const newKey = `students:list:v${version}:page:1`;
  const oldKey = `students:list:v${version - 1}:page:1`;

  // 2️⃣ Read old cache
  let users = [];
  const oldCache = await redis.get(oldKey);
  if (oldCache) {
    users = JSON.parse(oldCache);
  }

  // 3️⃣ Append
  users.push(newUser);

  // 4️⃣ Write caches (FIXED)
  l1Cache.set(newKey, users);
  await redis.set(newKey, JSON.stringify(users), "EX", 60);

  // 5️⃣ Async DB write (TEST ONLY)
  setTimeout(async () => {
    try {
      await Register.create(newUser);
      console.log("✅ Test write-behind: DB updated");
    } catch (err) {
      console.error("❌ DB write failed", err);
    }
  }, 10000);

  return res.status(201).json({
    success: true,
    source: "cache",
    data: newUser,
    version,
  });
});



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

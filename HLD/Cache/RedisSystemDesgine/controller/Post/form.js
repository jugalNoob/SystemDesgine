import { asyncHandler } from '../../util/try-catch/try-catch.js';
import redis from '../../config/redis/redisClient.js'
import l1Cache  from '../../config/redis/CachL1.js'
// import {Register} from '../../model/Student.js'
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

  // 🔥 1️⃣ Save to DB (IMPORTANT – missing in your code)
  await Register.create(newUser);


  // ------------------------------ >>>Cache Dele just a practies  -------------------------->>


  // 🔥 2️⃣ Invalidate Cache ------------------>>>
  const cacheKey = "students:list";
  try {
    await Promise.all([
  redis.del(cacheKey),
  l1Cache.delete(cacheKey)
]);
  } catch (error) {
    console.error(error.message)
  }



/// Write  Behind -------------------------><K<><>><>

const cached = await redis.get("students:list");

if (cached) {
  const parsed = JSON.parse(cached);
  parsed.push(newUser);

  await redis.set("students:list", JSON.stringify(parsed), "EX", 60);
}


  return res.status(201).json({
    success: true,
    data: newUser,
  });
});

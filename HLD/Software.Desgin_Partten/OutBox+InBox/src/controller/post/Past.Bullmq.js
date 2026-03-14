import { asyncHandler } from '../../util/try-catch/try-catch.js';
// import redis from '../../config/redis/redisClient.js'
// import l1Cache  from '../../config/redis/CachL1.js'
// import {Register} from '../../model/Student.js'
import  shortid  from  'shortid'
import {emailQueue} from '../../queue/queuebullmq.js' 
// import queueBreaker from "../../Breaker/queueBreaker.js";



export const user_form = asyncHandler(async (req, res) => {
  const {  email } = req.body;

  if ( !email) {
    return res.status(400).json({ message: "value and email are required" });
  }

  const shortId = shortid.generate();

  // const newUser = await Register.create({
   
  //   email,
  //   shortId,
  //   createdAt: Date.now(),
  // });

  // // ✅ Only push email job
  // await emailQueue.add("send-welcome-email", {
  //   email: newUser.email,
  //   userId: newUser._id
  // });



  await emailQueue.add("send-welcome-email", {
  email: email,
  userId: shortId
});



// await queueBreaker.fire({
//   email: newUser.email,
//   userId: newUser._id
// });



// await queueBreaker.fire({
//   email: email,
//   userId: shortId
// });




  return res.status(201).json({
    success: true,
    data: email,
  });
});

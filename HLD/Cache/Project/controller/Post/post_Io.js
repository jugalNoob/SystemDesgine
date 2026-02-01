const shortid = require('shortid');
const Register = require('../../model/student');
const redisClient = require('../../Redis/redisClient');
const l1Cache = require("../cache");




async function socketHandler(req, res) {
  try {
    const { value, email } = req.body;

    // ✅ Basic validation
    if (!value || !email) {
      return res.status(400).json({
        success: false,
        message: 'value and email are required',
      });
    }

  //  Write-Behind

    // ✅ Generate shortId correctly
    const shortId = shortid.generate();

    // ✅ Await DB write
    const savedUser = await Register.create({
      value,
      shortId,
      email,
    });

    // 🔥 Fire-and-forget cache invalidation (faster)
    // redisClient
    //   .del('users:all')
    //   .catch(err => {
    //     console.error('⚠️ Redis delete failed:', err.message);
    //   });



    // ✅ ONLY place where version changes
    let incert=await redisClient.incr("students:version");

    console.log(incert)


       // 🔥 Increment version (used for cache key)
    const version = await redisClient.incr("students:version");

    // 🔥 Invalidate L1 cache
    l1Cache.flushAll(); // flush all local cache

    // 🔥 L2 cache will auto invalidate via versioning
    // No need to del individual keys, version change makes old cache obsolete
    
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser,
    });

  } catch (error) {
    console.error('❌ Server Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

module.exports = socketHandler;

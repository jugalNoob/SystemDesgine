
const login = async (req, res) => {

  const { email } = req.body;

  const exists = await redis.sIsMember("user_emails", email);

  const exists = await redis.sismember("user_emails", email)

const exists = await redis.call("BF.EXISTS", "usersBloom", email)


  if (!exists) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const user = await User.findOne({ email });

  res.status(200).json({
    user
  });
};


4️⃣ Login Flow

Login request flow:

Login Request
     │
     ▼
Check Redis Bloom Filter
     │
     ├ NOT EXISTS → reject immediately
     │
     ▼
MongoDB Query
     │
     ▼
Password Verification
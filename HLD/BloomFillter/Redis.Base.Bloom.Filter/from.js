const signup = async (req, res) => {

  const { name, email, password } = req.body;

  // save user to database
  const user = await User.create({ name, email, password });

  // add email to redis set
  await redis.sAdd("user_emails", email);

  res.status(201).json({
    message: "User created",
    user
  });
};

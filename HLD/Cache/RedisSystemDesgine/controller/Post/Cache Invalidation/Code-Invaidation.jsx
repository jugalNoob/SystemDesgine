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

  // ❗ Invalidate cache after creating new data

redis.del("studtlist").catch(err => {
  console.error("Cache invalidation failed:", err.message);
});


  return res.status(201).json({
    success: true,
    data: newUser,
  });
});

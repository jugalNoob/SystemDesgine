const semaphore = new Semaphore(10); // only 10 concurrent requests

app.get("/users", rateLimiter, async (req, res) => {
  await semaphore.acquire();

  try {
    const users = await User.find(); // DB call
    res.json(users);
  } finally {
    semaphore.release();
  }
});

app.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  // 1️⃣ Check Bloom Filter
  const exists = await client.sendCommand([
    'BF.EXISTS',
    'product_filter',
    id
  ]);

  if (exists === 0) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 2️⃣ Check Cache
  const cached = await client.get(`product:${id}`);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // 3️⃣ Check DB
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  // 4️⃣ Update Cache
  await client.set(`product:${id}`, JSON.stringify(product), {
    EX: 3600
  });

  res.json(product);
});

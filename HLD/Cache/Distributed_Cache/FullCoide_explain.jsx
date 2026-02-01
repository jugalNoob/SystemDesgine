✅ Distributed Cache – Full Project Example

Node.js + Redis + MongoDB (Cache-Aside Pattern)

This is industry-standard and fits most real projects.

🏗 Project Use Case (Real Life)

Project: E-commerce / Product Catalog API

Many users view products

Product data changes rarely

Reads are very high

DB should not be hit every time

➡️ Perfect fit for Distributed Cache (Redis)

📁 Simple Project Structure
project/
│── server.js
│── redisClient.js
│── db.js
│── product.model.js
│── product.controller.js
│── routes.js



1️⃣ Redis Client (Distributed Cache)
redisClient.js
const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://localhost:6379"
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.log("❌ Redis error", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;

🔍 Why this?

All servers connect to same Redis

Makes cache distributed

Can scale to multiple Node.js instances

2️⃣ Database (MongoDB)
db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shop");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");
});

3️⃣ Product Model
product.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model("Product", productSchema);

4️⃣ Product Controller (Cache-Aside Logic)
product.controller.js
const Product = require("./product.model");
const redisClient = require("./redisClient");

exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  const cacheKey = `product:${productId}`;

  // 1️⃣ Check Redis first
  const cachedProduct = await redisClient.get(cacheKey);

  if (cachedProduct) {
    console.log("⚡ Cache HIT");
    return res.json(JSON.parse(cachedProduct));
  }

  console.log("🐌 Cache MISS → DB hit");

  // 2️⃣ Fetch from DB
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 3️⃣ Save to Redis with TTL
  await redisClient.set(
    cacheKey,
    JSON.stringify(product),
    { EX: 60 } // TTL = 60 seconds
  );

  res.json(product);
};

5️⃣ Routes
routes.js
const express = require("express");
const { getProductById } = require("./product.controller");

const router = express.Router();

router.get("/product/:id", getProductById);

module.exports = router;

6️⃣ Server Entry
server.js
const express = require("express");
require("./db");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});

🔁 How This Works (Step by Step)
First Request
Client → API → Redis ❌
              ↓
           MongoDB ✅
              ↓
        Save to Redis (TTL 60s)
              ↓
           Response

Next Requests (within 60s)
Client → API → Redis ✅
              ↓
           Response


✔️ No DB hit
✔️ Fast response
✔️ Shared across all servers

⏱ TTL – Why 60 Seconds?

Prevents stale data

Auto cleanup (no manual delete needed)

Good balance between:

Freshness

Performance

🧠 Which Projects FIT This Pattern?
✅ BEST FIT PROJECTS


| Project Type                      | Why Distributed Cache Works   |
| --------------------------------- | ----------------------------- |
| E-commerce (products, categories) | Heavy reads, rare updates     |
| Blogs / CMS                       | Articles read many times      |
| Dashboards                        | Same data shown to many users |
| User Profiles                     | Frequently accessed           |
| Rate limiting                     | Shared counters               |
| Session management                | Shared login state            |





❌ NOT GOOD FOR


| Project Type              | Why                      |
| ------------------------- | ------------------------ |
| Banking / Wallet          | Needs ACID transactions  |
| Inventory stock decrement | Risk of stale data       |
| Real-time trading         | Needs strong consistency |



🧾 Interview One-Liner (Very Important)

Distributed cache stores data in an external system like Redis, shared
 across multiple servers, reducing database load and improving read 
 performance using TTL-based freshness control.


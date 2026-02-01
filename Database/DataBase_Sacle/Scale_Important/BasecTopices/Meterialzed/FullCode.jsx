Here is FULL working example: MongoDB + Node.js showing how to CREATE, UPDATE, and READ a Materialized View.

I’ll keep it simple + real-world.

🧱 Scenario

Collection: orders

Materialized View: user_total_amount

Goal: Fast API to get total order amount per user

1️⃣ MongoDB Schema (orders)
// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: Number,
  amount: Number,
});

module.exports = mongoose.model("Order", orderSchema);

2️⃣ Create Materialized View (Aggregation + $merge)

👉 Run this once or via cron job

// materializedView.js
const mongoose = require("mongoose");
const Order = require("./models/Order");

async function createMaterializedView() {
  await mongoose.connect("mongodb://localhost:27017/testdb");

  await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        totalAmount: { $sum: "$amount" }
      }
    },
    {
      $merge: {
        into: "user_total_amount",
        whenMatched: "replace",
        whenNotMatched: "insert"
      }
    }
  ]);

  console.log("✅ Materialized View Created");
  process.exit();
}

createMaterializedView();


📦 This creates a new collection:

user_total_amount

3️⃣ Insert Order + Update Materialized View (REAL USE)

When a new order is created 👇

// controllers/createOrder.js
const Order = require("../models/Order");
const mongoose = require("mongoose");

const UserTotal = mongoose.connection.collection("user_total_amount");

exports.createOrder = async (req, res) => {
  const { userId, amount } = req.body;

  // 1️⃣ Save order
  await Order.create({ userId, amount });

  // 2️⃣ Update materialized view (FAST)
  await UserTotal.updateOne(
    { _id: userId },
    { $inc: { totalAmount: amount } },
    { upsert: true }
  );

  res.json({ success: true });
};


⚡ No aggregation needed again!

4️⃣ Read From Materialized View (FAST API)
// controllers/getUserTotal.js
const mongoose = require("mongoose");

exports.getUserTotal = async (req, res) => {
  const userId = Number(req.params.userId);

  const UserTotal = mongoose.connection.collection("user_total_amount");

  const data = await UserTotal.findOne({ _id: userId });

  res.json({
    userId,
    totalAmount: data?.totalAmount || 0
  });
};

5️⃣ Express Routes
// routes.js
const express = require("express");
const router = express.Router();

const { createOrder } = require("./controllers/createOrder");
const { getUserTotal } = require("./controllers/getUserTotal");

router.post("/order", createOrder);
router.get("/user/:userId/total", getUserTotal);

module.exports = router;

6️⃣ Final Flow (VERY IMPORTANT)
POST /order
   ↓
Save order in orders collection
   ↓
Increment value in materialized view
   ↓
GET /user/:id/total
   ↓
Read from user_total_amount (FAST)

⏱ Performance Difference


| Method                   | Time        |
| ------------------------ | ----------- |
| Aggregation each request | ❌ Slow      |
| Materialized View read   | ✅ Very Fast |



🧠 Interview One-Liner

Used MongoDB materialized views with aggregation and incremental updates 
to optimize heavy queries and reduce API latency.
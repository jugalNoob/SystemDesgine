Perfect 👍 Let’s do a full MongoDB + Node.js example showing the 1 + N query problem and the correct aggregation solution.

I’ll make it super simple.

🧱 Scenario

Collections:

users

{ "_id": 1, "name": "Alice" }
{ "_id": 2, "name": "Bob" }


orders

{ "_id": 101, "userId": 1, "amount": 50 }
{ "_id": 102, "userId": 1, "amount": 70 }
{ "_id": 103, "userId": 2, "amount": 30 }


Goal: Get all users with their orders

1️⃣ Node.js setup
npm init -y
npm install express mongoose

2️⃣ Connect MongoDB
// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("✅ MongoDB connected");
};

module.exports = connectDB;

3️⃣ Define Schemas
// models/User.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model("User", userSchema);

// models/Order.js
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: Number,
  amount: Number
});
module.exports = mongoose.model("Order", orderSchema);

4️⃣ Example 1: 1 + N Query Problem ❌
// badExample.js
const connectDB = require("./db");
const User = require("./models/User");
const Order = require("./models/Order");

async function getUsersWithOrders() {
  await connectDB();

  // 1️⃣ main query → all users
  const users = await User.find();

  // 2️⃣ N extra queries → orders for each user
  for (let user of users) {
    user.orders = await Order.find({ userId: user._id });
  }

  console.log(users);
}

getUsersWithOrders();


If 10 users, MongoDB runs 1 + 10 = 11 queries

Slow and inefficient

5️⃣ Example 2: Aggregation with $lookup ✅
// goodExample.js
const connectDB = require("./db");

async function getUsersWithOrders() {
  await connectDB();

  const db = require("mongoose").connection.db;

  const result = await db.collection("users").aggregate([
    {
      $lookup: {
        from: "orders",       // collection to join
        localField: "_id",    // field from users
        foreignField: "userId", // field from orders
        as: "orders"          // output array
      }
    }
  ]).toArray();

  console.log(result);
}

getUsersWithOrders();


✅ Only 1 query to MongoDB
✅ Fast and scalable

6️⃣ Output
[
  { "_id": 1, "name": "Alice", "orders": [
      { "_id": 101, "userId": 1, "amount": 50 },
      { "_id": 102, "userId": 1, "amount": 70 }
    ]
  },
  { "_id": 2, "name": "Bob", "orders": [
      { "_id": 103, "userId": 2, "amount": 30 }
    ]
  }
]

🧠 Key Takeaways

1 + N queries → query inside a loop, very slow

$lookup / aggregation → fetch related data in 1 query

Always check loops with DB calls in Node.js for performance

🎯 Interview One-Liner

“1+N query problem occurs when one main query triggers additional queries per record; it’s solved in MongoDB using aggregation and $lookup.”
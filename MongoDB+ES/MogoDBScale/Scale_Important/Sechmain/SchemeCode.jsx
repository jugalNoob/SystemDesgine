🧠 MongoDB Schema Patterns — Explained with Code

I’ll use Mongoose (Node.js) since that’s your stack.

1️⃣ Embedded Pattern
✅ Use when

Data is tightly coupled

Always read together

Size is predictable

📦 Example: Product with specs & tags
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  specs: {
    color: String,
    weight: String,
    warranty: String
  },
  tags: [String],
  images: [String]
});

👍 Why

One query = everything

Atomic updates

👎 Avoid when

Array grows unbounded (comments, logs)

2️⃣ Referenced Pattern


✅ Use when

Large datasets

Many-to-many relations

Avoid duplication

📦 Example: Order → User & Product
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

🔍 Populate example
Order.find().populate("user").populate("products");

3️⃣ Outlier Pattern
✅ Use when

Some users have huge or optional data

Profile grows independently

📦 Example: User + Profile
const UserSchema = new mongoose.Schema({
  email: String,
  role: String
});

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bio: String,
  socialLinks: [String],
  preferences: Object
});

👍 Benefit

Keeps User fast & small

Profile updates don’t lock user

4️⃣ Polymorphic Pattern (refPath)
✅ Use when

One model references multiple collections

Reviews, likes, comments

📦 Example: Review on Product OR Order
const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "targetType"
  },
  targetType: {
    type: String,
    enum: ["Product", "Order"],
    required: true
  },
  rating: Number,
  comment: String
});

🔍 Query
Review.find().populate("targetId");

5️⃣ Discriminator Pattern
✅ Use when

Same base model

Different roles / fields

📦 Example: Admin vs Customer
const options = { discriminatorKey: "role" };

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
}, options);

const User = mongoose.model("User", UserSchema);

const Admin = User.discriminator(
  "Admin",
  new mongoose.Schema({
    permissions: [String]
  })
);

const Customer = User.discriminator(
  "Customer",
  new mongoose.Schema({
    loyaltyPoints: Number
  })
);

👍 Why

Shared collection

Clean role separation




6️⃣ Bucket Pattern (Very Important 🔥)


✅ Use when

Logs

Metrics

Time-series

📦 Example: Logs bucketed per day
const LogBucketSchema = new mongoose.Schema({
  date: String, // "2026-01-25"
  logs: [
    {
      message: String,
      level: String,
      timestamp: Date
    }
  ]
});

➕ Insert log
LogBucket.updateOne(
  { date: "2026-01-25" },
  { $push: { logs: { message: "API hit", level: "INFO", timestamp: new Date() } } },
  { upsert: true }
);

👍 Why

Fewer documents

Faster range queries

🧾 ALL Patterns — Summary Table
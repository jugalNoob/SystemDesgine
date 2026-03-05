
// const DB='mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority'
import mongoose from "mongoose";

const DB='mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority'


if (!DB) {
  console.error("❌ DATABASE env variable is missing");
  console.error("👉 Check .env location & variable name");
  process.exit(1);
}

const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
};

const MAX_RETRIES = 3;
let retryCount = 0;

const connectDB = async () => {
  try {
    console.log(`🔌 MongoDB connecting (attempt ${retryCount + 1})...`);
    await mongoose.connect(DB, options);
    console.log("✅ MongoDB connected");
    retryCount = 0; // reset after success
  } catch (err) {
    retryCount++;
    console.error("❌ MongoDB connection failed:", err.message);

    if (retryCount <= MAX_RETRIES) {
      const delay = 2000 * retryCount;
      console.log(`🔁 Retry in ${delay}ms`);
      setTimeout(connectDB, delay);
    } else {
      console.error("🚨 MongoDB retry limit reached. Exiting.");
      process.exit(1);
    }
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Reconnecting...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:", err.message);
});

export default connectDB;




// mongoose.set('debug', function (collectionName, method, query, doc) {
//   const timestamp = new Date().toISOString();
//   console.log(
//     `[${timestamp}] 📦 Mongoose => ${collectionName}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`
//   );
// });

// mongoose.set('bufferCommands', false);
// mongoose.set('bufferTimeoutMS', 0);
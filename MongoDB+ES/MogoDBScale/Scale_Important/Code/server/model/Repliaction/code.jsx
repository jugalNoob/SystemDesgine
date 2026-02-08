



const mongoose = require("mongoose");

// Replica set connection URI
const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/apiProject?replicaSet=rs0";

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  readPreference: "secondaryPreferred" // Read queries prefer secondaries
})
.then(() => console.log("✅ MongoDB connected to replica set"))
.catch(err => console.error("❌ MongoDB connection error:", err));

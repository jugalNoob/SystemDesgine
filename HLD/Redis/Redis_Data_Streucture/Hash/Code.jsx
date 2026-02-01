🔹 Node.js Example
const redis = require("redis");
const client = redis.createClient();
await client.connect();

// Add user profile
await client.hSet("user:1", {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
});

// Get single field
const name = await client.hGet("user:1", "name");
console.log("Name:", name); // Alice

// Get all fields
const user = await client.hGetAll("user:1");
console.log("User profile:", user);

// Increment visits
await client.hIncrBy("user:1", "visits", 1);

// Delete field
await client.hDel("user:1", "email");

🔹 Use Cases for Hash
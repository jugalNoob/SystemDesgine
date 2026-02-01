🧠 Redis Set – Simple Meaning

Meaning:

A Set in Redis is a collection of unique, unordered values.

No duplicates are allowed, unlike a List.

Redis handles uniqueness automatically.

Simple English:

“It’s like a bag of unique items — you can add items, remove them, or check if an item exists, but the order doesn’t matter.”

🔹 Why Use Redis Set

| Feature         | Explanation                                       |
| --------------- | ------------------------------------------------- |
| Unique elements | Automatically removes duplicates                  |
| Fast lookups    | Check if item exists quickly                      |
| Set operations  | Union, intersection, difference between sets      |
| Use cases       | User followers, tags, online users, feature flags |


🔹 Redis Set Commands


| Command                      | Meaning                 |
| ---------------------------- | ----------------------- |
| `SADD key value [value ...]` | Add one or more members |
| `SREM key value [value ...]` | Remove member(s)        |
| `SMEMBERS key`               | Get all members         |
| `SISMEMBER key value`        | Check if value exists   |
| `SUNION key1 key2`           | Union of sets           |
| `SINTER key1 key2`           | Intersection of sets    |


🔹 Example Code (Node.js)
const redis = require("redis");
const client = redis.createClient();
await client.connect();

const onlineUsers = "online:users";

// Add users
await client.sAdd(onlineUsers, "Alice");
await client.sAdd(onlineUsers, "Bob");
await client.sAdd(onlineUsers, "Charlie");

// Duplicate is ignored
await client.sAdd(onlineUsers, "Alice");

// Check if a user is online
const isAliceOnline = await client.sIsMember(onlineUsers, "Alice");
console.log("Is Alice online?", isAliceOnline); // true

// Get all online users
const users = await client.sMembers(onlineUsers);
console.log(users); // [ 'Alice', 'Bob', 'Charlie' ]

// Remove a user
await client.sRem(onlineUsers, "Bob");

🔹 When to Use Redis Set



| Scenario           | Example                         |
| ------------------ | ------------------------------- |
| Track unique items | Online users, active sessions   |
| Tags or categories | Blog tags or product categories |
| Social features    | Followers, likes, connections   |
| Feature flags      | Enable features per user        |



🔹 Difference Between JS Set and Redis Set



| Feature      | JS `Set`                | Redis `Set`                            |
| ------------ | ----------------------- | -------------------------------------- |
| Location     | Memory (local process)  | Redis server (shared, distributed)     |
| Persistence  | Only while program runs | Stored in Redis → survives restarts    |
| Multi-client | ❌ Only local            | ✅ Shared across servers                |
| Operations   | add, delete, has        | add, remove, check membership, set ops |


Important: Using set in JS (new Set()) is not the same as Redis Set. Redis Set is shared and persistent, JS Set is local memory only.

✅ Tip:

Use Redis Set when you need fast, shared, unique collections that multiple servers or processes can read/write.
Use JS Set if you just need local uniqueness in your program.





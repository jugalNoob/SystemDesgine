🧰 Redis String Commands – Full Explanation

Strings in Redis are the simplest and most common data type. They can store text, numbers, or JSON, and you can perform atomic operations on them.

1️⃣ SET

Meaning: Store a key with a value.
Use case: Cache a single value like a token or small JSON.

Node.js Example:

await client.set("user:1:name", "Alice");


Key = "user:1:name"

Value = "Alice"

2️⃣ GET

Meaning: Get the value of a key.
Use case: Retrieve cached data or token.

Node.js Example:

const name = await client.get("user:1:name");
console.log(name); // Output: Alice

3️⃣ DEL

Meaning: Delete a key.
Use case: Invalidate cache or remove expired data.

Node.js Example:

await client.del("user:1:name");

4️⃣ INCR / DECR

Meaning: Increment or decrement a numeric string.
Use case: Counters, like page views, login attempts, or inventory.

Node.js Example:

await client.set("page:views", "0");

// Increment views
await client.incr("page:views"); // 1
await client.incr("page:views"); // 2

// Decrement views
await client.decr("page:views"); // 1

5️⃣ APPEND

Meaning: Append text to an existing string.
Use case: Add logs or build a small message stream.

Node.js Example:

await client.set("messages", "Hello");
await client.append("messages", ", World!");
const msg = await client.get("messages");
console.log(msg); // Output: Hello, World!

6️⃣ MGET / MSET

Meaning: Get or set multiple keys at once.
Use case: Batch operations for performance.

Node.js Example:

// Set multiple keys
await client.mSet({
  "user:1": "Alice",
  "user:2": "Bob",
  "user:3": "Charlie"
});

// Get multiple keys
const users = await client.mGet(["user:1", "user:2", "user:3"]);
console.log(users); // ["Alice", "Bob", "Charlie"]

7️⃣ SETEX

Meaning: Set a key with a value and expiration time.
Use case: Cache with TTL (Time-to-Live), like session tokens.

Node.js Example:

// Key expires in 10 seconds
await client.setEx("session:token:123", 10, "abc123");

// Check value
const token = await client.get("session:token:123");
console.log(token); // abc123

🔹 Summary Table

| Command         | Use Case                    | Example                       |
| --------------- | --------------------------- | ----------------------------- |
| `SET`           | Store a single value        | `SET key value`               |
| `GET`           | Retrieve a value            | `GET key`                     |
| `DEL`           | Remove a key                | `DEL key`                     |
| `INCR` / `DECR` | Counters                    | `INCR page:views`             |
| `APPEND`        | Add text to existing string | `APPEND messages ", World!"`  |
| `MGET` / `MSET` | Batch operations            | `MSET key1 val1 key2 val2`    |
| `SETEX`         | Cache with TTL              | `SETEX session:123 10 abc123` |


🔹 Real Project Use Cases

Web sessions / tokens: SETEX → expire after 30 min

Counters: INCR → track page views or API calls

Cache API responses: SET → store JSON response

Batch loading: MSET / MGET → improve performance

Chat or logs: APPEND → add messages to a string (small use o
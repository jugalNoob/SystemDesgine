🌐 What is a Redis Bitmap?

A Bitmap is not a separate data type.


... It’s actually a String in Redis where each bit (0 or 1) can be set or read individually.

...  Think of it as a huge array of bits you can manipulate efficiently.

... Key idea: Bit-level storage → very memory-efficient for tracking boolean flags.




🧠 How Bitmaps Work

... Redis Strings store binary data → you can treat them as an array of bits.

... Commands allow you to set, get, count, or perform bit operations on these bits.

... Very useful for flags, presence, or online/offline tracking.




1️⃣ Set a bit
SETBIT online:users 1001 1


Key = online:users

Offset = 1001 (bit position)

Value = 1 (online), 0 (offline)

2️⃣ Get a bit
GETBIT online:users 1001


Returns 1 → user is online

Returns 0 → user is offline

3️⃣ Count bits
BITCOUNT online:users


Counts total number of bits set to 1

Example: number of online users

4️⃣ Bit operations

AND / OR / XOR / NOT between bitmaps:

BITOP AND online:active users1 users2


Combine multiple bitmaps → e.g., active users in multiple days

🔥 Use-Cases

Online/Offline Tracking

Track which users are online each day.

Efficient for millions of users because 1 bit = 1 user.

Feature Flags

Turn a feature ON/OFF per user.

Attendance / Daily Login Tracking

Mark which users logged in each day.

Analytics / Boolean Flags

Track true/false properties across a large dataset.

🏗 Node.js Example
const redis = require('redis');
const client = redis.createClient();
await client.connect();

// User 1001 logs in
await client.setBit('online:users', 1001, 1);

// Check if user 1001 is online
const isOnline = await client.getBit('online:users', 1001);
console.log(isOnline); // 1

// Count all online users
const onlineCount = await client.bitCount('online:users');
console.log(onlineCount);

🔑 Key Notes

Very memory efficient → 1 bit per user

Works for large-scale boolean tracking

Supports bit operations → combine multiple bitmaps

Not for storing actual values, only flags / presence

If you want, I can make a 🔥 full Redis Bitmap blueprint diagram showing online/offline tracking + bit operations + Node.js example for production use and interview prep.

Do you want me to make that?

yes

Perfect 🔥 here’s a full Redis Bitmap blueprint for online/offline tracking, showing bit operations, Node.js usage, and monitoring.
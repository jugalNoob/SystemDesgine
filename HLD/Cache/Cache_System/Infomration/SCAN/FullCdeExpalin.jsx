🧠 SCAN in Redis – Real-Life Example
Imagine a Huge Library

Library = Redis Cache

Books = Keys (user data, posts, sessions, etc.)

Librarian = your Node.js app

11 :: Scenario 1: You want to find all books about "History"

0:: ❌ Using KEYS (bad)

Librarian tries to grab every single book in the library at once

Library has 100,000 books → librarian crashes, library slows down

This is like KEYS * → blocks Redis, very slow

00::  ✅ Using SCAN (good)

Librarian walks aisle by aisle, checking books in small batches

Each aisle → 10 books → no overload

Gradually, librarian finds all history books

This is like SCAN → safe, incremental, doesn’t block Redis

22:: Scenario 2: Cleaning Out Old / Stale Books

You want to remove all outdated books (like old cache keys)

Librarian goes aisle by aisle (SCAN), finds old books, and removes them gradually

You avoid removing everything at once → library keeps running smoothly

Scenario 3: When SCAN is Overkill

Library has 10 books only → just grab them all at once (KEYS *)

No need to walk aisle by aisle

🔹 Simple Mapping


Scenario 3: When SCAN is Overkill

Library has 10 books only → just grab them all at once (KEYS *)

No need to walk aisle by aisle

🔹 Simple Mapping


| Library Analogy        | Redis Equivalent              |
| ---------------------- | ----------------------------- |
| Books                  | Keys / Cached Data            |
| Grab all books at once | KEYS * (blocks Redis)         |
| Walk aisle by aisle    | SCAN (safe iteration)         |
| Remove old books       | Manual invalidation with SCAN |
| Few books only         | KEYS * is fine                |



✅ Takeaway

SCAN = gradual, safe iteration

KEYS * = dangerous on large cache

Manual deletion with SCAN = safe cache cleanup



Perfect! Let’s make a simple real-life inspired Node.js + Redis code to show SCAN in action, like the library analogy ✅

We’ll simulate:

Adding “books” (keys)

Iterating safely with SCAN

Deleting old/stale books (manual invalidation)

1️⃣ Install Redis
npm install redis

2️⃣ Node.js Code – Real-Life Library Analogy
const redis = require("redis");
const client = redis.createClient();

async function run() {
  await client.connect();
  console.log("✅ Redis connected");

  // ------------------------
  // 1️⃣ Add some "books" (keys)
  // ------------------------
  await client.set("book:1", "History of Rome");
  await client.set("book:2", "Math Basics");
  await client.set("book:3", "History of India");
  await client.set("book:4", "Science Experiments");
  console.log("💾 Sample books added\n");

  // ------------------------
  // 2️⃣ SCAN to find all "History" books
  // ------------------------
  console.log("🔎 Searching for History books...");
  let cursor = 0;
  do {
    const res = await client.scan(cursor, { MATCH: "book:*", COUNT: 2 });
    cursor = res.cursor;
    const keys = res.keys;

    for (let key of keys) {
      const book = await client.get(key);
      if (book.includes("History")) {
        console.log("📖 Found:", key, "→", book);
      }
    }
  } while (cursor !== 0);

  // ------------------------
  // 3️⃣ Manual invalidation (delete all books starting with book:1 or book:3)
  // ------------------------
  console.log("\n🗑 Cleaning old books...");
  cursor = 0;
  do {
    const res = await client.scan(cursor, { MATCH: "book:*", COUNT: 2 });
    cursor = res.cursor;
    for (let key of res.keys) {
      // Remove books containing "History"
      const book = await client.get(key);
      if (book.includes("History")) {
        await client.del(key);
        console.log("Deleted:", key, "→", book);
      }
    }
  } while (cursor !== 0);

  console.log("\n✅ Cleanup complete");
  await client.quit();
}

run();

✅ What This Code Does (Real-Life Mapping)

Add keys → like placing books in the library

SCAN + MATCH → walk aisle by aisle to find specific books

Manual deletion → remove outdated books (stale cache)

COUNT = batch size → scan 2 books at a time → safe for large caches

🔹 Key Points

SCAN → safe iteration for large cache

MATCH → filter keys (book:*)

COUNT → batch size per iteration

client.del(key) → manual invalidation

If you want, I can make an enhanced version that combines TTL + LRU + SCAN + Manual Invalidation, so it’s like a real production-ready cache system.
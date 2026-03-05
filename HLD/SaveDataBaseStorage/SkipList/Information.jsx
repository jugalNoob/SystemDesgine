🔥 What is a Skip List?

A Skip List is a probabilistic data structure that allows:

Fast search, insert, and delete — like a balanced tree
But implemented using linked lists + random levels

Average Time Complexity:

Search → O(log n)

Insert → O(log n)

Delete → O(log n)

🧠 Why Do We Need Skip List?

Normal Linked List:

1 → 3 → 7 → 9 → 12 → 20


Search 20 → must traverse all nodes
⏳ O(n)

Balanced Tree (like AVL/Red-Black):

✅ Fast
❌ Complex to implement

Skip List:

✅ Simple
✅ Fast
✅ Used in production systems

🏗 Core Idea

A Skip List is:

👉 Multiple layers of linked lists
👉 Upper layers “skip” many elements

Example:

Level 3:        1 -------- 12
Level 2:     1 ---- 7 ---- 12
Level 1:  1 - 3 - 7 - 9 - 12 - 20


To search 12:

Jump from top level

Drop down levels

Reach quickly

Instead of checking all nodes.

🎯 Why It’s Called “Skip”?

Because it skips elements using higher levels.

📊 Time Complexity


| Operation | Time     |
| --------- | -------- |
| Search    | O(log n) |
| Insert    | O(log n) |
| Delete    | O(log n) |
| Space     | O(n)     |



🧠 Why Random Levels?

When inserting:

Randomly decide height of node

Probability = 0.5 typically

This statistically creates a balanced structure.

No need for tree rotations.

🏢 Real-World Usage

Skip Lists are used in:

Redis → Sorted Sets (ZSET)

LevelDB → Internal indexing

Apache Cassandra → Storage engine components

MemSQL (now SingleStore) → indexing

🔥 Example: Redis Sorted Set (ZSET)

When you use:

ZADD leaderboard 100 user1
ZADD leaderboard 200 user2


Internally:

Redis uses a Skip List

To maintain sorted order

With fast range queries

📊 Skip List vs Tree vs Linked List

| Feature          | Linked List | AVL/Red-Black Tree | Skip List |
| ---------------- | ----------- | ------------------ | --------- |
| Search           | O(n)        | O(log n)           | O(log n)  |
| Implementation   | Easy        | Hard               | Medium    |
| Rotations needed | No          | Yes                | No        |
| Randomized       | No          | No                 | Yes       |
| Used in Redis    | ❌           | ❌                  | ✅         |



🔥 When To Use Skip List?

✅ Sorted leaderboard
✅ Range queries
✅ Ordered data structure
✅ High concurrency systems
✅ In-memory databases

❌ When NOT To Use

❌ Small datasets
❌ When strict worst-case O(log n) required (rare worst case O(n))
❌ When deterministic balancing required

🧠 Interview One-Line Answer

A Skip List is a probabilistic data structure that maintains multiple levels of linked lists to achieve O(log n) average time for search, insert, and delete operations, commonly used in systems like Redis for sorted data.

🚀 How It Fits Your Backend Architecture

Since you are working with:

Redis

Leaderboards

Analytics ranking

High RPS systems

Skip List is ideal for:

Trending Top-K

Score-based ranking

Range-based queries

Real-time dashboards


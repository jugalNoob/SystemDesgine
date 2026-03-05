🔥 Heavy Hitters Algorithm (Top-K Frequent Elements)
🧠 Simple Meaning

A Heavy Hitter is an element that appears very frequently in a data stream.

Example:
If 1 million search queries come in, and "iphone" appears 120,000 times → it’s a heavy hitter.

🎯 Why Heavy Hitters Matter

In real systems, we want to find:

🔎 Top searched keywords

📈 Trending hashtags

🚨 Most attacked IP addresses

🛒 Most purchased products

📡 Most called API endpoints

But storing all data is expensive.

So we use streaming algorithms.

📊 Formal Definition

An element is a heavy hitter if:

𝑓
𝑟
𝑒
𝑞
𝑢
𝑒
𝑛
𝑐
𝑦
(
𝑥
)
>
𝜙
×
𝑁
frequency(x)>ϕ×N

Where:

N = total elements in stream

φ (phi) = threshold (e.g., 5%)

If N = 1,000,000
φ = 0.05

Heavy hitter = appears > 50,000 times.

🏗 Common Heavy Hitter Algorithms
1️⃣ Count-Min Sketch + Top-K Heap

Approximate counting + priority queue.

2️⃣ Misra–Gries Algorithm (Most Popular)

Memory efficient deterministic method.

3️⃣ Space-Saving Algorithm

Improved version of Misra–Gries.

🔥 Misra–Gries Algorithm (Easy Explanation)

Instead of storing all values:

We store only k counters.

When new element arrives:

If already tracked → increment

If free slot → add

Else → decrement all counters

Remove zero counters

At end → remaining elements are potential heavy hitters.

🟣 Simple JavaScript Example (Misra–Gries)
class HeavyHitters {
  constructor(k) {
    this.k = k;
    this.counters = new Map();
  }

  add(value) {
    if (this.counters.has(value)) {
      this.counters.set(value, this.counters.get(value) + 1);
    } else if (this.counters.size < this.k) {
      this.counters.set(value, 1);
    } else {
      for (let [key, count] of this.counters) {
        if (count === 1) {
          this.counters.delete(key);
        } else {
          this.counters.set(key, count - 1);
        }
      }
    }
  }

  getHeavyHitters() {
    return this.counters;
  }
}

// Example
const hh = new HeavyHitters(3);

["apple","banana","apple","apple","orange","banana","apple"]
  .forEach(x => hh.add(x));

console.log(hh.getHeavyHitters());

🧠 Why It Works

If an element is truly frequent:

It survives the decrement steps

Low-frequency elements get eliminated

Memory = O(k)
Time per insert = O(k)

🔥 Count-Min Sketch + Heavy Hitters

In large production systems:

Stream → Count-Min Sketch → Min-Heap (Top-K)


Steps:

Update CMS count

Maintain min-heap of top K elements

Return trending items

Better for:

100k+ events per second

Kafka pipelines

📊 Heavy Hitters vs Count-Min Sketch vs HyperLogLog


| Feature           | Heavy Hitters | Count-Min Sketch | HyperLogLog |
| ----------------- | ------------- | ---------------- | ----------- |
| Finds Top-K       | ✅             | ❌                | ❌           |
| Counts frequency  | Approx        | Approx           | ❌           |
| Counts unique     | ❌             | ❌                | ✅           |
| Memory fixed      | Yes           | Yes              | Yes         |
| Used for trending | ✅             | Partial          | ❌           |



🏢 Real-World Usage

Large tech companies use heavy hitter algorithms internally:

Google → Trending searches

Twitter → Trending hashtags

Facebook → Popular posts

Cloudflare → Top attacking IPs

Amazon → Best-selling products

🏗 System Design Example (Your Kafka Architecture)

You have:

User → Node API → Kafka → Analytics Service


Goal:

100k events per minute

Show Top 10 search keywords

Solution:

Kafka Consumer
      ↓
Count-Min Sketch
      ↓
Min-Heap (size 10)
      ↓
Redis cache
      ↓
Dashboard API


No need to store all searches.

🔴 When NOT To Use

❌ Exact billing
❌ Financial ledger
❌ Precise reports
❌ Small datasets (use Map instead)

🧠 Interview One-Line Answer

Heavy hitters algorithms identify the most frequent elements in a large data stream using limited memory, commonly implemented using Misra–Gries or Count-Min Sketch with a Top-K heap.

🚀 Why It Fits Your High-Throughput Backend

Since you’re building:

High RPS Node APIs

Kafka streaming

Analytics features

Heavy hitters help for:

Trending searches

Most used endpoints

Suspicious IP detection

Real-time dashboards
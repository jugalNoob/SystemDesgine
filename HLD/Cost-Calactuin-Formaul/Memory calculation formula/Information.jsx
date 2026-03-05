Memory calculation formula

Good 🔥
Memory calculation is VERY important in system design interviews.

Since we were talking about Bloom Filters + Redis, I’ll give:

1️⃣ General memory calculation formula
2️⃣ Bloom filter formula
3️⃣ Cache memory estimation
4️⃣ Real interview examples

🧠 1️⃣ Basic Memory Formula

The simplest formula:

Memory = Number of items × Size per item


Example:

If:

1 million users

Each user record = 500 bytes

1,000,000 × 500 bytes
= 500,000,000 bytes
= 500 MB


(1 MB ≈ 10^6 bytes approx for quick interview math)

🔥 2️⃣ Bloom Filter Memory Formula

For Bloom Filter, memory depends on:

n = number of elements

p = false positive probability

Formula:
m = -(n × ln(p)) / (ln(2)^2)


Where:

m = number of bits required

n = number of elements

p = false positive rate

🔎 Example

You want:

1,000,000 items

1% false positive (p = 0.01)

First:

ln(0.01) ≈ -4.605
ln(2)^2 ≈ 0.48


Now:

m = -(1,000,000 × -4.605) / 0.48
m ≈ 9,600,000 bits


Convert bits → bytes:

9,600,000 / 8 = 1,200,000 bytes
≈ 1.2 MB


🔥 So 1M IDs need only ~1.2MB memory.

Very efficient.

🧠 3️⃣ Cache Memory Estimation (Redis Example)

Formula:

Total Memory =
  (Key size + Value size + Redis overhead)
  × Number of keys


Typical Redis overhead per key:
~ 50–100 bytes (metadata, pointers, expiry)

Example

If:

Key = 20 bytes

Value = 500 bytes

Overhead = 80 bytes

1M keys

Total per key = 20 + 500 + 80 = 600 bytes

600 × 1,000,000
= 600,000,000 bytes
= 600 MB


Now add:

20% safety buffer

Replication factor

Final needed:

600 MB × 1.2 = 720 MB
If 2 replicas → 720 × 2 = 1.4 GB

🚀 4️⃣ Quick Estimation Tricks (Interview Hack)
Bytes Conversion
1 KB ≈ 10^3
1 MB ≈ 10^6
1 GB ≈ 10^9


For fast math:

1 billion bytes ≈ 1 GB

Request Memory Calculation

If:

100k RPS

Each request = 1 KB in memory

Avg processing time = 100ms

Concurrent requests:

100,000 × 0.1 = 10,000 concurrent


Memory:

10,000 × 1 KB
= 10 MB

🔥 5️⃣ Kafka Memory Example

If:

50k messages/sec

Each message = 1 KB

Retention = 24 hours

Data per second:

50,000 × 1 KB = 50 MB/sec


Per hour:

50 × 3600 = 180,000 MB
= 180 GB


Per 24 hours:

180 × 24 = 4320 GB
= 4.3 TB


That’s why retention planning is critical.

🧨 Common Mistakes

❌ Forgetting metadata overhead
❌ Forgetting replication
❌ Forgetting compression
❌ Forgetting TTL behavior
❌ Forgetting concurrent memory

🎯 Interview Strategy

When interviewer asks:

“How much memory needed?”

You say:

Estimate item size

Multiply by count

Add overhead

Add replication

Add 20% buffer

That sounds senior.

If you want, I can now explain:

🔥 Cuckoo filter memory vs Bloom

🔥 Redis cluster memory planning

🔥 How to calculate memory for 100M users

🔥 JVM heap sizing

🔥 Node.js memory limits & GC
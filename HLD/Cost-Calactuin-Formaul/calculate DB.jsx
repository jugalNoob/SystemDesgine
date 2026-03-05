Perfect 🔥
Now we calculate DB capacity scientifically for your REST API (20k–50k users).

We will calculate:

1️⃣ Requests per second (RPS)
2️⃣ Read/Write ratio
3️⃣ Query cost
4️⃣ DB CPU & IOPS need
5️⃣ When MongoDB becomes bottleneck

🧮 Step 1: Estimate Traffic

Assume:

50,000 registered users

30% active daily = 15,000 active users

Peak time = 10% active at same time
→ 1,500 concurrent users

If each user makes:

2 requests per minute

Then:

1,500 × 2 = 3,000 requests/min
= 50 requests/sec (RPS)


So peak ≈ 50 RPS

🧮 Step 2: Read vs Write Ratio

Typical REST app:

80% reads

20% writes

So:

Reads = 40 RPS

Writes = 10 RPS

🧮 Step 3: Query Cost
Case A: Indexed Query (Good Design)

MongoDB indexed find:

~2–5 ms per query

At 40 RPS:

40 × 5ms = 200ms total CPU per second


Very safe.

Case B: Offset with skip(10,000)

MongoDB must scan 10k records.

Query time can become:

50–200ms

At 40 RPS:

40 × 100ms = 4000ms CPU per second


Now DB CPU spikes.

This is why skip is dangerous at scale.

🧮 Step 4: IOPS Calculation

Each read query:

~4KB–16KB disk read (if not cached)

But most data stays in RAM (WiredTiger cache)

If 40 RPS:

40 × 10KB = 400KB/sec
= ~24MB/min


Even a small SSD handles 50k IOPS easily.

So disk is not main bottleneck.

CPU + memory + indexing are.

🧮 Step 5: RAM Requirement

Rule:

Working set should fit in RAM.

If:

500k records

Each record 1KB

Total size:

500k × 1KB = 500MB


MongoDB WiredTiger uses 50% RAM by default.

So server needs:

At least 2–4GB RAM.

🧮 Step 6: With Redis Cache (Important 🔥)

If 70% requests are cached:

40 RPS reads → only 12 RPS hit MongoDB

Now DB load is tiny.

This is why caching is powerful.

📊 Final Capacity Summary for 50k Users


| Component | Required  |
| --------- | --------- |
| RPS       | 50        |
| Read RPS  | 40        |
| Write RPS | 10        |
| RAM       | 4GB safe  |
| CPU       | 2–4 cores |
| Disk      | SSD       |
| Redis     | 1–2GB RAM |




This easily handles 50k users.

🔥 When DB Becomes Bottleneck

It happens when:

500 RPS

skip deep pagination

no indexes

large unfiltered scans

working set > RAM

At that point:

Add read replicas

Add sharding

Switch to cursor pagination

🧠 Interview-Level Answer

If interviewer asks:

How do you calculate DB capacity?

You say:

"I estimate peak RPS, split read/write ratio, measure indexed query latency, calculate working set size, and ensure it fits in RAM. I reduce DB load using caching and indexed queries."

🔥 That is senior backend thinking.

If you want next:

🔥 Calculate for 100k users

🔥 Simulate 500 RPS scenario

🔥 Design replica architecture

🔥 Detect DB bottleneck scientifically
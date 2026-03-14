| RPM     | RPS   | Payload (KB) | Cache Duration (s) | Overhead Factor | Redis RAM (MB) |
| ------- | ----- | ------------ | ------------------ | --------------- | -------------- |
| 10,000  | 167   | 1            | 60                 | 1.2             | 11.7 MB        |
| 50,000  | 833   | 1            | 60                 | 1.2             | 58.3 MB        |
| 100,000 | 1,667 | 1            | 60                 | 1.2             | 117 MB         |
| 100,000 | 1,667 | 2            | 60                 | 1.2             | 234 MB         |
| 200,000 | 3,333 | 1            | 60                 | 1.2             | 234 MB         |
| 500,000 | 8,333 | 1            | 120                | 1.2             | 1,170 MB       |
Redis Cache Memory Calculator Table

Formula Recap

Redis Memory (MB)=1024RPS×Payload (KB)×Cache Duration (s)×Overhead Factor​

RPS = Requests per second = RPM ÷ 60

Payload = Average response size (KB)

Cache Duration = How long the cache stores the data (seconds)

Overhead Factor = Redis metadata overhead (≈1.2)


2️⃣ How to Use

Convert RPM → RPS: RPS = RPM ÷ 60

Pick Payload: Estimate average response size in KB

Pick Cache Duration: How long the entry will stay in cache (TTL)

Apply Overhead: Multiply by 1.2 for Redis metadata

Convert KB → MB: Divide by 1024

3️⃣ Notes for Interviews

Cache Hit Ratio: Improves CPU usage — less DB load

Eviction: If memory is limited, use LRU/LFU eviction policies

Sharding / Cluster: For huge traffic, split cache across multiple Redis nodes


1️⃣ Given / Assumptions

RPM = 100,000 → RPS ≈ 1,667

Payload per request = 1 KB

CPU per request = 100 ms

Cache TTL = 60 seconds

Total records in DB = 500,000 × 1 KB ≈ 500 MB

We want: Server RAM, Redis memory, MongoDB memory.
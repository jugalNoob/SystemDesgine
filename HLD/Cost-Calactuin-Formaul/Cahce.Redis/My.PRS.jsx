Step 1: Redis memory calculation

We have:

Number of keys (N) = 100,000

Key size (S_key) = assume 20 bytes

Value size (S_value) = assume 200 bytes (average JSON)

Redis overhead per key (O_key) = 100 bytes

Memory per key:

Skey​+Svalue​+Okey​=20+200+100=320 bytes

Total memory:

Memory=N×Memory per key=100,000×320=32,000,000 bytes≈30.5 MB


✅ So Redis memory required ≈ 30–35 MB.

You can add a safety margin of 2× for growth → ~64–70 MB.

Step 2: Requests per minute (PRM) → Requests per second (RPS / PRS)

You mentioned:

PRM = 100,000 (requests per minute)

PRS (calculated) = 1667 requests per second

Calculation formula:

PRS=60PRM​=60100,000​≈1667

So, your API must handle 1667 GET requests per second.

Step 3: Redis memory vs throughput

Each GET request reads 1 key (average size = 320 bytes)

Memory access per second:

Data per second=PRS×Memory per key=1667×320 bytes

Step-by-step calculation:

1667
×
320
=
?
1667×320=?

1667 × 300 = 500,100

1667 × 20 = 33,340

Total = 500,100 + 33,340 = 533,440 bytes per second

≈0.5MB/s

✅ So Redis bandwidth requirement is very low 
(~0.5 MB/s) for 100k cached keys at 1667 RPS.


| Metric                     | Value                       |
| -------------------------- | --------------------------- |
| Number of keys (N)         | 100,000                     |
| Memory per key             | 320 bytes                   |
| Total Redis memory         | ~32 MB (~64 MB with margin) |
| Requests per minute (PRM)  | 100,000                     |
| Requests per second (PRS)  | 1,667                       |
| Redis bandwidth per second | ~0.5 MB/s                   |
✅ Conclusion:

Redis memory = ~64 MB with safety margin

Redis can easily handle 1667 RPS on a single node

If traffic grows (e.g., 500k PRM → ~8333 PRS), you can scale Redis horizontally or vertically.
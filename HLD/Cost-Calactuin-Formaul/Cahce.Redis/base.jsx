1. Formula to estimate Redis cache memory

The memory depends on:

Number of keys (N)

Size of each key (S_key)

Size of each value (S_value)

Redis overhead per key (O_key) — internal metadata (~50–100 bytes depending on Redis version and data type)

Optional: replication or persistence overhead

Memory formula (rough estimate):

Memory=N×(Skey​+Svalue​+Okey​)


2. Step-by-step calculation
Step 1: Number of cache entries

Suppose your GET API will cache 100,000 records.

N=100,000

Step 2: Key size

If your cache key is something like:

"user:12345"


Key length = 10–20 bytes (let’s assume 20 bytes for safety)


Skey​=20 bytes


Step 3: Value size

Value could be a JSON object like:

{
  "id": 12345,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}


Approximate size = 150–200 bytes (stringified)


Svalue​=200 bytes

Step 4: Redis overhead

Redis stores metadata per key (~50–100 bytes, depending on data type).
We assume O_key = 100 bytes


Step 5: Total memory

Memory per key=Skey​+Svalue​+Okey​=20+200+100=320 bytes


Total memory=100,000×320=32,000,000 bytes≈30.5 MB


✅ So, roughly 30–35 MB of Redis memory is enough for 100k records of this size.

3. Considerations for production

Add safety margin – Use 1.5–2× for growth:

32 MB × 2 ≈ 64 MB


Key and value size may vary – JSON objects can grow, so track the largest objects.

Eviction policy – Use LRU/LFU if memory may exceed limits.

Persistence – If Redis persistence (RDB/AOF) is enabled, disk usage will also increase.

Cluster scaling – For very large datasets, split across multiple Redis nodes.


4. Example for bigger system

1 million cache entries

Average size per entry = 1 KB (key + value + overhead)


1,000,000×1KB=1GB

So, you need at least 1–1.5 GB Redis memory with a margin.


1️⃣ Basic Formula for Redis Cache Size

Cache Size=Number of Items×Size per Item×Overhead Factor

Where:

Number of Items = How many requests or records you plan to cache

Size per Item = Average size of one payload (in bytes or KB)

Overhead Factor = Redis metadata overhead (key, pointers, etc.), usually ~1.1–1.2


2️⃣ Example Calculation

Scenario:

Requests per second (RPS) = 1,667

Payload per request = 1 KB

Cache retention = 60 seconds

Cache hit ratio = 80% (not directly needed for size, but helps capacity planning)

Step 1: Total cached requests

Total cached requests=RPS×cache_time

1,667×60≈100,020


Step 2: Total data size

Cache size (KB)=100,020×1 KB≈100MB

Step 3: Add Redis overhead (~20%)

100MB×1.2=120MB

✅ Redis cache requirement ≈ 120 MB

3️⃣ Considerations

Key Size: Each entry has a key. If key = 50 bytes, add that to size.

Eviction: If memory is limited, use LRU/LFU eviction.

TTL: Only store for a certain duration → reduces memory footprint.

Data Type: Strings, hashes, sets, lists all have different overheads.



4️⃣ Quick Formula for Any System




Redis Memory (MB)=1024RPS×Payload Size (KB)×Cache Duration (s)×1.2​


5️⃣ Example for Your Case

RPS = 1,667

Payload = 1 KB

Cache time = 60 s

Overhead factor = 1.2

Redis_RAM=10241667×1×60×1.2​≈117MB

✅ So for 100,000 RPM under 1 min, Redis cache ≈ 120 MB.


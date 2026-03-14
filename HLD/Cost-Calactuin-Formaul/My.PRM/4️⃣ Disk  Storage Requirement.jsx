4️⃣ Disk / Storage Requirement

GET APIs usually read data; disk requirement depends on data size.

Example: if each record = 1 KB, total records = 500k → 500 MB disk.

If caching responses → same as RAM estimate.

5️⃣ Throughput / Network Requirement

Each request = 1 KB payload

Requests/sec = 1,667

Bandwidth per second=1667×1 KB≈1.63MB/sec

Network should support ≥ 1.63 MB/sec, or ~13 Mbps (1 MB ≈ 8 Mb).




4️⃣ Disk Storage Requirement

Total records: N

Record size: size_record (KB)

\text{Disk (KB)} = N \times \text{size_record}

Convert to MB:


Disk (MB)=1024Disk (KB)​



Example:

N = 500,000

size_record = 1 KB


Disk=500,000KB≈488.3MB
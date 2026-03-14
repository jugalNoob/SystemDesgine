Assume:

Each GET request returns 1 KB

If 1,667 requests/sec, in 1 second, memory needed:

1667×1 KB≈1,667 KB≈1.63MB/sec

If you keep all active requests in memory, multiply by the number of seconds
 requests are stored.

For 1-minute test:

1,667 KB/sec×60≈100,000 KB≈97.7MB

1667 * 60 = 100000 KB 


✅ So roughly 100 MB RAM needed for caching responses.



3️⃣ RAM Requirement

Payload per request: size_payload (KB)

Retention time: how long data stays in memory (t_mem in seconds)

\text{RAM (KB)} = \text{RPS} \times \text{size_payload} \times t_{mem}

Convert to MB:

RAM (MB)=1024RAM (KB)​



Example:

RPS = 1,667

size_payload = 1 KB

t_mem = 60 sec

RAM=1,667×1×60=100,020KB≈97.7MB



Perfect 🔥 let’s talk about how to monitor Redis eviction in production.

🌐 Why Monitor Redis Eviction?

Redis evictions happen when memory is full. If you don’t monitor, you might:

Lose important cached data

Increase cache misses → slower app

Cause unexpected errors (if using noeviction policy)

🧠 Key Metrics to Monitor

Redis exposes several metrics to track evictions:

| Metric                       | Meaning                                                    |
| ---------------------------- | ---------------------------------------------------------- |
| `used_memory`                | Current memory used by Redis                               |
| `maxmemory`                  | Maximum memory configured                                  |
| `evicted_keys`               | Number of keys **evicted** so far                          |
| `expired_keys`               | Number of keys **expired naturally**                       |
| `keys`                       | Total number of keys in DB                                 |
| `memory_fragmentation_ratio` | Memory fragmentation (high value → inefficient memory use) |




🔥 How to Monitor
1️⃣ Using INFO command
redis-cli INFO memory


Sample output:

used_memory:10240000
used_memory_human:9.77M
maxmemory:104857600
maxmemory_human:100M
evicted_keys:25
expired_keys:150
memory_fragmentation_ratio:1.02


evicted_keys > 0 → Redis has started evicting keys

memory_fragmentation_ratio > 1.5 → might need memory optimization

2️⃣ Using Redis MONITOR (live command)
redis-cli MONITOR


Shows all commands in real-time

Useful for debugging which keys are being evicted or accessed

⚠️ Use carefully in production (high overhead)

3️⃣ Using Redis INFO stats
redis-cli INFO stats


Key fields:

evicted_keys → total evictions

expired_keys → expired keys

4️⃣ Using Prometheus + Redis Exporter

Run redis_exporter → exposes Redis metrics

Monitor redis_evicted_keys_total metric in Grafana

Set alerts:

if redis_evicted_keys_total > 0 for 5min → alert

5️⃣ Application-Level Monitoring

Track cache misses in your app

Sudden spike → could indicate evictions

🏗 Practical Tips

Set maxmemory carefully based on RAM available

Choose eviction policy wisely (allkeys-lru for cache, volatile-lru for expiring keys)

Alert if evictions happen frequently → maybe increase memory or optimize cache

🔥 Quick Interview Answer

“To monitor Redis eviction, I would check evicted_keys and used_memory via INFO memory, track metrics via Prometheus/Grafana, and set alerts if evictions occur frequently. Frequent evictions indicate memory pressure and require tuning of maxmemory or eviction policy.”
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
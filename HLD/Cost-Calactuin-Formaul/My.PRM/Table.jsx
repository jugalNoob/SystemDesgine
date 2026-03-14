| Resource     | Requirement                   |
| ------------ | ----------------------------- |
| Requests/sec | 1,667                         |
| CPU          | ~167 cores @100ms/request     |
| RAM          | ~100 MB (for caching 1 min)   |
| Disk         | Depends on total dataset size |
| Network      | ~1.63 MB/sec (~13 Mbps)       |


✅ Notes

CPU cores = (RPS × CPU time per request) / 1s

RAM = RPS × payload × seconds stored

Network = RPS × payload

Disk = total dataset size


| Resource  | Formula                                         |
| --------- | ----------------------------------------------- |
| RPS       | `RPM / 60`                                      |
| CPU cores | `ceil(RPS × t_cpu)`                             |
| RAM       | `RPS × size_payload × t_mem` (KB) → ÷1024 = MB  |
| Disk      | `total_records × size_record` (KB) → ÷1024 = MB |
| Network   | `RPS × size_payload` KB/sec → ×8/1024 = Mbps    |


🔹 Example Full Calculation

Scenario:

RPM = 100,000

Payload = 1 KB

CPU per request = 100 ms

Retention in RAM = 60 s

Records in DB = 500k

Solution:

RPS = 100,000 / 60 ≈ 1,667

CPU cores = 1,667 × 0.1 s = 167 cores

RAM = 1,667 × 1 × 60 = 100,020 KB ≈ 97.7 MB

Disk = 500,000 × 1 = 500,000 KB ≈ 488.3 MB

Network = 1,667 KB/sec ≈ 13 Mbps

✅ This is exactly how to size your GET API system.
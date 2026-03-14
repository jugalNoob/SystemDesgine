                    +----------------+
                    |     Client     |
                    +----------------+
                             |
                             v
                    +----------------+
                    |      CDN       |
                    +----------------+
        (caches static content, reduces origin load)
                             |
                             v
                    +----------------+
                    |     Negex      |
                    |  (API Gateway) |
                    +----------------+
        (handles auth, throttling, metrics, rate-limit)
                             |
                             v
                    +----------------+
                    | Round Robin LB |
                    +----------------+
        (distributes 100k RPM ~ 1666 requests/sec per cluster)
             /---------+-----------+---------\
             v                     v          v
     +----------------+   +----------------+  +----------------+
     |  3001 Server   |   |  3000 Server   |  |  3002 Server   |
     |  Cluster 1     |   |  Cluster 2     |  |  Cluster 3     |
     | Worker Threads |   | Worker Threads |  | Worker Threads |
     +----------------+   +----------------+  +----------------+
             |                     |                 |
      +------+-----+         +-----+------+    +-----+------+
      | GET API     |        | POST API    |   | POST API    |
      +-------------+        +-------------+   +-------------+
             |                     |                 |
             |                     |                 |
       +-------------+       +----------------+  +----------------+
       | Redis Cache |       | Kafka Producer |  | Kafka Producer |
       | (Hit/Miss)  |       +----------------+  +----------------+
       | Max 50k items, TTL  |   (async queue for heavy tasks)
       +-------------+                 |
             |                         v
             |                  +----------------+
             |                  | MongoDB Write  |
             |                  | (Persistent)   |
             |                  | Replica Set    |
             |                  +----------------+
             |                          ^
             +--------------------------+
                             |
                             v
                     +----------------+
                     | Kafka Consumer |
                     | (Async Tasks)  |
                     +----------------+
                             |
                             v
                     +----------------+
                     |  Response to   |
                     |    Client      |
                     +----------------+




                     Calculations & Design Notes for 100k RPM

Requests per second (RPS):

100,000 RPM ÷ 60 sec ≈ 1666 RPS


If 3 Node.js clusters → 1666 ÷ 3 ≈ 555 RPS per cluster.

Each cluster can use 4–8 worker threads to parallelize CPU-bound tasks.

Redis Cache Sizing:

Assume 50k cached items, avg 1KB each → 50 MB memory.

Use TTL (time-to-live) to evict old cache entries.

MongoDB Writes:

Writes handled via Kafka async producer to prevent blocking GET/POST responses.

Replica set ensures read scalability for GET-heavy operations.

Kafka Throughput:

Each POST produces 1 message.

At 100k RPM → ~1666 messages/sec.

Multiple partitions recommended (e.g., 3–6 partitions) to scale consumers.

API Gateway / Rate Limiting:

Use Token Bucket / Leaky Bucket to allow bursts but maintain average ~1666 RPS.

Protect backend from overload.

Cluster Horizontal Scaling:

Add more Node.js server clusters if load exceeds RPS per cluster.

Auto-scale using Kubernetes or cloud autoscaling.




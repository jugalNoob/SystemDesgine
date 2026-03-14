| Layer / Concern                         | What if Traffic Spikes?                | Node.js Patterns / Tools                                                         | Real-World Example / Notes                                                                       |
| --------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Horizontal Scaling / Load Balancing** | Single instance overloaded             | Load balancer (Nginx, HAProxy, AWS ALB), multiple Node.js instances, PM2 cluster | Requests distributed across multiple Node.js instances → avoids CPU saturation.                  |
| **Caching / Fast Reads**                | DB overloaded                          | Redis / Memcached caching, in-memory cache                                       | Frequently requested data (sessions, configs, product info) served from cache → reduces DB load. |
| **Queueing / Async Processing**         | Spike in writes / heavy tasks          | RabbitMQ, Kafka, Bull / BullMQ, SQS                                              | Offload long-running tasks (emails, notifications, image processing) → smooths peak load.        |
| **Rate Limiting / Throttling**          | Abuse or traffic burst                 | Express-rate-limit, Nginx rate limiting, API gateway limits                      | Protects API endpoints from overload → fair usage and stability.                                 |
| **Circuit Breakers / Backpressure**     | Downstream service slow or unavailable | `opossum`, AbortController, backpressure handling                                | Stops flooding a slow DB/API → prevents cascading failure.                                       |
| **Database / Storage Scaling**          | DB bottleneck                          | Replication, sharding, read replicas                                             | Read-heavy traffic handled by replicas; writes can be sharded to avoid hot spots.                |
| **CDN / Edge Caching**                  | Global traffic spikes                  | CloudFront, Akamai, Fastly                                                       | Static assets, images, scripts served from edge → reduces load on origin server.                 |


✅ Key Notes:

Node.js handles IO-bound traffic well, but CPU-heavy tasks must be offloaded to queues or worker threads.

Combining horizontal scaling + caching + queueing + rate-limiting is the standard production approach for spikes.

Observability is crucial: monitor queue lengths, CPU/memory, request latency.
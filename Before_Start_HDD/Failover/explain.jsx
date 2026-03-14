| Layer / Concern                             | What If a Node / Service Fails? | Node.js Patterns / Tools                                             | Real-World Example / Notes                                                                      |
| ------------------------------------------- | ------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Process / Instance Failover**             | Single Node process crashes     | PM2 cluster mode, Node.js `cluster`, auto-restart                    | Worker dies → auto-restart ensures process availability; multi-core utilization.                |
| **Instance / Server Failover**              | Server or VM fails              | Load balancer (Nginx, HAProxy, AWS ALB), multiple Node.js instances  | Traffic automatically routed to healthy instances → uninterrupted service.                      |
| **Data Layer Failover**                     | Primary DB fails                | DB replication, read replicas, failover clusters (MongoDB, Postgres) | Reads can switch to replicas; writes failover to secondary → preserves data availability.       |
| **Cache / Session Failover**                | Redis / Memcached crashes       | Redis cluster, replication, sentinel                                 | Sessions and cached data survive node failure → stateless Node.js instances remain operational. |
| **Microservices / Service Isolation**       | One microservice down           | Moleculer / NestJS microservices, circuit breakers                   | Failing service isolated; dependent services continue operating.                                |
| **Queue / Async Task Failover**             | Worker crashes                  | Bull / BullMQ with multiple workers, Kafka consumer groups           | Tasks reassigned to other workers → ensures queued jobs are not lost.                           |
| **Deployment / Orchestration Failover**     | Pod / zone failure              | Kubernetes multi-zone clusters, auto-healing, rolling updates        | Failed pods replaced automatically; multi-zone → survives data center failure.                  |
| **External API Failover**                   | Third-party service unavailable | Circuit breaker (`opossum`), fallback endpoints, retries             | Fallback to alternate service or cached response → prevents cascading failure.                  |
| **CDN / Edge Failover**                     | CDN node goes down              | Multi-CDN, fallback origins                                          | Requests served from alternate CDN → uninterrupted static content delivery.                     |
| **Graceful Degradation / Partial Failover** | System partially failing        | Feature flags, cached/fallback responses                             | System serves partial functionality instead of full outage → maintains user experience.         |



Key Failover Notes

Failover = automatic switch to backup / healthy resource when primary fails.

Node.js apps rely on multi-layer failover: process → instance → data → cache → microservices → queues → deployment → external APIs → CDN.

Use redundancy + health checks + orchestration to implement seamless failover.

Combine with circuit breakers + graceful degradation → prevent cascading failures during outages.
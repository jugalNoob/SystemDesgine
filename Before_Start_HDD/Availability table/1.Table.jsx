| Layer / Concern                              | What If Availability Is Impacted?     | Node.js Patterns / Tools                                            | Real-World Example / Notes                                                                      |
| -------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Process / Instance Availability**          | Single Node.js process crashes        | PM2 (cluster mode), Node.js `cluster`, auto-restart                 | Worker dies → PM2 restarts automatically; ensures minimal downtime.                             |
| **Horizontal Scaling**                       | Instance or machine failure           | Load balancer (Nginx, HAProxy, AWS ALB), multiple Node.js instances | Traffic routed to healthy instances → avoids downtime during spikes or crashes.                 |
| **State Availability**                       | In-memory data lost                   | Redis (replication, pub/sub, session store), DB replication         | Redis cluster ensures shared session data survives instance failures.                           |
| **Circuit Breakers / External Dependencies** | Downstream API or DB fails            | Opossum circuit breaker, AbortController, retries                   | Prevent cascading failures; automatically fallback or degrade gracefully.                       |
| **Microservices / Service Isolation**        | One service down                      | Moleculer / NestJS microservices, saga workflows                    | Failure in one microservice doesn’t crash entire system; sagas ensure eventual consistency.     |
| **Observability & Alerting**                 | Failures unnoticed                    | Prometheus + Grafana, Datadog, New Relic, centralized logs          | Detect high error rates, slow responses, or node failures early → proactive remediation.        |
| **Deployment / Orchestration**               | Pod / zone failure                    | Kubernetes auto-healing, rolling updates, multi-zone clusters       | Failed pods replaced automatically; zero-downtime rolling updates; survive data center outages. |
| **Health Checks / Readiness Probes**         | Instance unavailable but not detected | K8s liveness/readiness probes, custom health endpoints              | Automatically removes unhealthy instances from load balancer → maintain availability.           |
| **Caching & CDN**                            | Origin overload or network spikes     | Redis, Memcached, CloudFront / Fastly                               | Offload requests to cache / CDN → reduce load on backend and improve perceived availability.    |
| **Graceful Degradation**                     | Full system stress or partial failure | Feature flags, fallback responses, static content                   | Serve partial data or cached responses instead of failing completely.                           |



Availability Notes / Best Practices

Multi-layer approach: Process → State → Scaling → Microservices → Observability → Deployment.

Redundancy + Fast Recovery is often more practical than trying to prevent all failures.

Combine circuit breakers, caching, load balancing, and graceful degradation → maintain uptime even when parts of the system fail.

Health checks + auto-healing orchestration (Kubernetes) → critical for cloud-native Node.js apps.

If you want, I can now merge this Availability table with all your previous tables (Fault Tolerance, Scalability, Performance, Consistency, Security, Maintainability) into one ultimate Node.js backend cheat sheet for interviews and production, so you have a single-page reference.
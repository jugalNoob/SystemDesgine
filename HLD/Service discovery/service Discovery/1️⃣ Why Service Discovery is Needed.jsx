1️⃣ Why Service Discovery is Needed

:-: In microservices or distributed systems:

Services can run on multiple instances for load balancing and high availability.

IPs and ports may change due to auto-scaling or container orchestration (like Kubernetes).

Hardcoding service locations is not practical.

:-: Example:

User Service needs to call Payment Service.

Payment Service could have 10 instances running on different IPs.

How does User Service know which instance to call? → Service discovery solves this.


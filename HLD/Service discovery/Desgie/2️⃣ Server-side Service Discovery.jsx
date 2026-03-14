2️⃣ Server-side Service Discovery
          +-----------------+
          |     Client      |
          +--------+--------+
                   |
                   v
          +-----------------+
          | Load Balancer   |
          |  (Nginx/ELB)   |
          +--------+--------+
                   |
                   v
          +-----------------+
          | Service Registry|
          |  (Eureka/Consul)|
          +--------+--------+
                   |
           Lookup healthy service
                   |
                   v
          +-----------------+
          | Service Instance|
          |  (Payment v1)   |
          +-----------------+
          | Service Instance|
          |  (Payment v2)   |
          +-----------------+


Flow:

Client sends request to the Load Balancer.

Load Balancer queries the registry to get healthy instances.

Load Balancer chooses an instance and forwards the request.

✅ Pros: Clients are simple, no need to implement discovery logic.
❌ Cons: Slightly slower due to extra hop; load balancer is a single point of failure if not redundant.

💡 Key Note:

In Kubernetes, service discovery is built-in using DNS: clients just call payment-service.default.svc.cluster.local, and K8s handles the routing.
1️⃣ Client-side Service Discovery
          +-----------------+
          |    Client       |
          |  (User Service) |
          +--------+--------+
                   |
                   v
          +-----------------+
          | Service Registry|
          |  (Eureka/Consul)|
          +--------+--------+
                   |
           Lookup service info
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

Client queries the registry to get all available instances of Payment Service.

Client chooses an instance (e.g., using round-robin or least connections).

Client directly calls the chosen service instance.

✅ Pros: Fast, no extra layer.
❌ Cons: Client handles load balancing logic;
 each client needs registry access.
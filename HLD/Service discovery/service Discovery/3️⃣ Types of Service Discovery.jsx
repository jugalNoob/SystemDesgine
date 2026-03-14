3️⃣ Types of Service Discovery
a) Client-side Discovery

The client queries the registry and decides which service instance to call.

Load balancing is done on the client side.

Flow:

Client → Service Registry → Client picks service instance → Service instance


Example: Netflix Eureka + Ribbon

b) Server-side Discovery

Client sends a request to a load balancer or router, which queries the registry.

Load balancer decides which service instance to forward to.

Flow:

Client → Load Balancer → Service Registry → Service instance


Example: AWS ELB, Nginx with dynamic upstream
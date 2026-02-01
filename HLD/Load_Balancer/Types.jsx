1️⃣ What is Load Balancing?

Definition: Distributing incoming network traffic across multiple servers to ensure:

High availability

Scalability

Optimal resource utilization

Goal: Prevent any single server from becoming a bottleneck.




2️⃣ Types of Load Balancers
A. Based on OSI Layer



| Type                      | Layer      | How it Works                                            | Example Use Case                 |
| ------------------------- | ---------- | ------------------------------------------------------- | -------------------------------- |
| **Layer 4 (Transport)**   | TCP/UDP    | Routes traffic based on IP address and port             | High-performance, simple routing |
| **Layer 7 (Application)** | HTTP/HTTPS | Routes traffic based on content (URL, headers, cookies) | Web apps, APIs, microservices    |



Summary / Quick Notes

1:::Layer 4 Load Balancers

Pros: Very fast, minimal overhead.

Cons: Cannot inspect application content.

2:::Layer 7 Load Balancers

Pros: Content-aware routing, sticky sessions, can do SSL termination.

Cons: Slightly slower due to content inspection.

3::::Algorithm Selection

Round Robin → simple, evenly distributed traffic.

Weighted Round Robin → consider server capacity.

Least Connections → dynamic load distribution.

IP Hash / Sticky Sessions → session persistence.

Least Response Time → routes to fastest server.




B. Based on Deployment


| Type                       | Description                                          |                               |
| -------------------------- | ---------------------------------------------------- | ----------------------------- |
| **Hardware Load Balancer** | Physical devices with dedicated resources; very fast | Enterprise-grade              |
| **Software Load Balancer** | Runs on commodity servers; flexible & cheap          | Nginx, HAProxy, Envoy         |
| **Cloud Load Balancer**    | Managed service by cloud providers                   | AWS ELB/ALB, GCP LB, Azure LB |


3️⃣ Load Balancing Algorithms / Strategies
A. Round Robin

Requests are sent one by one to each server in order.

Pros: Simple, evenly distributes traffic if servers are identical.

Cons: Doesn’t account for server load or capacity.

B. Least Connections

Requests are sent to the server with the fewest active connections.

Pros: Good for servers with varying workloads.

Cons: Slightly more complex to implement.

C. IP Hash

Requests from a specific client IP always go to the same server.

Pros: Good for session persistence (“sticky sessions”).

Cons: Can lead to uneven load if clients are unevenly distributed.

D. Weighted Round Robin

Servers are assigned weights based on capacity; higher weight → more requests.

Pros: Handles heterogeneous servers effectively.

E. Least Response Time

Sends traffic to the server with the lowest response time.

Pros: Dynamically adapts to server performance.

F. Random

Randomly selects a server for each request.

Pros: Simple.

Cons: Can lead to uneven distribution; rarely used in production.

4️⃣ Types Based on Session Persistence

Sticky Sessions: Requests from the same client always go to the same server (IP hash or cookies).

Non-sticky Sessions: Any server can handle any request (stateless applications).



5️⃣ Example Load Balancers in Real Systems


| Tool / Service          | Type / Notes                                                              |
| ----------------------- | ------------------------------------------------------------------------- |
| **Nginx**               | Software, Layer 7, supports round-robin, least connections, IP hash       |
| **HAProxy**             | Software, Layer 4 & 7, highly configurable                                |
| **AWS ELB / ALB / NLB** | Cloud, managed, supports round-robin, sticky sessions, path-based routing |
| **F5 BIG-IP**           | Hardware load balancer, enterprise features                               |
| **Envoy**               | Layer 7, service mesh compatible, modern microservices                    |

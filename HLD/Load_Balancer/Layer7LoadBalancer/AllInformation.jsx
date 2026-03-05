🧠 What is Load Balancing?

Load balancing distributes incoming network requests across multiple servers to:

Improve throughput

Reduce latency

Ensure availability and fault tolerance

Layer 4 (TCP) and Layer 7 (HTTP) LBs use different algorithms.




🧠 What is Load Balancing?

Load balancing distributes incoming network requests across multiple servers to:

Improve throughput

Reduce latency

Ensure availability and fault tolerance

Layer 4 (TCP) and Layer 7 (HTTP) LBs use different algorithms.

🔹 1️⃣ Round Robin

How it works:

LB sends requests to backend servers in order, looping back after the last server.

Example: 3 servers → requests go to 1 → 2 → 3 → 1 → 2 → 3…

Pros:

Simple and easy to implement

Works well if servers are roughly equal in capacity

Cons:

Doesn’t consider server load

Can overload a slower server

Best use case: Stateless servers of similar capacity (like Node.js API pods serving /users).

🔹 2️⃣ Weighted Round Robin (WRR)

How it works:

Each server is assigned a weight based on capacity

Servers with higher weight get more requests

Example: 3 servers with weights 1, 2, 1 → request order: S1, S2, S2, S3, S1…

Pros:

Handles heterogeneous servers

Simple extension of round-robin

Cons:

Needs manual weight assignment or dynamic monitoring

Best use case: Mixed server capacities in cluster.

🔹 3️⃣ Least Connections

How it works:

Sends new requests to the server with fewest active connections

Dynamic — adapts to varying load per server

Pros:

Great for long-lived requests (WebSocket, gRPC)

Automatically balances servers under heavy load

Cons:

Slightly more complex to implement

Needs LB to track active connections

Best use case: Chat apps, video streaming, long-running API requests.

🔹 4️⃣ Weighted Least Connections

Same as Least Connections, but weights capacity of servers

Higher weight → can handle more connections

Best use case: Heterogeneous clusters with long-lived requests

🔹 5️⃣ IP Hash / Client Hash

How it works:

Compute hash of client IP → choose backend

Ensures same client always hits same server (sticky session without cookies)

Pros:

Useful when session affinity required

No backend state replication required

Cons:

Poor if backend servers fail → client hash may go to new server

Doesn’t consider server load

Best use case: Session-based applications without distributed cache

🔹 6️⃣ Random

Pick a random backend server

Simple, surprisingly effective at scale for uniform traffic

Pros: Easy to implement
Cons: Can cause uneven load if traffic is bursty

🔹 7️⃣ Least Response Time

How it works:

Send requests to the server with lowest average response time

Dynamically adapts to server performance

Pros: Good for variable server performance
Cons: Needs monitoring and statistics collection

Best use case: High-latency workloads, heterogeneous clusters

🔹 8️⃣ Consistent Hashing

Hash request (URL, userID, key) → route to specific server

Mainly used in caching systems (Redis Cluster, CDN)

Pros:

Minimizes cache misses if server changes

Stable distribution

Cons: More complex

Need hash ring

Best use case: Distributed caches, sharded databases

🔹 Summary Table



| Algorithm                  | Pros                                        | Cons                      | Best Use Case                            |
| -------------------------- | ------------------------------------------- | ------------------------- | ---------------------------------------- |
| Round Robin                | Simple, stateless                           | Ignores server load       | Stateless API pods                       |
| Weighted RR                | Accounts for server capacity                | Needs weight config       | Mixed server clusters                    |
| Least Connections          | Dynamic, adapts                             | Tracks active connections | Long-lived connections                   |
| Weighted Least Connections | Dynamic + weighted                          | Slightly complex          | Heterogeneous cluster                    |
| IP Hash / Client Hash      | Sticky session                              | Failover problem          | Session affinity                         |
| Random                     | Simple                                      | Can be uneven             | Uniform traffic, cheap LB                |
| Least Response Time        | Adapts to performance                       | Monitoring required       | Heterogeneous servers, latency-sensitive |
| Consistent Hashing         | Stable distribution, minimizes cache misses | Complex                   | Caching, sharding                        |



🔹 Layer 4 vs Layer 7 LB Algorithm Support


| LB Layer | Round Robin | Least Connections | IP Hash | Path/Host Routing |
| -------- | ----------- | ----------------- | ------- | ----------------- |
| L4       | ✅           | ✅                 | ✅       | ❌                 |
| L7       | ✅           | ✅                 | ✅       | ✅                 |


L7 LB can also route by content (URL, host, headers) in addition to balancing

🔹 Production Recommendation for Your System

For Node.js + Mongo + Kafka + Redis:

Round Robin / Weighted RR → for simple stateless GET /users API

Least Connections / Weighted Least Connections → if GET involves heavy DB queries or long-lived requests

IP Hash → if you want sticky sessions for certain APIs

Consistent Hashing → for Redis cluster / caching layer

You can combine: L7 LB does round-robin across Node pods, Redis cluster uses consistent hashing internally, Kafka producer partitions messages based on key.
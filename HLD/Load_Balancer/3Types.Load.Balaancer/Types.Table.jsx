🔹 Comparison Table

| Type           | Example                 | Pros                                 | Cons                  | Best Use Case                                        |
| -------------- | ----------------------- | ------------------------------------ | --------------------- | ---------------------------------------------------- |
| Software L7 LB | Nginx, HAProxy, Traefik | Cheap, flexible, high performance    | Maintenance required  | Self-managed cloud/on-prem, high customization       |
| Cloud L7 LB    | AWS ALB, GCP HTTPS LB   | Auto-scale, managed, WAF integration | Costly, less flexible | Cloud apps, global traffic, managed infrastructure   |
| API Gateway    | Kong, AWS API Gateway   | Rate limit, auth, caching, routing   | Slight latency        | Microservices, public APIs, SaaS, enterprise systems |



🔹 How L7 LB Differs from L4 LB

| Layer     | L4 (Transport)    | L7 (Application)                            |
| --------- | ----------------- | ------------------------------------------- |
| Protocol  | TCP / UDP         | HTTP / HTTPS / gRPC                         |
| Routing   | IP + port         | URL, Host header, Cookie, Header            |
| Awareness | No HTTP knowledge | Can inspect HTTP request                    |
| Features  | NAT, round-robin  | SSL termination, path routing, WAF, caching |




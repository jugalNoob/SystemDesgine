Here’s a practical list of which companies or services commonly use which load balancing method. I’ll keep it concise and interview-friendly.

1️⃣ Round Robin

Used by:

Nginx default configuration

Small/medium websites where servers are equal capacity

Example: Static websites, blogs, small e-commerce sites

2️⃣ Weighted Round Robin (WRR)

Used by:

Nginx + HAProxy with weights configured

Large enterprise apps with unequal server capacity

Example: Netflix internal services (some powerful servers handle more streaming requests)

3️⃣ Least Connections

Used by:

HAProxy default dynamic load balancing

AWS Elastic Load Balancer (Classic ELB supports this)

Example: Websites with long-lived connections (e.g., chat apps, live video)

4️⃣ Weighted Least Connections (WLC)

Used by:

Nginx, HAProxy with weight + active connections

Enterprise apps where server power varies and requests are uneven

Example: Facebook internal services, high-scale APIs

5️⃣ IP Hash (Client Hash)

Used by:

Nginx sticky sessions

CDNs like Cloudflare for session stickiness

Example: Instagram (ensure the same user session hits the same backend)

6️⃣ Random

Used by:

Simple load balancers or DNS-based load balancing

Sometimes in cloud-native microservices for fast distribution

Example: Small-scale services, internal microservices

7️⃣ Least Response Time

Used by:

F5 BIG-IP load balancer

Citrix ADC / enterprise hardware load balancers

Example: Large-scale apps where fastest response matters, e.g., banking apps, stock trading

8️⃣ Consistent Hashing

Used by:

CDNs: Cloudflare, Akamai, AWS CloudFront

Distributed caches: Redis Cluster, Memcached

Distributed databases: Cassandra, DynamoDB

Example: Netflix (CDN caching), Facebook cache sharding


| Load Balancer Method       | Typical Use / Company Examples             |
| -------------------------- | ------------------------------------------ |
| Round Robin                | Nginx, small websites                      |
| Weighted Round Robin       | Netflix internal services, Nginx/HAProxy   |
| Least Connections          | HAProxy, AWS Classic ELB, chat/live apps   |
| Weighted Least Connections | Facebook APIs, Nginx/HAProxy               |
| IP Hash                    | Instagram, Cloudflare, sticky sessions     |
| Random                     | DNS load balancing, simple microservices   |
| Least Response Time        | F5 BIG-IP, Citrix ADC, trading apps        |
| Consistent Hashing         | Cloudflare, Akamai, Redis Cluster, Netflix |

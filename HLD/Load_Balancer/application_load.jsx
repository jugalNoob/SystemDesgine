B. Layer 7 (Application Layer Load Balancers)


| Feature/Aspect              | Details                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Layer**                   | 7 (HTTP/HTTPS)                                                                                                                                                        |
| **How it Works**            | Routes traffic based on **application content**, such as URL path, headers, cookies, host                                                                             |
| **Algorithms / Strategies** | - **Round Robin**<br>- **Weighted Round Robin** → consider server capacity<br>- **Least Connections**<br>- **IP Hash / Sticky Sessions**<br>- **Least Response Time** |
| **Tools / Examples**        | - **Nginx**<br>- **HAProxy (L7 mode)**<br>- **AWS ALB (Application Load Balancer)**<br>- **Envoy**<br>- **Traefik**                                                   |
| **Use Cases**               | Web apps, APIs, microservices, content-based routing, session persistence, SSL termination                                                                            |




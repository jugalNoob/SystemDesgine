A. Layer 4 (Transport Layer Load Balancers)]


| Feature/Aspect              | Details                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Layer**                   | 4 (TCP/UDP)                                                                                                                                                                     |
| **How it Works**            | Routes traffic based on **IP address, port, or protocol**                                                                                                                       |
| **Algorithms / Strategies** | - **Round Robin** → evenly distributes connections<br>- **Least Connections** → sends to server with fewest active connections<br>- **Source IP Hash** → sticky sessions per IP |
| **Tools / Examples**        | - **HAProxy** (L4 mode)<br>- **F5 BIG-IP LTM**<br>- **Nginx Stream module**<br>- **AWS NLB (Network Load Balancer)**                                                            |
| **Use Cases**               | High-performance routing, TCP-based applications, gaming servers, IoT protocols                                                                                                 |
//#endregio
Sure! Let’s explain Weighted Round Robin (WRR) clearly.

2️⃣ Weighted Round Robin (WRR)

Definition:
Weighted Round Robin is an advanced version of Round Robin where servers are assigned “weights” based on their capacity, so servers with higher capacity get more requests than smaller servers.

Example: 3 Servers with Different Capacities

| Server   | Weight | Meaning            |
| -------- | ------ | ------------------ |
| Server 1 | 3      | Can handle 3× load |
| Server 2 | 2      | Can handle 2× load |
| Server 3 | 1      | Can handle 1× load |


Requests: R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12

WRR Distribution (based on weight):

| Request | Server Assigned |
| ------- | --------------- |
| R1      | Server 1        |
| R2      | Server 1        |
| R3      | Server 1        |
| R4      | Server 2        |
| R5      | Server 2        |
| R6      | Server 3        |
| R7      | Server 1        |
| R8      | Server 1        |
| R9      | Server 1        |
| R10     | Server 2        |
| R11     | Server 2        |
| R12     | Server 3        |


✅ Server 1 gets more requests because it has higher weight.
✅ Server 3 gets fewer requests because it has lower capacity.

Key Points

Weight is based on CPU, memory, or throughput capacity.

Fairer than normal Round Robin when servers are not equal.

Used in Nginx, HAProxy, AWS ELB for uneven servers.

Quick Diagram
Incoming Requests
      |
      v
[Load Balancer - Weighted Round Robin]
   |          |         |
Server1(3)  Server2(2)  Server3(1)


Server1 gets 3 requests

Server2 gets 2 requests

Server3 gets 1 request

Then cycle repeats

✅ Interview Tip:

“Weighted Round Robin distributes requests based on server capacity. Higher capacity servers get more requests while lower capacity servers get fewer requests, unlike standard Round Robin which distributes evenly.”

If you want, I can also explain Least Connections vs Weighted Round Robin vs IP Hash with comparison table + diagram — very common in system design interviews.
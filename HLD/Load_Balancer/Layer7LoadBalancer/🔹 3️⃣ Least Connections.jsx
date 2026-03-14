3️⃣ Least Connections Load Balancing

Definition:
Least Connections is a load balancing method where the next incoming request is sent to the server with the fewest active connections.

✅ This is useful when servers have different speeds or requests take different times.

Example: Cluster of 3 Servers

| Server  | Active Connections |
| ------- | ------------------ |
| Server1 | 5                  |
| Server2 | 2                  |
| Server3 | 3                  |


Next incoming request → goes to Server2, because it has the least number of active connections.

How It Works Step by Step

User sends a request

Load balancer checks all servers for active connections

Sends request to server with minimum active connections

Updates connection count on that server

Repeat for next requests

Key Points

Dynamic distribution — unlike Round Robin, it adapts to server load.

Better for uneven workloads — if one request takes 10 sec and another 1 sec, servers stay balanced.

Often used in NGINX, HAProxy, AWS ELB.

Quick Diagram
Incoming Requests
        |
        v
[Load Balancer - Least Connections]
   |          |         |
Server1(5)  Server2(2)  Server3(3)
   ^
   |
Next request goes here (Server2)

✅ Simple Interview Answer:

Least Connections sends the next request to the server with the fewest active connections, making it ideal when requests take different amounts of time or servers have uneven capacity.



1️⃣ How the Load Balancer Decides

Suppose you have a cluster of 3 servers:

| Server  | Active Connections |
| ------- | ------------------ |
| Server1 | 5                  |
| Server2 | 2                  |
| Server3 | 3                  |




A new request comes in.

Load balancer checks the current number of active connections on each server.

Finds the server with the lowest number of active connections (Server2 = 2).

Sends the request to Server2.

Updates its active connections count (Server2 now has 3).

2️⃣ Key Notes

Dynamic decision – it happens for every incoming request.

Real-time tracking – load balancer keeps count of active connections on all servers.

Better for uneven workloads – if requests take different times to process, servers stay balanced.

3️⃣ Visual Example
Incoming Requests → Load Balancer → Cluster Servers

Check active connections:
Server1 = 5
Server2 = 2  ← Least connections
Server3 = 3

Send request to Server2
Update connection count


Next request will repeat the same check before sending.

✅ Interview Tip:

In Least Connections, the load balancer monitors all
 servers in real-time and directs each incoming request 
 to the server currently handling the fewest active connections,
  ensuring even load distribution.



4️⃣ Weighted Least Connections (WLC)

Definition:
Weighted Least Connections is a combination of Weighted Round Robin and Least Connections:

The load balancer sends the next request to the server with the fewest active connections, but also considers the server’s weight (capacity).

✅ Servers with higher capacity can get more requests even if connections are similar.

Example: 3 Servers with Weights


| Server  | Weight | Active Connections |
| ------- | ------ | ------------------ |
| Server1 | 5      | 3                  |
| Server2 | 3      | 2                  |
| Server3 | 2      | 1                  |



How WLC decides where to send the next request:

Check active connections on all servers

Divide active connections by server weight → “effective load”

Choose server with lowest effective load

Calculation:

Effective Load = Active Connections / Weight
Server1: 3 / 5 = 0.6
Server2: 2 / 3 ≈ 0.67
Server3: 1 / 2 = 0.5   ← Lowest


✅ Next request → Server3

1️⃣ Key Points

Dynamic – like Least Connections, it adapts to current load

Weighted – servers with higher capacity can handle more requests

Fairer than simple Least Connections when servers have different 
performance

2️⃣ Quick Diagram
Incoming Requests
        |
        v
[Load Balancer - Weighted Least Connections]
   |           |          |
Server1(5)  Server2(3)  Server3(2)
Active conn 3   2           1
Effective load 0.6 0.67     0.5  ← request goes here

✅ Simple Interview Answer

Weighted Least Connections sends the next request to the server
 with the fewest active connections relative to its capacity,
  ensuring high-capacity servers handle more requests while 
  balancing load dynamically.
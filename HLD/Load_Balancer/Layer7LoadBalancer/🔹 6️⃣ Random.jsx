ure! Let’s explain Random Load Balancing in simple terms.

6️⃣ Random Load Balancing

Definition:
Random load balancing is a method where the load balancer sends each incoming request to a randomly selected server from the cluster.

✅ Simple, fast, and doesn’t need to track server load or weights.

How It Works

Load balancer receives a request.

Picks any server randomly from the available pool.

Sends the request there.

Example: 3 Servers


| Incoming Request | Server Assigned (Random) |
| ---------------- | ------------------------ |
| R1               | Server2                  |
| R2               | Server1                  |
| R3               | Server3                  |
| R4               | Server2                  |
| R5               | Server1                  |



Advantages

Very easy to implement

No need to track server load or weight

Works well if all servers are identical

Disadvantages

Can cause uneven load if randomness is unlucky

Not suitable for servers with different capacities

Doesn’t account for active connections or server health

Quick Diagram
Incoming Requests
        |
        v
[Load Balancer - Random]
   |      |       |
Server1  Server2  Server3
(Randomly pick one for each request)

✅ Interview Tip

“Random load balancing sends each request to a randomly
 chosen server. It’s simple and fast but doesn’t 
 guarantee even load distribution.”
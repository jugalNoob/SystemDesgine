Sure! Let’s explain IP Hash / Client Hash in simple terms.

5️⃣ IP Hash (Client Hash) Load Balancing

Definition:
IP Hash is a load balancing method where the client’s IP address (or some unique client identifier) is used to decide which server handles the request.

✅ This ensures that the same client always goes to the same server, which is useful for session stickiness.

How It Works

Load balancer takes the client’s IP address (or another identifier).

Applies a hash function to the IP → generates a number.

Modulo with the number of servers → selects a server.

Formula (simplified):

Server Index = Hash(Client IP) % Number of Servers

Example: 3 Servers

| Client IP    | Hash % 3 | Server Assigned |                                   |
| ------------ | -------- | --------------- | --------------------------------- |
| 192.168.1.10 | 1        | Server2         |                                   |
| 192.168.1.11 | 0        | Server1         |                                   |
| 192.168.1.12 | 2        | Server3         |                                   |
| 192.168.1.10 | 1        | Server2         | ← Same client goes to same server |


Why Websites Use IP Hash

Session Stickiness:

If a client is logged in, sending them to the same server avoids losing session data.

Simple Distribution:

No need to track active connections or weights.

Predictable:

Same client always hits the same server unless servers are added/removed.

Limitations

Not flexible if a server goes down → client’s hash may send requests to offline server

Uneven load if many clients’ IPs hash to the same server

Requires sticky sessions or shared storage for sessions if server fails

Quick Diagram
Client IP → Load Balancer → Hash(IP) % Server Count → Selected Server

192.168.1.10 → LB → Hash → Server2
192.168.1.11 → LB → Hash → Server1
192.168.1.12 → LB → Hash → Server3

✅ Interview Tip

“IP Hash sends requests from the same client to the same server consistently. It’s useful for session stickiness but less flexible for server failures or uneven traffic.”
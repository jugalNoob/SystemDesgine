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

🔹 3️⃣ Least Connections

How it works:

Sends new requests to the server with fewest active connections

Dynamic — adapts to varying load per server

Pros:

Great for long-lived requests (WebSocket, gRPC)

Automatically balances servers under heavy load

Cons:

Slightly more complex to implement

Needs LB to track active connections

Best use case: Chat apps, video streaming, long-running API requests.
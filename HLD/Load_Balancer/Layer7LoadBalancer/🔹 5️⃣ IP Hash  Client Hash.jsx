🔹 5️⃣ IP Hash / Client Hash

How it works:

Compute hash of client IP → choose backend

Ensures same client always hits same server (sticky session without cookies)

Pros:

Useful when session affinity required

No backend state replication required

Cons:

Poor if backend servers fail → client hash may go to new server

Doesn’t consider server load

Best use case: Session-based applications without distributed cache
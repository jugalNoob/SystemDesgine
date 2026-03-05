🔹 2️⃣ Weighted Round Robin (WRR)

How it works:

Each server is assigned a weight based on capacity

Servers with higher weight get more requests

Example: 3 servers with weights 1, 2, 1 → request order: S1, S2, S2, S3, S1…

Pros:

Handles heterogeneous servers

Simple extension of round-robin

Cons:

Needs manual weight assignment or dynamic monitoring

Best use case: Mixed server capacities in cluster.
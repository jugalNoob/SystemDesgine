🔥 Types of Bulkhead
1️⃣ Thread Pool Isolation

Different pools per feature.

Example:

Payment threads: 10

Search threads: 20

Email threads: 5

2️⃣ Connection Pool Isolation

Separate DB pools:

Read Pool → 30 connections
Write Pool → 10 connections


If writes block → reads still work.

3️⃣ Queue Isolation

Kafka example:

Topic: payments
Topic: analytics
Topic: email


If analytics lags → payments unaffected.

4️⃣ Process Isolation

Run services in separate containers.

Using:

Docker

Kubernetes

Each service isolated.
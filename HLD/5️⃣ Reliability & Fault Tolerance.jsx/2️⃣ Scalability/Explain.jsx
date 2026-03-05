2️⃣ Scalability

Meaning: System can handle more load by adding resources.

:: How your system is scalable:

GET API + Redis cache → reduces DB reads, scales horizontally by adding more web servers.

Kafka partitions + consumer groups → more partitions and consumers → higher throughput.

Producers scale horizontally → multiple services can send messages simultaneously.

Stream processing → multiple instances can process streams in parallel.

:: Example answer:

“The system scales by adding Redis nodes for caching, adding more consumers
 for Kafka partitions, and horizontally scaling producers. This ensures high 
 throughput for both reads and writes.”
3️⃣ Availability

Meaning: System is up and responding most of the time.

:: -- :: How your system ensures availability:

Kafka replication → even if a broker fails, the system is available for reads/writes.

Redundant web servers → GET/POST APIs are served by multiple servers behind a load balancer.

Outbox pattern + async processing → POST API doesn’t block, so users experience minimal downtime.

Example answer:

“Availability is ensured by replicating Kafka partitions and deploying multiple web servers behind a load balancer. Even if one server or broker fails, the system continues to respond to users.”
🌐 What is Multi-AZ in Redis?

Multi-AZ = Multiple Availability Zones

An Availability Zone (AZ) is an isolated data center in a cloud region (AWS, Azure, GCP).

Multi-AZ Redis means Redis is replicated across 2 or more AZs for high availability and disaster recovery.

Think of it as having Redis running in multiple data centers so that if one fails, another can take over seamlessly.

🔹 How Multi-AZ Works

Primary Redis Node → Handles all writes and reads (depending on config)

Replica / Secondary Node(s) → Located in a different AZ

Replication → Changes from primary are replicated asynchronously to replicas

Failover → If primary fails, a replica in another AZ is promoted as primary automatically

Client Access → Node.js app connects via endpoint, which automatically routes to primary

🔹 Key Advantages

High Availability → Redis keeps running even if one AZ fails

Disaster Recovery → No single point of failure

Automatic Failover → Managed Redis services handle failover without downtime

Read Scalability → Replicas can serve read traffic to reduce primary load

🔹 Example in AWS (Elasticache Redis)

Primary node in us-east-1a

Replica node in us-east-1b (Multi-AZ)

Failover → Automatic promotion of replica if primary fails

          ┌───────────────┐
          │  Primary AZ1  │
          │  Writes/Reads │
          └─────┬─────────┘
                │ Replication
                ▼
          ┌───────────────┐
          │ Replica AZ2   │
          │ Read-only     │
          └───────────────┘

🔹 Node.js Integration
const redis = require('redis');
const client = redis.createClient({
    socket: {
        host: 'my-redis-primary-endpoint',
        port: 6379
    }
});
await client.connect();

// Normal usage
await client.set('user:1', 'Alice');
const value = await client.get('user:1');
console.log(value);


Node.js does not need to handle failover manually if using managed Multi-AZ Redis.

Failover is transparent to the application.

🔹 When to Use Multi-AZ Redis


| Scenario                      | Use Multi-AZ? | Notes                             |
| ----------------------------- | ------------- | --------------------------------- |
| High availability cache       | ✅             | Avoid downtime in one AZ          |
| Critical session storage      | ✅             | Sessions persist even if AZ fails |
| Leaderboards / real-time apps | ✅             | Failover ensures continuity       |
| Non-critical dev/test         | ❌             | Single-AZ is cheaper              |




Key Notes

Multi-AZ prevents single points of failure

Used in production systems where uptime is critical

Works best combined with AOF + RDB persistence for full durability
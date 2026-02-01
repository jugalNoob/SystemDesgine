11. Database Indexing

Definition: Creating data structures to make read operations faster.

Use Case: Search queries in MySQL or MongoDB.



12. CDN (Content Delivery Network)

Definition: A network of servers distributed globally to deliver content faster.

Use Case: Streaming videos, loading images on websites faster
 (like Cloudflare or Akamai).

 🌐 Custom CDN Design (Step-by-Step)

 | Component                  | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| **Origin Server**          | Central server storing original content (images, videos, JS, CSS).        |
| **Edge Servers / PoPs**    | Distributed servers near users to cache static content and serve quickly. |
| **Load Balancer / DNS**    | Routes user requests to the nearest or least-loaded edge server.          |
| **Cache**                  | Stored content at edge; can use TTL (Time-to-Live) for freshness.         |
| **Invalidation Mechanism** | Updates or removes stale content from caches when origin changes.         |



2️⃣ Flow

User requests content (image.jpg).

DNS / Load balancer routes request to nearest edge server.

Edge server checks cache:

✅ If content exists → Serve from cache (fast).

❌ If not → Fetch from origin server, store in cache, then serve.

Optional: Cache expires after TTL or is invalidated by origin update.

3️⃣ Benefits

Reduced Latency: User gets content from nearest server.

High Availability: Even if origin fails, edge servers can serve cached content.

Scalable: Handles high traffic spikes without hitting origin server.


                 +----------------+
                 |   Origin Server |
                 |  (Central Repo)|
                 +--------+-------+
                          |
           -------------------------------
           |              |              |
+----------------+ +----------------+ +----------------+
| Edge Server US | | Edge Server EU | | Edge Server AS |
+--------+-------+ +--------+-------+ +--------+-------+
         |                  |                 |
      Users in US        Users in EU      Users in AS



      Legend:

Users are served by the nearest edge server.

Edge server caches content from origin.

TTL / invalidation keeps cache fresh.

5️⃣ Optional Advanced Features

Anycast IP: Same IP announced from multiple locations → automatic nearest routing.

Compression: gzip / brotli for faster transfer.

HTTPS Termination at Edge: Reduce load on origin.

Analytics: Track cache hit/miss rates, latency per region.

🌐 Advanced Custom CDN Design (Static + Dynamic Content)
1️⃣ Components

| Component                 | Description                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **Origin Server**         | Central repository of all content (static + dynamic).                                              |
| **Edge Servers / PoPs**   | Distributed caching servers near users. Handle static content caching and dynamic content routing. |
| **Load Balancer / DNS**   | Routes user requests to nearest edge server. Can also route dynamic requests to origin.            |
| **Cache**                 | Stores static content with TTL; dynamic content may be partially cached (e.g., API responses).     |
| **Cache Invalidation**    | Mechanism to remove stale cached content.                                                          |
| **Dynamic Routing Layer** | Detects dynamic requests (e.g., user-specific API) and forwards to origin or app servers.          |



2️⃣ Flow
Static Content (Images, CSS, JS)

User requests /image.jpg.

Request routed to nearest edge server via DNS/load balancer.

Edge server checks cache:

✅ If cached → Serve immediately.

❌ If not → Fetch from origin, cache, then serve.

Dynamic Content (API, Personalized Data)

User requests /user/profile.

Request routed to dynamic routing layer.

Edge server may optionally cache short-lived data (e.g., 10s–1min).

Forward to origin app server if cache miss.

3️⃣ Benefits

Static content served fast from nearest edge.

Dynamic content handled efficiently with optional caching.

Reduces load on origin servers, improves latency and scalability.

                 +----------------+
                 |   Origin Server |
                 |  (Static + API)|
                 +--------+-------+
                          |
                +---------+----------+
                | Dynamic Routing /  |
                | Edge Cache Layer   |
                +---------+----------+
                          |
           -----------------------------------
           |               |               |
+----------------+ +----------------+ +----------------+
| Edge Server US | | Edge Server EU | | Edge Server AS |
| (Static Cache) | | (Static Cache) | | (Static Cache) |
+--------+-------+ +--------+-------+ +--------+-------+
         |                  |                 |
      Users in US        Users in EU      Users in AS

                       +----------------+
                 |   Origin Server |
                 |  (Static + API)|
                 +--------+-------+
                          |
                +---------+----------+
                | Dynamic Routing /  |
                | Edge Cache Layer   |
                +---------+----------+
                          |
           -----------------------------------
           |               |               |
+----------------+ +----------------+ +----------------+
| Edge Server US | | Edge Server EU | | Edge Server AS |
| (Static Cache) | | (Static Cache) | | (Static Cache) |
+--------+-------+ +--------+-------+ +--------+-------+
         |                  |                 |
      Users in US        Users in EU      Users in AS


5️⃣ Flow
Static Content

User requests /image.jpg.

Request routed to nearest edge server.

Edge server checks cache:

✅ Cache hit → Serve directly.

❌ Cache miss → Fetch from origin, cache it, serve user.



Dynamic Content

User requests /user/profile.

Request routed to dynamic routing layer.

Edge may cache short-lived response (10s–1min).

Cache miss → Forward to origin server.

      Notes:

Static content: Cached at edge, TTL applied.

Dynamic content: Routed to origin; optional short-term caching.

All users are served from nearest edge, reducing latency.

5️⃣ Interview Talking Points

Explain static vs dynamic content handling.

Discuss cache invalidation strategy for both types.

Mention load balancing & failover for high availability.

Optional: Talk about compression, HTTPS termination, and analytics.


6️⃣ Cache Strategy

| Type         | TTL / Policy          | Notes                                   |
| ------------ | --------------------- | --------------------------------------- |
| Static       | Long TTL (1h–24h)     | Frequent reuse, low change rate         |
| Dynamic      | Short TTL (10s–1min)  | Optional caching for hot API endpoints  |
| Invalidation | Manual / Event-driven | On content update, purge cache at edges |


7️⃣ Performance & Scaling

| Metric                | Estimate / Strategy                                 |
| --------------------- | --------------------------------------------------- |
| Latency reduction     | ~50–90% (users served from nearest edge)            |
| Traffic handling      | Millions of requests per minute across global edges |
| Cache hit ratio       | Aim: 70–90% for static content                      |
| Origin load reduction | Reduced by cache hits → fewer direct requests       |


8️⃣ Additional Enhancements

Compression: gzip or brotli for faster transfers.


                  www.myshop.com
                          |
                          v
               +----------------------+
               |     DNS / CDN        |
               |  Geo-routing layer   |
               +----------------------+
              /           |           \
             /            |            \
            v             v             v
+----------------+ +----------------+ +----------------+
| Edge Server US | | Edge Server EU | | Edge Server AS |
| (Cache static) | | (Cache static) | | (Cache static) |
+--------+-------+ +--------+-------+ +--------+-------+
         |                  |                 |
     Users in US        Users in EU      Users in Asia
         |                  |                 |
         v                  v                 v
+----------------+ +----------------+ +----------------+
| Origin Server US | | Origin Server EU | | Origin Server AS |
| (Dynamic/API)   | | (Dynamic/API)   | | (Dynamic/API)   |
+----------------+ +----------------+ +----------------+



13. Partitioning


1️⃣ Concept: Partitioning

Definition (SD):

Partitioning is splitting a database into smaller, manageable pieces (partitions) to improve performance and scalability.

MongoDB Implementation:

Use collections per partition (time-based, range-based, or key-based).

Each partition holds only part of the data.

Example: Partition logs or users by signup date.


Definition: Dividing a database table into smaller parts for faster access.

Use Case: Time-based partitioning for logs.


13. Partitioning in System Design

Definition:
Partitioning (or database sharding) is the process of splitting a 
large dataset into smaller, more manageable pieces (partitions) to
 improve performance, scalability, and maintenance.

Key Points:

Each partition contains a subset of data.

Partitions can be based on range, hash, list, or time.

Improves read/write performance, because queries touch only relevant partitions.

Enables horizontal scaling – adding more servers for more partitions.

Example: Time-based Partitioning for Logs

Scenario: You have a system that generates millions of logs per day.

Problem:

Storing all logs in a single collection/table makes queries slow.

Searching logs for a specific day becomes inefficient.

Solution: Partition logs by day or month.


MongoDB Example:
// Collection: logs_2025_10_07
{
  timestamp: ISODate("2025-10-07T10:12:00Z"),
  level: "info",
  message: "User logged in"
}

// Collection: logs_2025_10_06
{
  timestamp: ISODate("2025-10-06T15:45:00Z"),
  level: "error",
  message: "Payment failed"
}


Queries for logs_2025_10_07 will only touch that day's collection → faster.

Old collections can be archived or deleted to save space.

Client Requests
       |
       v
  API Server
       |
       v
  Partitioned DB (Shards / Partitions)
  ----------------------------
  | logs_2025_10_07         |
  | logs_2025_10_06         |
  | logs_2025_10_05         |
  ----------------------------




  Flow:

User requests logs for Oct 7 → API queries logs_2025_10_07 only.

If request is for multiple days → API can query multiple partitions.

Use Cases of Partitioning in SD

Time-based → Logs, metrics, analytics.

Range-based → User IDs 1–1000, 1001–2000, etc.

Hash-based → Distribute users evenly across servers.

Geography-based → Partition data by region/country.

Benefits in SD:

Faster queries

Easier scaling (add more servers for partitions)

Easier maintenance (archive or delete old partitions)



Exactly ✅ — partitioning in this context is basically sharding.


| Term             | Meaning                                                               | Example in SD / DB                                                  |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Partitioning** | Dividing data into smaller pieces (could be logical, within same DB)  | Logs by day/month in a single DB                                    |
| **Sharding**     | Partitioning **horizontally across multiple servers** for scalability | Same logs, but each day’s logs stored on a different server (shard) |



If you want, I can make a simple MERN + MongoDB example for partitioned 
logs so you can see it working in code and SD diagram.



14. Eventual Consistency

Definition: Data may not be immediately consistent but will
 converge eventually.

Use Case: DNS systems, NoSQL databases like DynamoDB.


Sure! Let me break it down clearly.

1️⃣ Definition: Eventual Consistency

Eventual consistency means that when data is updated in a distributed system, it might not be immediately consistent across all nodes, but if no new updates occur, all nodes will eventually converge to the same value.

Unlike strong consistency, where every read immediately sees the latest write, eventual consistency allows temporary differences between nodes.

It’s a trade-off for high availability and partition tolerance (CAP theorem).


2️⃣ Key Points

| Concept                   | Explanation                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| Temporary inconsistency   | Some nodes may have old data for a short period.                         |
| Convergence               | Eventually, all nodes will have the same data.                           |
| High availability         | System can keep working even if some nodes are temporarily inconsistent. |
| Common in distributed DBs | DynamoDB, Cassandra, Riak, S3, DNS systems                               |



3️⃣ Real-World Examples

DNS (Domain Name System)

When you update a DNS record, it might take minutes to propagate globally.

Some servers still return the old IP until the update propagates.

NoSQL Databases (DynamoDB, Cassandra)

Multiple replicas exist for fault tolerance.

A write may be visible on one replica immediately, but others take time to synchronize.

Social Media Feed

Posting a new tweet might not instantly appear in every follower’s feed.

Eventually, all followers see it.

4️⃣ Why It’s Useful in System Design

Ensures high availability → the system can respond even if some nodes are down.

Reduces latency → writes don’t have to wait for all nodes to confirm.

Useful for large-scale distributed systems where speed and uptime matter more than immediate consistency.



          +-----------------+
          |  Client Write   |
          |  (Update Data)  |
          +--------+--------+
                   |
                   v
           +---------------+
           |   Node A      |
           |  Replica 1    |
           +-------+-------+
                   |
       --------------------------
       |                        |
       v                        v
+---------------+        +---------------+
|   Node B      |        |   Node C      |
|  Replica 2    |        |  Replica 3    |
+-------+-------+        +-------+-------+
        |                        |
        |      Replication        |
        +------------------------+
                   |
                   v
           +---------------+
           |  Client Read  |
           +---------------+


           How it works:

Client writes data → update goes to one node (Node A).

Replication → data propagates asynchronously to other replicas (Node B, Node C).

Temporary inconsistency → reading from Node B/C may return old data.

Convergence → eventually, all replicas have the same data.

Key Points to Mention in Interview:

Write goes to one node first → others updated later.

System is highly available; reads/writes can happen even if some nodes lag.

Used in DynamoDB, Cassandra, Riak, DNS systems.

Trade-off: you sacrifice immediate consistency for availability and scalability.



2️⃣ Eventual Consistency in Replica Sets

When a write occurs, secondary nodes may not immediately have the latest data.

If you read from a secondary right after a write, it might return old data.

Eventually, all replicas converge to the same value.

Analogy:

Primary = “main copy of your homework”

Secondaries = “friends copying your homework”

Some friends might be slow → they see old answers for a while → eventually all have the same homework.

✅ Key Takeaways for Interview:

Replica = copy of data

Primary handles writes, secondaries replicate asynchronously

Temporary inconsistency = Eventual Consistency

Improves availability, fault tolerance, and scalability



15. WebSockets

Definition: Full-duplex communication between client and server.

Use Case: Real-time chat apps, live notifications.
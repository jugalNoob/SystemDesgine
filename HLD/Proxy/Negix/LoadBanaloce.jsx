🧱 The Core Reason: Scalability + Reliability
1️⃣ Single Node.js instance = Single point of failure

If you only run one container (express-api1), then:

When it crashes, the entire API goes down.

When it’s busy (e.g. handling a long request), all new requests must wait.

👉 Not ideal for production.

2️⃣ Multiple containers = Load distributed

With two containers:

Requests are split between both (round robin by Nginx).

Each instance handles only half of the load.

Your system can now serve twice as many concurrent users before slowing down.

Example:

Client → Nginx → express-api1 (handles /home)
Client → Nginx → express-api2 (handles /login)


✅ More users
✅ Faster response time
✅ Less stress per container

3️⃣ High Availability (HA)

If express-api1 dies (crash, memory leak, network failure):

Nginx detects it’s unhealthy and routes all requests to express-api2.

Your API stays online — zero downtime for users.

That’s fault tolerance in action.

4️⃣ Horizontal Scaling

If traffic grows even more, you can easily scale:

docker-compose up --scale express-api=4


Now you have:

express-api1
express-api2
express-api3
express-api4


and Nginx distributes traffic across all 4.

5️⃣ Real-world Example

Think of an e-commerce site:

During normal hours, 2 containers (express-api1, express-api2) are enough.

During festive sales (high traffic), scale to 10 containers.

When traffic drops, scale back to 2.

This is horizontal scalability — adding or removing servers dynamically.

🧩 Summary Table


| # of Containers | Performance     | Availability            | Use Case                         |
| --------------- | --------------- | ----------------------- | -------------------------------- |
| 1 (single)      | Limited         | Single point of failure | Local dev / testing              |
| 2+ (cluster)    | High throughput | Fault tolerant          | Production or heavy traffic apps |

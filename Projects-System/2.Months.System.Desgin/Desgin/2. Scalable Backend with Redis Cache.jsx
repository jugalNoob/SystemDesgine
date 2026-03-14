2. Scalable Backend with Redis Cache

Most companies add cache before database.

              Users
                |
                v
         +---------------+
         | Load Balancer |
         +---------------+
                |
                v
         +---------------+
         |  API Servers  |
         |  Node.js      |
         +---------------+
                |
        +-------+-------+
        |               |
        v               v
   +---------+      +---------+
   |  Redis  |      | MongoDB |
   |  Cache  |      |Database |
   +---------+      +---------+


Request flow

1 Client request
2 Check Redis cache
3 If cache miss → MongoDB
4 Save result to Redis


Software example

Redis
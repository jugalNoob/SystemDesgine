Perfect! Let’s create a complete ASCII diagram showing Node.js high-throughput POST flow with Kafka, including:

6 partitions

Replication factor 3

3 consumers

MongoDB writes

Redis cache for GET

This is interview-ready.


                    +----------------+
                    |     Client     |
                    +----------------+
                             |
                             v
                    +----------------+
                    |      CDN       |
                    +----------------+
                             |
                             v
                    +----------------+
                    |     Negex      |
                    |  (API Gateway) |
                    +----------------+
                             |
                             v
                    +----------------+
                    | Round Robin LB |
                    +----------------+
             /---------+-----------+---------\
             v                     v          v
     +----------------+   +----------------+  +----------------+
     |  3001 Server   |   |  3000 Server   |  |  3002 Server   |
     |  Cluster 1     |   |  Cluster 2     |  |  Cluster 3     |
     | Worker Threads |   | Worker Threads |  | Worker Threads |
     +----------------+   +----------------+  +----------------+
             |                     |                 |
             |                     |                 |
        +------------+        +-------------+   +-------------+
        |  GET API   |        |  POST API   |   |  POST API   |
        +------------+        +-------------+   +-------------+
             |                     |                 |
             v                     v                 v
       +------------+       +------------------------------+
       | Redis Hit? |       | Kafka Producer (6 Partitions)|
       +------------+       | Replication Factor: 3        |
             |              +------------------------------+
             |                          |
             |                          v
             |                  +-----------------------+
             |                  | Kafka Cluster (6 Pts) |
             |                  |  Partition Leaders    |
             |                  |  Partition Followers  |
             |                  +-----------------------+
             |                          |
             v                          v
       +------------+            +------------------+
       | Return     |            | Kafka Consumers  |
       | GET Result |            | Consumer Group 1 |
       +------------+            | 3 Consumers      |
                                 | Each reads 2 Pts |
                                 +------------------+
                                         |
                                         v
                                 +----------------+
                                 | MongoDB Write  |
                                 | Replica Set    |
                                 +----------------+
                                         |
                                         v
                                 +----------------+
                                 | Async Response |
                                 | to Client      |
                                 +----------------+

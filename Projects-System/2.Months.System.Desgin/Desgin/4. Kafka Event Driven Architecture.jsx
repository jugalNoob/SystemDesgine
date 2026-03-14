4. Kafka Event Driven Architecture

Used for high traffic systems.

        +-----------+
        |  Producer |
        | Node API  |
        +-----------+
              |
              v
        +--------------+
        | Kafka Topic  |
        | 3 Partitions |
        +--------------+
        /       |        \
       v        v         v
+------------+ +------------+ +------------+
| Consumer 1 | | Consumer 2 | | Consumer 3 |
| Email svc  | | Analytics  | | Logging    |
+------------+ +------------+ +------------+


Example

User Signup
     |
     v
Kafka Event
     |
 +--------+--------+
 |                 |
 v                 v
Email Service   Analytics


Technology

Apache Kafka
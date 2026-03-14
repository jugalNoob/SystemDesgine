7. Notification System Design
             User Action
                 |
                 v
            +--------+
            |  API   |
            +--------+
                 |
                 v
            +--------+
            | Kafka  |
            +--------+
              /   \
             v     v
      +-----------+  +-----------+
      | Email svc |  | Push svc  |
      +-----------+  +-----------+

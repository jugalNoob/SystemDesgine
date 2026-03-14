6. High Traffic Architecture (100k Requests / Min)
                Users
                  |
                  v
             +--------+
             |  DNS   |
             +--------+
                  |
                  v
            +------------+
            |    CDN     |
            +------------+
                  |
                  v
           +---------------+
           | Load Balancer |
           +---------------+
        /        |        \
       v         v         v
 +-----------+ +-----------+ +-----------+
 | Node API  | | Node API  | | Node API  |
 +-----------+ +-----------+ +-----------+
       |
       v
 +-------------+
 | Redis Cache |
 +-------------+
       |
       v
 +-------------+
 | Kafka Queue |
 +-------------+
       |
       v
 +-------------+
 | MongoDB DB  |
 +-------------+


Flow

User → CDN → Load Balancer
→ Node API
→ Redis Cache
→ Kafka
→ Database
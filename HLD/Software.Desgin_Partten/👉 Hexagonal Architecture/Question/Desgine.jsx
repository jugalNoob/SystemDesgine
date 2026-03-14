                 ┌─────────────────────────────┐
                 │        HTTP Adapter         │
                 └──────────────┬──────────────┘
                                │
                         (Calls UseCase)
                                ▼
                 ┌─────────────────────────────┐
                 │        Application          │
                 │        (Use Cases)          │
                 └──────────────┬──────────────┘
                                │
                      Uses Ports (Interfaces)
                                │
        ┌───────────────┬───────────────┬───────────────┐
        ▼               ▼               ▼
   Repository Port   Cache Port    Event Publisher Port
        │               │               │
        ▼               ▼               ▼
   Mongo Adapter     Redis Adapter    Kafka Adapter

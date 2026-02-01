4. Concurrency / Advanced Patterns

These patterns are for multi-threaded and distributed systems.

| Pattern                 | Concept                                                                                                     | Use Case                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Thread Pool**         | Manage a pool of threads for executing tasks efficiently.                                                   | Web servers, background jobs                |
| **Active Object**       | Decouple method execution from method invocation to enhance concurrency.                                    | Game engines, async task execution          |
| **Scheduler / Reactor** | Handle service requests delivered concurrently to a service handler by demultiplexing and dispatching them. | Node.js Event Loop, server request handling |
| **Leader Election**     | Choose a coordinator among distributed nodes.                                                               | Distributed systems, Kafka brokers          |
| **Circuit Breaker**     | Detect failures and encapsulate logic to prevent system failure.                                            | Microservices fault tolerance               |
| **Bulkhead**            | Isolate components to prevent cascading failures.                                                           | Microservices resilience                    |

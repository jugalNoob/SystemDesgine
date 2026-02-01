21. URL Shortener

Definition: Converting long URLs into short, manageable links.

Use Case: Bit.ly, TinyURL; involves hashing, database design, collision handling.

22. Patterns & Types

Definition: Common architecture patterns for designing systems.

Examples: MVC, Singleton, Factory, Event-driven, CQRS.

23. API Types

Definition: Different ways to design and expose services.

Types:

REST (HTTP verbs)

GraphQL (query flexible APIs)

gRPC (efficient binary protocol)

Webhooks (event-driven callbacks)





24::Additional Essential Topics for System Design

Data Modeling & Schema Design

Designing efficient relational and NoSQL schemas.

Use: Optimizing queries, avoiding joins where possible, planning for scaling.




25::Transaction Management & ACID/BASE

ACID: Atomicity, Consistency, Isolation, Durability (SQL DBs).

BASE: Basically Available, Soft-state, Eventual consistency (NoSQL DBs).

Use: Choosing DB type based on consistency needs.



26::Queue vs Stream Processing

Queues: Order processing (RabbitMQ, SQS).

Streams: Real-time event processing (Kafka, Kinesis).

Understanding the difference is crucial for event-driven systems.





26::Security & Encryption

TLS/HTTPS, JWT, OAuth, API key management, data encryption at rest and in transit.

Testing & CI/CD in System Design

How changes are deployed safely in large systems.

Blue-green deployment, canary releases, rollback strategies.
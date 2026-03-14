| Layer / Concern                           | How to Keep Data Correct?                              | Node.js Patterns / Tools                             | Real-World Example / Notes                                                                              |
| ----------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Database ACID Transactions**            | Ensure atomicity, consistency, isolation, durability   | MongoDB transactions, Postgres / MySQL transactions  | Multi-document updates in MongoDB, bank transfer operations → either all succeed or all fail.           |
| **Distributed Locks / Mutex**             | Prevent race conditions in distributed environment     | Redis locks (`redlock`), etcd, ZooKeeper             | Avoid multiple services updating the same resource simultaneously (e.g., inventory stock decrement).    |
| **Saga Pattern / Workflow Management**    | Maintain eventual consistency across microservices     | Temporal.io, custom saga orchestrator                | Payment → inventory → notification workflow; rollback compensating actions if any step fails.           |
| **Eventual Consistency / CQRS**           | Accept temporary inconsistency, resolve asynchronously | Kafka / RabbitMQ events, read/write model separation | Inventory update may propagate with delay → reads served from read replicas; writes handled via events. |
| **Input Validation / Schema Enforcement** | Prevent bad data at the edges                          | Joi, Zod, Mongoose / TypeORM schemas                 | Ensure incoming requests meet required format → reduces invalid DB writes.                              |
| **Idempotency / Safe Retries**            | Avoid duplicate effects on retries                     | Idempotency keys, unique request IDs                 | Payment APIs, webhook handling → retry requests safely without double-processing.                       |
| **Audit Logging / Change Tracking**       | Track state changes, detect inconsistencies            | Winston / Pino logs, DB audit tables                 | Every critical change logged for debugging, recovery, or reconciliation.                                |




Extended Notes / Real-World Tips

ACID vs Eventual Consistency:

ACID for single DB critical operations.

Eventual consistency + sagas for distributed microservices.

Distributed Locks:

Use only for critical sections. Overuse can become a performance bottleneck.

Saga / Workflow:

Compensating actions are key — rollback previous steps if something fails.

Idempotency:

Essential for payment processing, webhook handling, or any retry-prone operation.

Schema & Validation:

Saves a lot of headaches in production — prevents garbage data from entering DB.
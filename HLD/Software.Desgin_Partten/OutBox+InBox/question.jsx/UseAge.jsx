3️⃣ Where to Use Inbox Pattern in a Project

Use case examples:

Microservices / Event-driven architecture

You produce events (Outbox) → push to Kafka, RabbitMQ, or BullMQ queue.

Other services consume events and ensure idempotent processing using Inbox.

Delayed / retry-safe jobs

Email sending, push notifications, invoice generation, stock updates.

Even if the worker crashes or the message is retried, the Inbox ensures no duplicates.

Critical updates that must not repeat

Payment processing, order fulfillment, audit logs, ledger entries.

Key idea:

Outbox handles sending events reliably.

Inbox handles processing events safely and idempotently.

✅ Advantages of this setup:

Scales horizontally (BullMQ workers can be multiple instances).

Persistent record of processed events (Inbox collection).

Simple, modular, easy to maintain.

Works with MongoDB + Redis (no complex external broker required, but can replace Redis with Kafka if needed).
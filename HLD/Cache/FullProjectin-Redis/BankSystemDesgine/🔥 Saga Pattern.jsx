Outbox Pattern

| Company              | Pattern |
| -------------------- | ------- |
| Traditional banks    | 2PC     |
| Amazon               | Saga    |
| Netflix              | Saga    |
| Uber                 | Saga    |
| Modern microservices | Saga    |



Perfect 🔥
Now I’ll explain Saga Pattern in very simple way and then give you a clean Node.js folder structure for system design level project.

🟢 Saga Pattern (Super Simple Explanation)

Imagine:

User places an order.

Steps:

1️⃣ Create Order
2️⃣ Deduct Inventory
3️⃣ Process Payment
4️⃣ Ship Order

Now problem:

If payment fails after inventory deducted ❌
We must undo inventory deduction.

Instead of locking everything (like 2PC),
Saga says:

👉 Do step-by-step
👉 If failure happens → run undo steps (compensation)

🧠 Real Life Example

Booking flight ticket:

Reserve seat

Deduct money

Confirm ticket

If payment fails → release seat

That is Saga.

🔥 Two Types of Saga
1️⃣ Choreography (Event Based) ✅ Recommended for microservices

Services talk via events (Kafka / RabbitMQ).

No central controller.

Example flow:

Order Service → emits OrderCreated
Inventory Service → listens → deducts → emits InventoryReserved
Payment Service → listens → charges → emits PaymentSuccess
Shipping Service → listens → ships


If payment fails:

Payment Service emits → PaymentFailed
Inventory Service listens → restores stock
Order Service listens → mark order cancelled

All via events.

2️⃣ Orchestration (Central Controller)

One service controls everything:

Saga Orchestrator
   ↓
Call Inventory
   ↓
Call Payment
   ↓
Call Shipping


If something fails → orchestrator triggers rollback.

📦 Easy Project Folder Structure (Choreography + Kafka)

Let’s design 4 microservices:

ecommerce-system/
│
├── order-service/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── order.controller.js
│   │   ├── services/
│   │   │   └── order.service.js
│   │   ├── events/
│   │   │   └── order.producer.js
│   │   ├── consumers/
│   │   │   └── paymentFailed.consumer.js
│   │   ├── models/
│   │   │   └── order.model.js
│   │   └── app.js
│   └── package.json
│
├── inventory-service/
│   ├── src/
│   │   ├── consumers/
│   │   │   └── orderCreated.consumer.js
│   │   ├── events/
│   │   │   └── inventory.producer.js
│   │   ├── models/
│   │   │   └── product.model.js
│   │   └── app.js
│
├── payment-service/
│   ├── src/
│   │   ├── consumers/
│   │   │   └── inventoryReserved.consumer.js
│   │   ├── events/
│   │   │   └── payment.producer.js
│   │   └── app.js
│
├── shipping-service/
│   ├── src/
│   │   ├── consumers/
│   │   │   └── paymentSuccess.consumer.js
│   │   └── app.js
│
└── kafka-config/
    └── kafka.js

🔄 How Events Flow (Choreography)
Step 1 — Order Created

Order Service:

await producer.send({
  topic: "order-created",
  messages: [{ value: JSON.stringify(order) }]
});

Step 2 — Inventory Service Listens
consumer.subscribe({ topic: "order-created" });

consumer.run({
  eachMessage: async ({ message }) => {
    const order = JSON.parse(message.value.toString());

    // deduct stock

    await producer.send({
      topic: "inventory-reserved",
      messages: [{ value: JSON.stringify(order) }]
    });
  }
});

Step 3 — Payment Service Listens

If success:

Emit:

payment-success


If fail:

Emit:

payment-failed

Step 4 — Compensation Example

If payment fails:

Inventory service listens to:

payment-failed


Then:

// add stock back


That’s Saga compensation.

🧠 Why Saga is Powerful

No global lock

Scales easily

Works with Kafka

Used in Amazon, Uber, Netflix

📊 Saga vs 2PC (Quick Memory Trick)


| 2PC                       | Saga                  |
| ------------------------- | --------------------- |
| Lock everything           | No lock               |
| Strong consistency        | Eventual consistency  |
| Slow                      | Scalable              |
| Not microservice friendly | Microservice friendly |




🎯 Interview Answer (Simple Version)

Saga is a distributed transaction pattern where each service performs a local transaction and publishes events. If any step fails, compensating transactions are triggered to undo previous actions.

💡 When You Should Use Saga

Use Saga when:

Microservices architecture

Kafka / event-driven

High scale system

Cloud-native app

You are now thinking like backend architect 🔥
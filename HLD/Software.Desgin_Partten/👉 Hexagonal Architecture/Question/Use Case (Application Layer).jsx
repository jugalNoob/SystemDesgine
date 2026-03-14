🚀 Step 2: Use Case (Application Layer)

Create Order Use Case:

export class CreateOrder {
  constructor(orderRepo, cache, eventPublisher) {
    this.orderRepo = orderRepo;
    this.cache = cache;
    this.eventPublisher = eventPublisher;
  }

  async execute(orderData) {
    const order = new Order(orderData.id, orderData.amount);

    await this.orderRepo.save(order);

    // Cache write-through
    await this.cache.set(
      `order:${order.id}`,
      JSON.stringify(order),
      3600
    );

    // Publish event
    await this.eventPublisher.publish("order.created", {
      orderId: order.id,
      amount: order.amount,
      timestamp: Date.now()
    });

    return order;
  }
}


Notice:

👉 Use case depends ONLY on interfaces
👉 No Redis code
👉 No Kafka code
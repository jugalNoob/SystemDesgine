5️⃣ Real-world Example

Suppose an e-commerce platform:

Services: User, Order, Payment, Inventory

Payment Service scales from 2 → 10 instances.

User Service needs to call Payment Service → queries service registry → gets a healthy instance → makes the call.

This ensures resilience and dynamic routing without manual configuration.
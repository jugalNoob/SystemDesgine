3️⃣ Behavioral Patterns — “How Objects Interact / Behave”

Meaning:
These patterns deal with object communication and behavior — how objects interact, share responsibilities, or change behavior dynamically.

Key Idea: Focus on algorithms, communication, and responsibilities.


| Pattern                 | LLD Example                 | Explanation                                                             |
| ----------------------- | --------------------------- | ----------------------------------------------------------------------- |
| Observer                | Chat System / Notifications | Notify multiple objects when **something changes**                      |
| Strategy                | Parking Lot Fee Calculation | Swap **algorithms dynamically** (Normal vs VIP fee calculation)         |
| State                   | ATM / Vending Machine       | Change **behavior based on object state**                               |
| Command                 | Undo / Redo System          | Encapsulate **requests as objects**                                     |
| Template Method         | Booking System              | **Skeleton of algorithm**, override steps in subclasses                 |
| Chain of Responsibility | Validation / Logging        | **Pass request along a chain** until handled                            |
| Mediator                | Chat System                 | Centralizes communication between objects (**User → Mediator → Group**) |


| Pattern                     | Real System Example             | Purpose                          |
| --------------------------- | ------------------------------- | -------------------------------- |
| **Strategy**                | Payment methods                 | Switch algorithms dynamically    |
| **Observer**                | Notifications / Kafka / Pub-Sub | One event → notify many          |
| **Command**                 | Undo / Queue / Job system       | Encapsulate requests             |
| **State**                   | ATM / Order status              | Object changes behavior by state |
| **Chain of Responsibility** | Middleware / validation         | Pass request through chain       |

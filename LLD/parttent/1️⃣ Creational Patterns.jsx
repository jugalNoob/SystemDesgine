1️⃣ Creational Patterns — “How Objects Are Created”

Meaning:
These patterns deal with object creation in a 
way that abstracts / simplifies / optimizes object instantiation.

Key Idea: Don’t directly create objects with new 
everywhere — use a pattern to control object creation.

Examples:


| Pattern          | LLD Example            | Explanation                                                               |
| ---------------- | ---------------------- | ------------------------------------------------------------------------- |
| Singleton        | BookMyShow DB / Logger | Only **one instance** of DB or Logger exists globally                     |
| Factory          | Notification System    | Create **SMS, Email, Push** without changing client code                  |
| Builder          | BookMyShow / Library   | Build complex objects step-by-step (Movie with showtimes, seats, pricing) |
| Prototype        | File System            | Clone an existing object efficiently (duplicate seats, tickets)           |
| Abstract Factory | Food Delivery Payment  | Create **families of related objects** (Stripe, PayPal, Wallet)           |


Mnemonic: Creational → “How we make objects”
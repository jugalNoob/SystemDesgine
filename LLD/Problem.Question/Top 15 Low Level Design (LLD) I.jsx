Here are 🔥 Top 15 Low Level Design (LLD) Interview Problems and the design
 patterns typically used in each system. This helps you quickly recognize
  which pattern to apply in interviews.

🔥 Top 15 LLD Interview Problems + Patterns


| #  | System                            | Key Objects                      | Patterns Used                           | Why Used                    |
| -- | --------------------------------- | -------------------------------- | --------------------------------------- | --------------------------- |
| 1  | **Parking Lot System**            | ParkingLot, Floor, Slot, Vehicle | Singleton, Factory, Strategy, Composite | Manage parking hierarchy    |
| 2  | **Elevator System**               | Elevator, Request, Scheduler     | Strategy, State, Observer               | Handle scheduling & states  |
| 3  | **Chat System**                   | User, Message, ChatRoom          | Mediator, Observer                      | Message communication       |
| 4  | **Rate Limiter**                  | RequestCounter, Window           | Strategy, Singleton                     | Switch algorithms           |
| 5  | **Notification System**           | Email, SMS, Push                 | Observer, Factory                       | Multiple notification types |
| 6  | **Payment System**                | PaymentMethod, Transaction       | Strategy, Factory, Adapter              | Multiple payment gateways   |
| 7  | **Food Delivery (Swiggy)**        | Restaurant, Order, Delivery      | Factory, Strategy, Observer             | Order flow                  |
| 8  | **Online Shopping Cart**          | Cart, Product, Checkout          | Strategy, Decorator                     | Discounts & pricing         |
| 9  | **Logging Framework**             | Logger, LogLevel                 | Singleton, Chain of Responsibility      | Log filtering               |
| 10 | **File System**                   | Folder, File                     | Composite                               | Tree structure              |
| 11 | **API Gateway / Caching**         | RequestHandler                   | Proxy, Decorator                        | Cache layer                 |
| 12 | **Ride Sharing (Uber)**           | Rider, Driver, Ride              | Strategy, Observer                      | Matching algorithm          |
| 13 | **ATM System**                    | ATM, Card, Account               | State, Chain of Responsibility          | Transaction steps           |
| 14 | **Video Streaming (YouTube)**     | Video, Player                    | Proxy, Adapter                          | Content delivery            |
| 15 | **Document Editor (Google Docs)** | Document, Editor                 | Command, Observer                       | Undo / real-time updates    |



🏗 Example Mapping (Real System)
Chat System

Objects

User
Message
ChatRoom
Notification


Patterns used

Mediator → ChatRoom manages communication
Observer → Notify users
Singleton → Message service instance


Flow

User → ChatRoom → Other Users

Payment System

Objects

PaymentProcessor
StripePayment
PayPalPayment
RazorpayPayment


Patterns

Strategy → Different payment methods
Factory → Create payment processor
Adapter → External payment API


Example

class PaymentStrategy {
  pay(amount) {}
}

class StripePayment extends PaymentStrategy {
  pay(amount) {
    console.log("Paid with Stripe:", amount);
  }
}

🧱 Systems That Interviewers Ask Most (Important)

Focus on these first:

1️⃣ Parking Lot
2️⃣ Rate Limiter
3️⃣ Chat System
4️⃣ Logging Framework
5️⃣ Notification System
6️⃣ Payment System
7️⃣ Elevator System

These cover almost all patterns.

📅 If You Practice These 7 Systems

You will automatically learn:

Singleton
Factory
Strategy
Observer
Mediator
Decorator
Composite
Proxy
Chain of Responsibility
State
Command


Which is 90% of LLD interviews.

🚀 Next Level (Very Important for You)

Since you already study Kafka, Redis, caching, sliding window, the best LLD systems for you are:

1️⃣ Rate Limiter (Sliding Window)
2️⃣ Notification System (Kafka)
3️⃣ Caching System (Proxy + Redis)
4️⃣ Search API with cache
5️⃣ Distributed Logger

These align perfectly with your Node.js backend architecture work.

✅ If you want, I can also show:

🔥 7 COMPLETE LLD SYSTEM DESIGNS (step-by-step with code + diagrams)

Example:

1️⃣ Parking Lot
2️⃣ Rate Limiter (Redis + sliding window)
3️⃣ Notification Service (Kafka + Observer)
4️⃣ Chat System (WebSocket + Mediator)
5️⃣ Food Delivery (Swiggy design)
6️⃣ Logging Framework
7️⃣ Payment Gateway

These are exactly what FAANG interviews ask.
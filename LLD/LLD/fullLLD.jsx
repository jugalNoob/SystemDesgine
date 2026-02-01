🧭 LOW-LEVEL DESIGN (LLD) FULL ROADMAP — COMPLETE EXPLANATION
🏗️ 1. FOUNDATION — Object-Oriented Programming (Week 1)
🔹 What is LLD?

LLD is about designing classes, relationships, and behaviors of components in a system.
You’re not just coding — you’re thinking how objects interact to solve real problems.

🔹 Core OOP Concepts


| Concept            | Meaning                         | Example                                           | Used In           |
| ------------------ | ------------------------------- | ------------------------------------------------- | ----------------- |
| **Class & Object** | Blueprint and instance          | `class Car {}` → `let c = new Car()`              | Everywhere        |
| **Encapsulation**  | Hide data & expose behavior     | `getBalance()` instead of direct `balance` access | ATM, Bank App     |
| **Abstraction**    | Show essential, hide complexity | `Payment.process()`                               | Payment APIs      |
| **Inheritance**    | Child inherits from parent      | `class Dog extends Animal`                        | Reuse logic       |
| **Polymorphism**   | Same method, different behavior | `area()` for Circle, Rectangle                    | Shapes, Strategy  |
| **Composition**    | Class “has-a” another class     | `Car has Engine`                                  | Aggregation logic |



class Engine {
  start() {
    console.log("Engine started");
  }
}

class Car {
  constructor() {
    this.engine = new Engine(); // Composition
  }

  drive() {
    this.engine.start();
    console.log("Car is running");
  }
}

✅ Composition > Inheritance — gives more flexibility.



🔹 SOLID Principles (Very Important)

| Principle                 | Meaning                                     | Example                   | Avoids            |
| ------------------------- | ------------------------------------------- | ------------------------- | ----------------- |
| **S**ingle Responsibility | One reason to change                        | `Logger` only logs        | Code coupling     |
| **O**pen/Closed           | Open for extension, closed for modification | Add new Notification type | Rewrites          |
| **L**iskov Substitution   | Subclass replace parent safely              | `Bird → FlyingBird`       | Wrong inheritance |
| **I**nterface Segregation | Small interfaces preferred                  | `Printable`, `Scannable`  | Fat interfaces    |
| **D**ependency Inversion  | Depend on abstractions, not classes         | Use `PaymentInterface`    | Tight coupling    |


📘 Example: Logger System (SOLID)
class ConsoleLogger {
  log(message) {
    console.log(message);
  }
}

class FileLogger {
  log(message) {
    // write to file
  }
}

class App {
  constructor(logger) {
    this.logger = logger; // Dependency Inversion
  }

  run() {
    this.logger.log("App started");
  }
}


✅ Easy to switch ConsoleLogger → FileLogger
✅ No code change inside App

🧩 2. UML & Design Visualization (Week 2)

You must draw before coding.

🔹 UML Diagrams

Class Diagram — structure of system

Sequence Diagram — message flow

State Diagram — behavior of an entity

Use Case Diagram — what actors can do

Example: Parking Lot UML
ParkingLot
 ├─ List<ParkingFloor>
ParkingFloor
 ├─ List<ParkingSlot>
ParkingSlot
 ├─ Vehicle (optional)
Vehicle
 ├─ Car, Bike, Truck


Draw in draw.io
 or Eraser.io

⚙️ 3. DESIGN PATTERNS (Weeks 3–5)

Design Patterns are reusable blueprints for solving common design problems.

🧱 CREATIONAL PATTERNS


| Pattern       | Use                                   | Example                  | Use Case             |
| ------------- | ------------------------------------- | ------------------------ | -------------------- |
| **Singleton** | Only one instance                     | `Logger`, `DBConnection` | Shared resources     |
| **Factory**   | Create objects without exposing logic | `NotificationFactory`    | Polymorphic creation |
| **Builder**   | Step-by-step object construction      | `UserBuilder`            | Complex objects      |
| **Prototype** | Clone existing objects                | `Shape.clone()`          | Object duplication   |


Example: Singleton
class Database {
  static instance;
  constructor() {
    if (Database.instance) return Database.instance;
    Database.instance = this;
  }
}




| Pattern       | Use                              | Example               | Use Case           |
| ------------- | -------------------------------- | --------------------- | ------------------ |
| **Adapter**   | Convert one interface to another | `XML → JSON` adapter  | Legacy integration |
| **Decorator** | Add behavior dynamically         | Coffee + Milk + Sugar | Add-ons            |
| **Composite** | Tree structure                   | Files/Folders         | Hierarchies        |
| **Facade**    | Simplify complex system          | Video Converter       | Wrapper API        |
| **Proxy**     | Control access                   | Cache Proxy           | Caching / Auth     |



Example: Decorator
class Coffee {
  cost() { return 10; }
}

class MilkDecorator {
  constructor(coffee) { this.coffee = coffee; }
  cost() { return this.coffee.cost() + 5; }
}

let coffee = new MilkDecorator(new Coffee());
console.log(coffee.cost()); // 15

🧱 BEHAVIORAL PATTERNS



| Pattern                     | Use                            | Example             | Use Case            |
| --------------------------- | ------------------------------ | ------------------- | ------------------- |
| **Observer**                | Notify all observers           | YouTube Subscribers | Pub/Sub             |
| **Strategy**                | Switch algorithms              | Payment method      | Dynamic choice      |
| **Command**                 | Encapsulate requests           | Undo/Redo           | Editor              |
| **State**                   | Change behavior based on state | Vending Machine     | State handling      |
| **Chain of Responsibility** | Pass request chain             | Logger chain        | Validation, logging |



Example: Observer

class User {
  update(video) {
    console.log(`New video: ${video}`);
  }
}





class Channel {
  constructor() { this.subscribers = []; }
  subscribe(user) { this.subscribers.push(user); }
  upload(video) {
    this.subscribers.forEach(u => u.update(video));
  }
}



🧰 4. MINI PROJECTS (Weeks 6–8)

Here are real-world LLD problems used in interviews:

🅿️ Parking Lot System

Concepts: OOP, Strategy, Singleton, UML

Entities:

Vehicle, Car, Truck

ParkingSlot, Ticket, ParkingLot

Key Logic:

Allocate nearest available slot

Different slot sizes (Car/Bike)

Calculate fee based on duration

🎫 BookMyShow

Concepts: Factory, Singleton, Observer

Entities:

Movie, Theatre, Show, Seat, Payment

BookingService handles reservations

Flow:

User selects movie

Shows fetched

Seats reserved

Payment processed (Factory)

🛵 Food Delivery (Zomato/Swiggy)

Concepts: Observer, Strategy, Singleton

Entities:

Order, Restaurant, DeliveryPartner

NotificationService for updates

Flow:

Order placed → Notify restaurant + user

Delivery strategy: nearest rider

🚖 Cab Booking (Uber/Ola)

Concepts: Observer, Strategy, State, Factory

Entities:

Rider, Driver, Trip, Location

Strategy: Find nearest driver

State: Trip requested → accepted → completed

💬 Chat System (WhatsApp)

Concepts: Mediator, Observer, Singleton

Entities:

User, ChatRoom, Message

Mediator manages sending messages between users

💰 Splitwise

Concepts: Strategy, Composite

Entities:

User, Expense, Group, Split

Algorithms for equal/exact/percentage splits

📊 5. ADVANCED LLD (Bonus Topics)


| Topic                          | Description                | Example                          |
| ------------------------------ | -------------------------- | -------------------------------- |
| **Thread-safety**              | Singleton with locks       | DB connection pool               |
| **Caching Layer**              | Add Redis-like cache logic | Proxy pattern                    |
| **Notification Queue**         | Event-driven with Kafka    | Observer pattern                 |
| **Domain-Driven Design (DDD)** | Break system by domain     | Booking → Payment → Notification |





🧠 6. INTERVIEW STRATEGY
✅ Common Asked LLD Problems

Parking Lot

BookMyShow

Splitwise

Elevator

ATM

Tic-Tac-Toe

Logging Framework

Coffee Vending Machine

Library Management System

✅ How to Answer in Interview

Clarify Requirements — ask questions

Identify Entities — nouns → classes

Define Relationships — composition, inheritance

Apply Design Patterns — justify why

Draw UML — clear communication

Write clean pseudo code — focus on design

Explain trade-offs — scalability, extensibility

🧰 Recommended Resources#


| Category | Resource                                                   |
| -------- | ---------------------------------------------------------- |
| Book     | *Head First Object-Oriented Analysis & Design*             |
| Book     | *Design Patterns (Gang of Four)*                           |
| YouTube  | Tech Dummies Narayan / Arpit Bhayani / CodeKarle           |
| Practice | InterviewBit LLD / GitHub “machine-coding-round”           |
| UML Tool | [draw.io](https://draw.io), [Eraser.io](https://eraser.io) |



    🗓️ Optional 2-Month Study Schedule (Summary)

    | Week | Topics               | Output                  |
| ---- | -------------------- | ----------------------- |
| 1    | OOP + SOLID          | 2 small systems         |
| 2    | UML + Class Diagrams | Parking Lot UML         |
| 3    | Creational Patterns  | Logger, Factory         |
| 4    | Structural Patterns  | Decorator, Composite    |
| 5    | Behavioral Patterns  | Observer, Strategy      |
| 6    | Mini Projects        | BookMyShow, Parking Lot |
| 7    | Advanced Projects    | Food Delivery, Chat     |
| 8    | Mock Interviews      | Splitwise, Elevator     |










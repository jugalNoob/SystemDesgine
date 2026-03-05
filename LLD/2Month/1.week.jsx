──────────────────────────────
      2-Month LLD Roadmap
──────────────────────────────

Week 1: OOP & Core Principles
──────────────────────────────
Topics:
  - Class, Object, Encapsulation, Inheritance, Polymorphism, Abstraction
  - SOLID Principles: SRP, OCP, LSP, ISP, DIP
Practice / Mini-Projects:
  - User System: Admin, Guest, Moderator
  - Library Management
Code Focus:
  - Classes + Methods
  - Composition > Inheritance
UML:
  - Class diagrams for Users & Library
Interview:
  - Explain SRP & OCP in your code


  
  
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


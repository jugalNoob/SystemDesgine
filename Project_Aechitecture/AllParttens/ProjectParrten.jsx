Architectural / Enterprise Patterns & Their Use Cases
1. MVC (Model-View-Controller)

Concept:

Separates UI (View), Business Logic (Controller), and Data (Model).

Promotes modularity, maintainability, and testability.

Typical Use Case:

Web applications with dynamic UI

E-commerce platforms

Admin dashboards

Example Project Fit:

Online Shopping System:

Model: Product, Order, User

View: Web pages, React components

Controller: Handles API requests

2. MVVM (Model-View-ViewModel)

Concept:

ViewModel acts as a binding layer between UI and data models.

Enables two-way data binding and decoupling of UI logic.

Typical Use Case:

Single Page Applications (SPA)

Desktop applications (e.g., WPF, Electron)

Mobile apps (e.g., Android, iOS with data binding)

Example Project Fit:

Task Management App:

Model: Task, User, Project

View: Angular/React front-end

ViewModel: Handles user interactions and updates model

3. Event Sourcing

Concept:

Persist state changes as a sequence of events instead of just current state.

Enables auditing, rollback, and replaying events.

Typical Use Case:

Banking and financial systems

Booking systems

Audit logging

Example Project Fit:

Online Payment System:

Events: PaymentInitiated, PaymentCompleted, RefundProcessed

Replay events to reconstruct account balances

4. CQRS (Command Query Responsibility Segregation)

Concept:

Separate read (query) and write (command) models.

Optimizes performance, scalability, and maintainability in complex systems.

Typical Use Case:

High-performance microservices

Inventory management

Social media feeds

Example Project Fit:

E-commerce Platform:

Write model: Handles orders and inventory updates

Read model: Generates fast product listings, analytics dashboards

5. Saga Pattern

Concept:

Manages distributed transactions as a series of local transactions coordinated via events or commands.

Ensures eventual consistency across microservices.

Typical Use Case:

Order management in microservices

Travel booking systems

Payment processing workflows

Example Project Fit:

Hotel + Flight Booking System:

Booking service triggers payment service

Payment triggers confirmation service

Rollback if any step fails

6. Repository Pattern

Concept:

Encapsulates data access logic, separating it from business logic.

Provides abstraction over databases, ORMs, or external APIs.

Typical Use Case:

Enterprise applications with complex data access

Microservices where database logic should be isolated

Example Project Fit:

Inventory Management System:

Repository handles CRUD for products, warehouses, stock movements

Business logic service uses repositories without knowing DB details

7. Dependency Injection (DI)

Concept:

Pass dependencies from outside rather than creating them internally.

Improves modularity, testability, and decoupling.

Typical Use Case:

Microservices

Enterprise APIs

Large-scale web applications

Example Project Fit:

E-commerce Microservice Architecture:

OrderService depends on PaymentService & InventoryService

DI container injects these dependencies at runtime

8. API Gateway Pattern

Concept:

Single entry point for multiple microservices

Handles routing, authentication, throttling, monitoring

Typical Use Case:

Microservices architectures

Systems with multiple clients (web, mobile)

Example Project Fit:

Social Media Platform:

Gateway routes requests to PostService, UserService, CommentService

Handles auth, caching, rate limiting

9. Event-Driven Microservices

Concept:

Services communicate via events instead of direct synchronous calls.

Promotes loose coupling and scalability.

Typical Use Case:

E-commerce order processing

IoT systems

Streaming analytics

Example Project Fit:

Order Fulfillment System:

OrderCreated → PaymentService → ShippingService → NotificationService

All services react to events asynchronously

10. Circuit Breaker & Bulkhead Patterns

Concept:

Circuit Breaker: Prevent cascading failures by stopping calls to failing services.

Bulkhead: Isolate failures by partitioning resources.

Typical Use Case:

Microservices with high inter-dependency

Payment systems, booking platforms

Example Project Fit:

Travel Booking Microservices:

Circuit breaker prevents repeated failed calls to external flight API

Bulkhead isolates hotel booking service from flight service failures



| Pattern                    | Concept                            | Real-World Fit                    |
| -------------------------- | ---------------------------------- | --------------------------------- |
| MVC                        | UI + Business + Data separation    | E-commerce web apps               |
| MVVM                       | ViewModel binds UI & model         | SPA, mobile apps                  |
| Event Sourcing             | Persist state as events            | Banking, audit systems            |
| CQRS                       | Separate read/write models         | E-commerce, social media          |
| Saga                       | Distributed transaction management | Booking systems                   |
| Repository                 | Abstract data access               | Inventory, ERP apps               |
| Dependency Injection       | Inject dependencies from outside   | Microservices, APIs               |
| API Gateway                | Single entry point                 | Multi-service platforms           |
| Event-Driven Microservices | Async communication via events     | Order fulfillment, IoT            |
| Circuit Breaker/Bulkhead   | Fault tolerance & isolation        | Travel booking, payment platforms |




Design Patterns Usage in Companies (Big Tech vs Mid-Level)
1. MVC (Model-View-Controller)

Big Tech:

Rare in large-scale distributed systems for core microservices, but widely used for admin dashboards, internal tools, or smaller monoliths.

Example: Internal dashboards at Google, Facebook’s admin tools.

Mid-Level Companies:

Very common for web apps.

Easier to implement, maintain, and hire developers for.

Example: Small e-commerce sites, SaaS products.

2. MVVM (Model-View-ViewModel)

Big Tech:

Used heavily in desktop and mobile apps with complex UIs.

Example: Microsoft (WPF apps), Instagram (React Native front-end).

Mid-Level Companies:

SPAs and mobile apps use MVVM for maintainable UI.

Example: Angular or React-based dashboards.

3. Event Sourcing

Big Tech:

Used in financial, trading, and critical systems.

Example: PayPal, LinkedIn (activity streams), Uber (trip history).

Mid-Level Companies:

Rare due to complexity; used in systems where audit trail or rollback is critical.

Example: Payment processing startups, accounting apps.

4. CQRS (Command Query Responsibility Segregation)

Big Tech:

Frequently used in high-traffic, high-performance services.

Example: Amazon (inventory system), Twitter (tweet feed generation).

Mid-Level Companies:

Less common unless scaling requires it. Usually simpler CRUD models suffice.

Example: Medium-sized SaaS apps with separate reporting and transactional databases.

5. Saga Pattern

Big Tech:

Used in distributed microservices for transaction management.

Example: Booking systems at Airbnb, travel booking flows at Expedia.

Mid-Level Companies:

Sometimes implemented for multi-step workflows but often handled synchronously to reduce complexity.

Example: Mid-tier e-commerce platforms for order fulfillment.

6. Repository Pattern

Big Tech:

Common in all levels; abstracts data access.

Example: Netflix uses repositories for modular services.

Mid-Level Companies:

Widely used in web apps and APIs for maintainable code.

7. Dependency Injection (DI)

Big Tech:

Used extensively to decouple services and improve testability.

Example: Google’s Guice, Netflix’s Spring Boot services.

Mid-Level Companies:

Used in frameworks (Spring, Angular) but sometimes skipped in small projects due to added complexity.

8. API Gateway Pattern

Big Tech:

Core for microservices communication and client routing.

Example: Amazon API Gateway, Netflix Zuul.

Mid-Level Companies:

Sometimes used if multiple services exist; smaller apps may just expose multiple APIs directly.

9. Event-Driven Microservices

Big Tech:

Heavily used for scalable, loosely-coupled systems.

Example: Uber, Netflix, LinkedIn (Kafka, Pulsar pipelines).

Mid-Level Companies:

Adopted for async processing or decoupling critical workflows; many still use synchronous service calls for simplicity.

10. Circuit Breaker / Bulkhead

Big Tech:

Core for resiliency in microservices.

Example: Netflix Hystrix, Amazon microservices.

Mid-Level Companies:

Rare unless services are distributed and high-availability is critical.

Insight:

Big Tech: Focuses on scalability, resilience, microservices, and async/event-driven architectures. Patterns like CQRS, Saga, Event Sourcing, API Gateway, Circuit Breaker are standard.

Mid-Level Companies: Stick to simpler patterns like MVC, Repository, DI, and adopt advanced patterns gradually as complexity grows.



| Pattern                    | Big Tech Usage              | Mid-Level Usage        | Example Companies       |                                |
| -------------------------- | --------------------------- | ---------------------- | ----------------------- | ------------------------------ |
| MVC                        | Internal tools / dashboards | Web apps, SaaS         | Google, Shopify         |                                |
| MVVM                       | Desktop/mobile apps         | SPA / mobile           | Microsoft, Instagram    |                                |
| Event Sourcing             | Critical systems, auditing  | Rare                   | PayPal, Uber            | Startups with payment or audit |
| CQRS                       | High-traffic services       | Rare, mostly reporting | Amazon, Twitter         | Medium SaaS                    |
| Saga                       | Distributed transactions    | Sometimes              | Airbnb, Expedia         | E-commerce startups            |
| Repository                 | All levels                  | All levels             | Netflix, Facebook       | Most web apps                  |
| Dependency Injection       | Extensive                   | Optional               | Google, Netflix         | Spring/Angular apps            |
| API Gateway                | Core in microservices       | Optional               | Amazon, Netflix         | Mid-tier microservices         |
| Event-Driven Microservices | Very common                 | Sometimes              | Uber, LinkedIn          | Async workflows                |
| Circuit Breaker / Bulkhead | Core for resiliency         | Rare                   | Netflix Hystrix, Amazon | Critical workflows only        |

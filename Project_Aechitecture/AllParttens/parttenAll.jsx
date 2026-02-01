Complete Design Patterns Guide (Basic → Advanced)
1. Creational Patterns

These patterns focus on object creation mechanisms, making the system independent of how objects are created.


| Pattern              | Concept                                                                                        | Use Case                             |
| -------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Singleton**        | Ensure a class has only one instance and provide a global point of access.                     | DB Connection Pool, Logger           |
| **Factory Method**   | Define an interface for creating objects but let subclasses decide which class to instantiate. | Shape factory, Payment gateway       |
| **Abstract Factory** | Create families of related objects without specifying concrete classes.                        | UI themes (buttons, menus)           |
| **Builder**          | Separate construction of a complex object from its representation.                             | Building complex reports, HTML pages |
| **Prototype**        | Create new objects by copying existing ones.                                                   | Cloning objects, caching objects     |



2. Structural Patterns

These patterns deal with object composition and relationships to form larger structures.
]

| Pattern       | Concept                                                                        | Use Case                              |
| ------------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| **Adapter**   | Convert the interface of a class into another interface clients expect.        | Legacy system integration             |
| **Facade**    | Provide a simplified interface to a complex subsystem.                         | Payment processing API facade         |
| **Proxy**     | Provide a placeholder for another object to control access.                    | Lazy loading, caching, access control |
| **Decorator** | Add responsibilities to objects dynamically without modifying their structure. | Adding features to UI components      |
| **Composite** | Treat individual objects and compositions uniformly.                           | File system (file & folder)           |
| **Bridge**    | Decouple abstraction from implementation so they can vary independently.       | Cross-platform UI toolkit             |



3. Behavioral Patterns

These patterns focus on object interaction and responsibility.


| Pattern                     | Concept                                                                               | Use Case                                |
| --------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------- |
| **Observer**                | Define a dependency so that when one object changes, all its dependents are notified. | Event listeners, Pub/Sub systems        |
| **Strategy**                | Define a family of algorithms and make them interchangeable.                          | Payment methods, sorting algorithms     |
| **Command**                 | Encapsulate a request as an object to parameterize clients.                           | Undo/redo operations, task scheduling   |
| **State**                   | Allow an object to alter behavior when its internal state changes.                    | TCP connection states, order processing |
| **Template Method**         | Define the skeleton of an algorithm in a method, deferring some steps to subclasses.  | Game loops, workflow engines            |
| **Chain of Responsibility** | Pass requests along a chain of handlers.                                              | Logging, middleware pipelines           |
| **Mediator**                | Reduce coupling between objects by having them communicate through a mediator.        | Chat room, UI component coordination    |
| **Iterator**                | Provide a way to access elements sequentially without exposing underlying structure.  | Collections, array traversal            |
| **Memento**                 | Capture and restore an object’s internal state.                                       | Undo features, versioning               |
| **Visitor**                 | Separate operations from object structures they operate on.                           | Compilers, object structure traversal   |


4. Concurrency / Advanced Patterns

These patterns are for multi-threaded and distributed systems.

| Pattern                 | Concept                                                                                                     | Use Case                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Thread Pool**         | Manage a pool of threads for executing tasks efficiently.                                                   | Web servers, background jobs                |
| **Active Object**       | Decouple method execution from method invocation to enhance concurrency.                                    | Game engines, async task execution          |
| **Scheduler / Reactor** | Handle service requests delivered concurrently to a service handler by demultiplexing and dispatching them. | Node.js Event Loop, server request handling |
| **Leader Election**     | Choose a coordinator among distributed nodes.                                                               | Distributed systems, Kafka brokers          |
| **Circuit Breaker**     | Detect failures and encapsulate logic to prevent system failure.                                            | Microservices fault tolerance               |
| **Bulkhead**            | Isolate components to prevent cascading failures.                                                           | Microservices resilience                    |



5. Architectural / Enterprise Patterns

These are higher-level patterns used in system design and microservices.

| Pattern                                             | Concept                                                             | Use Case                           |
| --------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| **MVC (Model-View-Controller)**                     | Separate UI, business logic, and data.                              | Web frameworks (Rails, Spring MVC) |
| **MVVM (Model-View-ViewModel)**                     | UI binding with data model separation.                              | Angular, WPF apps                  |
| **Event Sourcing**                                  | Persist state changes as a sequence of events.                      | Banking transactions, audit logs   |
| **CQRS (Command Query Responsibility Segregation)** | Separate read and write models.                                     | High-performance microservices     |
| **Saga Pattern**                                    | Manage distributed transactions via a series of local transactions. | Order processing, booking systems  |
| **Repository Pattern**                              | Encapsulate data access logic.                                      | ORM data layer abstraction         |
| **Dependency Injection**                            | Pass dependencies from outside rather than creating them inside.    | Spring, Angular apps               |



✅ Summary

Creational: How objects are created.

Structural: How objects are composed.

Behavioral: How objects interact.

Concurrency / Advanced: Multi-threaded & distributed patterns.

Architectural / Enterprise: System-wide high-level patterns.
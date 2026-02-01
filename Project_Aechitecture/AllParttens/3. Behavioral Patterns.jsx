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

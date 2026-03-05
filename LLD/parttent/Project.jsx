| LLD Project                       | Creational Patterns                                                                 | Structural Patterns                                               | Behavioral Patterns                                                                                                       | Notes / Usage                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **BookMyShow**                    | Singleton (DB/Logger), Factory (Payment, Notification), Builder (Movie/Show object) | Decorator (VIP seats / add-ons)                                   | Template Method (Booking flow), Observer (seat availability notifications)                                                | Combines object creation + booking behavior + dynamic features |
| **Parking Lot**                   | Singleton (Logger/DB), Builder (Ticket)                                             | Composite (ParkingLot → Floors → Slots), Facade (ParkingLot API)  | Strategy (Fee Calculation), Observer (Slot availability)                                                                  | Focus on structure (slots) + dynamic fee behavior              |
| **Chat System**                   | Singleton (DB/Logger)                                                               | Proxy (Message caching), Facade (Chat API)                        | Observer (Message notifications), Mediator (Group chat communication), State (User online/offline)                        | Real-time interactions + communication patterns                |
| **Food Delivery (Zomato/Swiggy)** | Factory (Order / Payment creation), Singleton (Logger/DB)                           | Adapter (Integrate restaurant API), Facade (Order Management API) | Observer (Order status updates), Strategy (Delivery fee calculation), State (Order states: Pending, Preparing, Delivered) | Multi-service flow + async updates                             |
| **Rate Limiter / API Throttling** | Singleton (Redis client)                                                            | Proxy (Request control / caching)                                 | Strategy (Sliding window / fixed window algorithms), Chain of Responsibility (Validation → RateCheck → Action)            | Focus on controlling behavior dynamically                      |
| **Elevator System**               | Singleton (Controller)                                                              | Facade (Elevator API)                                             | State (Elevator movement), Strategy (Floor selection algorithm), Observer (Notify passengers)                             | Multi-state system with dynamic behaviors                      |
| **Splitwise / Expense Sharing**   | Singleton (DB)                                                                      | Facade (Expense API)                                              | Observer (Notification to users), Strategy (Debt settlement), Template Method (Expense calculation)                       | Combines data creation + notifications + algorithms            |
| **Cab Booking (Uber/Ola)**        | Singleton (DB / Logger), Factory (Trip creation)                                    | Facade (Ride API), Adapter (Payment integration)                  | Observer (Ride updates), Strategy (Pricing algorithm), State (Trip: Requested → Ongoing → Completed)                      | Full workflow system with real-time updates                    |
| **Library Management**            | Singleton (Logger), Builder (Book / Catalog)                                        | Composite (Library → Sections → Books)                            | Strategy (Borrow / Return rules), Observer (Notify overdue books)                                                         | Classic CRUD + behavior patterns                               |
| **ATM / Vending Machine**         | Singleton (Logger)                                                                  | Proxy (Access control for ATM)                                    | State (ATM / Machine state), Command (Withdraw / Deposit / Undo), Template Method (Transaction flow)                      | Dynamic behavior based on machine state                        |



✅ How to Use This Table

Before coding a project, check which patterns apply

Mark them in your UML diagrams

Implement them in code, explain why in interviews

Reference this table to quickly justify design choices

💡 Tip for LLD interviews:

Always mention the type of pattern (Creational / Structural / Behavioral)

Explain why you chose it in this project

Connect UML → Classes → Pattern → Flow
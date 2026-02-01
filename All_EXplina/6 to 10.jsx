6. Message Queues

Definition: A system that enables asynchronous communication 
between services (e.g., Kafka, RabbitMQ).

Use Case: Order processing in e-commerce, email sending.


7. Rate Limiting

Definition: Restricting the number of requests a client
can make in a given time.

1:: Token RateLimit

2::Redis Base Rate Limit

3::Bukent RateLimit 

4::fixed window Counting  algo 

5::sliding window counting  log algo 

6::sliding window count algo


1️⃣ Token Bucket

Project Example: REST API for payments

Scenario: Users can make a burst of 5 requests at once, but max 10 requests per minute.

How it works:

Each user has 5 tokens.

Each request consumes 1 token.

Tokens refill 1 every 6 seconds.

Use Case: Payment API, Game actions per second.

2️⃣ Redis-Based Rate Limit

Project Example: Login API

Scenario: Limit 5 login attempts per 10 minutes per user/IP to prevent brute-force.

How it works:

Store counter in Redis: user:login_attempts.

INCR + EXPIRE to auto-reset.

Use Case: Any distributed API (Node.js cluster, microservices).

3️⃣ Bucket Rate Limit (like Token Bucket)

Project Example: Chat app sending messages

Scenario: Users can send 10 messages per minute, no more.

How it works:

Allocate slots for each user in “bucket”.

Each message consumes a slot.

Use Case: Chat apps, messaging APIs.

4️⃣ Fixed Window Counting

Project Example: REST API /getUserData

Scenario: Each user can call API 100 times per hour.

How it works:

Count requests in fixed window (e.g., 1 hour).

Reset counter at end of window.

Use Case: Simple APIs, login attempts, public data APIs.

5️⃣ Sliding Window Log

Project Example: Real-time chat API

Scenario: Users can send 20 messages per 30 seconds.

How it works:

Keep timestamps of requests.

Count only those within last 30 seconds.

Use Case: High-frequency message sending, comments, or likes API.

6️⃣ Sliding Window Counter

Project Example: REST API /search in social media

Scenario: Each user can search 60 times per minute.

How it works:

Divide 1 minute into 6 sub-windows of 10 seconds.

Count requests in last 6 windows to estimate limit.

Use Case: High-traffic search or analytics APIs.

| Rate Limit Type        | Project Example     | Limit Example             |
| ---------------------- | ------------------- | ------------------------- |
| Token Bucket           | Payment API         | 5 requests burst, 10/min  |
| Redis-Based            | Login API           | 5 login attempts / 10 min |
| Bucket Rate Limit      | Chat App            | 10 messages / min         |
| Fixed Window Counting  | REST API `/getUser` | 100 requests / hour       |
| Sliding Window Log     | Chat API            | 20 messages / 30 sec      |
| Sliding Window Counter | Search API          | 60 searches / min         |




Use Case: Preventing API abuse (e.g., Twitter API limits).



8. API Gateway

Definition: Entry point for all client requests to a
 microservice architecture.

Use Case: Handles routing, authentication, throttling, and monitoring.

💡 Tip for Interviews:

Think of API Gateway as a “security & traffic manager” for all your microservices.

Always mention routing + auth + throttling + monitoring in answers.




9. Microservices

Definition: Breaking a monolithic application into smaller, independent services.

Use Case: E-commerce: separate services for payment, inventory, user management.




10. Service Discovery

Definition: Automatically detecting and managing network locations 
f microservices.

Use Case: Kubernetes or Consul for dynamic service registration.
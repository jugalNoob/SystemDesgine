🔹 What is Proxy Pattern?

Definition

Proxy is a Structural Design Pattern that acts as a
 substitute or wrapper for another object to control access to it.



The proxy sits between the client and the real object.


.. It can add extra behavior like:

Caching

Authentication / Authorization

Logging

Rate limiting

Lazy loading

Key Idea

“Client talks to Proxy → Proxy decides whether to call the real object.”




🔹 Simple Real Example

Client → Proxy → Real API Service

Proxy can:

Check user authentication

Check cache

Log requests

Then call the real service

🔹 JavaScript Example: API Caching Proxy
Step 1 — Real API Service
class ApiService {
  fetchData(id) {
    console.log("Fetching data from database/API...");
    return { id, data: "User Data" };
  }
}


This is the actual service (slow operation like DB/API).


Step 2 — Proxy Layer



class ApiProxy {
  constructor() {
    this.apiService = new ApiService();
    this.cache = {};
  }

  fetchData(id) {
    // Check cache first
    if (this.cache[id]) {
      console.log("Returning data from cache...");
      return this.cache[id];
    }

    // Call real service
    const result = this.apiService.fetchData(id);

    // Store in cache
    this.cache[id] = result;

    return result;
  }
}


Proxy adds:

Caching

Control access

Step 3 — Client Code
const api = new ApiProxy();

console.log(api.fetchData(1));
console.log(api.fetchData(1));

🔹 Output
Fetching data from database/API...
{ id: 1, data: 'User Data' }

Returning data from cache...
{ id: 1, data: 'User Data' }


First call → real API
Second call → cached response

🔹 Step-by-Step Architecture
Client
   │
   ▼
API Proxy
   │
   ├── Cache check
   ├── Authentication
   ├── Logging
   │
   ▼
Real API Service
   │
   ▼
Database


Proxy controls all access.

🔹 Example in Real Systems

Proxy adds:

Caching

Control access

Step 3 — Client Code
const api = new ApiProxy();

console.log(api.fetchData(1));
console.log(api.fetchData(1));

🔹 Output
Fetching data from database/API...
{ id: 1, data: 'User Data' }

Returning data from cache...
{ id: 1, data: 'User Data' }


First call → real API
Second call → cached response

🔹 Step-by-Step Architecture
Client
   │
   ▼
API Proxy
   │
   ├── Cache check
   ├── Authentication
   ├── Logging
   │
   ▼
Real API Service
   │
   ▼
Database


Proxy controls all access.

🔹 Example in Real Systems

| System            | Proxy Use Case                 |
| ----------------- | ------------------------------ |
| Backend API       | Cache DB queries               |
| Redis cache layer | Proxy for database             |
| API Gateway       | Authentication + rate limiting |
| CDN               | Proxy for static files         |
| Microservices     | Security / logging layer       |

Example:

User → API Gateway (Proxy) → Microservice


API Gateway acts like Proxy.

🔹 Types of Proxy (Interview Bonus)




| Type             | Purpose                    |
| ---------------- | -------------------------- |
| Virtual Proxy    | Lazy loading heavy objects |
| Protection Proxy | Access control             |
| Caching Proxy    | Store results              |
| Logging Proxy    | Monitor requests           |
| Remote Proxy     | Access remote service      |



🔹 LLD Interview Example

Design Search API with Cache

Client
   │
SearchProxy
   │
Redis Cache
   │
SearchService
   │
MongoDB


Proxy flow:

Request comes

Check Redis cache

If miss → call service

Store result in cache

Return response

🔹 Proxy vs Decorator vs Facade


| Pattern   | Purpose                      |
| --------- | ---------------------------- |
| Proxy     | Control access to object     |
| Decorator | Add new behavior dynamically |
| Facade    | Simplify complex system      |




Example:

Proxy → security + caching
Decorator → add features
Facade → simplify subsystem

🔹 Why Proxy is Important for You

Since you are building Node.js APIs with Redis caching, Proxy pattern is already
 used in systems like:

API caching layer

Rate limiting

Authorization middleware









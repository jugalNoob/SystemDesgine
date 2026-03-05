5️⃣ Chain of Responsibility5️⃣ Chain of Responsibility
Meaning

Request passes through multiple handlers in a chain.

Example: API Middleware

Request
  │
Auth Middleware
  │
Validation Middleware
  │
Logging Middleware
  │
Controller


Each handler decides whether to process or pass forward.

Code Example
class Middleware {

  setNext(next) {
    this.next = next;
    return next;
  }

  handle(req) {
    if (this.next) {
      this.next.handle(req);
    }
  }

}


Concrete Middleware

class AuthMiddleware extends Middleware {
  handle(req) {

    if (!req.user) {
      console.log("Unauthorized");
      return;
    }

    console.log("Auth passed");

    super.handle(req);
  }
}


Client

const auth = new AuthMiddleware();

auth.handle({ user: "Jugal" });

Real Backend Use


| System             | Chain Example                       |
| ------------------ | ----------------------------------- |
| Express.js         | Middleware chain                    |
| Request validation | Auth → Validate → Controller        |
| Logging pipeline   | Multiple log handlers               |
| Payment pipeline   | Fraud check → limit check → process |





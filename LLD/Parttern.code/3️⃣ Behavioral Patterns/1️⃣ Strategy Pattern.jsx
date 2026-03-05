1️⃣ Strategy Pattern1️⃣ Strategy Pattern
Example: Payment System
Meaning

Strategy allows switching algorithms at runtime.

Example:

Payment → CreditCard
Payment → PayPal
Payment → UPI


Instead of writing many if/else conditions, we use strategies.

Code Example

Base Strategy

class PaymentStrategy {
  pay(amount) {}
}


Concrete Strategies

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log("Paid using Credit Card:", amount);
  }
}

class UpiPayment extends PaymentStrategy {
  pay(amount) {
    console.log("Paid using UPI:", amount);
  }
}


Context

class PaymentProcessor {

  constructor(strategy) {
    this.strategy = strategy;
  }

  process(amount) {
    this.strategy.pay(amount);
  }

}


Client

const payment = new PaymentProcessor(new UpiPayment());
payment.process(1000);

Output
Paid using UPI: 1000

Architecture
Client
  │
PaymentProcessor
  │
PaymentStrategy
  ├─ CreditCard
  ├─ PayPal
  └─ UPI

Real System Uses



| System                | Strategy                           |
| --------------------- | ---------------------------------- |
| Payment gateway       | Different payment methods          |
| Shipping system       | Different shipping cost algorithms |
| Recommendation system | Different ranking algorithms       |
| Fraud detection       | Different scoring strategies       |

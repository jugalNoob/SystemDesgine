🔹 What is Facade Pattern?

Definition:

Facade is a Structural Design Pattern that provides a simplified 
interface to a complex subsystem.

Hides complexity of multiple classes and exposes
 a simple method for clients.

Useful when clients should not know about internal details.



Use Case in LLD:

Payment + Notification → Multiple classes: CreditCardPayment,
 PayPalPayment, WalletPayment, EmailNotification, SMSNotification

Client just calls processOrder() instead of dealing
 with each subsystem individually

Key Idea:

“Provide a single interface to make a complex system easier to use.”



// Step 1: Subsystems

class CreditCardPayment {
  pay(amount) { console.log(`Paid $${amount} via Credit Card`); }
}

class PayPalPayment {
  pay(amount) { console.log(`Paid $${amount} via PayPal`); }
}

class EmailNotification {
  send(email, message) { console.log(`Email sent to ${email}: ${message}`); }
}

class SMSNotification {
  send(phone, message) { console.log(`SMS sent to ${phone}: ${message}`); }
}

// Step 2: Facade
class OrderFacade {
  constructor(paymentType, contact) {
    this.paymentType = paymentType;
    this.contact = contact;
  }

  processOrder(amount, message) {
    // Payment subsystem
    if (this.paymentType === "credit") {
      new CreditCardPayment().pay(amount);
    } else if (this.paymentType === "paypal") {
      new PayPalPayment().pay(amount);
    }

    // Notification subsystem
    if (this.contact.includes("@")) {
      new EmailNotification().send(this.contact, message);
    } else {
      new SMSNotification().send(this.contact, message);
    }
  }
}

// Step 3: Client code
const order1 = new OrderFacade("credit", "user@example.com");
order1.processOrder(100, "Your order is confirmed");

const order2 = new OrderFacade("paypal", "1234567890");
order2.processOrder(200, "Your order is confirmed");


🔹 Step-by-Step Explanation

1:: Subsystem Classes

CreditCardPayment, PayPalPayment → payment logic

EmailNotification, SMSNotification → notification logic

2:: Facade Class (OrderFacade)

Combines all complex subsystem calls into a single method: processOrder()

Client doesn’t need to know how payment or notification works internally

3:: Client Code

Calls one method to handle the entire workflow

Simplifies usage and reduces coupling


🔹 Output
Paid $100 via Credit Card
Email sent to user@example.com: Your order is confirmed
Paid $200 via PayPal
SMS sent to 1234567890: Your order is confirmed


🔹 Why Facade is Important in LLD

Simplifies client code → Single method for complex workflow

Decouples client from subsystems → Can change payment/notification internally

Encapsulates complexity → All internal logic hidden behind facade

Easy to extend → Add new payment method or notification type without changing client



🔹 Real-World LLD Projects Using Facade


| Project         | Facade Use Case                                                           |
| --------------- | ------------------------------------------------------------------------- |
| Food Delivery   | `OrderFacade` → handles payment + notification + invoice                  |
| E-commerce      | `CheckoutFacade` → handles cart, payment, shipping, notification          |
| Banking         | `TransactionFacade` → handles validation, payment, audit, notification    |
| Booking Systems | `BookingFacade` → ticket creation, seat allocation, payment, confirmation |



💡 Interview Tip:

Explain Facade vs Adapter:

Adapter → Makes two interfaces compatible

Facade → Simplifies a complex system for the client

Draw UML:

Client → Facade → Subsystem1 + Subsystem2 + Subsystem3

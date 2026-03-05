🔹 What is Adapter Pattern?

1: Definition:

Adapter is a Structural Design Pattern that allows incompatible
 interfaces to work together.


.. It wraps an existing class and translates its interface into 
something the client expects.

.. Useful when you want to integrate a third-party system without 
changing your existing code.

2:: Use Case in LLD:

Payment Integration → Your system expects a pay(amount) method,
 but a third-party payment API uses makePayment(total)

Adapter allows your code to call your expected method while
 internally using the third-party API


Key Idea:

“Make two incompatible interfaces work together without modifying either.”




🔹 JavaScript Example: Payment Adapter
// Step 1: Existing Payment API (Third-party)
class ThirdPartyPayment {
  makePayment(total) {
    console.log(`Paid $${total} using ThirdPartyPayment API`);
  }
}

// Step 2: Our system expects this interface
class Payment {
  pay(amount) {
    throw new Error("Method not implemented");
  }
}

// Step 3: Adapter
class PaymentAdapter extends Payment {
  constructor(thirdPartyPayment) {
    super();
    this.thirdPartyPayment = thirdPartyPayment;
  }

  pay(amount) {
    // Translate 'pay' to 'makePayment'
    this.thirdPartyPayment.makePayment(amount);
  }
}

// Step 4: Client code
const thirdPartyPayment = new ThirdPartyPayment();
const payment = new PaymentAdapter(thirdPartyPayment);

payment.pay(100); // Client calls 'pay' as expected

🔹 Step-by-Step Explanation

ThirdPartyPayment

Already exists, but interface doesn’t match our
 system (makePayment instead of pay).

Payment Interface

Defines the method our system expects (pay).

PaymentAdapter

Wraps ThirdPartyPayment

Implements the expected interface pay()

Internally calls makePayment()

Client Code

Calls payment.pay(100)

Doesn’t care about the third-party method

🔹 Output
Paid $100 using ThirdPartyPayment API


Works seamlessly even though interfaces were incompatible.



🔹 Why Adapter is Important in LLD

Integration-friendly: Integrate third-party APIs without rewriting your system

Code reuse: Don’t modify the original class

Decoupling: Your system is decoupled from external implementations

Scalable: Can adapt multiple different payment providers using the same interface



🔹 Real-World LLD Projects Using Adapter

| Project             | Adapter Use Case                                                         |
| ------------------- | ------------------------------------------------------------------------ |
| Payment System      | Integrate PayPal, Stripe, Razorpay APIs using a common `pay()` interface |
| Notification System | Integrate SMS / Email / Push services                                    |
| File System         | Integrate cloud storage providers (AWS S3, Google Drive, Azure)          |
| UI Framework        | Adapt different OS components to same widget interface                   |


💡 Interview Tip:

Explain why Adapter is structural: it changes object relationships without modifying classes.

Show UML diagram: Client → Adapter → Adaptee (Third-party)
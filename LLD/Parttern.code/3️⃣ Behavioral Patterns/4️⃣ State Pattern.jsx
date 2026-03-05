4️⃣ State Pattern
Meaning

Object behavior changes depending on its state.

Example:

Order states:

Created
   ↓
Paid
   ↓
Shipped
   ↓
Delivered


Each state has different behavior.

Code Example

State

class OrderState {
  handle() {}
}


Concrete States

class CreatedState extends OrderState {
  handle() {
    console.log("Order created");
  }
}

class PaidState extends OrderState {
  handle() {
    console.log("Order paid");
  }
}


Context

class Order {

  constructor(state) {
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }

  process() {
    this.state.handle();
  }

}


Client

const order = new Order(new CreatedState());
order.process();

order.setState(new PaidState());
order.process();

Real Systems


| System           | State Pattern                      |
| ---------------- | ---------------------------------- |
| ATM machine      | Idle → Card inserted → Transaction |
| Order system     | Created → Paid → Delivered         |
| Vending machine  | Waiting → Dispensing               |
| Workflow engines | Status transitions                 |




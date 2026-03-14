.

🔹 What is Decorator Pattern?

Definition:
Decorator is a Structural Design Pattern that adds
 new behavior to objects dynamically without altering the original class.

Unlike inheritance, it wraps the object and enhances
 functionality at runtime.

Useful for optional features or add-ons.

Use Case in LLD:

BookMyShow → Add VIP seats, snacks, special services to a booking

Coffee Shop → Add extra toppings, milk types, flavors

Key Idea:

“Wrap the object to add functionality without changing the original class.”

🔹 JavaScript Example: Coffee Shop Decorator
// Step 1: Base Coffee class
class Coffee {
  cost() {
    return 5; // base price
  }

  description() {
    return "Basic Coffee";
  }
}

// Step 2: Decorator class
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

// Step 3: Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 2; // add milk cost
  }

  description() {
    return super.description() + ", Milk";
  }
}

class ChocolateDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 3; // add chocolate cost
  }

  description() {
    return super.description() + ", Chocolate";
  }
}

// Step 4: Client code
let myCoffee = new Coffee(); // base coffee
console.log(myCoffee.description(), "$" + myCoffee.cost());

// Add Milk
myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description(), "$" + myCoffee.cost());

// Add Chocolate
myCoffee = new ChocolateDecorator(myCoffee);
console.log(myCoffee.description(), "$" + myCoffee.cost());

🔹 Step-by-Step Explanation

Base Class (Coffee)

Represents the core object.

Has base cost and description.

Decorator (CoffeeDecorator)

Wraps a Coffee object

Delegates cost() and description() calls to the wrapped object

Concrete Decorators (MilkDecorator, ChocolateDecorator)

Add extra behavior dynamically

Can be chained in any combination

Client Code

Starts with base coffee

Wraps it dynamically with decorators to add features

🔹 Output
Basic Coffee $5
Basic Coffee, Milk $7
Basic Coffee, Milk, Chocolate $10


Each decorator adds cost and description dynamically.

🔹 Why Decorator is Important in LLD

Flexible feature addition → VIP seats, extra toppings

Avoids class explosion → Instead of creating CoffeeWithMilkAndChocolate, we wrap dynamically

Runtime customization → Features can be added as needed

Open/Closed Principle → Extend functionality without modifying base class

🔹 Real-World LLD Projects Using Decorator

| Project         | Decorator Use Case                                 |
| --------------- | -------------------------------------------------- |
| Coffee Shop     | Add milk, chocolate, whipped cream to base coffee  |
| BookMyShow      | Add VIP seats, snacks, insurance, special services |
| Online Shopping | Add gift wrap, warranty, express delivery          |
| File System     | Add encryption, compression dynamically to files   |


💡 Interview Tip:

Explain why Decorator over inheritance: avoids exploding number of subclasses for each feature combination

Draw UML:

Coffee <- Decorator <- ConcreteDecorator


Mention chaining / runtime feature addition
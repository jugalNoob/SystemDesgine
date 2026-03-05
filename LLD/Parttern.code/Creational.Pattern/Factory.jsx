🔹 What is Factory Pattern?

Definition:
Factory is a Creational Design Pattern that creates objects 
without exposing the creation logic to the client.

You just ask the factory for an object, and it gives you the correct type.


Useful when you have multiple types of related objects.

Use Case in LLD:

Notification system → SMS, Email, Push

Payment system → CreditCard, PayPal, Wallet

Vehicles → Car, Bike, Truck

Key Idea:

“Client code doesn’t need to know which exact class is being instantiated.”

🔹 Simple JavaScript Example: Notification Factory
// Step 1: Define notification classes

class EmailNotification {
  send(message) {
    console.log("Email sent:", message);
  }
}

class SMSNotification {
  send(message) {
    console.log("SMS sent:", message);
  }
}

class PushNotification {
  send(message) {
    console.log("Push notification sent:", message);
  }
}

// Step 2: Create the Factory
class NotificationFactory {
  static createNotification(type) {
    switch (type) {
      case "email":
        return new EmailNotification();
      case "sms":
        return new SMSNotification();
      case "push":
        return new PushNotification();
      default:
        throw new Error("Invalid notification type");
    }
  }
}

// Step 3: Client uses Factory
const notification1 = NotificationFactory.createNotification("email");
notification1.send("Welcome to our app!");

const notification2 = NotificationFactory.createNotification("sms");
notification2.send("Your OTP is 123456");

const notification3 = NotificationFactory.createNotification("push");
notification3.send("You have a new message");




🔹 Step-by-Step Explanation

Define multiple classes with a common interface (send() method).




Factory Class (NotificationFactory):

Accepts a type string

Returns the correct class instance

Client code doesn’t call new directly

It only calls NotificationFactory.createNotification(type)

Factory handles which class to instantiate



🔹 Output
Email sent: Welcome to our app!
SMS sent: Your OTP is 123456
Push notification sent: You have a new message



🔹 Why Factory is Important in LLD

. Open/Closed Principle:

You can add new notification types (like WhatsAppNotification) 
without changing client code


. Encapsulation:

Client doesn’t know how the object is created

. Flexibility:

Easy to swap implementations based on type

🔹 Real-World LLD Projects


| Project             | Factory Use Case                              |
| ------------------- | --------------------------------------------- |
| BookMyShow          | PaymentFactory → CreditCard / PayPal / Wallet |
| Notification System | NotificationFactory → Email / SMS / Push      |
| Food Delivery       | OrderFactory → RegularOrder / ExpressOrder    |
| Vehicle Booking     | VehicleFactory → Car / Bike / SUV             |



💡 Interview Tip:

Always mention why you used Factory (encapsulation + OCP)

Show client code does not know exact object type
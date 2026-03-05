──────────────────────────────
Week 2: UML & Design Thinking
──────────────────────────────
Topics:
  - UML Class / Sequence / State Diagrams
  - Relationships: Association, Aggregation, Composition
Practice / Mini-Projects:
  - Parking Lot System
  - Online Shopping Cart
Code Focus:
  - Map UML → Classes → Methods
UML:
  - Draw Class + Sequence diagrams for all workflows
Interview:
  - Explain flow from UML to code




  🔹 What it means

UML (Unified Modeling Language) is a visual way to design your system before writing code.

Class Diagram: Shows classes, attributes, methods, and relationships (like inheritance, composition)

Sequence Diagram: Shows how objects interact over time (the order of method calls)

State Diagram: Shows how an object changes its state (like ATM: Idle → Processing → Dispensing)

Map UML → Classes → Methods

You first design visually: for example, in Parking Lot: ParkingLot, Slot, Vehicle, Ticket

Then you translate it to code:

class Vehicle { constructor(plate) { this.plate = plate; } }
class Slot { constructor(number) { this.number = number; } }
class ParkingLot { constructor(slots) { this.slots = slots; } }


UML guides what classes exist, their attributes, and methods.

Explain flow from UML to code

In interviews, you need to show the connection:

“This is the class diagram → in code, we implemented ParkingLot and Slot classes”

“This is the sequence diagram → in code, when a user parks, the ParkingLot calls Slot.assignVehicle()”

Goal: Interviewers see that you understand how design diagrams translate into working code.

🔹 Example: Parking Lot Flow

Class Diagram (UML):

ParkingLot
  - slots: Slot[]
  + park(vehicle)
  + unpark(ticket)

Slot
  - number
  - vehicle
  + assignVehicle(vehicle)
  + removeVehicle()


Sequence Diagram (UML):

User -> ParkingLot: park(vehicle)
ParkingLot -> Slot: assignVehicle(vehicle)
Slot -> ParkingLot: return Ticket
ParkingLot -> User: return Ticket


Code Mapping:

class Slot {
  constructor(number) { this.number = number; this.vehicle = null; }
  assignVehicle(vehicle) { this.vehicle = vehicle; }
  removeVehicle() { this.vehicle = null; }
}

class ParkingLot {
  constructor(slots) { this.slots = slots; }
  park(vehicle) {
    const freeSlot = this.slots.find(s => !s.vehicle);
    freeSlot.assignVehicle(vehicle);
    return `Ticket for slot ${freeSlot.number}`;
  }
}


Interview Explanation:

“I first drew the UML class diagram to identify all classes and their attributes/methods.”

“Then I drew the sequence diagram to show how objects interact when parking a vehicle.”

“Finally, I implemented the classes and methods in code following the diagrams.”

🔹 Key Idea

“Flow from UML to code” = The ability to:

Visualize your system design

Identify classes, methods, relationships, and interactions

Write clean code that follows the design

Explain to interviewers how your diagrams became working code

💡 Tip: Always have 2 diagrams per project:

Class Diagram → Code

Sequence Diagram → Method Flow

This is what interviewers want in LLD rounds.
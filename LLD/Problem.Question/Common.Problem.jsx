
🔹 7 Common LLD Interview Problems + Patterns

| LLD Problem                       | Real System          | Patterns Used                 | Why Used                               |
| --------------------------------- | -------------------- | ----------------------------- | -------------------------------------- |
| **Parking Lot System**            | Mall parking         | Strategy, Singleton, Factory  | Different parking fee strategies       |
| **BookMyShow**                    | Movie ticket booking | Singleton, Factory, Decorator | Seat types, payment methods            |
| **Splitwise**                     | Expense sharing      | Strategy, Observer            | Different split algorithms             |
| **Elevator System**               | Building elevators   | State, Strategy               | Elevator states + scheduling algorithm |
| **Cab Booking (Uber/Ola)**        | Ride service         | Observer, Strategy, Factory   | Driver matching, ride updates          |
| **Food Delivery (Swiggy/Zomato)** | Order delivery       | Observer, State, Strategy     | Order status + notifications           |
| **Chat System (WhatsApp)**        | Messaging system     | Observer, Singleton           | Message broadcast                      |



🔹 1️⃣ Parking Lot System

Architecture

ParkingLot
   │
 ┌─┴────────────┐
Floor         Floor
 │              │
Slots        Slots


Patterns used:

| Pattern   | Purpose                          |
| --------- | -------------------------------- |
| Strategy  | Different pricing (hourly, flat) |
| Factory   | Create vehicle types             |
| Singleton | Only one parking lot instance    |



Example

Car → Slot
Bike → Slot
Truck → LargeSlot

🔹 2️⃣ BookMyShow

Architecture

User
 │
Movie
 │
Show
 │
Seats
 │
Payment


Patterns used:

| Pattern   | Purpose           |
| --------- | ----------------- |
| Singleton | Booking service   |
| Factory   | Payment types     |
| Decorator | VIP seat upgrades |


Example:

Seat
 ├ Regular
 ├ VIP
 └ Recliner


Decorator adds extra features.

🔹 3️⃣ Splitwise

Split expenses between users.

Patterns:

| Pattern  | Purpose                         |
| -------- | ------------------------------- |
| Strategy | Equal split, percentage split   |
| Observer | Notify users when expense added |



Example strategies:

SplitStrategy
 ├ EqualSplit
 ├ PercentageSplit
 └ ExactSplit

🔹 4️⃣ Elevator System

Architecture:

Elevator
 │
State
 ├ Idle
 ├ Moving
 └ DoorOpen


Patterns:

Pattern	Purpose

| Pattern  | Purpose                       |
| -------- | ----------------------------- |
| State    | Elevator behavior changes     |
| Strategy | Elevator scheduling algorithm |



Example:

Nearest Elevator
Round Robin
Load Based

🔹 5️⃣ Cab Booking System

Architecture:

User
 │
Ride Request
 │
Driver Matching
 │
Ride


Patterns:

Pattern

| Pattern  | Purpose                   |
| -------- | ------------------------- |
| Strategy | Driver matching algorithm |
| Observer | Notify driver + rider     |
| Factory  | Create ride objects       |



Flow

User requests ride
     │
Matching algorithm
     │
Driver notified

🔹 6️⃣ Food Delivery System

Architecture:

User
 │
Order
 │
Restaurant
 │
Delivery Partner


Patterns:

Pattern	Purpose



| Pattern  | Purpose             |
| -------- | ------------------- |
| Observer | Order updates       |
| State    | Order lifecycle     |
| Strategy | Delivery assignment |


Order states:

Created
Accepted
Preparing
OutForDelivery
Delivered

🔹 7️⃣ Chat System

Architecture:

User
 │
ChatRoom
 │
Messages


Patterns:

| Pattern   | Purpose              |
| --------- | -------------------- |
| Observer  | Message broadcast    |
| Singleton | Chat server instance |


Flow

User A sends message
      │
Chat Server
      │
User B
User C
User D

🔹 Interview Trick (Very Important)

When interviewer gives LLD problem, immediately think:


| Question                     | Pattern   |
| ---------------------------- | --------- |
| Different algorithms?        | Strategy  |
| One object → many listeners? | Observer  |
| Object behavior changes?     | State     |
| Add features dynamically?    | Decorator |
| Control access / caching?    | Proxy     |
| Object creation logic?       | Factory   |



This helps solve LLD faster.

🔹 Simple Pattern Memory Trick
Create Objects → Creational
Structure Objects → Structural
Communication → Behavioral

🔹 Your Backend Stack Pattern Mapping

Since you are learning:

Node.js

Redis

Kafka

MongoDB

You are already using patterns:


| Technology         | Pattern                 |
| ------------------ | ----------------------- |
| Redis cache        | Proxy                   |
| Kafka              | Observer                |
| Express middleware | Chain of Responsibility |
| Payment APIs       | Strategy                |
| Order workflow     | State                   |






Absolutely! Let’s explain the Composite Pattern using File System / Parking Lot as an example. I’ll break it down step by step.

🔹 What is Composite Pattern?

Definition:
Composite is a Structural Design Pattern that lets you treat
 individual objects and compositions of objects uniformly.


Useful when your system has tree-like hierarchical structures.

Clients can interact with single objects or groups of objects the same way.



Use Case in LLD:

File System → File / Folder structure (Folder contains Files and Subfolders)

Parking Lot → ParkingLot → Floors → Slots → Vehicles

Key Idea:

“Objects and groups of objects implement the same interface, so clients can treat them uniformly.”





// Step 1: Component interface
class FileSystemComponent {
  getName() {
    throw new Error("Not implemented");
  }

  getSize() {
    throw new Error("Not implemented");
  }

  display(indent = 0) {
    throw new Error("Not implemented");
  }
}

// Step 2: Leaf - File
class File extends FileSystemComponent {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }

  getName() { return this.name; }
  getSize() { return this.size; }
  display(indent = 0) {
    console.log(" ".repeat(indent) + `File: ${this.name}, Size: ${this.size}KB`);
  }
}

// Step 3: Composite - Folder
class Folder extends FileSystemComponent {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(component) { this.children.push(component); }
  remove(component) { this.children = this.children.filter(c => c !== component); }
  getSize() { return this.children.reduce((total, c) => total + c.getSize(), 0); }

  display(indent = 0) {
    console.log(" ".repeat(indent) + `Folder: ${this.name}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// Step 4: Client code
const file1 = new File("Readme.txt", 5);
const file2 = new File("Todo.txt", 3);

const folder1 = new Folder("Project");
folder1.add(file1);
folder1.add(file2);

const folder2 = new Folder("Root");
folder2.add(folder1);
folder2.display();

console.log("Total size:", folder2.getSize(), "KB");




🔹 Step-by-Step Explanation

Component (FileSystemComponent)

Abstract interface that defines common methods: getName(), getSize(), display().

Leaf (File)

Represents individual objects in the tree

Implements component interface

Composite (Folder)

Can contain multiple children, which can be Files or Folders

Implements same interface, so client treats it the same as leaf

Client Code

Calls display() or getSize() on folders or files, no difference

Tree structure is recursive, making traversal uniform

🔹 Output
Folder: Root
  Folder: Project
    File: Readme.txt, Size: 5KB
    File: Todo.txt, Size: 3KB
Total size: 8 KB


Recursive display shows tree structure clearly

getSize() calculates aggregate size

🔹 Parking Lot Example

ParkingLot → Composite

Floor → Composite

Slot / Vehicle → Leaf

Client code example:

class Slot {
  constructor(number) { this.number = number; this.vehicle = null; }
  display(indent = 0) { console.log(" ".repeat(indent) + `Slot: ${this.number}`); }
}

class Floor {
  constructor(number) { this.number = number; this.slots = []; }
  add(slot) { this.slots.push(slot); }
  display(indent = 0) {
    console.log(" ".repeat(indent) + `Floor: ${this.number}`);
    this.slots.forEach(slot => slot.display(indent + 2));
  }
}

class ParkingLot {
  constructor(name) { this.name = name; this.floors = []; }
  add(floor) { this.floors.push(floor); }
  display() {
    console.log(`ParkingLot: ${this.name}`);
    this.floors.forEach(floor => floor.display(2));
  }
}


Treat ParkingLot → Floor → Slot uniformly with display() method



🔹 Why Composite is Important in LLD

Tree structures simplified → FileSystem, ParkingLot

Uniform operations → Client code doesn’t care if it’s a leaf or composite

Recursive handling → Traversal, size calculation, display, or booking

Scalable → Add new leaves or sub-composites without changing client

🔹 Real-World LLD Projects Using Composite



| Project            | Composite Use Case                     |
| ------------------ | -------------------------------------- |
| File System        | Folder → Subfolders → Files            |
| Parking Lot        | ParkingLot → Floors → Slots → Vehicles |
| UI Framework       | Window → Panels → Widgets              |
| Organization Chart | Department → Teams → Employees         |



💡 Interview Tip:

Explain leaf vs composite

Show recursive traversal / uniform interface

Mention why composite is better than hardcoding tree traversal
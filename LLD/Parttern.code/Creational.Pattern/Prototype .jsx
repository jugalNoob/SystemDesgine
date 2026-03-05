🔹 What is Prototype Pattern?

Definition:
Prototype is a Creational Design Pattern used to clone existing objects instead of creating new instances from scratch.

Useful when object creation is expensive (like complex objects or deep copies).

Copy an existing object and optionally modify it.

Use Case in LLD:

File System → Clone a File / Folder

Game → Clone Characters, Weapons, Levels

BookMyShow → Duplicate Seats / Tickets

Key Idea:

“Instead of building a new object from scratch, clone an existing object to save time and resources.”

🔹 JavaScript Example: File System Prototype
// Step 1: File class (Product)
class File {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }

  display() {
    console.log(`File: ${this.name}, Content: ${this.content}`);
  }

  clone() {
    // Return a new File object with same properties
    return new File(this.name, this.content);
  }
}

// Step 2: Folder class containing multiple files
class Folder {
  constructor(name) {
    this.name = name;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
  }

  clone() {
    const newFolder = new Folder(this.name);
    this.files.forEach(file => {
      newFolder.addFile(file.clone()); // Clone each file
    });
    return newFolder;
  }

  display() {
    console.log(`Folder: ${this.name}`);
    this.files.forEach(f => f.display());
  }
}

// Step 3: Use Prototype
const file1 = new File("Readme.txt", "This is a README file.");
const file2 = new File("Todo.txt", "1. Finish code 2. Review PR");

const folder1 = new Folder("Project");
folder1.addFile(file1);
folder1.addFile(file2);

console.log("Original Folder:");
folder1.display();

// Clone the folder
const folder2 = folder1.clone();
folder2.name = "Project Copy"; // You can modify cloned folder
console.log("\nCloned Folder:");
folder2.display();

🔹 Step-by-Step Explanation

. File Class:

clone() method creates a new File object with the same properties.

. Folder Class:

Contains multiple File objects

clone() method clones all files inside to create a deep copy

. Client Code:

folder1 is the original

folder2 = folder1.clone() creates a completely separate copy

Changes to folder2 do not affect folder1


🔹 Output
Original Folder:
Folder: Project
File: Readme.txt, Content: This is a README file.
File: Todo.txt, Content: 1. Finish code 2. Review PR

Cloned Folder:
Folder: Project Copy
File: Readme.txt, Content: This is a README file.
File: Todo.txt, Content: 1. Finish code 2. Review PR




🔹 Why Prototype is Important in LLD

. Efficient object creation: Don’t recreate objects from scratch.

.  Supports cloning complex structures: Folder → Files → Subfolders

.  Safe modifications: Modify cloned objects without affecting originals.

. Useful in File System LLD: Duplicate folders, templates, or configs easily.

🔹 Real-World LLD Projects Using Prototype


| Project           | Prototype Use Case                               |
| ----------------- | ------------------------------------------------ |
| File System       | Clone Folder/File templates                      |
| BookMyShow        | Duplicate seating arrangement for multiple shows |
| Game / Simulation | Clone characters, weapons, levels                |
| Online Shopping   | Clone product templates with default properties  |




💡 Interview Tip:

Always mention why Prototype is better than new object creation
 (efficiency, deep cloning, reuse)

Draw a folder → file clone UML for clarity
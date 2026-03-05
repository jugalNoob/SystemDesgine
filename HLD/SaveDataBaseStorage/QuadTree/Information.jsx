🔥 QuadTree — Full Explanation (Meaning + Where to Use + Project Fit)
🧠 What is a QuadTree?

A QuadTree is a tree data structure used to divide 2D space into four equal regions recursively.

Each node splits into 4 children (quadrants).

Used mainly for spatial partitioning.

🔵 Simple Visualization

Imagine a map:

 -----------------
|        |        |
|   Q1   |   Q2   |
|--------+--------|
|        |        |
|   Q3   |   Q4   |
 -----------------


If a quadrant becomes crowded → it splits again into 4.

Recursive spatial division.

🔥 Why QuadTree is Needed?

Problem:

If you have 1 million 2D points:

(x, y)


And you want to:

Find nearby points

Detect collision

Search within region

Without QuadTree → O(n)

With QuadTree → O(log n)

🏗 Where QuadTree Is Used
1️⃣ Maps & Location Systems

Google Maps

Uber

Used for:

Nearby driver search

Geo queries

Region filtering

2️⃣ Game Development

Collision detection

Bullet hit detection

Spatial indexing

Games like:

Minecraft

Fortnite

3️⃣ GIS Systems

PostGIS

MongoDB (2D spatial index)

4️⃣ Image Processing

Image compression

Region detection

Computer vision

🔥 How QuadTree Works (Step by Step)
Step 1:

Start with full boundary:

(0,0) to (100,100)

Step 2:

Insert points.

If node capacity exceeded → split into 4 children.

Step 3:

Each child handles its own region.

🔥 Node Structure

Each node contains:

boundary (x, y, width, height)
capacity
points[]
divided (true/false)
northWest
northEast
southWest
southEast

🔥 Simple Node.js QuadTree Implementation
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; // center x
    this.y = y; // center y
    this.w = w; // half width
    this.h = h; // half height
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const { x, y, w, h } = this.boundary;

    this.northeast = new QuadTree(
      new Rectangle(x + w/2, y - h/2, w/2, h/2),
      this.capacity
    );

    this.northwest = new QuadTree(
      new Rectangle(x - w/2, y - h/2, w/2, h/2),
      this.capacity
    );

    this.southeast = new QuadTree(
      new Rectangle(x + w/2, y + h/2, w/2, h/2),
      this.capacity
    );

    this.southwest = new QuadTree(
      new Rectangle(x - w/2, y + h/2, w/2, h/2),
      this.capacity
    );

    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (
      this.northeast.insert(point) ||
      this.northwest.insert(point) ||
      this.southeast.insert(point) ||
      this.southwest.insert(point)
    );
  }
}

🔥 Real-World Project Fit (System Design Style)

Let’s design:

🚗 “Find Nearby Drivers” (Uber Style)
Without QuadTree
Scan all drivers → O(n)


Bad for 1M drivers.

With QuadTree

Store driver location in QuadTree

When user requests:

Query only relevant region

Complexity: O(log n)

Perfect for:

Ride sharing

Food delivery

Nearby hospital finder

Store locator

🔥 Compare with Other Structures


| Structure | Best For                |
| --------- | ----------------------- |
| QuadTree  | 2D space partition      |
| KD-Tree   | k-dimensional search    |
| R-Tree    | Database spatial index  |
| GeoHash   | Text-based geo grouping |


🔥 When Should You Use QuadTree?

Use QuadTree if:

✅ Data is 2D
✅ Need region queries
✅ Need collision detection
✅ Need nearby search
✅ High performance spatial indexing

Avoid if:

❌ Data is not spatial
❌ Single dimension data
❌ Very small dataset

🔥 Interview Definition

A QuadTree is a tree data structure that recursively partitions 2D space into four quadrants for efficient spatial indexing and querying.

🚀 Advanced Topics You Should Learn Next

Since you're learning distributed systems:

🔥 QuadTree vs GeoHash

🔥 How Uber stores geo data

🔥 Spatial indexing in MongoDB

🔥 Build real-time location tracking system

🔥 Compare QuadTree vs R-Tree in databases
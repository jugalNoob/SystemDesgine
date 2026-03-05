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

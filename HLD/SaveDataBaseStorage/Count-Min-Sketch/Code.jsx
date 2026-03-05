🟣 Simple JavaScript Implementation (Basic Version)
class CountMinSketch {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.table = Array.from({ length: depth }, () =>
      new Array(width).fill(0)
    );
  }

  hash(str, seed) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * seed + str.charCodeAt(i)) % this.width;
    }
    return hash;
  }

  add(value) {
    for (let i = 0; i < this.depth; i++) {
      const index = this.hash(value, i + 1);
      this.table[i][index]++;
    }
  }

  count(value) {
    let min = Infinity;
    for (let i = 0; i < this.depth; i++) {
      const index = this.hash(value, i + 1);
      min = Math.min(min, this.table[i][index]);
    }
    return min;
  }
}

// Example
const cms = new CountMinSketch(100, 3);

cms.add("apple");
cms.add("apple");
cms.add("banana");

console.log("Apple count:", cms.count("apple"));
console.log("Banana count:", cms.count("banana"));

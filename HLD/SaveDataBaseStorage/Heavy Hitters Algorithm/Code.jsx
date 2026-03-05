class HeavyHitters {
  constructor(k) {
    this.k = k;
    this.counters = new Map();
  }

  add(value) {
    if (this.counters.has(value)) {
      this.counters.set(value, this.counters.get(value) + 1);
    } else if (this.counters.size < this.k) {
      this.counters.set(value, 1);
    } else {
      for (let [key, count] of this.counters) {
        if (count === 1) {
          this.counters.delete(key);
        } else {
          this.counters.set(key, count - 1);
        }
      }
    }
  }

  getHeavyHitters() {
    return this.counters;
  }
}

// Example
const hh = new HeavyHitters(3);

["apple","banana","apple","apple","orange","banana","apple"]
  .forEach(x => hh.add(x));

console.log(hh.getHeavyHitters());


🔥 Mini Node.js Simulation
class LossyCounting {
  constructor(epsilon) {
    this.epsilon = epsilon;
    this.bucketWidth = Math.ceil(1 / epsilon);
    this.currentBucket = 1;
    this.N = 0;
    this.map = new Map();
  }

  process(item) {
    this.N++;

    if (this.map.has(item)) {
      this.map.get(item).count++;
    } else {
      this.map.set(item, {
        count: 1,
        error: this.currentBucket - 1
      });
    }

    if (this.N % this.bucketWidth === 0) {
      this.cleanup();
      this.currentBucket++;
    }
  }

  cleanup() {
    for (let [item, data] of this.map) {
      if (data.count + data.error <= this.currentBucket) {
        this.map.delete(item);
      }
    }
  }

  getFrequent(threshold) {
    const result = [];
    for (let [item, data] of this.map) {
      if (data.count >= threshold * this.N) {
        result.push(item);
      }
    }
    return result;
  }
}

🔥 Test It
const lc = new LossyCounting(0.2);

const stream = ["a","b","c","a","b","a","a","d","e","a","b","b","b"];

for (let item of stream) {
  lc.process(item);
}

console.log("Frequent:", lc.getFrequent(0.2));

🧠 Guarantees

Lossy Counting guarantees:

No false negatives above threshold

Controlled error ≤ εN

Memory = O(1/ε)
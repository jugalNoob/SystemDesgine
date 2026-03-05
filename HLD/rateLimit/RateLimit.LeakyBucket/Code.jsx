Devices might burst updates → smooth flow to server

🔹 5️⃣ Node.js Example (In-Memory)
class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity;
    this.leakRate = leakRate; // requests/sec
    this.size = 0;
    this.lastCheck = Date.now();
  }

  tryRequest() {
    const now = Date.now();
    const delta = (now - this.lastCheck) / 1000; // seconds
    this.size = Math.max(0, this.size - delta * this.leakRate);
    this.lastCheck = now;

    if (this.size < this.capacity) {
      this.size += 1;
      return true; // allow request
    } else {
      return false; // reject
    }
  }
}

const bucket = new LeakyBucket(5, 1);
console.log(bucket.tryRequest()); // true or false

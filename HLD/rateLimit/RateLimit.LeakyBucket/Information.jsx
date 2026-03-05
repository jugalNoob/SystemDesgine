Absolutely! Let’s dive into Leaky Bucket, which is another classic rate-limiting algorithm. 🔥

It’s similar to Token Bucket but with key differences.

🧠 1️⃣ What is Leaky Bucket?

Leaky Bucket is a rate-limiting algorithm that:

Treats requests like water pouring into a bucket

Bucket leaks at a fixed rate (constant processing rate)

If bucket overflows → requests are rejected or queued

Analogy
Incoming requests = water drops
Bucket = container
Leak rate = fixed processing rate
Bucket overflow = reject request


Allows smoothing of traffic

Prevents spikes from overwhelming the system

Does not allow bursts beyond bucket size

🟢 2️⃣ How It Works Step-by-Step

1️⃣ Set parameters:

Bucket capacity = max requests that can wait

Leak rate = requests processed per second

2️⃣ Incoming request:

If bucket not full → add request

If bucket full → reject request

3️⃣ Process requests at leak rate:

Requests leave bucket at constant rate

Example

Capacity = 5 requests

Leak rate = 1 request/sec

t=0s → 5 requests arrive → bucket full
t=1s → 1 request leaves → 1 new request allowed
t=2s → 1 request leaves → 1 new request allowed


✅ Unlike Token Bucket, you cannot burst more than capacity.

🔹 3️⃣ Key Differences Between Token Bucket and Leaky Bucket


| Feature           | Token Bucket           | Leaky Bucket                    |
| ----------------- | ---------------------- | ------------------------------- |
| Burst allowed     | ✅ Yes (up to capacity) | ❌ No, smooth output only        |
| Sustained rate    | Limited by refill rate | Limited by leak rate            |
| Overflow behavior | Reject if no tokens    | Reject if bucket full           |
| Use case          | API burst handling     | Traffic smoothing, rate control |



🟡 4️⃣ When to Use Leaky Bucket?

Leaky Bucket is ideal for:

1️⃣ Smoothing incoming traffic

Example: TCP connections

Example: Kafka consumer reads → prevent DB overload

2️⃣ Prevent downstream overload

Example: Payment service

Example: Email sending service (avoid SMTP throttling)

3️⃣ IoT devices / sensor data

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


Smooths requests to 1 request/sec

Maximum 5 queued requests allowed

🔹 6️⃣ Where Leaky Bucket Fits Best (Project Use Cases)

1️⃣ APIs with heavy spikes

Example: Public REST APIs

Prevent sudden burst from crashing DB

2️⃣ Kafka / Event consumers

Example: High throughput Kafka topic → smooth processing

Avoid overwhelming downstream service (MongoDB / Postgres / Email SMTP)

3️⃣ Payment or transactional systems

Limit number of requests to downstream payment gateway

4️⃣ IoT / Sensor systems

Devices send data in bursts → server handles at steady rate

🟢 7️⃣ Interview-Level Explanation

If asked:

What is Leaky Bucket and when would you use it?

You can say:

Leaky Bucket is a rate-limiting algorithm that enforces a fixed output rate by processing incoming requests at a constant speed. Excess requests overflow and are rejected. It’s used to smooth traffic spikes and protect downstream services from being overwhelmed, unlike Token Bucket, which allows bursts.

⚡ Key Difference to Remember

Token Bucket → allows bursts, limits sustained rate

Leaky Bucket → smooths traffic, enforces constant rate, rejects bursts

If you want, I can draw a full diagram showing both Token Bucket & Leaky Bucket in Kafka + BullMQ system, and explain where to use which in a real high-throughput system.
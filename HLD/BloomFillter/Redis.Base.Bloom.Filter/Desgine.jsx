Your system with other components:

Client
   │
   ▼
Node API
   │
   ├ Redis
   │    ├ OTP
   │    ├ Idempotency
   │    └ Bloom Filter
   │
   ├ MongoDB
   │
   ├ Kafka (Events)
   │
   └ BullMQ (Email jobs)

3️⃣ Signup Flow

When user signs up we add email to Bloom filter.

User Signup
     │
     ▼
Save User → MongoDB
     │
     ▼
Add email → Redis Bloom Filter
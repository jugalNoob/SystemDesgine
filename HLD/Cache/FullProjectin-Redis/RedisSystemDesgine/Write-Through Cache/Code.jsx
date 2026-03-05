2️⃣ Write-Through Cache

Instead of deleting cache, update it immediately.

Example:

await Register.create(newUser);

const cached = await redis.get("students:list");

if (cached) {
  const parsed = JSON.parse(cached);
  parsed.push(newUser);

  await redis.set("students:list", JSON.stringify(parsed), "EX", 60);
}


✅ No cache miss
⚠️ Slightly more complex

Best for:

High traffic systems

Real-time dashboards

3️⃣ Event-Based Invalidation (Advanced 🔥)

If using Kafka:

Producer → DB write
Consumer → Cache invalidation

This keeps services loosely coupled.

Perfect for:

Microservices

Distributed systems
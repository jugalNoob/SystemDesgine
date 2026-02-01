🔹 What is LRU?

LRU = Least Recently Used

When cache is full, remove the item that has not been used for the longest time.

Keeps hot/frequently accessed data in memory.

Evicts cold/unused data.

🔹 Real-World LRU Use Cases
1️⃣ Browser Cache

Stores images, JS, CSS, and pages

Least recently used tabs/files are removed when memory is low

Example: Chrome keeps hot tabs in memory, unloads cold tabs

2️⃣ Database Query Cache

Applications cache frequent queries in memory (Redis / Memcached)

Memory is limited, cannot store all queries

LRU removes rarely accessed queries first

3️⃣ Operating System Page Replacement

OS keeps pages in RAM

When memory is full, least recently used pages are swapped to disk

4️⃣ API / Microservice Caching

Microservice caches popular API responses

LRU ensures hot data stays, cold data removed automatically

Example: Product search cache in Amazon/Flipkart

5️⃣ Recommendation Systems

Cache user recommendations for fast response

LRU ensures recently active users’ recommendations stay

Inactive users’ cache removed when memory is full

6️⃣ CDN / Edge Cache

Edge servers cache web content

Hot content stays on edge nodes

Cold content removed when cache reaches capacity

🔹 Interview-Friendly One-Liner

“LRU is used when memory is limited and we want to keep frequently accessed data hot, removing the least recently accessed data first.”

🔹 Key Points to Mention

LRU = usage-based eviction

TTL = time-based eviction

LRU + TTL = real-world caching strategy (Redis, Memcached)
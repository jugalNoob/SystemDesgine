Perfect 🔥 let’s break down LFU (Least Frequently Used) in Redis and REST API usage clearly.

🌐 What is LFU?

LFU = Least Frequently Used

When memory is full, Redis evicts the key that was accessed the fewest times.

Tracks frequency of access for each key.

Keys accessed more often stay longer in cache.

Keys rarely accessed get evicted first.

✅ Use case: Caching popular items in high-read workloads (like trending posts, hot API responses).

🧠 LFU vs LRU
Policy	Eviction Basis	Best Use Case
LRU	Least Recently Used	Keep recently accessed data
LFU	Least Frequently Used	Keep frequently accessed data
🏗 Redis LFU Configuration
# Limit memory
CONFIG SET maxmemory 100mb

# LFU eviction policies
CONFIG SET maxmemory-policy allkeys-lfu      # LFU for all keys
CONFIG SET maxmemory-policy volatile-lfu     # LFU for keys with TTL


Redis uses approximate LFU algorithm internally.

No need to track frequency manually in Node.js.

🔥 Node.js + LFU REST API Example
const express = require('express');
const redis = require('redis');

const app = express();
app.use(express.json());

const client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => { await client.connect(); })();

// Configure LFU in Redis
(async () => {
    await client.configSet('maxmemory', '50mb');
    await client.configSet('maxmemory-policy', 'allkeys-lfu');
})();

// POST /cache → add/update cache
app.post('/cache', async (req, res) => {
    const { key, value } = req.body;
    try {
        await client.set(key, JSON.stringify(value));
        res.send({ status: 'ok', key, value });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// GET /cache/:key → fetch cached data
app.get('/cache/:key', async (req, res) => {
    const { key } = req.params;
    try {
        const data = await client.get(key);
        if (!data) return res.status(404).send({ error: 'Key not found' });

        // Accessing key updates LFU frequency internally
        res.send({ key, value: JSON.parse(data) });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

🧠 How LFU Works Here

POST /cache → insert or update key → Redis tracks initial frequency.

GET /cache/:key → read key → Redis automatically increments frequency.

Memory full → Redis evicts the key with lowest frequency automatically.

No extra code is needed to manage LFU; Redis handles frequency counting internally.

🔑 Key Notes

LFU is ideal when some items are accessed repeatedly (hot items).

LRU is better when recently accessed data matters more than frequency.

You can monitor LFU evictions via:

redis-cli INFO memory
# Look at evicted_keys and used_memory

🎯 Interview Tip

“LFU in Redis automatically evicts the least frequently accessed keys when memory is full. The Node.js REST API only interacts with cache via GET/POST; Redis tracks frequency internally. We can monitor evictions using INFO memory and configure allkeys-lfu for all keys or volatile-lfu for keys with TTL.”
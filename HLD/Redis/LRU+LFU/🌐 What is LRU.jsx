🌐 What is LRU?

LRU (Least Recently Used) is a cache eviction policy.

When memory is full, remove the item that was used the longest time ago.

00:: In other words:

Keep frequently accessed items in memory

Remove “stale” items that haven’t been used recently


🧠 How It Works

Each item in cache has a timestamp or
 position to track when it was last used.

1:: When cache is full:

Evict the least recently used item

Add the new item

...  Update the usage timestamp every time an item is accessed

🔥 Simple Example

Imagine a cache of size 3:

Cache size = 3


Sequence of accesses:

Access: A, B, C → cache = [A, B, C]
Access: D → cache full → remove LRU (A)
Cache = [D, B, C]
Access: B → cache = [D, B, C]  (B is now most recently used)
Access: E → remove LRU (C)
Cache = [D, B, E]


✅ Key idea: Always remove the oldest unused item


✅ Key idea: Always remove the oldest unused item

🏗 Implementation Concept

Common implementation uses:

Hash Map → for O(1) access to cache values

Doubly Linked List → track order of usage
 (head = most recent, tail = least recent)

Operations:


| Operation | Time Complexity |
| --------- | --------------- |
| Get(key)  | O(1)            |
| Put(key)  | O(1)            |
| Eviction  | O(1)            |






🔥 Node.js LRU Example (Simple)
class LRUCache {
    constructor(limit) {
        this.limit = limit
        this.cache = new Map()
    }

    get(key) {
        if (!this.cache.has(key)) return -1

        // Move key to end (most recently used)
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)
        return value
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else if (this.cache.size >= this.limit) {
            // Remove least recently used (first key)
            const lruKey = this.cache.keys().next().value
            this.cache.delete(lruKey)
        }

        this.cache.set(key, value)
    }
}

// Usage
const cache = new LRUCache(3)
cache.put('A', 1)
cache.put('B', 2)
cache.put('C', 3)
cache.get('A') // Access A → now A is most recently used
cache.put('D', 4) // Evict LRU (B)
console.log([...cache.cache.keys()]) // Output: ['C', 'A', 'D']

🧠 How It Works in Redis

Redis can use allkeys-lru or volatile-lru policies

Internally, it keeps usage counters or approximate LRU algorithm to pick which keys to evict

Perfect for caching systems where memory is limited

🎯 Interview Tip

If asked:

“Explain LRU in Redis or Node.js”

You can say:

“LRU removes the least recently used keys when memory is full. We
 track usage either with counters or a linked list + hash map to
  efficiently remove the oldest unused key. In Redis, policies like
   allkeys-lru automate this process.”
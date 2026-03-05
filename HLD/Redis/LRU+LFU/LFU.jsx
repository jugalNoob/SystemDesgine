🌐 What is LFU?

LFU (Least Frequently Used) is another cache eviction policy.

When memory is full, remove the item that was used the fewest times.

Tracks frequency of access instead of “recently used”.

Items used often stay in cache, items rarely used get evicted.



🌐 What is LFU?

.. LFU (Least Frequently Used) is another cache eviction policy.

.. When memory is full, remove the item that was used the fewest times.

.. Tracks frequency of access instead of “recently used”.

.. Items used often stay in cache, items rarely used get evicted.



🔥 Simple Example

Cache size = 3:

Access sequence: A, B, C
Cache: [A:1, B:1, C:1]

Access: A → freq[A] = 2
Access: B → freq[B] = 2
Access: D → cache full
LFU item = C (freq = 1) → evict C
Cache = [A:2, B:2, D:1]

Access: E → cache full
LFU item = D (freq = 1) → evict D
Cache = [A:2, B:2, E:1]


✅ Key idea: Evict the least accessed item, not just the oldest.



.

🏗 Implementation Concept

Hash Map → key → value + frequency

Frequency List / Heap / Doubly Linked List → find LFU key efficiently

Operations:

| Operation | Time Complexity |
| --------- | --------------- |
| Get(key)  | O(1) / O(log n) |
| Put(key)  | O(1) / O(log n) |
| Eviction  | O(1) / O(log n) |



🔥 Node.js LFU Example (Basic)
class LFUCache {
    constructor(limit) {
        this.limit = limit
        this.cache = new Map() // key -> {value, freq}
    }

    get(key) {
        if (!this.cache.has(key)) return -1
        const data = this.cache.get(key)
        data.freq += 1
        this.cache.set(key, data)
        return data.value
    }

    put(key, value) {
        if (this.cache.has(key)) {
            const data = this.cache.get(key)
            data.value = value
            data.freq += 1
            this.cache.set(key, data)
            return
        }

        if (this.cache.size >= this.limit) {
            // Evict least frequently used
            let lfuKey = null
            let minFreq = Infinity
            for (const [k, v] of this.cache) {
                if (v.freq < minFreq) {
                    minFreq = v.freq
                    lfuKey = k
                }
            }
            this.cache.delete(lfuKey)
        }

        this.cache.set(key, { value, freq: 1 })
    }
}

// Usage
const cache = new LFUCache(3)
cache.put('A', 1)
cache.put('B', 2)
cache.put('C', 3)
cache.get('A') // freq[A]=2
cache.get('B') // freq[B]=2
cache.put('D', 4) // evict C (least freq)
console.log([...cache.cache.keys()]) // ['A','B','D']

🧠 When to Use LFU


| Scenario                                                 | Best Policy |
| -------------------------------------------------------- | ----------- |
| Frequently accessed items should remain in cache         | LFU         |
| Recently used items are more important than access count | LRU         |
| Short-lived session data                                 | TTL + LRU   |
| Cache hot data in Redis                                  | LFU         |



🔥 Redis LFU

Redis supports LFU with volatile-lfu and allkeys-lfu

Uses approximate LFU algorithm → efficient memory management

Perfect for caching popular items in high-read workloads

🎯 Quick Interview Answer

“LFU removes the least frequently used keys when memory is full. It’s ideal for 
caches where some items are accessed much more often than others. In Redis, you
 can use allkeys-lfu or volatile-lfu policies for automatic eviction based on
  frequency.”
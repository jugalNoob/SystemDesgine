🧰 Redis Data Structures Cheat Sheet (with Node.js)

| Structure             | Meaning / Description                               | Node.js Example                                                                                                                               | When to Use                                      | Key Notes                                                      |
| --------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| **String**            | Simple key-value, stores text, numbers, JSON        | `await client.set("key", "value"); const val = await client.get("key");`                                                                      | Caching single values, counters, tokens          | Most basic type, simple cache, TTL possible                    |
| **Hash**              | Key with multiple fields (like JSON / object)       | `await client.hSet("user:1", {name:"Alice", age:25}); const user = await client.hGetAll("user:1");`                                           | Store user profiles, metadata, settings          | Memory-efficient for structured data                           |
| **List**              | Ordered collection, duplicates allowed              | `await client.rPush("chat:room1", "Hi"); const msgs = await client.lRange("chat:room1", 0, -1);`                                              | Queues, chat history, logs                       | Maintains insertion order, pop/push operations                 |
| **Set**               | Unordered collection of **unique** values           | `await client.sAdd("online:users", "Alice"); const users = await client.sMembers("online:users");`                                            | Unique items like followers, feature flags, tags | Automatically removes duplicates, fast membership checks       |
| **Sorted Set (ZSet)** | Unique items with a **score**, automatically sorted | `await client.zAdd("leaderboard", [{score:100, value:"Alice"}]); const top = await client.zRevRange("leaderboard", 0, 2, {WITHSCORES:true});` | Leaderboards, trending items, priority queues    | Score used for ranking, supports range queries                 |
| **HyperLogLog**       | Approximate count of **unique items**               | `await client.pfAdd("visitors", "user1"); const count = await client.pfCount("visitors");`                                                    | Unique visitors, unique IPs, analytics           | Very memory-efficient (~12 KB), approximate count only         |
| **Streams**           | Append-only log of events/messages                  | `await client.xAdd("mystream", "*", {user:"Alice", msg:"Hi"}); const events = await client.xRange("mystream", '-', '+', {COUNT:10});`         | Event sourcing, message queues, chat history     | Persistent, multiple consumers, supports replay, ordered by ID |
| **Pub/Sub**           | Publish/Subscribe messaging                         | `await subscriber.subscribe("channel1", msg => console.log(msg)); await publisher.publish("channel1","Hello");`                               | Real-time notifications, chat, alerts            | Instant broadcast, ephemeral (offline clients miss messages)   |


🔹 Key Takeaways

Strings & Hashes → Simple caching and structured data

Lists → Ordered data, queue, history

Sets & Sorted Sets → Unique collections, leaderboards, ranking

HyperLogLog → Counting huge sets with tiny memory

Streams → Reliable event logs, message queues

Pub/Sub → Real-time messaging, broadcast

🔹 When to Use Each (Quick Guide)


| Structure   | Best Use Case                                      |
| ----------- | -------------------------------------------------- |
| String      | Cache tokens, counters, simple values              |
| Hash        | Store user profiles, settings, object data         |
| List        | Chat logs, task queues, message history            |
| Set         | Unique items like followers, online users          |
| Sorted Set  | Leaderboards, top-N trending items, priority tasks |
| HyperLogLog | Analytics of unique users or events at scale       |
| Streams     | Event sourcing, multi-consumer message queue, logs |
| Pub/Sub     | Real-time notifications, alerts, chat updates      |



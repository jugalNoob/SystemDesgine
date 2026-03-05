🌐 What is a Redis ZSet (Sorted Set)?

A Sorted Set is like a Set, but each element has a score.

Elements are unique and automatically sorted by score.

Internally, Redis keeps them in a way that you can efficiently get top N, rank, or ranges.

Think of it as a leaderboard or priority queue.




🧠 Key Features

Unique elements → no duplicates allowed

Score-based ordering → numeric score determines position

Automatic sorting → no need to sort manually

Efficient queries → get by rank, score, or range



| Command     | Description                      | Example                                |
| ----------- | -------------------------------- | -------------------------------------- |
| `ZADD`      | Add/update element with a score  | `ZADD leaderboard 100 Alice`           |
| `ZINCRBY`   | Increment score of an element    | `ZINCRBY leaderboard 50 Alice`         |
| `ZREVRANGE` | Get elements in descending order | `ZREVRANGE leaderboard 0 2 WITHSCORES` |
| `ZRANGE`    | Get elements in ascending order  | `ZRANGE leaderboard 0 -1 WITHSCORES`   |
| `ZREVRANK`  | Get rank (highest score first)   | `ZREVRANK leaderboard Alice`           |
| `ZRANK`     | Get rank (lowest score first)    | `ZRANK leaderboard Alice`              |
| `ZREM`      | Remove an element                | `ZREM leaderboard Alice`               |
| `ZCOUNT`    | Count elements in score range    | `ZCOUNT leaderboard 100 200`           |





🔹 Example: Leaderboard
# Add players
ZADD leaderboard 100 Alice
ZADD leaderboard 200 Bob
ZADD leaderboard 150 Carol


Sorted by score (descending for leaderboard view):

Bob   200
Carol 150
Alice 100


Get top 3 players:

ZREVRANGE leaderboard 0 2 WITHSCORES


Output:

1) "Bob"   2) "200"
3) "Carol" 4) "150"
5) "Alice" 6) "100"


Update Alice’s score by 50:

ZINCRBY leaderboard 50 Alice


Alice’s new score = 150 → rank may change

Get Alice’s rank (top = 0):

ZREVRANK leaderboard Alice

🔹 Other Use-Cases of ZSet

Leaderboards / Ranking systems

Games, quizzes, or competitions

Priority Queues

Score = priority → fetch highest-priority tasks

Trending items

Posts, hashtags, products → score based on likes/views

Rate Limiting

Store timestamps as score → count requests in a time window

Expiration-based queues

Timestamp as score → get items ready to expire or process

🏗 Node.js Example
const redis = require('redis');
const client = redis.createClient();
await client.connect();

// Add/update score
await client.zAdd('leaderboard', { score: 100, value: 'Alice' });
await client.zAdd('leaderboard', { score: 200, value: 'Bob' });
await client.zAdd('leaderboard', { score: 150, value: 'Carol' });

// Get top 3
const top3 = await client.zRevRangeWithScores('leaderboard', 0, 2);
console.log(top3);

// Get rank of Alice
const rank = await client.zRevRank('leaderboard', 'Alice');
console.log(rank);

🔑 Key Notes

Sorted Sets = unique elements + numeric score

Automatically sorted → fast top N / rank queries

Perfect for leaderboards, trending lists, and priority queues

Works well with Node.js for real-time apps
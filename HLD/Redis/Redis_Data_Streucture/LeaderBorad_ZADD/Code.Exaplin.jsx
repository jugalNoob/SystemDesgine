🌐 What is ZADD in Redis?

ZADD is a sorted set command in Redis.

Sorted Set = unique elements with a score

Automatically keeps the elements sorted by score

ZADD key score member → add/update a member with a score

🧠 Why ZADD for Leaderboards?

Leaderboards require ranking users by points / score

Sorted set keeps data sorted automatically

You can easily fetch top N users or user rank

🔥 Simple Example
# Add players to leaderboard
ZADD leaderboard 100 Alice
ZADD leaderboard 200 Bob
ZADD leaderboard 150 Carol


Sorted set leaderboard now has:

Bob   200
Carol 150
Alice 100


Higher score = higher rank

✅ Get Top Players
# Top 3 players descending by score
ZREVRANGE leaderboard 0 2 WITHSCORES


Output:

1) "Bob"
2) "200"
3) "Carol"
4) "150"
5) "Alice"
6) "100"

✅ Get Player Rank
ZRANK leaderboard "Carol"      # Rank ascending (0 = lowest)
ZREVRANK leaderboard "Carol"   # Rank descending (0 = top)


ZREVRANK is commonly used for leaderboards

🔥 Update Score
# Add 50 points to Alice
ZINCRBY leaderboard 50 Alice


Alice now has 150 points → may change her rank

🏗 Node.js Example
const redis = require('redis');
const client = redis.createClient();
client.connect();

// Add/update player score
async function addScore(player, score) {
    await client.zAdd('leaderboard', { score, value: player });
}

// Get top N players
async function topPlayers(n) {
    const top = await client.zRevRangeWithScores('leaderboard', 0, n - 1);
    return top;
}

// Get player rank
async function playerRank(player) {
    const rank = await client.zRevRank('leaderboard', player);
    const score = await client.zScore('leaderboard', player);
    return { rank: rank + 1, score };
}

// Usage
(async () => {
    await addScore('Alice', 100);
    await addScore('Bob', 200);
    await addScore('Carol', 150);

    console.log(await topPlayers(3));
    console.log(await playerRank('Carol'));
})();

🔑 Key Notes

ZADD / ZINCRBY → add/update score

ZREVRANGE / ZREVRANK → get top N players and ranks

Sorted automatically → no manual sorting needed

Perfect for games, competitions, point systems
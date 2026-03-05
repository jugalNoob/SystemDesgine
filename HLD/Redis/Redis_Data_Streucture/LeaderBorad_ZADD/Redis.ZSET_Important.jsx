For High Traffic (Real-time Exact): Redis Sorted Sets
This is the industry standard for real-time leaderboards and ranking APIs. 
Redis operates entirely in memory, making it blazingly fast.

Structure: Use a Redis Sorted Set ().

Write: When a click happens, your API fires a ZINCRBY trending_items
 1 item_id command.


Read: Your API fetches the top items instantly using
 ZREVRANGE trending_items 0 10.


Decay: You will still need a background worker to periodically iterate
 through the Redis set
 and reduce scores based on time decay.


 npm init -y
npm install express redis node-cron




const express = require('express');
const { createClient } = require('redis');
const cron = require('node-cron');

const app = express();
const port = 3000;

// Initialize Redis Client
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis before starting the server
async function startServer() {
    await redisClient.connect();
    app.listen(port, () => {
        console.log(`Ranking API listening on port ${port}`);
    });
}

startServer();


Gemini said
Here is a simple, straightforward way to build a real-time ranking system in Node.js. We will use Redis Sorted Sets, as it is the easiest and fastest tool for this exact job.

This setup will have three main parts: an endpoint to record a click, an endpoint to fetch the top rankings, and a background timer to apply "score decay" so old items do not stay at the top forever.

Prerequisites
You will need Node.js installed and a Redis server running. Create a new folder, initialize the project, and install the required packages:

Bash
npm init -y
npm install express redis node-cron
Step 1: Server Setup and Redis Connection
Create a file named server.js and set up your basic Express server and Redis client.

JavaScript
const express = require('express');
const { createClient } = require('redis');
const cron = require('node-cron');

const app = express();
const port = 3000;




const express = require('express');
const { createClient } = require('redis');
const cron = require('node-cron');

const app = express();
const port = 3000;

// Initialize Redis Client
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function startServer() {
    await redisClient.connect();
    console.log('Connected to Redis');
    
    app.listen(port, () => {
        console.log(`Ranking API listening on http://localhost:${port}`);
    });
}

// 1. WRITE: Record a click
app.post('/click/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
        // ZINCRBY adds 1 to the score of the item. If the item doesn't exist, it adds it.
        const newScore = await redisClient.zIncrBy('trending_items', 1, itemId);
        res.json({ success: true, item: itemId, score: newScore });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record click' });
    }
});

// 2. READ: Get Top 10 Leaderboard
app.get('/rankings', async (req, res) => {
    try {
        // ZRANGE fetches items 0 through 9 in reverse (highest score first)
        const topItems = await redisClient.zRangeWithScores('trending_items', 0, 9, {
            REV: true 
        });
        res.json({ leaderboard: topItems });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rankings' });
    }
});

// 3. DECAY: Background job to prevent old items from staying at the top
cron.schedule('*/5 * * * *', async () => { // Runs every 5 minutes for testing
    console.log('Applying time decay to scores...');
    try {
        const allItems = await redisClient.zRangeWithScores('trending_items', 0, -1);
        
        for (const item of allItems) {
            const decayedScore = item.score * 0.8; // Reduce score by 20%
            
            if (decayedScore < 0.5) {
                await redisClient.zRem('trending_items', item.value); // Remove dead items
            } else {
                await redisClient.zAdd('trending_items', { score: decayedScore, value: item.value });
            }
        }
    } catch (error) {
        console.error('Decay failed:', error);
    }
});

startServer();






How to Test It Locally
Once you start your server by running node server.js in your terminal, open a new terminal window and use these curl commands to simulate traffic.

1. Simulate some clicks
Run these commands to give "article_A" 3 clicks, and "article_B" 1 click.

Click article A three times:

Bash
curl -X POST http://localhost:3000/click/article_A
curl -X POST http://localhost:3000/click/article_A
curl -X POST http://localhost:3000/click/article_A
Click article B once:

Bash
curl -X POST http://localhost:3000/click/article_B
2. Check the Rankings
Now, fetch your leaderboard.

Bash
curl http://localhost:3000/rankings
Expected Output:

JSON
{
  "leaderboard": [
    { "value": "article_A", "score": 3 },
    { "value": "article_B", "score": 1 }
  ]
}
If you wait 5 minutes, you will see the console log Applying
 time decay to scores.... If you fetch the rankings again, you
  will notice the scores have dropped.
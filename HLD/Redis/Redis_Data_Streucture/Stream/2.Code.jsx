🏗 Node.js Example
const redis = require('redis');
const client = redis.createClient();
await client.connect();

// Add message to stream
await client.xAdd('mystream', '*', { user: 'Alice', action: 'login' });

// Read all messages from beginning
const messages = await client.xRead(
    [{ key: 'mystream', id: '0' }],
    { COUNT: 10 }
);
console.log(messages);

// Create consumer group
try { await client.xGroupCreate('mystream', 'mygroup', '0'); } catch(e){}

// Read messages as consumer 'Alice'
const groupMessages = await client.xReadGroup(
    'mygroup',
    'Alice',
    [{ key: 'mystream', id: '>' }],
    { COUNT: 2 }
);
console.log(groupMessages);

// Acknowledge message
await client.xAck('mystream', 'mygroup', '1607515091701-0');

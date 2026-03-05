🏗 Step 3: Poll Redis Metrics

We will check INFO memory periodically.

const checkRedisEviction = async () => {
    try {
        const info = await client.sendCommand(['INFO', 'memory']);
        
        // Convert info to object
        const lines = info.split('\n');
        const memoryStats = {};
        lines.forEach(line => {
            if (line && line.includes(':')) {
                const [key, value] = line.split(':');
                memoryStats[key] = value.trim();
            }
        });

        const usedMemory = parseInt(memoryStats['used_memory']);
        const maxMemory = parseInt(memoryStats['maxmemory']);
        const evictedKeys = parseInt(memoryStats['evicted_keys']);

        console.log(`Used Memory: ${usedMemory}, Max Memory: ${maxMemory}, Evicted Keys: ${evictedKeys}`);

        // Alert if evictions happened
        if (evictedKeys > 0) {
            console.warn('⚠️ Redis has started evicting keys!');
        }

    } catch (err) {
        console.error('Error fetching Redis memory info:', err);
    }
};


🏗 Step 4: Schedule Periodic Checks

Use node-cron or simple setInterval:

// Every 5 seconds
setInterval(checkRedisEviction, 5000);

🔥 Optional: Track Metrics Over Time
const evictionHistory = [];

const checkRedisEvictionWithHistory = async () => {
    const info = await client.sendCommand(['INFO', 'memory']);
    const evictedKeys = parseInt(info.match(/evicted_keys:(\d+)/)[1]);

    evictionHistory.push({
        timestamp: new Date().toISOString(),
        evictedKeys
    });

    if (evictedKeys > 0) {
        console.warn(`[${new Date().toISOString()}] ⚠️ Eviction detected! Total evicted keys: ${evictedKeys}`);
    }

    console.table(evictionHistory.slice(-10)); // show last 10 entries
};


🧠 Production Notes

Use prometheus-exporter for Redis metrics → push to Grafana.

Send alerts (Slack, Email, SMS) if evicted_keys > 0.

Track used_memory vs maxmemory → plan scaling before eviction happens.

Avoid heavy MONITOR command in production.




🎯 Interview Answer

“I would monitor Redis eviction by polling INFO memory periodically in
 Node.js, track evicted_keys, log or alert if evictions occur, and
  optionally visualize over time in Grafana.”
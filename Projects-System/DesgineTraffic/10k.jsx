Request
↓
Bloom Filter (block fake)
↓
L1 Cache
↓
Redis
↓
Fresh? → return
↓
Stale? → return stale + background refresh
↓
Expired?
    ↓
Acquire Redis Lock
    ↓
Yes → Fetch DB → Update Cache
No  → Wait briefly → Retry cache



This prevents:

Stampede

Penetration

Avalanche

DB overload



📊 Comparison

| Problem     | Solution         |
| ----------- | ---------------- |
| Penetration | Bloom Filter     |
| Stampede    | Distributed Lock |
| Avalanche   | TTL Jitter       |
| Slow Expiry | SWR              |
| Cold Start  | Prewarming       |




🎯 Interview-Level Answer

To prevent cache stampede, I use a multi-layered approach: TTL jitter to avoid synchronized expiry, distributed Redis locks to ensure only one request refreshes data, stale-while-revalidate to serve stale responses during refresh, Bloom filters to prevent penetration, and L1+L2 caching for latency optimization.

🚀 Since You're Designing 10k req/min System

If you implement:

Bloom + L1 + Redis + SWR + Lock + Jitter

You are already thinking at senior backend engineer level.
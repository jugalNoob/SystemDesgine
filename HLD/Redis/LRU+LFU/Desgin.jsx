          ┌──────────────────────┐
          │      Client/API      │
          │  (Browser / App)    │
          └─────────┬──────────┘
                    │
         GET / POST requests
                    │
                    ▼
          ┌──────────────────────┐
          │   Node.js REST API   │
          │   (Express Server)  │
          └─────────┬──────────┘
                    │
      ┌─────────────┴─────────────┐
      │                           │
      ▼                           ▼
   GET Cache                     POST Cache
   (Fetch key)                   (Add/Update key)
      │                           │
      ▼                           ▼
 ┌─────────────┐            ┌─────────────┐
 │ Redis Cache │            │ Redis Cache │
 │   Key-Value │            │   Key-Value │
 │   Storage   │            │   Storage   │
 └─────┬───────┘            └─────┬───────┘
       │                          │
       ▼                          ▼
  Access key → Updates         Insert/Update key
  “recently used” time          (eviction handled)
       │
       ▼
Memory Full?
       │
       ▼
┌───────────────┐
│ LRU Eviction  │
│ (least recently|
│ used key is    |
│ removed)       │
└───────────────┘
       │
       ▼
Space freed → New keys inserted



🔑 Key Points

1:: LRU Eviction happens automatically in Redis

No manual intervention needed

Evicts the least recently used key when memory limit is reached

2:: Node.js REST API only interacts with cache

GET → updates LRU timestamp in Redis

POST → adds or updates cache key

3:: Client doesn’t need to know eviction

Evicted keys will just return 404 on GET

4:: Monitoring + Alerts

INFO memory → track evicted_keys

Optional Prometheus/Grafana for production
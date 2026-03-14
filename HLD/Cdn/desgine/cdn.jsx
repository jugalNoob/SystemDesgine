🌍 🌟 FULL INTERNET → BACKEND FLOW
                           🌍 INTERNET USERS
                    (Web / Mobile / API Clients)
                                   │
                                   ▼
                      ┌────────────────────────┐
                      │   Cloudflare DNS       │
                      │   (Anycast Routing)    │
                      └────────────┬───────────┘
                                   │
                                   ▼
                      ┌────────────────────────┐
                      │   Cloudflare Edge POP  │
                      │------------------------│
                      │ • CDN Cache            │
                      │ • WAF                  │
                      │ • DDoS Protection      │
                      │ • Rate Limiting        │
                      │ • SSL Termination      │
                      └────────────┬───────────┘
                                   │
                     (Cache HIT?)  │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
         ✅ Static Served                    ❌ Cache MISS /
         (Images, CSS, JS)                   Dynamic API
                                                  │
                                                  ▼
                                   ┌────────────────────────┐
                                   │       Nginx            │
                                   │   (Reverse Proxy)      │
                                   │------------------------│
                                   │ • Load Balancing       │
                                   │ • Gzip Compression     │
                                   │ • API Routing          │
                                   │ • Internal Caching     │
                                   └────────────┬───────────┘
                                                │
                                                ▼
                         ┌────────────────────────────────────┐
                         │        Node.js Cluster             │
                         │------------------------------------│
                         │  Worker 1  Worker 2  Worker 3  ... │
                         │  (PM2 / Cluster Mode)              │
                         └────────────┬───────────────────────┘
                                      │
                  ┌───────────────────┼───────────────────┐
                  ▼                   ▼                   ▼
           ┌────────────┐     ┌────────────┐     ┌────────────┐
           │   Redis    │     │  Database  │     │  Storage   │
           │ (Cache /   │     │ (Postgres/ │     │ (Images /  │
           │  Sessions) │     │  MongoDB)  │     │  Videos)   │
           └────────────┘     └────────────┘     └────────────┘
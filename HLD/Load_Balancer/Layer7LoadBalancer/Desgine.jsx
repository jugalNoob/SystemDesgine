               │  🔹 Bulkhead Isolation (Separate pools for APIs)        │
└─────────────┬────────────────────────────────────────────┘
              │
       ┌──────▼────────┐
       │   Redis Cluster│  ← Cache, Rate Limiter, Sessions
       └──────┬────────┘
              │
       ┌──────▼────────┐
       │    MongoDB    │  ← Primary (writes)
       │  Replica Set  │  ← Secondary (reads)
       └──────┬────────┘
              │
       ┌──────▼────────┐
       │   Kafka Broker │  ← Async processing, partitions by key
       └──────┬────────┘
              │
       ┌──────▼────────┐
       │ Kafka Consumer │  ← Async worker
       └───────────────┘


       | Layer         | Algorithm / Type                                   | Purpose                                                         |
| ------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| Layer 7 LB    | **Round Robin / Weighted RR**                      | Default for stateless APIs like `/users`                        |
| Layer 7 LB    | **Least Connections / Weighted Least Connections** | For heavy queries or long-lived requests (`/search`, WebSocket) |
| Layer 7 LB    | **IP Hash / Sticky Session**                       | For session-based routes (`/payment`, `/login`)                 |
| Redis Cluster | **Consistent Hashing**                             | Key distribution across Redis nodes                             |
| Kafka         | **Partition Key Hashing**                          | Messages distributed across partitions for parallel consumers   |





🔹 How Adaptive Load Shedding Works Here

Inside Node.js cluster:

If (CPU > 80% OR EventLoopLag > 100ms OR ActiveRequests > MAX):
    Reject non-critical traffic with 503
    Critical routes (login, payment) bypass shedding
Else:
    Process request normally


Protects MongoDB & Kafka from being overwhelmed

Keeps high-priority requests alive

Works with circuit breakers for downstream failures

🔹 Traffic Flow (Step by Step)

Client → hits CDN / Edge (rate limiting + DDoS protection)

Traffic → Layer 7 Load Balancer

Routes /users → Node.js /users pods

Routes /payment → Node.js /payment pods

Routes /analytics → Node.js /analytics pods

Chooses server via round-robin, least connections, IP hash

Node.js pods → Redis for caching and distributed rate limiting

Node.js pods → MongoDB for persistent data

Node.js pods → Kafka for async events (e.g., updating precomputed read models)

Kafka consumers → update other services or denormalized collections

🔹 Notes for Production-Level Interviews

Critical flows never shed → login, payment, essential APIs

Non-critical flows → analytics, recommendations, batch processing

Metrics & Observability → Prometheus + Grafana + ELK for CPU, lag, response time

Autoscaling → LB + Kubernetes HPA to scale Node.js pods when traffic increases

Global redundancy → Cloud CDN + multi-region LB for high availability

This ASCII diagram shows:

How L7 LB interacts with Node cluster
           ┌─────────────────────┐
                          │        Client       │
                          └──────────┬──────────┘
                                     │
                                     ▼
                     ┌─────────────────────────────┐
                     │  CDN / Edge Protection      │
                     │  (Rate Limiting, WAF, DDoS) │
                     │  e.g. Cloudflare            │
                     └──────────┬──────────────────┘
                                │
                                ▼
                     ┌─────────────────────────────┐
                     │  Layer 7 Load Balancer       │
                     │  (AWS ALB / Nginx / HAProxy)│
                     └──────────┬──────────────────┘
                                │
      ┌──────────────┬──────────┼───────────┬─────────────┐
      ▼              ▼          ▼           ▼             ▼
┌──────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐ ┌──────────┐
│ Node Pod │   │ Node Pod │  │ Node Pod │  │ Node Pod │ │ Node Pod │
│  /users  │   │ /users   │  │ /payment │  │ /search  │ │ /analytics│
└────┬─────┘   └────┬─────┘  └────┬─────┘  └────┬─────┘ └────┬─────┘
     │              │           │             │           │
     ▼              ▼           ▼             ▼           ▼
┌──────────────────────────────────────────────────────────┐
│          Application Protection Layer (Node.js)          │
│----------------------------------------------------------│
│  🔹 Redis Distributed Rate Limiter                       │
│  🔹 Adaptive Load Shedding (CPU + Event Loop Lag)       │
│  🔹 Circuit Breaker for MongoDB/Kafka                    │

Different algorithms for different scenarios

Integration with adaptive load shedding, rate limiting, Redis, Mongo, Kafka
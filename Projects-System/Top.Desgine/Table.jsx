| Rank | Problem                                                | Why It's Frequently Asked (2025–2026)                | Key Focus Areas / Trade-offs to Discuss                                          | Typical Scale / Constraints Asked                                      | Difficulty  |
| ---- | ------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| 20   | Design Real-time Analytics / Metrics Platform          | Streaming data ingestion, aggregation, visualization | Lambda vs Kappa architecture, windowed aggregation, retention policies, alerting | Millions of events/sec, sub-second query latency, real-time dashboards | Hard        |
| 21   | Design Search Autocomplete / Typeahead                 | Prefix search, high query QPS                        | Trie / Ternary Search Tree, caching, popularity ranking, sharding                | Billions queries/day, millisecond latency                              | Medium      |
| 22   | Design Distributed Job Queue / Task Scheduler          | Async processing, retries, reliability               | Queue semantics, delayed tasks, deduplication, backoff strategies                | Millions tasks/day, high reliability, fair scheduling                  | Medium-Hard |
| 23   | Design Payment Processing System                       | High reliability, fraud prevention, multi-gateway    | ACID vs eventual consistency, idempotency, reconciliation, PCI compliance        | Millions transactions/day, sub-second processing, high security        | Hard        |
| 24   | Design Live Streaming / Video Conferencing             | Real-time low-latency media                          | WebRTC, SFU/MCU, adaptive bitrate, NAT traversal                                 | Thousands concurrent streams per region, <200ms latency                | Hard        |
| 25   | Design Multi-Tenant SaaS Platform                      | Data isolation, scaling, customization               | Database per tenant vs shared schema, feature flags, quota enforcement           | Hundreds of thousands tenants, variable usage, secure isolation        | Medium-Hard |
| 26   | Design Distributed Logging / Observability System      | High-volume log collection & query                   | Sharding, indexing, aggregation pipelines, retention, alerting                   | Millions events/sec, sub-second search                                 | Medium-Hard |
| 27   | Design Feature Flag / A/B Testing Platform             | Experimentation & safe rollouts                      | SDK distribution, targeting rules, metrics aggregation                           | Millions users, instant flag propagation                               | Medium      |
| 28   | Design Event Streaming Platform (Kafka / PubSub)       | Decoupled services, scalable messaging               | Partitioning, replication, consumer groups, ordering guarantees                  | Millions messages/sec, at-least-once delivery                          | Medium-Hard |
| 29   | Design Distributed Rate Limiter                        | API protection & fairness                            | Token bucket, sliding window, leaky bucket, Redis / in-memory coordination       | Millions requests/sec, per-user/IP/global                              | Medium      |
| 30   | Design Recommendation System (Collaborative Filtering) | Content personalization, high engagement             | Offline training, online serving, cold start, A/B testing                        | Billions interactions/day, low-latency recommendations                 | Hard        |


✅ Notes / Observations:

Trending 2026: LLM serving, real-time analytics, distributed AI inference (#14, #20) are becoming increasingly asked in interviews.

Patterns to Discuss: Microservices, horizontal scaling, caching, eventual vs strong consistency, message queues, and workflow orchestration.

Scale Focus: Interviewers often ask high QPS, low-latency, billions of events/interactions/day, sometimes with disaster recovery or multi-region considerations.

Difficulty Ranking: Classic systems like URL shorteners are Easy-Medium; Global Search, LLM serving, and Recommendation Systems are Hard/Very Hard.
🔥 How to detect memory leaks in production



🔥 How to detect memory leaks in production


| Condition              | Alert     |
| ---------------------- | --------- |
| CPU > 85%              | Warning   |
| Memory > 80%           | Warning   |
| Event loop lag > 100ms | Critical  |
| Error rate > 2%        | Critical  |
| Worker crash detected  | Immediate |





🎯 Real Production Rules

✔ If CPU high → Add cluster workers or machines
✔ If event loop lag high → Move to worker threads
✔ If thread pool saturated → Increase UV_THREADPOOL_SIZE
✔ If memory high → Find leaks
✔ If workers crash → Investigate logs



🚀 PRODUCTION MONITORING DASHBOARD DESIGN

We’ll structure it in 4 Layers:

1️⃣ Infrastructure
2️⃣ Application
3️⃣ Runtime (Node internals)
4️⃣ Business Metrics

🖥️ 1️⃣ INFRASTRUCTURE DASHBOARD

Tools:

| Metric             | Why               |
| ------------------ | ----------------- |
| CPU usage per node | Detect saturation |
| Memory usage       | Prevent OOM       |
| Load average       | System stress     |
| Disk I/O           | Slow DB/files     |
| Network throughput | Traffic spikes    |


Visual Layout:
[ CPU % ]  [ Memory % ]
[ Load Avg ] [ Network In/Out ]
[ Disk I/O ]


Alert if:

CPU > 85%

Memory > 80%

⚙️ 2️⃣ APPLICATION DASHBOARD (API Layer)


Panels:



| Metric                    | Why                 |
| ------------------------- | ------------------- |
| Requests per second (RPS) | Traffic measurement |
| p50 latency               | Normal performance  |
| p95 latency               | User experience     |
| p99 latency               | Tail latency        |
| Error rate %              | System health       |
| Active connections        | Concurrency load    |



Visual Layout:
[RPS Graph]
[Latency Graph p50 p95 p99]
[Error Rate %]
[Active Connections]


If:

p99 spikes → DB slow?

Error rate > 2% → immediate alert

🧠 3️⃣ NODE.JS RUNTIME DASHBOARD (Very Important)

This separates juniors from seniors.

Panels:


| Metric                 | Why                   |
| ---------------------- | --------------------- |
| Event loop lag         | Detect blocking       |
| Heap used              | Memory leak detection |
| GC pause time          | Performance drop      |
| Worker restarts        | Crash detection       |
| Thread pool queue time | I/O saturation        |




Event Loop Monitoring

If lag > 100ms:

CPU blocking

Need worker threads

🧵 4️⃣ CLUSTER & WORKER MONITORING

Since cluster runs multiple processes:

Panels:

| Metric              | Why                |
| ------------------- | ------------------ |
| CPU per worker      | Load imbalance     |
| Memory per worker   | Heap issues        |
| Restart count       | Stability          |
| Requests per worker | Distribution check |



Visual:

Worker 1 CPU %
Worker 2 CPU %
Worker 3 CPU %
Worker 4 CPU %


If one worker high:

Imbalance issue

🗄️ 5️⃣ DATABASE DASHBOARD

Example:

MongoDB

Monitor:

| Metric           | Why             |
| ---------------- | --------------- |
| Query latency    | Slow queries    |
| Connections used | Pool saturation |
| Replication lag  | Replica health  |
| Cache hit ratio  | Efficiency      |




If:

Replication lag high → read delays

Connections maxed → increase pool

⚡ 6️⃣ CACHE DASHBOARD

Example:

Redis

Monitor:

| Metric          | Why            |
| --------------- | -------------- |
| Cache hit rate  | Performance    |
| Memory usage    | Eviction risk  |
| Evicted keys    | Capacity issue |
| Command latency | Slow Redis     |



Ideal hit rate:

80%+

📊 7️⃣ BUSINESS DASHBOARD

This is often ignored but critical.

| Metric             | Why              |
| ------------------ | ---------------- |
| Orders per minute  | Revenue tracking |
| Login success rate | User health      |
| Payment failures   | Financial risk   |







Business metrics detect problems before infra alerts.

🚨 8️⃣ ALERTING DESIGN

Use severity levels:

🟢 Info

Minor anomaly

🟡 Warning

CPU > 80%
Memory > 75%

🔴 Critical

Error rate > 5%
Event loop lag > 200ms
DB down

Alerts go to:

Slack

PagerDuty

Email

📈 COMPLETE DASHBOARD LAYOUT
┌───────────────────────────────────┐
│           Infrastructure          │
├───────────────────────────────────┤
│ CPU | Memory | Load | Network    │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│           Application             │
├───────────────────────────────────┤
│ RPS | Latency | Errors | Active  │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│         Node Runtime             │
├───────────────────────────────────┤
│ Event Loop | Heap | GC | Threads │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│ DB | Redis | Business Metrics    │
└───────────────────────────────────┘

🔥 Golden Signals (Google SRE Model)

Always monitor:

Latency

Traffic

Errors

Saturation

If these 4 are healthy → system healthy.

🎯 Interview-Ready Answer

If asked:

“How would you design monitoring for a Node.js production system?”

You say:

I would separate dashboards into infrastructure, application, runtime, and business metrics. I would track golden signals such as latency, traffic, errors, and saturation. Additionally, I would monitor event loop lag, heap usage, and GC pauses for Node.js internals. Alerts would be configured based on severity thresholds to ensure rapid incident response.

That answer = strong SRE-level understanding.

If you want next:

🔥 Auto-scaling based on metrics
🔥 Memory leak detection deep dive
🔥 Observability vs Monitoring difference
🔥 Real incident response workflow
🔥 Chaos engineering basics
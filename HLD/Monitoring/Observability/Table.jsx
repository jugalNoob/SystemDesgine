🔥 Docker-compose observability stack

🔥 PHASE 7: Observability & Production (Weeks 17–18)
You’re entering Senior Engineer Territory now.

Since you're already working with Node.js + Redis + Kafka + high-throughput systems, this phase is what separates mid-level from senior/system architect.

Let’s break everything down practically 👇

1️⃣ Logging
✅ What is Logging?

Recording events happening inside your application.

🔥 Why?

Debug production issues

Audit trail

Error investigation

Security tracking


🛠 Popular Node.js Logging Tools


| Tool        | Type        | Website                                                                        | When to Use                |
| ----------- | ----------- | ------------------------------------------------------------------------------ | -------------------------- |
| **winston** | Logger      | [https://www.npmjs.com/package/winston](https://www.npmjs.com/package/winston) | Structured logging         |
| **pino**    | Fast Logger | [https://www.npmjs.com/package/pino](https://www.npmjs.com/package/pino)       | High-performance APIs      |
| **morgan**  | HTTP Logger | [https://www.npmjs.com/package/morgan](https://www.npmjs.com/package/morgan)   | Log incoming HTTP requests |



🔥 Production Log Aggregation

| Tool             | Type             | Website                                                              |
| ---------------- | ---------------- | -------------------------------------------------------------------- |
| **ELK Stack**    | Log system       | [https://www.elastic.co/elk-stack](https://www.elastic.co/elk-stack) |
| **Grafana Loki** | Log aggregation  | [https://grafana.com/oss/loki/](https://grafana.com/oss/loki/)       |
| **Datadog**      | Cloud monitoring | [https://www.datadoghq.com](https://www.datadoghq.com)               |



2️⃣ Metrics (Numbers About Your System)

✅ What are Metrics?

Numeric measurements:

CPU usage

Memory usage

Request count

Error rate

Latency

🛠 Node.js Metrics Tools


| Tool            | Website                                                                                | Use Case          |
| --------------- | -------------------------------------------------------------------------------------- | ----------------- |
| **prom-client** | [https://www.npmjs.com/package/prom-client](https://www.npmjs.com/package/prom-client) | Expose metrics    |
| **Prometheus**  | [https://prometheus.io](https://prometheus.io)                                         | Collect metrics   |
| **Grafana**     | [https://grafana.com](https://grafana.com)                                             | Visualize metrics |



Example: prom-client
const client = require('prom-client');

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
});


Prometheus scrapes:

GET /metrics

3️⃣ Distributed Tracing
✅ What is Tracing?

Track a request across:

Client → API → Redis → Kafka → DB

Tools

| Tool              | Website                                                      |
| ----------------- | ------------------------------------------------------------ |
| **Jaeger**        | [https://www.jaegertracing.io](https://www.jaegertracing.io) |
| **Zipkin**        | [https://zipkin.io](https://zipkin.io)                       |
| **OpenTelemetry** | [https://opentelemetry.io](https://opentelemetry.io)         |



4️⃣ Health Check


| Type      | Purpose                 |
| --------- | ----------------------- |
| Liveness  | Is app running?         |
| Readiness | Is DB connected?        |
| Startup   | Is service initialized? |


Example:

app.get('/health', async (req, res) => {
  const redisOk = await redis.ping();
  res.json({ status: 'ok', redis: redisOk });
});

5️⃣ Monitoring Dashboards

You combine:

Prometheus (collect)

Grafana (visualize)

Loki (logs)

1:: Dashboard shows:

RPS

95th percentile latency

Error rate

Memory

Kafka lag

Redis hit ratio



6️⃣ Alerting

00:: Alert when:

CPU > 80%

Memory > 90%

Error rate > 5%

Kafka consumer lag high

00:: Use:

Prometheus AlertManager

Datadog alerts

Grafana alerts

7️⃣ Chaos Engineering


🔥 What is this?

Break your system intentionally.

Example:

Kill Redis

Add network latency

Crash Kafka

Tools:



| Tool             | Website                                                                          |
| ---------------- | -------------------------------------------------------------------------------- |
| **Chaos Monkey** | [https://netflix.github.io/chaosmonkey/](https://netflix.github.io/chaosmonkey/) |
| **Gremlin**      | [https://www.gremlin.com](https://www.gremlin.com)                               |



8️⃣ SLI / SLO / SLA
SLI (Service Level Indicator)

Actual measurement.
Example:

99.2% requests < 200ms

SLO (Objective)

Target:

99.9% uptime

SLA

Legal agreement.

🔥 Senior Interview Question
“How do you detect memory leaks in production?”

This is where you shine.

🚨 Step-by-Step Answer (Senior Level)
#

1️⃣ Monitor Memory

Use:

process.memoryUsage()

Prometheus

Grafana

Track:

Heap used

RSS

External memory

If heap keeps increasing without going down → possible leak.

2️⃣ Use Node Inspector

Run with:

node --inspect index.js


Use:

Chrome DevTools → Memory tab

Heap snapshot

3️⃣ Production Safe Tools

| Tool          | Use                    |
| ------------- | ---------------------- |
| **clinic**    | Diagnose memory & CPU  |
| **heapdump**  | Generate heap snapshot |
| **PM2**       | Monitor memory restart |
| **New Relic** | APM monitoring         |



Example Heapdump
const heapdump = require('heapdump');

heapdump.writeSnapshot('./heap.heapsnapshot');


Analyze in Chrome DevTools.

🔍 What Causes Memory Leaks in Node?

Unclosed DB connections

Global variables

Event listeners not removed

setInterval not cleared

Large object caching

Kafka consumer buffers

Redis client reconnection loops

Since you work with Kafka + Redis → these are realistic leak sources.

🔥 Senior-Level Final Answer (Short Version)

“In production, I detect memory leaks by continuously monitoring heap usage via Prometheus and Grafana. If heap usage grows without GC recovery, I capture heap snapshots using heapdump or Clinic.js, compare snapshots to find retained objects, and analyze event listeners, closures, and cache growth. I also use PM2 memory thresholds for auto-restarts as a temporary mitigation.”

That answer = 💎 senior.

🧠 Final Architecture View
Node.js API
   ↓
Logging → Loki / ELK
Metrics → Prometheus
Tracing → OpenTelemetry → Jaeger
Dashboards → Grafana
Alerting → AlertManager
Chaos → Chaos Monkey

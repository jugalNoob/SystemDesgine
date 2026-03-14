Excellent 🔥
These are core production metrics. Every senior engineer MUST understand them deeply.

We’ll explain:

✅ RPS

✅ P50 / P95 / P99 latency

✅ Error rate

✅ Active connections

These are part of the Golden Signals used by companies like Google SRE teams.

1️⃣ RPS (Requests Per Second)
📌 Meaning

How many requests your system handles every second.

RPS = Total Requests / Time (seconds)

Example

If your API handles:

6000 requests in 60 seconds


RPS = 6000 / 60 = 100 RPS

Why It Matters

Measures traffic load

Used for capacity planning

Helps detect traffic spikes

Real Scenario

Normal:

RPS = 5,000


Sudden spike:

RPS = 25,000


Possible:

Marketing campaign

Bot attack

DDoS

2️⃣ Latency (P50 / P95 / P99)

This is VERY important 🔥

Latency = How long a request takes to complete.

But we don’t use average latency.

We use percentiles.

🎯 What is P50?

P50 = 50th percentile
Also called Median

It means:

50% of requests complete faster than this value.

Example:

P50 = 120ms


Half your users experience response time under 120ms.

🎯 What is P95?

P95 = 95th percentile

95% of requests are faster than this value.
5% are slower.

Example:

P95 = 450ms


Most users are fast, but some are slow.

🎯 What is P99?

P99 = 99th percentile

99% of users are faster than this value.
1% are very slow.

Example:

P99 = 1.2s


That 1% might be:

Large payload

Cold start

DB lock

GC pause

🔥 Why Percentiles Matter (Not Average)

Example:

9 requests = 100ms
1 request = 10,000ms

Average:

(900 + 10000) / 10 = 1090ms


Looks bad.

But actually:

90% users are fast

1 user is very slow

That’s why we use P95/P99.

🧠 Real Production Interpretation


| Metric | Meaning                |
| ------ | ---------------------- |
| P50    | Normal user experience |
| P95    | Edge-case performance  |
| P99    | Worst-case performance |



Companies monitor P99 closely.

3️⃣ Error Rate
📌 Meaning

Percentage of requests that fail.

Error Rate = (Failed Requests / Total Requests) × 100

Example
Total requests: 10,000
Errors: 200


Error rate:

(200 / 10000) × 100 = 2%

What is considered bad?

| Error Rate | Meaning             |
| ---------- | ------------------- |
| < 0.5%     | Excellent           |
| 1–2%       | Acceptable          |
| > 5%       | Problem             |
| > 10%      | Production incident |




What counts as error?

5xx responses

Timeouts

Circuit breaker open

DB failure

Crashes

4️⃣ Active Connections
📌 Meaning

Number of open connections at a given moment.

Could be:

HTTP connections

DB connections

Redis connections

WebSocket connections

Example

DB pool:

max connections = 50


Active:

48 active


You’re near saturation.

Why It Matters

If active connections reach max:

New requests wait

Latency increases

System slows down

Eventually crashes

🔥 All Together (Production Dashboard)

A real Grafana dashboard shows:

RPS: 8,000
P50: 120ms
P95: 480ms
P99: 1.4s
Error Rate: 1.2%
Active DB Connections: 38/50


This tells you:

System under load

Some tail latency issues

DB close to limit

🔥 Senior-Level Understanding

If:

RPS stable
But P99 increasing


→ Likely:

GC pause

DB lock

Thread pool saturation

Redis blocking

If:

RPS increases
Latency increases
Error rate increases


→ System overload.

🔥 100k RPS Scenario

Imagine:

RPS = 100,000
P50 = 90ms
P95 = 350ms
P99 = 1.8s
Error Rate = 3%
Active Connections = 95%


This means:

System near breaking point

Tail latency bad

Need scaling

🧠 Interview Answer (Short & Powerful)

“RPS measures system traffic load. P50/P95/P99 represent response time percentiles, with P99 capturing tail latency. Error rate indicates system reliability. Active connections show resource saturation levels. Together, these metrics help detect overload, performance degradation, and potential outages.”

That answer = 💎
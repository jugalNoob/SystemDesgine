🔥 How FAANG handles 100M req/min


Now we’re talking planet-scale systems 🌍🔥

100,000,000 requests/minute
= 1,666,666 requests per second (≈1.6M RPS)

This is traffic level of:

Google

Meta

Amazon

Netflix

At this scale, the system is no longer “an app.”
It is global infrastructure.

🧠 Core Philosophy at 100M req/min

Everything is distributed

Everything is replicated

Everything is cached

Everything is asynchronous

Nothing depends on one system

🌍 1️⃣ Global Edge-First Architecture

At 1.6M RPS, origin servers cannot handle traffic directly.

FAANG uses:

Global Anycast routing

200+ edge POPs (Points of Presence)

Massive CDN layer

Most traffic never reaches backend.

Typical Breakdown:
Layer	Traffic
Edge CDN	85–95%
Regional cache	4–10%
Database	<1%

Edge absorbs the internet.

🏗 2️⃣ Multi-Region, Multi-Continent Setup

They don’t have 2–3 regions.

They have:

20–50 regions globally

Active-active everywhere

Full redundancy per region

Each region has:

Load balancers

Compute clusters

Cache clusters

Storage clusters

Event systems

If one region dies → global rerouting in seconds.

⚡ 3️⃣ Ultra-Distributed Load Balancing

Traffic routing layers:

Global DNS

Anycast BGP routing

Edge proxy layer

Regional load balancer

Service mesh routing

They use custom load balancers (not basic cloud ones).

🧊 4️⃣ Aggressive Caching Strategy

Caching layers:

Browser cache

CDN edge cache

Regional cache

Service-level cache

Database cache

Hot objects may exist in thousands of cache nodes.

Hot key mitigation:

Replicated cache keys

Key hashing

Request collapsing

Stale-While-Revalidate

Database should never feel viral traffic.

🗄 5️⃣ Database at Planet Scale

Traditional DB cannot survive this.

They use:

Globally distributed databases

Sharded by user or geography

Strongly consistent systems where needed

Eventually consistent for feeds/search

Examples of distributed DB tech used in industry:

Google Spanner

Amazon DynamoDB

Apache Cassandra

Rules:

No cross-region transactions

No heavy joins

Everything denormalized

Data ownership per service

🔄 6️⃣ Everything is Event-Driven

Synchronous work is minimal.

They use massive event backbones like:

Apache Kafka

Events for:

Feed generation

Analytics

Recommendations

Notifications

Billing

Fraud detection

APIs respond in milliseconds.
Heavy work happens later.

🔍 7️⃣ Microservices + Service Mesh

Thousands of microservices.

Internal communication handled by service mesh like:

Istio

Features:

Traffic routing

Retry policies

Circuit breaking

mTLS security

Observability

📊 8️⃣ Real-Time Observability at Scale

They monitor:

Every request latency

Error rates

Resource usage

Cache hit ratio

DB performance

Event lag

Common tools in industry:

Prometheus

Grafana

But FAANG often builds internal monitoring systems.

🚨 9️⃣ Failure is Expected

At 100M req/min:

Servers die constantly

Disks fail

Network partitions happen

Regions go offline

Systems are designed assuming failure is normal.

Strategies:

Automatic failover

Self-healing clusters

Replication everywhere

Chaos testing (failure injection)

🔥 10️⃣ Viral Traffic Strategy

If traffic spikes 5x suddenly:

They use:

Auto scaling compute

Traffic shedding (drop low priority requests)

Degraded mode (serve stale content)

Feature flag disabling

Better to serve stale than crash.

📈 Real Numbers Example

100M req/min = 1.6M RPS

Example realistic distribution:

Layer	RPS
CDN Edge	1.4M
Regional Cache	150k
App Servers	80k
DB	10k

DB only sees 0.6% of traffic.

That’s the secret.

🏦 Infrastructure Size (Rough Idea)

At this level:

10,000+ servers globally

100+ PB storage

Dedicated SRE teams

24/7 incident response

Custom-built infrastructure

This is not “cloud project.”
This is engineered infrastructure.

🎯 Interview-Level Summary

At 100M requests per minute, FAANG companies rely on globally distributed edge networks, aggressive multi-layer caching, active-active multi-region infrastructure, horizontally sharded databases, event-driven microservices, and strong observability. They design systems assuming constant failure and ensure that databases handle only a tiny fraction of traffic.

Now if you want to go deeper:
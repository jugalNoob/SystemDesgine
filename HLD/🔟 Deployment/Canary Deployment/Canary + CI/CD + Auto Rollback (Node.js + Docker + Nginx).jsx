Perfect Jugal 🔥
Now we go real production level — Canary + CI/CD + Auto Rollback (Node.js + Docker + Nginx).

This is how companies like Netflix and Amazon safely deploy.

🐤 Goal

When new version deploys:

Deploy v2 (canary)

Send 5% traffic

Monitor health (errors, CPU, latency)

If healthy → increase traffic

If unhealthy → auto rollback to v1

No manual action.

🏗 Architecture Overview
GitHub Push
    ↓
CI Pipeline
    ↓
Build Docker Image
    ↓
Push to Docker Registry
    ↓
CD Pipeline (SSH to Server)
    ↓
Start v2 container
    ↓
Nginx route 5% traffic
    ↓
Health Check Script
        ↓
    If OK → Increase to 20% → 50% → 100%
    If FAIL → Rollback to v1

🐳 Step 1 — Run Two Versions

Example containers:

app-v1 (stable)
app-v2 (new)

🌐 Step 2 — Nginx Canary Config
upstream backend {
    server app-v1:3000 weight=95;
    server app-v2:3000 weight=5;
}

server {
    location / {
        proxy_pass http://backend;
    }
}


Traffic:

95% → old

5% → new

🧪 Step 3 — Health Check Script (Auto Decision)

scripts/canary-check.sh

#!/bin/bash

ERROR_RATE=$(curl -s http://localhost:3000/metrics | grep error_rate | awk '{print $2}')

if (( $(echo "$ERROR_RATE > 5" | bc -l) )); then
    echo "High error rate! Rolling back..."
    docker stop app-v2
    docker rm app-v2
    exit 1
else
    echo "Canary healthy."
    exit 0
fi


This checks:

Error rate

Could also check:

CPU

Memory

Response time

Kafka lag

⚙️ Step 4 — CI/CD Pipeline (GitHub Example)

.github/workflows/deploy.yml

name: Canary Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Docker
        run: docker build -t myapp:${{ github.sha }} .

      - name: Push Image
        run: docker push myapp:${{ github.sha }}

      - name: SSH Deploy
        run: |
          ssh user@server "
            docker pull myapp:${{ github.sha }} &&
            docker run -d --name app-v2 myapp:${{ github.sha }} &&
            ./scripts/canary-check.sh
          "


If script fails → job fails → rollback triggered.

🔁 Step 5 — Auto Rollback Logic

Inside CD script:

if ./scripts/canary-check.sh; then
    echo "Promoting v2 to 100%"
    # update nginx to 100% v2
else
    echo "Rollback triggered"
    docker stop app-v2
    docker rm app-v2
fi

🚀 Progressive Traffic Increase

You can automate like this:

5% → wait 5 mins
20% → wait 10 mins
50% → wait 20 mins
100%


Each stage:

Run health check

Continue or rollback

📊 What To Monitor (Important For You)

Since you're building:

Kafka

Redis

Rate limiting

High throughput

Monitor:

5xx error rate

Response time p95

CPU usage

Event loop lag

Mongo latency

Kafka consumer lag

If spike → rollback automatically.

🧠 Why This Is Powerful

Blue-Green:

Switch 100% instantly.

Canary:

Safe gradual rollout.

Metrics-driven.

Auto rollback.

Safer for:

Payment systems

Large traffic apps

Distributed systems

🎯 Interview Answer (Senior Level)

If interviewer asks:

How would you implement canary deployment with auto rollback?

You answer:

I would deploy the new version alongside the stable version, route a small percentage of traffic using Nginx weights, monitor key metrics like error rate and latency, and use a CI/CD script to automatically promote or rollback based on health checks.

That’s senior-level thinking.
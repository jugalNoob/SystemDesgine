Perfect 🔥
Let’s implement Canary Deployment using Node.js + NGINX (practical + interview-ready).

We’ll route 90% traffic → v1 (stable)
and 10% traffic → v2 (canary)

🏗 Architecture
                Users
                  |
               NGINX
            /           \
        node-v1        node-v2
       (stable)       (canary 10%)

✅ Step 1 — Node.js Apps
server.js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(`Running Version: ${process.env.APP_VERSION}`);
});

app.listen(3000, () => {
  console.log("Server running");
});

✅ Step 2 — Docker Compose
version: "3"

services:
  v1:
    build: .
    container_name: node-v1
    environment:
      - APP_VERSION=STABLE
    ports:
      - "3001:3000"

  v2:
    build: .
    container_name: node-v2
    environment:
      - APP_VERSION=CANARY
    ports:
      - "3002:3000"

  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - v1
      - v2

✅ Step 3 — NGINX Canary Configuration

Here’s the important part.

nginx.conf
events {}

http {

    upstream stable {
        server v1:3000;
    }

    upstream canary {
        server v2:3000;
    }

    split_clients "${remote_addr}" $backend {
        10%     canary;
        *       stable;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://$backend;
        }
    }
}

🔍 How split_clients Works
split_clients "${remote_addr}" $backend {
    10%     canary;
    *       stable;
}


NGINX hashes user IP

10% users consistently go to v2

90% go to v1

Same user always hits same version (important!)

🚀 Run System
docker-compose up --build


Open:

http://localhost


Refresh multiple times → You’ll see both versions.

🔁 Increase Traffic Gradually

Change:

10% → 30% → 50% → 100%


When ready for full rollout:

split_clients "${remote_addr}" $backend {
    100%     canary;
}


Then reload:

docker exec nginx nginx -s reload

🛑 Rollback

Just change back to:

0% canary


Reload NGINX.

🔥 Production-Level Canary (Advanced)

In real systems, companies combine canary with:

Metrics (CPU, error rate, latency)

Alerting

Auto rollback

Used heavily by:

Netflix

Google

Amazon

Often implemented using:

Kubernetes

Service Mesh (like Istio)

Feature flags

🧠 Important For Your Architecture (Redis + Kafka)

If both versions are running:

1️⃣ Make sure DB schema supports both
2️⃣ Avoid double Kafka consumer processing
3️⃣ Use shared Redis session store
4️⃣ Monitor error rate per version

🎯 Interview Answer (Senior Level)

Canary deployment gradually shifts a percentage of traffic to a new version using load balancer routing rules (e.g., NGINX split_clients). It allows real production testing with controlled exposure and minimizes blast radius before full rollout.

If you want next level:

🔥 Canary + Feature Flags
🔥 Canary + Prometheus monitoring
🔥 Canary for Kafka consumers
🔥 Automated Canary rollback strategy
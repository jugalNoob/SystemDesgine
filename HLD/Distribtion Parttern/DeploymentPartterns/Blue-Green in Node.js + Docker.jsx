Since you're working with Node.js APIs + Redis + Kafka architecture, this is very practical for you 🔥

Let’s implement Blue-Green Deployment using Node.js + Docker + NGINX

🏗 Architecture Overview
                Users
                  |
              NGINX (Load Balancer)
               /              \
        node-app-blue      node-app-green
           (v1)                (v2)


Only ONE version receives traffic at a time

NGINX switches traffic between Blue and Green

Both containers run simultaneously

✅ Step 1 — Create Your Node.js App
server.js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(`App Version: ${process.env.APP_VERSION}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

✅ Step 2 — Create Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

✅ Step 3 — Create Docker Compose
docker-compose.yml
version: "3"

services:
  blue:
    build: .
    container_name: node-blue
    environment:
      - APP_VERSION=BLUE
    ports:
      - "3001:3000"

  green:
    build: .
    container_name: node-green
    environment:
      - APP_VERSION=GREEN
    ports:
      - "3002:3000"

  nginx:
    image: nginx:latest
    container_name: nginx-lb
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - blue
      - green

✅ Step 4 — Configure NGINX
nginx.conf

Initially route traffic to BLUE

events {}

http {
    upstream app {
        server blue:3000;
        # server green:3000;  <-- Commented
    }

    server {
        listen 80;

        location / {
            proxy_pass http://app;
        }
    }
}

🚀 Step 5 — Run System
docker-compose up --build


Now:

http://localhost
 → BLUE version

🔁 Step 6 — Deploy New Version (Green)

Update code

Rebuild only green:

docker-compose build green
docker-compose up -d green


Test manually:

http://localhost:3002


If everything works → switch traffic

🔄 Step 7 — Switch Traffic to GREEN

Edit nginx.conf:

upstream app {
    # server blue:3000;
    server green:3000;
}


Reload NGINX:

docker exec nginx-lb nginx -s reload


🔥 Now GREEN is live

🛑 Rollback (If Something Breaks)

Just switch back to:

server blue:3000;


Reload NGINX again.

Instant rollback.
Zero downtime.

🧠 Production Level Version

Instead of manual switching:

Use:

Docker labels

Health checks

Auto switching scripts

Or Kubernetes

Most companies use:

Docker

Kubernetes

NGINX

🔥 Advanced (For Your System Design Level)

Since you use:

Redis

Kafka

MongoDB

You must handle:

1️⃣ Database migrations

Schema must support both versions temporarily.

2️⃣ Shared Redis sessions

Don’t store sessions inside container memory.

3️⃣ Background workers

If you use Kafka consumer or BullMQ worker, avoid double processing when both blue & green are active.

🎯 Interview Answer (Senior Level)

Blue-Green deployment in Node.js with Docker involves running two identical containerized environments behind a load balancer like NGINX. The new version is deployed to the inactive environment, validated, and traffic is switched by updating the load balancer configuration. Rollback is instant by redirecting traffic to the previous environment.

If you want next:

🔥 Blue-Green using Kubernetes
🔥 Blue-Green + Kafka + Outbox pattern
🔥 CI/CD pipeline with GitHub Actions
Perfect Jugal 🔥
Now let’s build a real Canary deployment using Docker Compose (simple + production-style) for your Node.js setup.

We’ll simulate:

app-v1 → Stable version

app-v2 → Canary version

nginx → Traffic splitter

🐤 1️⃣ Folder Structure (Simple Version)
project/
│
├── docker-compose.yml
├── nginx.conf
├── Dockerfile
├── app.js
└── package.json

🐳 2️⃣ Dockerfile (Same for v1 and v2)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]

🧠 3️⃣ Node.js App (Version Identifier)

app.js

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    version: process.env.APP_VERSION,
    message: "Hello from Canary Deployment 🚀"
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Server running...");
});

🌐 4️⃣ Nginx Canary Config

nginx.conf

events {}

http {
  upstream backend {
    server app-v1:3000 weight=95;
    server app-v2:3000 weight=5;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://backend;
    }
  }
}


This means:

95% → v1

5% → v2

🐳 5️⃣ Docker Compose File

docker-compose.yml

version: "3.8"

services:
  app-v1:
    build: .
    container_name: app-v1
    environment:
      - APP_VERSION=v1
    restart: always

  app-v2:
    build: .
    container_name: app-v2
    environment:
      - APP_VERSION=v2
    restart: always

  nginx:
    image: nginx:alpine
    container_name: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    depends_on:
      - app-v1
      - app-v2

🚀 6️⃣ Run It
docker compose up --build


Open:

http://localhost


Refresh multiple times.

You’ll mostly see:

v1


But sometimes:

v2


That’s Canary working 🐤🔥

🔁 7️⃣ Increase Traffic Gradually

To promote canary:

Change weight:

server app-v1:3000 weight=50;
server app-v2:3000 weight=50;


Then:

docker compose restart nginx


Finally:

server app-v1:3000 weight=0;
server app-v2:3000 weight=100;


Now v2 is fully live.

🔄 8️⃣ Rollback (If Errors Found)

Simply:

docker stop app-v2
docker rm app-v2


Or change weight back to:

95 / 5


Rollback = instant.

🧠 Why This Works Well For You

Since you are building:

Kafka consumers

Redis cache

Rate limiting

Monitoring

You can:

Monitor error rate

Monitor latency

Monitor Kafka lag

Auto adjust weights

This is real production practice.

🏆 Big Companies Use Canary

Google

Netflix

Amazon

But with Kubernetes instead of Docker Compose.

🎯 Interview-Level Explanation

If interviewer asks:

How would you implement canary using Docker Compose?

You say:

I would run two versions of the Node.js app as separate services in Docker Compose and use Nginx upstream weights to gradually shift traffic from stable to canary, monitoring metrics before promoting.

That’s strong DevOps understanding.

If you want next level, I can show:

🔥 Canary with Prometheus auto-rollback

🔥 Canary with Redis-based user targeting

🔥 Canary vs Blue-Green vs Rolling (deep comparison)

🔥 Production-grade multi-server canary
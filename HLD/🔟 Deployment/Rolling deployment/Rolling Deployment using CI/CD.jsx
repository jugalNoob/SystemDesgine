Perfect Jugal 🔥
Now I’ll show you a simple Rolling Deployment using CI/CD pipeline for:

✅ Node.js Kafka consumer

✅ Docker

✅ GitHub Actions

✅ Zero downtime

Very clear. Step-by-step.

🏗 Architecture Overview
GitHub Push
     ↓
CI → Build Docker Image
     ↓
Push to Docker Registry
     ↓
CD → SSH to Server
     ↓
Stop 1 container
Start new version
Repeat


That’s rolling.

📁 Project Structure (Important)
project/
 ├── Dockerfile
 ├── docker-compose.yml
 ├── consumer.js
 └── .github/workflows/deploy.yml

🐳 1️⃣ Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
CMD ["node", "consumer.js"]

🧠 2️⃣ Kafka Consumer (With Graceful Shutdown)
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "order-group" });

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Processing:", message.value.toString());
    },
  });
}

start();

// 🔥 Important for Rolling
process.on("SIGTERM", async () => {
  console.log("Graceful shutdown...");
  await consumer.disconnect();
  process.exit(0);
});


This prevents message duplication.

🐳 3️⃣ Server Side (Running 3 Instances)

On production server:

docker run -d --name consumer-1 myapp:latest
docker run -d --name consumer-2 myapp:latest
docker run -d --name consumer-3 myapp:latest


Now rolling is possible.

🚀 4️⃣ GitHub Actions CI/CD

.github/workflows/deploy.yml

name: Rolling Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Docker Image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Push Image
        run: |
          docker tag myapp:${{ github.sha }} myrepo/myapp:latest
          docker push myrepo/myapp:latest

      - name: Deploy to Server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull myrepo/myapp:latest

            # 🔄 Rolling Update
            docker stop consumer-1
            docker rm consumer-1
            docker run -d --name consumer-1 myrepo/myapp:latest

            sleep 10

            docker stop consumer-2
            docker rm consumer-2
            docker run -d --name consumer-2 myrepo/myapp:latest

            sleep 10

            docker stop consumer-3
            docker rm consumer-3
            docker run -d --name consumer-3 myrepo/myapp:latest

🔄 What Happens During Deployment?

Step-by-step:

consumer-1 stops

Kafka rebalances

consumer-1 (new version) joins

Kafka rebalances again

Repeat

System always processing.

📊 Deployment Timeline
Before:
v1 v1 v1

After Step 1:
v2 v1 v1

After Step 2:
v2 v2 v1

After Step 3:
v2 v2 v2


Zero downtime.

🧠 Why This Is Safe?

Because Kafka:

Tracks offsets

Reassigns partitions

Guarantees order per partition

Your job:

Graceful shutdown

Idempotent processing

🎯 Interview Answer

If interviewer asks:

How would you implement rolling deployment with CI/CD for Kafka consumers?

You answer:

I would build and push a new Docker image through CI, then use a CD script to stop and replace consumer instances one at a time, allowing Kafka to rebalance partitions while ensuring graceful shutdown and idempotent processing.

That’s strong backend knowledge.

🔥 Since You’re Building High Throughput System

Next advanced upgrade options:

🔥 Rolling + health check verification

🔥 Rolling + automatic rollback

🔥 Rolling + monitoring (CPU, lag, error rate)

🔥 Rolling with Kubernetes (production-grade)

Which one next, DevOps architect Jugal? 🚀
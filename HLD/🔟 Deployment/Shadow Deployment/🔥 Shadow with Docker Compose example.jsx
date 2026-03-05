Perfect Jugal 🔥
Let’s build a real Shadow Deployment using Docker Compose for your Node.js + Kafka + Mongo architecture.

We’ll keep it simple but production-style.

🎯 Goal

app_v1 → Production (serves users)

app_v2 → Shadow (receives mirrored traffic)

Both connected to:

MongoDB

Kafka

Nginx mirrors traffic

🏗 Architecture
Client
   ↓
Nginx
   ├──→ app_v1 (real response)
   └──→ app_v2 (shadow copy)


Kafka:

Topic: user-events

consumer_v1 → group: prod-group
consumer_v2 → group: shadow-group


Mongo:

users (prod)

users_shadow (optional for safe testing)

📂 Folder Structure
shadow-project/
│
├── docker-compose.yml
├── nginx.conf
│
├── app_v1/
│   ├── Dockerfile
│   └── server.js
│
├── app_v2/
│   ├── Dockerfile
│   └── server.js

🐳 1️⃣ docker-compose.yml
version: "3.9"

services:

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app_v1
      - app_v2

  app_v1:
    build: ./app_v1
    container_name: app_v1
    environment:
      - VERSION=v1
      - SHADOW_MODE=false

  app_v2:
    build: ./app_v2
    container_name: app_v2
    environment:
      - VERSION=v2
      - SHADOW_MODE=true

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"

  zookeeper:
    image: confluentinc/cp-zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka
    depends_on:
      - zookeeper
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092

🌐 2️⃣ nginx.conf (Traffic Mirroring)

Using Nginx mirror module:

events {}

http {

  upstream app_v1 {
    server app_v1:3000;
  }

  upstream app_v2 {
    server app_v2:3000;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://app_v1;
      mirror /shadow;
    }

    location /shadow {
      internal;
      proxy_pass http://app_v2;
    }
  }
}


👉 Users get response from app_v1
👉 app_v2 receives same request silently

🚀 3️⃣ app_v1/server.js
import express from "express";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  console.log("V1 processing:", req.body);

  res.json({
    version: "v1",
    message: "Production response"
  });
});

app.listen(3000, () => console.log("V1 running"));

🚀 4️⃣ app_v2/server.js (Shadow Mode)
import express from "express";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  console.log("V2 SHADOW processing:", req.body);

  // 🔥 IMPORTANT:
  // No emails
  // No payment calls
  // No real side effects

  res.json({
    version: "v2",
    message: "Shadow response"
  });
});

app.listen(3000, () => console.log("V2 running (shadow)"));

🐳 5️⃣ Dockerfile (same for both)
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]

▶️ Run Everything
docker-compose up --build


Now test:

curl -X POST http://localhost/login \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com"}'


You will see:

Response from v1

Logs from BOTH v1 and v2

That is Shadow Deployment 🔥

🧠 Adding Kafka Shadow Consumers

Production consumer:

groupId: login-prod


Shadow consumer:

groupId: login-shadow


They read same topic independently.

🛡 Safety Rules

Shadow version must:

❌ Not send emails

❌ Not charge payments

❌ Not mutate real critical data

✅ Write to shadow collection if needed

📊 Why This Is Powerful

You now have:

Real traffic testing

No risk to users

Zero downtime validation

Schema evolution testing

Consumer testing

This is production-level architecture used by:

Netflix

Uber

LinkedIn

🔥 Next Level Options
Perfect Jugal 👨‍💻 — let’s build a simple Blue-Green deployment using Docker Compose for your Node.js app.

We’ll keep it clean and production-style but easy to understand.

🧠 Idea

We run:

🔵 app_blue → current live version

🟢 app_green → new version

🌐 nginx → reverse proxy (controls traffic)

Only one app is active in Nginx at a time.

📁 Project Structure
project/
│
├── app.js
├── Dockerfile
├── docker-compose.yml
└── nginx/
    └── default.conf

🐳 1️⃣ Dockerfile (Node App)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]

🌐 2️⃣ Nginx Config (Controls Blue vs Green)

📄 nginx/default.conf

Initially Blue is active:

upstream node_app {
    server app_blue:3000;   # Blue is live
    # server app_green:3000;  # Green inactive
}

server {
    listen 80;

    location / {
        proxy_pass http://node_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

📦 3️⃣ docker-compose.yml
version: "3.8"

services:
  app_blue:
    build: .
    container_name: app_blue
    environment:
      - VERSION=blue
    expose:
      - "3000"

  app_green:
    build: .
    container_name: app_green
    environment:
      - VERSION=green
    expose:
      - "3000"

  nginx:
    image: nginx:latest
    container_name: nginx_proxy
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app_blue
      - app_green

🚀 How It Works

Start everything:

docker-compose up -d --build


Now:

Users → Nginx → app_blue

🔄 Deploy New Version (Green)

1️⃣ Update your Node code
2️⃣ Rebuild only Green:

docker-compose build app_green
docker-compose up -d app_green


Test Green internally:

docker exec -it app_green sh


Or temporarily change Nginx upstream to:

server app_green:3000;


Then reload Nginx:

docker exec nginx_proxy nginx -s reload


Now:

Users → Nginx → app_green


Blue is still running for rollback.

🔁 Rollback

If something breaks:

Switch upstream back to:

server app_blue:3000;


Reload Nginx.

Instant rollback. No downtime.

🔥 Why This Is Powerful

✔ Zero downtime
✔ Easy rollback
✔ Works locally & production
✔ No Kubernetes required
✔ Good for VPS deployment

🧠 Visual Flow
         ┌─────────┐
Users →  │  Nginx  │
         └────┬────┘
              │
      ┌───────┴────────┐
      │                │
   Blue (v1)       Green (v2)


Only one receives traffic.

🏆 Interview Answer Version

If asked:

How would you implement Blue-Green using Docker Compose?

You say:

I define two separate services (blue and green) in Docker Compose and use Nginx as a reverse proxy. The new version is deployed to the inactive service, tested, and then traffic is switched by updating the Nginx upstream configuration. This ensures zero downtime and instant rollback.

That answer = DevOps-ready backend engineer.

If you want next level, I can show:
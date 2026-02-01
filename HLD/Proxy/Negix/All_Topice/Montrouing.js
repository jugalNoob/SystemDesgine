Perfect 👌 — you’re now entering the Monitoring & Logging part of your Nginx + Node.js architecture.
This is where you ensure your system is observable, reliable, and debuggable.
Let’s build this in 3 parts:

🧠 1️⃣ Architecture Overview — Monitoring + Logging Layer
                             ┌────────────────────────────┐
                             │        CLIENTS             │
                             │ (Browser, Mobile, API)     │
                             └────────────┬───────────────┘
                                          │
                                          ▼
                         ┌──────────────────────────────────────┐
                         │              NGINX                   │
                         │──────────────────────────────────────│
                         │ ⚖️ Load Balancer                    │
                         │ 🚦 Rate Limiter                     │
                         │ 🩺 Health Check                     │
                         │ 📜 Access + Error Logs              │
                         │ 📈 Monitoring via Stub_Status       │
                         └────────────────┬────────────────────┘
                                          │
                                          ▼
                 ┌────────────────────────┴────────────────────────┐
                 │                 Node.js Cluster                 │
                 │────────────────────────────────────────────────│
                 │ 📦 App Logs (Winston / Morgan)                  │
                 │ 🧩 Metrics (Prometheus / OpenTelemetry)         │
                 │ 🧠 Error Logs + Exception Handling              │
                 │ 📈 Export Metrics to Grafana / Prometheus       │
                 └────────────────┬────────────────────────────────┘
                                  │
                                  ▼
                          ┌────────────────────────┐
                          │     Monitoring Stack   │
                          │ (Prometheus + Grafana) │
                          │ + Log Storage (ELK)    │
                          └────────────────────────┘

⚙️ 2️⃣ NGINX Monitoring + Logging Configuration
🔹 Access & Error Logs
http {
    log_format main '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    upstream node_cluster {
        server 127.0.0.1:9001 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 max_fails=3 fail_timeout=30s;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://node_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # 🔍 Expose NGINX Metrics for Monitoring
        location /nginx_status {
            stub_status;
            allow 127.0.0.1; # restrict to local monitoring
            deny all;
        }
    }
}


📄 Files created:

/var/log/nginx/access.log
/var/log/nginx/error.log

🧩 3️⃣ Node.js Logging Configuration

Use Winston (structured logs) and Morgan (HTTP logs):

npm install winston morgan

✅ logger.js
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Console output in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;

✅ server.js
const express = require("express");
const morgan = require("morgan");
const logger = require("./logger");
const app = express();
const PORT = process.env.PORT || 9001;

// HTTP request logging
app.use(morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

app.get("/", (req, res) => {
  res.send(`Hello from Node.js ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Error logging
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));


📄 Logs generated:

error.log
combined.log

📈 4️⃣ Monitoring Setup
🔹 NGINX Metrics

Enable /nginx_status:

curl http://localhost/nginx_status


Output Example:

Active connections: 3
server accepts handled requests
  10 10 25
Reading: 0 Writing: 1 Waiting: 2

🔹 Node.js Metrics with Prometheus

Install metrics library:

npm install prom-client


Add metrics endpoint:

const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // CPU, memory, etc.

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});


Prometheus config:

scrape_configs:
  - job_name: "nodejs_app"
    static_configs:
      - targets: ["localhost:9001", "localhost:9002"]

  - job_name: "nginx"
    metrics_path: /nginx_status
    static_configs:
      - targets: ["localhost"]

🧠 5️⃣ Optional: Centralized Logging (ELK Stack)

You can send logs from NGINX + Node.js to:

Elasticsearch — Store and index logs

Logstash — Process and parse logs

Kibana — Visualize and search logs

Or use Grafana Loki for a lightweight, modern setup.


| Component        | Purpose                            | Tools / Config                     |
| ---------------- | ---------------------------------- | ---------------------------------- |
| **NGINX**        | Access/Error logs, request metrics | `log_format`, `stub_status`        |
| **Node.js**      | Structured logs, errors            | `winston`, `morgan`                |
| **Monitoring**   | Performance metrics                | `prom-client`, Prometheus, Grafana |
| **Central Logs** | Full visibility                    | ELK or Loki Stack                  |

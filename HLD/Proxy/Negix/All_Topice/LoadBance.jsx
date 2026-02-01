🧠 What Is Load Balancing?

Load balancing means distributing incoming 
client requests across multiple backend servers to:

improve performance,

increase availability, and

prevent any single server from being overloaded.

Nginx is one of the most popular tools for reverse proxy + load balancing.

⚙️ Nginx Load Balancer Configuration

Here’s a complete minimal config 👇

# /etc/nginx/nginx.conf
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    # --- Define the backend pool (upstream block) ---
    upstream node_cluster {
        server 127.0.0.1:9001;
        server 127.0.0.1:9002;
        server 127.0.0.1:9003;
        # Optional: load balancing methods (round robin by default)
        # least_conn;   # Use least connections
        # ip_hash;      # Same client always goes to same server
    }

    # --- Main Reverse Proxy Server ---
    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://node_cluster; # Forward to backend pool
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}


⚡ How It Works
Step 1️⃣

Clients send HTTP requests to Nginx (http://localhost).

Step 2️⃣

Nginx receives the request and forwards it to one of the backend Node.js servers from the upstream pool.

Step 3️⃣

Nginx decides which backend to use based on its load balancing algorithm.

Step 4️⃣

The backend (Node.js) handles the request and responds → Nginx forwards the response back to the client.

🧩 Supported Load Balancing Methods


| Method                | Directive                         | Description                                                    |
| --------------------- | --------------------------------- | -------------------------------------------------------------- |
| **Round Robin**       | *(default)*                       | Requests are distributed evenly among servers                  |
| **Least Connections** | `least_conn;`                     | Sends traffic to the server with the fewest active connections |
| **IP Hash**           | `ip_hash;`                        | Same client IP always hits the same backend                    |
| **Weight**            | `server 127.0.0.1:9001 weight=3;` | Gives some servers higher priority                             |


       ┌──────────────┐
       │   CLIENT     │
       │ (Browser)    │
       └──────┬───────┘
              │
              ▼
   ┌────────────────────────┐
   │        NGINX           │
   │  (Reverse Proxy + LB)  │
   └──────┬──────┬──────┬───┘
          │      │      │
          ▼      ▼      ▼
 ┌──────────┐ ┌──────────┐ ┌──────────┐
 │ Node.js  │ │ Node.js  │ │ Node.js  │
 │ 9001     │ │ 9002     │ │ 9003     │
 └──────────┘ └──────────┘ └──────────┘



 🧪 Local Testing Setup

Start three Node servers:

// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;

app.get("/", (req, res) => {
  res.send(`Hello from Node.js on port ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


Run:

PORT=9001 node server.js
PORT=9002 node server.js
PORT=9003 node server.js


Then go to 👉 http://localhost — you’ll see responses alternating:

Hello from Node.js on port 9001
Hello from Node.js on port 9002
Hello from Node.js on port 9003



/////////// -------------------->>>Important ---------------------->>

worker_processes auto;

events {
    worker_connections 1024;
}

http {
    # Rate limiting zone (1 request/sec, burst 5)
    limit_req_zone $binary_remote_addr zone=apilimit:10m rate=1r/s;

    # --- LOAD BALANCER UPSTREAM CONFIG ---
    upstream express_cluster {
        # Define multiple Node.js backend instances
        server express-api1:3000;
        server express-api2:3000;

        # Optional settings
        keepalive 64;
    }

    # --- MAIN SERVER FOR EXPRESS API ---
    server {
        listen 80;
        server_name api.localhost;

        location / {
            # Apply rate limiting
            limit_req zone=apilimit burst=5 nodelay;

            # Forward to load balancer (round robin)
            proxy_pass http://express_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }

    # --- SECOND SERVER FOR WHOAMI TEST ---
    server {
        listen 80;
        server_name traefik.localhost;

        location / {
            proxy_pass http://whoami:80;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
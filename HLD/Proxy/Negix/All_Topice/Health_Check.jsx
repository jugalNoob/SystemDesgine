🧠 What Is a Health Check?

A health check ensures that your backend servers 
(like Node.js apps) are alive and responding.
If one instance goes down, NGINX will stop routing
 requests to it until it recovers.


 This helps:

avoid sending requests to crashed servers,

ensure high availability,

make load balancing more reliable.

⚙️ Basic Health Check Setup

If you’re using open-source NGINX, it doesn’t have active health checks built in — but it does passive health checks automatically.

🟢 Passive Health Checks (default)

NGINX automatically removes unresponsive servers from the load-balancing rotation when it detects repeated failures (timeouts, 500 errors, etc.).

You can tune this with max_fails and fail_timeout:

http {
    upstream node_cluster {
        server 127.0.0.1:9001 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003 max_fails=3 fail_timeout=30s;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://node_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}

🧩 Explanation


| Directive          | Meaning                                                                       |
| ------------------ | ----------------------------------------------------------------------------- |
| `max_fails=3`      | After 3 failed attempts, NGINX marks the server as *unhealthy*                |
| `fail_timeout=30s` | The unhealthy server will be retried after 30 seconds                         |
| *(default)*        | NGINX detects failure when the server doesn’t respond or returns a bad status |


So if 127.0.0.1:9002 keeps failing 3 times, NGINX stops sending it traffic for 30 seconds.

🧠 Example Flow (ASCII Diagram)
        ┌──────────────┐
        │   CLIENT     │
        └──────┬───────┘
               │
               ▼
   ┌────────────────────────────┐
   │         NGINX              │
   │   (Reverse Proxy + LB)     │
   └──────┬───────────┬────────┘
          │           │
          ▼           ▼
 ┌──────────┐   ┌──────────┐
 │ Node.js  │   │ Node.js  │
 │ :9001 ✅ │   │ :9002 ❌ │ ← unhealthy (removed)
 └──────────┘   └──────────┘


NGINX routes traffic only to healthy backends.

🔍 Optional: Active Health Checks (with NGINX Plus)

If you use NGINX Plus (commercial version), you can configure active health checks like this:

upstream node_cluster {
    zone backend 64k;
    server 127.0.0.1:9001;
    server 127.0.0.1:9002;
    server 127.0.0.1:9003;

    # Active health check (NGINX Plus only)
    health_check interval=5s fails=2 passes=3 uri=/health;
}

Option	Description


| Option        | Description                            |
| ------------- | -------------------------------------- |
| `interval=5s` | Check every 5 seconds                  |
| `fails=2`     | Mark unhealthy after 2 failed checks   |
| `passes=3`    | Mark healthy after 3 successful checks |
| `uri=/health` | The endpoint used for health checks    |



checks
🧠 Node.js Health Endpoint Example

In your Node.js servers, create a simple /health route:

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


When NGINX checks /health, it expects 200 OK.
If not, it marks that server as unhealthy.

✅ Recommended Setup (Combined)
http {
    upstream node_cluster {
        server 127.0.0.1:9001 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003 max_fails=3 fail_timeout=30s;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://node_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Optional: test health endpoint directly
        location /health {
            proxy_pass http://node_cluster;
        }
    }
}

✅ Summary
| Type                     | Built-in              | Config                      | Behavior                                     |
| ------------------------ | --------------------- | --------------------------- | -------------------------------------------- |
| **Passive Health Check** | ✅ NGINX Open Source   | `max_fails`, `fail_timeout` | Marks servers as down after failed responses |
| **Active Health Check**  | 🚫 Only in NGINX Plus | `health_check uri=/health`  | Periodically pings servers                   |
d




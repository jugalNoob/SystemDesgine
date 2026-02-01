🧠 What Is a Reverse Proxy

A Reverse Proxy sits in front of one or more backend servers (like Node.js apps).

It:

Receives client requests,

Forwards them to your backend app,

Returns the response back to the client.

Nginx is a very common reverse proxy because it’s fast, secure, and load-balances easily.




⚙️ Basic Nginx Reverse Proxy Config

Here’s the minimal working example:

# /etc/nginx/nginx.conf
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name localhost;

        # Reverse Proxy rule
        location / {
            proxy_pass http://127.0.0.1:9000;  # your Node.js app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}




🔄 Flow Explanation
javascript
Copy code
   ┌──────────────┐
   │   CLIENT     │
   │ (Browser)    │
   └──────┬───────┘
          │  http://localhost/
          ▼
   ┌──────────────────┐
   │     NGINX        │
   │ (Reverse Proxy)  │
   └──────┬───────────┘
          │ forwards to backend
          ▼
   ┌──────────────────┐
   │ Node.js App      │
   │ (localhost:9000) │
   └──────────────────┘
✅ Client talks only to Nginx, not directly to Node.js.
✅ Nginx hides your backend, balances traffic, and adds caching/security.

⚡ Reverse Proxy + Load Balancer Example
If you have multiple Node.js servers (e.g. cluster or Docker):

nginx
Copy code
http {
    upstream express_cluster {
        server 127.0.0.1:9001;
        server 127.0.0.1:9002;
    }

    server {
        listen 80;
        server_name api.localhost;

        location / {
            proxy_pass http://express_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
Now Nginx distributes requests between:

Node.js on port 9001

Node.js on port 9002

🧩 Summary
Component


| Component       | Role                                    |
| --------------- | --------------------------------------- |
| **Nginx**       | Acts as reverse proxy and load balancer |
| **Node.js App** | Handles business logic                  |
| **proxy_pass**  | Forwards traffic to backend             |
| **upstream**    | Defines backend servers group           |

⚖️ What Is Rate Limiting?

Rate limiting controls how many requests a client can make per second/minute.
👉 It helps protect your backend (Node.js, APIs, etc.) from:

DDoS / brute-force attacks

Excessive API usage

Performance overloads

⚙️ Basic NGINX Rate Limit Configuration

Add this inside the http {} block of your nginx.conf 👇

http {
    # 🔹 1️⃣ Define a rate limit zone
    #    - $binary_remote_addr: unique key per client IP
    #    - zone=api_limit:10m → shared memory of 10MB to store rate data
    #    - rate=5r/s → 5 requests per second allowed
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/s;

    upstream node_cluster {
        server 127.0.0.1:9001;
        server 127.0.0.1:9002;
        server 127.0.0.1:9003;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            # 🔹 2️⃣ Apply the rate limit
            limit_req zone=api_limit burst=10 nodelay;

            #   zone=api_limit   → use the zone defined above
            #   burst=10         → allow short spikes (queue up to 10)
            #   nodelay          → reject excess requests immediately (no wait)

            proxy_pass http://node_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}

⚙️ Explanation of Directives



| Directive             | Meaning                                                |
| --------------------- | ------------------------------------------------------ |
| `limit_req_zone`      | Creates a shared memory zone that tracks request rates |
| `$binary_remote_addr` | Key used to identify clients (IP address)              |
| `rate=5r/s`           | Allow 5 requests per second per IP                     |
| `limit_req`           | Applies the rate limiting rule                         |
| `burst=10`            | Allow up to 10 queued extra requests temporarily       |
| `nodelay`             | Reject extra requests immediately instead of delaying  |



🧩 ASCII Flow Diagram
   ┌──────────────┐
   │   CLIENT     │
   │  (IP 1.2.3.4)│
   └──────┬───────┘
          │
          ▼
 ┌────────────────────────────┐
 │         NGINX              │
 │   Rate Limit Zone:         │
 │   5 req/sec, burst=10      │
 └──────┬─────────────┬──────┘
        │             │
        ▼             ▼
 ┌──────────┐   ┌──────────┐
 │ Node.js  │   │ Node.js  │
 │ 9001     │   │ 9002     │
 └──────────┘   └──────────┘


✅ If a client sends more than 5 requests/sec, NGINX starts dropping requests with
HTTP 503 (Service Temporarily Unavailable).

🧪 Testing It Locally

Once you set up Nginx + Node servers, test with:

ab -n 100 -c 10 http://localhost/


(Using Apache Benchmark tool)

You’ll see some requests succeed, and some fail with:

HTTP/1.1 503 Service Temporarily Unavailable

⚙️ Optional: Per-API Limiting Example

If you want to apply different limits to different paths:

location /api/ {
    limit_req zone=api_limit burst=5 nodelay;
    proxy_pass http://node_cluster;
}

location /images/ {
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://node_cluster;
}



| Feature          | Directive        | Example                                             |
| ---------------- | ---------------- | --------------------------------------------------- |
| Define rate zone | `limit_req_zone` | `$binary_remote_addr zone=api_limit:10m rate=5r/s;` |
| Apply rate limit | `limit_req`      | `limit_req zone=api_limit burst=10 nodelay;`        |
| Burst requests   | `burst=10`       | allows short traffic spikes                         |
| Reject instantly | `nodelay`        | drop instead of delay                               |

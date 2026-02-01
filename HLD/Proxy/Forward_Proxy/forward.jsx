🔁 Reverse Proxy vs Forward Proxy (INTUITION FIRST)
🧠 Reverse Proxy (what you already know)

Protects the SERVER

Client ──▶ Reverse Proxy ──▶ Backend Server


Client does NOT know backend exists

Used for:

Load balancing

SSL termination

Rate limiting

Caching

Examples

Nginx

HAProxy

AWS ALB / NLB

🧠 Forward Proxy (new concept)

Protects / controls the CLIENT

Client ──▶ Forward Proxy ──▶ Internet / External Server


Server does NOT know the real client

Client explicitly uses the proxy

Proxy decides where client can go

🧩 WHEN DO WE USE FORWARD PROXY?
✅ Use cases

Company / Office network

Block Facebook, YouTube

Log employee traffic

IP masking / anonymity

Hide client IP

VPN works like a forward proxy

Caching outbound requests

Cache Google APIs, GitHub APIs

Security filtering

Malware blocking

Content filtering

🌍 REAL-WORLD EXAMPLE
Without Forward Proxy
Browser ──▶ google.com

With Forward Proxy
Browser ──▶ Forward Proxy ──▶ google.com


👉 Google sees proxy IP, not client IP.

⚙️ HOW TO USE FORWARD PROXY (PRACTICALLY)
1️⃣ Browser-based Forward Proxy

Manually configure proxy in browser / OS.

Chrome / Firefox → Network → Proxy

Set:

IP: 10.0.0.5

Port: 3128

Popular tools

Squid Proxy

Privoxy

2️⃣ Node.js Forward Proxy (Simple Example)
Client → Proxy → External API
import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/proxy", async (req, res) => {
  const url = req.query.url; // https://api.github.com

  const response = await fetch(url);
  const data = await response.text();

  res.send(data);
});

app.listen(3000, () => {
  console.log("Forward proxy running on port 3000");
});


Client request:

GET /proxy?url=https://api.github.com

3️⃣ Forward Proxy with Nginx
Nginx as forward proxy
server {
  listen 8080;

  resolver 8.8.8.8;

  location / {
    proxy_pass $scheme://$http_host$request_uri;
  }
}


Client:

curl -x http://proxy-ip:8080 https://example.com

4️⃣ Forward Proxy + Authentication

Used in enterprises:

Client ──▶ Authenticated Forward Proxy ──▶ Internet


Username/password

IP whitelisting

Logs every request

🔥 REVERSE vs FORWARD (INTERVIEW TABLE)



| Feature            | Forward Proxy       | Reverse Proxy  |
| ------------------ | ------------------- | -------------- |
| Protects           | Client              | Server         |
| Who configures it? | Client              | Server         |
| Hides              | Client IP           | Server IP      |
| Common usage       | VPN, Office network | Load balancing |
| Example            | Squid               | Nginx          |




🎯 WHEN TO USE BOTH TOGETHER

🔥 Very common in big systems:

Client
  │
  ▼
Forward Proxy (ISP / VPN)
  │
  ▼
Internet
  │
  ▼
Reverse Proxy (Nginx)
  │
  ▼
Backend Server

🧠 INTERVIEW ONE-LINER (IMPORTANT)

Forward proxy sits in front of the client and controls outbound traffic.
Reverse proxy sits in front of servers and controls inbound traffic.

If you want, next I can:

Draw an architecture diagram

Show Forward proxy vs API Gateway

Explain Transparent vs Explicit forward proxy

Show How VPN is a forward proxy internally

Just tell me 😄
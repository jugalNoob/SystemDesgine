🏗 L7 Load Balancer Types

We can classify Layer 7 Load Balancers into 3 main types:

1️⃣ Software Load Balancers (Self-Managed)

Installed on a VM or container

Fully configurable

Examples:

Nginx / Nginx Plus

Open-source & widely used

URL/path routing

Sticky sessions

SSL/TLS termination

HAProxy

Extremely performant

Supports stickiness, header routing, rate limiting

Traefik

Modern cloud-native

Auto-discovery of services

Lets you route gRPC, WebSocket, HTTP

Pros:

Very flexible

Cheap (can run on existing servers)

Cons:

Maintenance + scaling is your responsibility
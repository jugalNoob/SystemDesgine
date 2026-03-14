1️⃣ Cache 🗂️

Definition:
Cache is temporary storage of data to make 
repeated requests faster.

Where it exists:

Browser cache (on user’s computer)

Application cache (like Redis, Memcached)

Proxy cache

Purpose:

Reduce repeated computation or database calls

Improve response time

Example:

User requests /profile.jpg

Browser stores it in cache → next time user opens 
page, image loads instantly

Redis cache stores recent API 
responses → reduces database load

Pros:

Fast access for repeated data

Reduces server load

Cons:

Limited size

Needs cache invalidation for updated data



2️⃣ CDN (Content Delivery Network) 🌐

Definition:
CDN is a network of distributed servers that
 delivers content (static files like images, videos, CSS)
  from the nearest server to the user.

Where it exists:

Edge servers around the world (Cloudflare, Akamai, AWS CloudFront)

Purpose:

Reduce latency globally

Handle millions of users

Reduce load on origin servers

Example:

User in India opens Netflix video

Video is served from nearest CDN server in India,
 not the main server in the US

Pros:

Global speed improvement

Reduces load on origin server

High availability

Cons:

Extra cost

Cache invalidation needed when content updates

Quick Comparison Table
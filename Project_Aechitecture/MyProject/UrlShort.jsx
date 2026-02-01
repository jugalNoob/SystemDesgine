1️⃣ Tech Stack

Frontend / Client: React.js or any frontend to handle URL submissions and redirects.

Backend / API: Node.js + Express.js

Database: MongoDB (for URL mapping and analytics)

Message Queue: Kafka (for asynchronous analytics, logging, or notifications)

Cache: Redis (for fast URL lookups)

2️⃣ Architecture Overview
[ Client / Browser ]
        |
        v
[ Load Balancer ] --> distributes requests to multiple servers
        |
        v
[ Application Servers (Node.js + Express) ] 
        |
   +----+-----+
   |          |
   v          v
[ Redis ]   [ MongoDB ]
   |          |
   v          v
[ Fast URL lookups ]  [ Persistent storage of URL data & analytics ]
        |
        v
[ Kafka (Optional) ]  --> asynchronous logging / analytics

3️⃣ Core Components
A. Application Server

POST /shorten: Create a short URL

Validate URL

Generate unique code (e.g., hash, base62)

Store in MongoDB

Cache in Redis

Push event to Kafka (optional analytics)

GET /:shortCode: Redirect to long URL

Check Redis cache first

Fallback to MongoDB if cache miss

Update hit counter asynchronously (Kafka → analytics DB)

B. Database Schema (MongoDB)

1. URL Collection

{
  "_id": ObjectId,
  "shortCode": "abc123",
  "longUrl": "https://example.com/very/long/url",
  "createdAt": ISODate,
  "expiry": ISODate,           // optional
  "hitCount": 123              // optional, can be in analytics table
}


2. Analytics Collection (optional)

{
  "_id": ObjectId,
  "shortCode": "abc123",
  "timestamp": ISODate,
  "ip": "192.168.1.1",
  "userAgent": "Chrome/..."
}

C. Kafka Usage

Topic: url_hits

Producers: Application server pushes each click event

Consumers: Analytics service stores event data in MongoDB asynchronously

Benefit: Decouples hit tracking from main API, improves performance

D. Caching (Redis)

Cache the mapping: shortCode → longUrl

TTL: optional (if URLs expire)

Improves read performance for high-traffic short links

E. Rate Limiting

Goal: Prevent abuse (spam URL creation)

Implementation:

Use Redis to track IP-based or user-based request counts per minute

IP:timestamp → count pattern

F. High Availability

Load Balancer: Round-robin or least connections to Node.js servers

Stateless Servers: Horizontal scaling possible

Database: MongoDB replica sets

Kafka: Cluster mode for durability

Cache: Redis cluster or sentinel setup

G. Optional Features

Analytics Dashboard: Hits per URL, top URLs, geolocation, time-series charts

URL Expiry: Remove or archive old URLs periodically

Custom URLs: Users can provide their own shortCode

H. URL Generation Strategy

Base62 encoding of an auto-increment ID

Hashing of long URL + random salt

Collision handling: Check DB before assigning

I. Sequence Flow Example

Shorten URL

Client → POST /shorten → App Server
        → Generate shortCode
        → Store in MongoDB
        → Cache in Redis
        → Return short URL


Redirect URL

Client → GET /abc123 → App Server
        → Check Redis cache
          → Hit? Redirect
          → Miss? Fetch MongoDB, redirect, update cache
        → Send hit event to Kafka (async)
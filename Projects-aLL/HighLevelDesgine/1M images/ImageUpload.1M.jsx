Love this question 🔥 — this is real system design level.

Goal:

Serve 1 Million images per minute
That is ≈ 16,666 images per second

We’ll design this using:

Google Cloud Storage

Cloudflare

🚀 Step 1️⃣ First Understand the Scale
1M images/minute =
1,000,000 / 60 = 16,666 requests/sec


If average image size = 200 KB

Bandwidth per second:

16,666 × 200 KB = ~3.3 GB/sec


⚠️ No single Node.js server can handle this.
⚠️ Even hitting GCS directly would be very expensive.

So we must use CDN-first architecture.

🏗 🔥 Final Architecture (High Scale)
                ┌────────────────────┐
                │        Users       │
                │ (Web / Mobile App) │
                └─────────┬──────────┘
                          │
                          ▼
            ┌─────────────────────────┐
            │   Cloudflare CDN Edge   │
            │  (200+ global locations)│
            └─────────┬───────────────┘
                      │
          Cache Hit (95%+) │ Cache Miss (5%)
                      │
                      ▼
            ┌─────────────────────────┐
            │  Google Cloud Storage   │
            │  (Primary Image Store)  │
            └─────────────────────────┘


🔥 Notice something important:

Node.js is NOT in the image serving path.

This is critical for 1M/min scale.

🎯 Core Principle

🚀 Serve images directly from CDN
❌ Never route image traffic through your API

If you do this:

User → Node → GCS


Your Node servers will die instantly at 16k RPS.

🔥 Step 2️⃣ How This Actually Works
1️⃣ Upload Flow
Client → Node API → GCS


Node:

Validates image

Uploads to GCS

Stores image URL in DB

Returns CDN URL

2️⃣ Delivery Flow (High Scale)
User → Cloudflare CDN


If image cached:
✅ Served instantly from edge

If not cached:

CDN → GCS → Cache at edge → Return

📊 Why This Handles 1M/min
Assume:

95% cache hit ratio

Only 5% reach GCS

So:

1,000,000 × 5% = 50,000 requests/min


GCS handles only 833 req/sec.

Very manageable.

🔥 Step 3️⃣ Optimization Techniques
✅ 1. Use Long Cache Headers

Set:

Cache-Control: public, max-age=31536000, immutable


This makes CDN cache aggressively.

✅ 2. Use Image Versioning

Instead of deleting cache:

avatar_v1.png
avatar_v2.png


Prevents cache invalidation storm.

✅ 3. Use Image Resizing Service

Instead of storing 10 sizes:

Use:

Cloudflare Image Resizing

Or a microservice

Example:

/image/123?w=200&h=200


Reduces storage duplication.

✅ 4. Use Multiple Regions

In GCS:

Multi-region bucket

Auto-replication

Prevents latency spikes.

✅ 5. Enable HTTP/3 + Brotli

Cloudflare handles:

TLS termination

Compression

HTTP/3

DDoS protection

Your backend never sees image traffic.

📈 Scaling Math

If each CDN edge handles:

5,000 RPS

And Cloudflare has 200+ PoPs globally:

Total capacity:

200 × 5,000 = 1,000,000 RPS


You only need 16k RPS.

You’re extremely safe.

🔥 Advanced Enterprise Architecture
Users
  ↓
Cloudflare (CDN + WAF + DDoS)
  ↓
GCS (Multi-region)
  ↓
Lifecycle rules (auto move old images to cold storage)


Plus:

Redis for metadata

Node cluster for upload

Background workers for image processing

Kafka for async processing (resize, watermark, etc.)

🧠 Interview Answer (Clean Version)

“To serve 1M images per minute, we remove the application server from the serving path. Images are stored in Google Cloud Storage and delivered via Cloudflare CDN. With a 95% cache hit ratio, only 5% of traffic reaches storage. We use long cache headers, versioned filenames, and multi-region storage to ensure scalability and cost efficiency.”

🔥 That’s a senior-level answer.

💰 Cost Control Strategy

Without CDN:

1M/min hitting GCS → extremely expensive

With CDN:

Most traffic served from edge

Massive bandwidth savings

🎯 Final Rule

At scale:

❌ Do not serve images via Node.js
❌ Do not proxy images
❌ Do not store images in Redis

✅ Use Object Storage + CDN
✅ Keep API out of delivery path

If you want next:

🔥 Failure scenarios (what if GCS goes down?)

🔥 Cost estimation for 1M/min

🔥 Instagram-level architecture

🔥 Multi-CDN failover design



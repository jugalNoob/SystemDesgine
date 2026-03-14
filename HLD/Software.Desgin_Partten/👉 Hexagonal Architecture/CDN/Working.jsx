Excellent 🔥
Now we go deep into How CDN caching works internally (interview-level explanation).

We’ll use:

Cloudflare

Akamai

🌍 1️⃣ Big Picture Flow

When a user requests an image:

User → DNS → Edge Server → (Cache?)
                              ↓
                           Origin

🧠 2️⃣ Step-by-Step Internal Flow
🔹 Step 1: DNS Resolution

When user requests:

https://cdn.mysite.com/image.jpg


DNS (managed by CDN provider) returns nearest edge server IP.

This is done using:

Anycast routing

Geo-based DNS

User automatically connects to nearest edge.

🔹 Step 2: Edge Server Receives Request

Edge checks:

Is file in cache memory/disk?


Two possibilities:

✅ Case 1: Cache HIT

File already stored.

Edge → Serve directly to user


⚡ Response time: 5–30ms
Origin not contacted.

❌ Case 2: Cache MISS

File not found.

Edge → Fetch from Origin Server
         ↓
     Store in cache
         ↓
     Return to user


Now next request = HIT.

🧩 3️⃣ What Happens Internally in Edge?

Edge server usually has:

1️⃣ Memory Cache (RAM)

Very hot content.

2️⃣ SSD Disk Cache

Large but slightly slower.

3️⃣ Cache Index (Hash Map)

Key → File location mapping.

Example:

Key: /image123.jpg
Value: /ssd/cache/abc123.bin

🔥 4️⃣ Cache Key Design

CDN creates unique cache key based on:

Domain + Path + Query Params + Headers


Example:

GET /image.jpg?size=small


Different query = different cache entry.

⏳ 5️⃣ TTL (Time To Live)

Each cached file has TTL.

Example:

Cache-Control: max-age=3600


Means:
Cache for 1 hour.

After TTL expires:
Edge revalidates with origin.

🔄 6️⃣ Cache Revalidation

Instead of downloading full file again, CDN uses:

🔹 ETag
🔹 Last-Modified

Edge asks origin:

Has this file changed?


If NOT changed:
Origin replies:

304 Not Modified


Edge keeps old copy.

🧠 7️⃣ Eviction Policy

Cache is limited in size.

When full:

CDN uses:

LRU (Least Recently Used)

LFU (Least Frequently Used)

Popular content stays.
Cold content removed.

🌎 8️⃣ Multi-Layer Caching (Advanced)

Large CDNs use hierarchy:

User
  ↓
Edge POP (Mumbai)
  ↓
Regional Cache (Asia)
  ↓
Origin


If Mumbai edge misses:
It checks regional cache before origin.

Reduces origin load further.

🔥 9️⃣ Cache Invalidation (Very Important)

If image updated:

You must purge cache.

Methods:

Manual purge API

Versioned URLs

image.jpg?v=2


Short TTL strategy

⚡ 10️⃣ How CDN Handles 1M RPS?

Edge servers:

Highly optimized (C/C++ core)

Event-driven (epoll/kqueue)

Zero-copy file serving

Keep-alive connections

HTTP/2 multiplexing

TLS termination at edge

Origin is protected.

📊 Real Example (Video)

If 1GB video:

1M users watch.

Without CDN:

1M GB from origin


With CDN:
If 98% cache hit:

Only 20,000 GB from origin


Massive cost saving.

🎯 Interview-Level Answer

“CDN caching works by routing users to the nearest edge server using Anycast DNS. The edge checks its local cache (RAM/SSD). On cache hit, it serves directly. On miss, it fetches from origin, stores locally with TTL, and serves. Advanced CDNs use hierarchical caching and LRU/LFU eviction to scale globally.”

🚀 Next Level (Tell Me Which)

🔥 CDN vs Load Balancer difference

🔥 Edge computing vs CDN

🔥 How CDN protects against DDoS

🔥 How to design your own mini-CDN

🔥 CDN interview tricky questions
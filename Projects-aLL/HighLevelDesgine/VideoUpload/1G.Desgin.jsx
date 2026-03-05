Excellent 🔥
Now we move to real production-level thinking:

🎬 Design Video Upload System (1GB file) + Cost Estimation

This is very different from image design.

🎯 1️⃣ First — Clarify Requirements (Interview Style)

Assumptions:

Video size: 1GB average

Users upload videos

Users stream videos globally

Support millions of views

Need adaptive streaming (HD/SD)

Secure access

🚨 Important Rule

❌ Never upload 1GB video through your Node.js server
❌ Never store video in Redis
❌ Never serve video through API server

We must use direct upload to object storage.

🏗 2️⃣ High-Level Video Architecture

Using:

Google Cloud Storage

Cloudflare

Client
  ↓
API (Get Signed Upload URL)
  ↓
Direct Upload to Object Storage (1GB)
  ↓
Event Trigger
  ↓
Video Processing Workers
  ↓
Store Processed Segments
  ↓
CDN
  ↓
Users Stream Video

🔥 3️⃣ Upload Flow (Correct Way)
Step 1: User Requests Upload
Client → API → Generate Signed Upload URL


API returns:

Signed PUT URL (expires in 15 min)

Step 2: Direct Upload
Client → GCS (1GB upload)


This prevents:

Backend overload

Timeout issues

Network bottlenecks

🎬 4️⃣ Video Processing (Very Important)

After upload:

Storage → Event Trigger → Worker Queue


Workers:

Transcode video

Convert to HLS format

Generate multiple qualities:

240p

480p

720p

1080p

Generate thumbnail

Split into small chunks (.ts segments)

Why?

Streaming works in small chunks.

🌍 5️⃣ Video Streaming Flow
User → CDN → (Cache Hit)
                ↓
             (Miss)
                ↓
          Object Storage


CDN caches segments.

Node.js not involved in streaming path.

💰 6️⃣ Cost Breakdown (1GB Video)

Let’s estimate.

🟢 Storage Cost

If 1GB video:

Object storage approx:
₹1.5–2 per GB per month (India region approx)

But wait…

After transcoding:

Original: 1GB

4 resolutions: maybe 2–3GB total

Total storage:
~3GB

So:

3GB × ₹2 = ₹6 per month per video


If 10,000 videos:

₹60,000 per month storage

🟢 Bandwidth Cost (Real Killer 💸)

If 1 video gets:

10,000 views
Each view streams 1GB

Total transfer:

10,000 GB = 10TB


Bandwidth cost without CDN:
Very expensive.

With CDN:
Much cheaper due to caching.

🔥 Example Bandwidth Cost Rough Estimate

10TB outbound data/month:

Cloud storage egress cost:
Could be ₹6–10 per GB (varies by tier)

10TB = 10,000GB

10,000 × ₹6 = ₹60,000 bandwidth


⚠️ Bandwidth cost > storage cost

CDN reduces this massively.

🧠 7️⃣ Optimizations to Reduce Cost
✅ 1. Adaptive Bitrate Streaming (HLS)

User on mobile:
Streams 480p (smaller size)

Reduces bandwidth.

✅ 2. CDN Edge Caching

Popular video:
Served mostly from CDN

Reduces origin bandwidth cost.

✅ 3. Lifecycle Policies

Old videos:
Move to cold storage

Reduces storage cost.

✅ 4. Compress & Encode Efficiently

Use:

H.264

H.265

AV1

Better compression = lower cost.

📊 8️⃣ Scaling Example

If platform has:

1M videos

1GB each

After processing = 3GB each

Storage:

3M GB = 3,000 TB


Now you're in petabyte scale.

This is YouTube-level storage design.

🔥 9️⃣ Redis Role in Video System

Redis used for:

View counters

Like counters

Trending videos

Rate limiting

Metadata caching

NOT video storage.

🎯 Interview-Level Answer

“For 1GB video uploads, I would use direct signed URL upload to object storage to avoid backend bottlenecks. After upload, an event-driven pipeline would transcode the video into adaptive streaming formats. Videos are served via CDN to minimize bandwidth costs. Storage cost is relatively small compared to bandwidth, so caching and compression are critical.”

That’s strong.

🚀 Now Let Me Challenge You

If:

1GB video

1M views

Global audience

4K streaming enabled

What becomes the biggest bottleneck?

Storage?

Compute?

Bandwidth?

Redis?

Database?

Answer that and I’ll take you deeper into YouTube-level design.
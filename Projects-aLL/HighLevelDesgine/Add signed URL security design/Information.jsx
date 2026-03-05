Perfect 🔥 Let’s add Signed URL Security Design to an Instagram-level image architecture.

We’ll design this using:

Google Cloud Storage

Cloudflare

🎯 Why Signed URLs?

If you make your bucket public:

https://storage.googleapis.com/bucket/user123/avatar.png


❌ Anyone can access
❌ Can be scraped
❌ No expiry control
❌ No authorization

At Instagram-level scale → this is dangerous.

So we use Signed URLs.

🏗 Final Secure Architecture
User
  ↓
API (Auth check)
  ↓
Generate Signed URL (short TTL)
  ↓
Cloudflare CDN
  ↓
Google Cloud Storage (Private Bucket)


Important:

🔒 Bucket is PRIVATE
🔒 Only signed requests allowed
🔒 CDN respects signature

🔥 Step-by-Step Flow
🟢 1️⃣ Upload Flow
Client → API → GCS (private)


Store image in private bucket

Store object path in DB

Do NOT make public

🟢 2️⃣ Image Access Flow

When user requests image:

User → API → Auth check


API checks:

Is user logged in?

Is user allowed to see this post?

Is this a private account?

If allowed:

API generates signed URL:

expires in 5 minutes


Return URL to client.

🟢 3️⃣ Signed URL Example (Node.js)
const [url] = await bucket.file('posts/123.jpg').getSignedUrl({
  version: 'v4',
  action: 'read',
  expires: Date.now() + 5 * 60 * 1000, // 5 minutes
});


Client gets:

https://storage.googleapis.com/...
?X-Goog-Algorithm=...
&X-Goog-Expires=300
&X-Goog-Signature=...


After expiry → link invalid.

🔥 How CDN Works with Signed URLs

When using Cloudflare:

Option 1 (Simple):

CDN caches signed URL

Works if TTL reasonable

Option 2 (Advanced):

Use Cloudflare Signed URLs / Signed Cookies

Protect entire path

Better for high scale

In enterprise:

User → CDN verifies token → Fetch from origin


API not required every time.

🧠 Security Improvements
✅ 1. Short Expiry (5–15 min)

Limits abuse window.

✅ 2. Path-Based Restriction

Sign only specific object:

posts/123.jpg


Not entire bucket.

✅ 3. Use HTTPS Only

Prevent MITM attacks.

✅ 4. Use Token Binding (Advanced)

Include:

userId

IP hash

device info

Inside signature logic.

🔥 Instagram-Level Security Pattern

They don’t just use raw signed URLs.

They combine:

Auth token (JWT)

CDN signed cookies

Private origin storage

Rate limiting

Bot detection

🔥 Preventing URL Sharing

Problem:

User shares signed URL to friend.

Solution options:

Option 1: Very Short TTL (Best)

Expires in 2–5 min.

Option 2: IP-bound signature

Signed for specific IP.

Option 3: Signed Cookies at CDN

Better for session-based control.

🔥 Protecting Private Accounts

Flow:

User A requests User B private image
   ↓
API checks follower relationship
   ↓
If allowed → generate signed URL
Else → 403


Redis can cache:

relationship:userA:userB → true


Fast authorization check.

🔥 DDoS + Abuse Protection

Add:

CDN WAF

Rate limiting

Bot detection

Request throttling

Signed URL alone is NOT enough.

🔥 Multi-Region Signed URL Design

In multi-region:

Each region has service account

Keys rotated periodically

Old keys invalidated

Use key rotation every 90 days.

🎯 Interview-Ready Explanation

“Images are stored in a private object storage bucket. When a user requests access, the API validates authorization and generates a short-lived signed URL. The CDN caches content while respecting signature expiration. This prevents unauthorized scraping, limits exposure time, and ensures only authenticated users can access private media.”

🔥 That’s a strong security answer.

🏆 Production-Level Design Summary

| Layer      | Security Role       |
| ---------- | ------------------- |
| API        | Authorization check |
| Signed URL | Temporary access    |
| CDN        | Edge protection     |
| Storage    | Private bucket      |
| Redis      | Fast auth cache     |
| WAF        | DDoS protection     |




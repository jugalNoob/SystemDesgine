ngo / PHP backend runs here.

Handles:

User authentication

API requests

Database queries

Business logic

Example:

User clicks "Like" → Request goes to Cloud Server → DB updated → Response sent


Where it lives:

Centralized cloud servers like AWS EC2, Google Cloud, Azure.

2️⃣ CDN / Edge Server — Images / Videos 🌐

Static content (images, videos, CSS, JS) is stored in CDN servers close to users.

CDN caches the files, so users get them fast.

Example flow for updated image/video:

Step 1: Upload new content to cloud storage
  (e.g., AWS S3)

Step 2: CDN caches the file
  (Edge servers in different regions store it)

Step 3: User requests image/video
  → CDN server delivers it instantly

3️⃣ Combined Flow — Website + CDN
[User Browser / App]
        |
        v
[Cloud Server]  <-- Handles dynamic content, APIs, login
        |
        +----------------+
        |                |
        v                v
 [Database]        [CDN / Edge Server]
                   (Images, Videos, CSS, JS)

Result:
- Dynamic requests → Cloud server
- Static content → CDN server (low latency, fast delivery)

Key Notes:

Website code (HTML, APIs) always comes from cloud server.

Images/videos are uploaded once and cached globally in CDN servers.

Cache invalidation is used if an image/video is updated.

This separation reduces load on cloud servers and speeds up website globally.

✅ Interview Tip:

“Cloud servers handle dynamic website content and business logic, while CDNs/edge servers deliver static content like images and videos for faster user experience.”
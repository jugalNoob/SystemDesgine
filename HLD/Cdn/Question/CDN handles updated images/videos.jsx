Here’s a simple diagram showing how CDN handles updated images/videos and cache invalidation:

Step 1: Initial Upload / Request
--------------------------------
User (India) 
     |
     v
CDN Server (India)  <-- Cached old image/video
     |
     v
Origin Server (Your Node.js Server) --> Original file

User gets cached file from CDN

-------------------------------------------------------

Step 2: Update File on Origin
--------------------------------
Origin Server (Node.js)
     |
  Update image/video
     |
     v
CDN still has old cached file!

-------------------------------------------------------

Step 3: Cache Invalidation / TTL Expiry
---------------------------------------
Option 1: Manual Invalidation
User (India) 
     |
     v
CDN Server (India) <-- Purge old cache
     |
     v
Origin Server (Node.js) --> Serve new image/video
     |
     v
CDN caches new file
     |
     v
User gets updated content immediately

Option 2: TTL Expiry
CDN serves cached file until TTL expires
After TTL:
CDN fetches new file from origin automatically
User sees updated content

-------------------------------------------------------

Step 4: Future Requests
----------------------
User (India) 
     |
     v
CDN Server (India) --> Cached new file
     |
     v
Content delivered fast without hitting origin server


Key Points:

CDN always serves cached content first.

After file update, cache may be stale until:

TTL expires

Cache is manually invalidated (purged)

After invalidation, CDN fetches new file from origin and caches it for future users.
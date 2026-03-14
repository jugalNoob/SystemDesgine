                 [User Uploads Content]
                        |
                        v
             +------------------------+
             | Instagram Origin Server|
             | (Stores Original Files)|
             +------------------------+
                        |
          Unique URL generated for new file
                        |
                        v
          +----------------------------+
          |      CDN Servers Globally  |
          | (Caches images/videos)     |
          +----------------------------+
            |            |           |
   Nearest CDN  Nearest CDN  Nearest CDN
    (India)      (USA)       (Europe)

                        |
           +------------------------+
           |      User Request      |
           +------------------------+
                        |
             CDN serves content if cached
                        |
         Cache Miss? → Fetch from Origin, then cache
                        |
                Content delivered fast 🚀

----------------------------------------------------------
How Frequent Updates (Stories / Feed) Work:

  User uploads new story/post → New URL → CDN caches separately
  Short TTL for dynamic content → CDN fetches latest version quickly
  Result: Users always see newest posts and stories



  Key Points for Interview:

Unique URLs avoid cache conflicts.

Short TTL ensures frequently updated content is fresh.

Nearest CDN server delivers content fast, reducing latency.

Static vs Dynamic content is cached differently (long TTL for static images/videos, short TTL for stories/feed).

CDN reduces load on Instagram origin servers and handles millions of requests worldwide.
3. CDN + Web Application Architecture

Used for large scale websites.

             Users
               |
               v
           +--------+
           |  DNS   |
           +--------+
               |
               v
        +--------------+
        |     CDN      |
        | (Cloudflare) |
        +--------------+
               |
               v
        +--------------+
        | Load Balancer|
        +--------------+
               |
       -----------------------
       |          |          |
       v          v          v
   +-------+  +-------+  +-------+
   |Server |  |Server |  |Server |
   |Node   |  |Node   |  |Node   |
   +-------+  +-------+  +-------+
               |
               v
           +--------+
           |Database|
           +--------+


Example CDN

Cloudflare

Akamai

Benefits

Faster static content

Reduced server load
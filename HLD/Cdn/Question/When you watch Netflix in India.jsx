When you watch Netflix in India, your request does NOT go to a server 
in another country first.

Because Netflix uses a Content Delivery Network (CDN).


Netflix has its own CDN called Open Connect.

How CDN Works When You Use Netflix
Step 1 — User Request

You open Netflix on your phone or laptop in India.

User (India) → Netflix App

Step 2 — DNS Finds Nearest CDN Server

Netflix checks which CDN server is closest to you.

Example CDN locations:

Mumbai

Delhi

Bangalore

User → Nearest Netflix CDN Server

Step 3 — Video Delivered From Local CDN

The video is already stored on that CDN server.

User (India)
     |
     v
Netflix CDN Server (India)
     |
     v
Video Stream


So the data comes from India, not from the main Netflix server.

Step 4 — If Video Not in CDN Cache

If the video is not available in the CDN cache:

User → CDN Server → Netflix Origin Server


Then:

CDN downloads the video

Stores it (cache)

Sends it to users

Next users will get it directly from CDN.

Simple Real Example

Without CDN

User (India) → Server (USA) → Video


Very slow ❌

With CDN

User (India) → CDN Server (India) → Video


Very fast 🚀

Why Netflix Uses CDN

Faster streaming

Less buffering

Lower bandwidth cost

Handles millions of users

✅ Simple Interview Answer

When a user watches Netflix, the request goes to the nearest CDN server, which delivers the cached video instead of the main server, reducing latency and improving streaming speed.
Designing a Netflix-like global streaming system is a classic system design interview question. The real platform is Netflix.

The key challenge:

Millions of users
Global streaming
Low latency
Petabytes of video storage


Netflix solves this with CDN + distributed storage + microservices.

1️⃣ Functional Requirements

Users should be able to:

Watch movies and shows

Search content

Get recommendations

Resume playback

Stream on multiple devices

2️⃣ Non-Functional Requirements

System must support:

Global streaming

Millions of concurrent users

Low buffering

High availability (99.99%)

Important fact:

Streaming traffic is extremely high


Example

Millions of concurrent streams
Petabytes of video storage

3️⃣ High Level Architecture
                Users
                  |
                  v
               +------+
               | DNS  |
               +------+
                  |
                  v
               +------+
               | CDN  |
               +------+
                  |
                  v
            +-------------+
            | API Gateway |
            +-------------+
                  |
      --------------------------------
      |             |                |
      v             v                v
+------------+ +------------+ +-------------+
| Auth Svc   | | Video Svc  | | Search Svc  |
+------------+ +------------+ +-------------+
      |             |                |
      v             v                v
   User DB      Metadata DB      Search Index

4️⃣ Video Upload / Content Ingestion

Content comes from movie studios.

Studio Upload
      |
      v
+-------------+
| Ingest API  |
+-------------+
      |
      v
+-----------------+
| Video Processing|
| Transcoding     |
+-----------------+
      |
      v
+------------------+
| Distributed      |
| Storage          |
+------------------+


Video converted into multiple formats.

Example tool

FFmpeg

5️⃣ Video Transcoding Pipeline

Videos are converted into multiple resolutions.

Original Video
      |
      v
+------------+
| Transcoder |
+------------+
   |    |    |
   v    v    v
 240p 720p 4K


Why?

Adaptive streaming


Low internet → low resolution.

6️⃣ Global CDN Architecture

Netflix uses its own CDN called Open Connect.

Netflix Open Connect

ASCII diagram

              Users
                |
                v
            +------+
            | DNS  |
            +------+
                |
                v
         +-------------+
         | Global CDN  |
         +-------------+
        /      |       \
       v       v        v
  Edge Node  Edge Node  Edge Node
       |       |        |
       v       v        v
  Cached Video Cached Video Cached Video


Benefits

Lower latency

Reduced server load

Faster streaming

7️⃣ Streaming Flow

When a user watches a movie.

User
  |
  v
DNS resolves nearest CDN
  |
  v
CDN edge server
  |
  v
Video chunks streamed


ASCII flow

User Device
     |
     v
+---------+
|  DNS    |
+---------+
     |
     v
+-------------+
| CDN Edge    |
+-------------+
     |
     v
+-------------+
| Video Chunk |
| Streaming   |
+-------------+

8️⃣ Microservices Architecture

Netflix runs thousands of services.

                API Gateway
                     |
      -----------------------------------
      |           |           |         |
      v           v           v         v
 +--------+   +--------+   +--------+  +--------+
 | Auth   |   | Video  |   | Search |  | Billing|
 +--------+   +--------+   +--------+  +--------+
      |           |           |         |
      v           v           v         v
    DB          DB          Index      DB


Benefits

Independent scaling
Fault isolation

9️⃣ Recommendation System

Netflix recommendations are critical.

Architecture

User Activity
      |
      v
+-------------+
| Event Queue |
+-------------+
      |
      v
+----------------+
| Recommendation |
| Engine         |
+----------------+
      |
      v
Personalized Feed


Event streaming tool example

Apache Kafka

🔟 Playback System

Netflix uses adaptive streaming protocols.

Example protocol

HTTP Live Streaming

Video split into chunks.

movie.m3u8
 |
 +-- chunk1.ts
 +-- chunk2.ts
 +-- chunk3.ts


Player loads chunks dynamically.

1️⃣1️⃣ Final Netflix Global Architecture
                      Users
                        |
                        v
                     +------+
                     | DNS  |
                     +------+
                        |
                        v
                 +-------------+
                 | Global CDN  |
                 +-------------+
                        |
                        v
                  +-----------+
                  | API Gate  |
                  +-----------+
                        |
     --------------------------------------------------
     |            |             |                     |
     v            v             v                     v
 +--------+   +--------+   +-----------+        +-------------+
 | Auth   |   | Video  |   | SearchSvc |        | Recommend   |
 |Service |   |Service |   |           |        | Engine      |
 +--------+   +--------+   +-----------+        +-------------+
      |            |             |                    |
      v            v             v                    v
   User DB     Metadata DB   Search Index           Kafka
      |
      v
Distributed Storage
      |
      v
Video Processing Pipeline

1️⃣2️⃣ Key Scaling Techniques
CDN Edge Servers

Cache videos near users.

Example

Netflix Open Connect

Video Chunking

Large video split into segments.

video → chunks → streamed

Adaptive Bitrate

Quality changes based on network speed.

Distributed Storage

Videos stored across many servers.

1️⃣3️⃣ Interview Questions

Interviewers often ask:

Q1

How does Netflix reduce buffering?

Answer

CDN edge caching + adaptive bitrate streaming

Q2

How does Netflix scale globally?

Answer

Global CDN + distributed storage

Q3

How does Netflix personalize recommendations?

Answer

User activity events processed by recommendation engine


✅ If you'd like, I can also show the 5 HARDEST system design interview architectures:

WhatsApp Architecture (real-time messaging)

Uber Architecture (location + driver matching)

Google Drive Architecture (file storage)

Instagram Architecture (feed system)

Amazon Architecture (global e-commerce)

These are extremely powerful system design examples for interviews.
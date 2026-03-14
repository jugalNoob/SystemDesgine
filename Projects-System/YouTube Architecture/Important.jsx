Designing a YouTube-like system is one of the most common system design interview questions. The real product is YouTube owned by Google.

I’ll explain step-by-step with ASCII architecture, focusing on scaling to millions of users.

1️⃣ Functional Requirements

Users should be able to:

Upload videos

Watch videos

Search videos

Like / comment / subscribe

Get recommended videos

Stream video smoothly

2️⃣ Non-Functional Requirements

System must support:

Millions of videos

Millions of viewers

High availability

Low latency video playback

High storage

Important reality:

Video streaming traffic is HUGE


Example scale

Upload: 500 hours video / minute
Watch: millions of concurrent viewers

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
               +------------+
               | API Gateway|
               +------------+
                     |
         ---------------------------------
         |               |               |
         v               v               v
   +-----------+   +-----------+   +-----------+
   | UploadSvc |   | VideoSvc  |   | SearchSvc |
   +-----------+   +-----------+   +-----------+
         |               |               |
         v               v               v
     Object Store     Metadata DB      Index DB


Example CDN provider

Cloudflare

4️⃣ Video Upload Flow

When a creator uploads video.

Creator
   |
   v
Upload API
   |
   v
Temporary Storage
   |
   v
Video Processing Pipeline
   |
   v
Object Storage


ASCII diagram

User Upload
    |
    v
+------------+
| Upload API |
+------------+
      |
      v
+------------------+
| Temporary Storage|
+------------------+
      |
      v
+------------------+
| Video Processing |
| (Transcoding)    |
+------------------+
      |
      v
+------------------+
| Object Storage   |
+------------------+


Storage could be systems similar to:

Google Cloud Storage

5️⃣ Video Processing (Very Important)

Uploaded video must be converted into multiple formats.

Example

Original Video
    |
    v
+----------------+
| Transcoder     |
+----------------+
   |     |     |
   v     v     v
 240p  720p  1080p


This enables adaptive streaming.

Example technology

FFmpeg

6️⃣ Video Streaming Architecture

Users stream from CDN instead of origin server.

User
  |
  v
+------+
| CDN  |
+------+
  |
  v
Edge Server
  |
  v
Video Storage


ASCII architecture

                Users
                  |
                  v
              +--------+
              |  CDN   |
              +--------+
             /    |    \
            v     v     v
      Edge Server Edge Server Edge Server
            |
            v
      Video Storage


Benefits

Reduced latency

Less load on servers

7️⃣ Video Metadata System

Video information stored separately.

Video Metadata
--------------
videoId
title
description
creatorId
views
likes
uploadTime


Stored in database like:

MongoDB

8️⃣ Search System

Users search videos.

User Search
     |
     v
+-----------+
| Search API|
+-----------+
     |
     v
+-----------+
| Search DB |
+-----------+
     |
     v
Return Results


Example search engine

Elasticsearch

9️⃣ Recommendation System

Recommend videos based on:

Watch history

Likes

Subscriptions

Trending videos

Architecture

User Activity
      |
      v
+------------+
| Event Queue|
+------------+
      |
      v
+----------------+
| Recommendation |
| Engine         |
+----------------+
      |
      v
Recommended Feed


Message queue example

Apache Kafka

🔟 Final Large-Scale YouTube Architecture
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
                   +-----------+
                   | API Gate  |
                   +-----------+
                         |
        ------------------------------------------------
        |             |             |                 |
        v             v             v                 v
   +---------+   +---------+   +-----------+   +-----------+
   | Upload  |   | Video   |   | SearchSvc |   |Recommend  |
   | Service |   | Service |   |           |   | Service   |
   +---------+   +---------+   +-----------+   +-----------+
        |             |             |              |
        v             v             v              v
 Object Storage    Metadata DB   Search Index    Kafka
        |
        v
  Video Processing
        |
        v
   Multiple Formats

1️⃣1️⃣ Scaling Techniques
CDN

Most important for video streaming.

Example

Cloudflare

Video Chunking

Videos split into segments.

Video.mp4
   |
   v
chunk1.ts
chunk2.ts
chunk3.ts


Player loads chunks dynamically.

Distributed Storage

Videos stored across many servers.

Storage Cluster
   |
   +--- Server1
   +--- Server2
   +--- Server3

Async Processing

Video encoding handled asynchronously.

Upload → Queue → Workers


Queue example

Apache Kafka

1️⃣2️⃣ Interview Questions They Ask

Interviewers often ask:

Q1

How to store petabytes of video data?

Answer

Distributed object storage

Q2

How to handle millions of video streams?

Answer

Use CDN edge servers

Q3

How to support multiple video quality levels?

Answer

Transcoding pipeline


✅ If you'd like, I can also show very advanced system design diagrams like:

WhatsApp Architecture (real-time messaging)

Uber Architecture (location + matching)

Netflix Architecture (global streaming)

These are extremely popular in senior backend interviews.
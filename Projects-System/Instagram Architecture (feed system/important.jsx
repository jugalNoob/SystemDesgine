Designing an Instagram-like feed system is a very popular system design interview problem. The real platform is Instagram owned by Meta Platforms.

Instagram must handle:

Millions of users
Billions of photos
Huge feed reads
Real-time notifications


Reads are much higher than writes.

1️⃣ Functional Requirements

Users should be able to:

Upload photos/videos

Follow / unfollow users

View home feed

Like and comment

Receive notifications

Explore trending content

2️⃣ Non-Functional Requirements

System must support:

Millions of concurrent users

Fast feed loading (<200 ms)

High availability

Scalable storage for media

Important fact:

Feed read traffic >> Post creation


Example scale

Posts per second: 5k
Feed reads per second: 200k+

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
            +--------------+
            | API Gateway  |
            +--------------+
                   |
        --------------------------------
        |            |                |
        v            v                v
   +----------+  +----------+   +-----------+
   | PostSvc  |  | UserSvc  |   | FeedSvc   |
   +----------+  +----------+   +-----------+
        |            |                |
        v            v                v
     Media Store   User DB         Feed Cache
        |                             |
        v                             v
     Object Storage                 Redis


Example technologies

Redis

Apache Kafka

4️⃣ Photo Upload Flow

When a user uploads a photo.

User Upload
     |
     v
+------------+
| Upload API |
+------------+
      |
      v
+----------------+
| Media Processor|
+----------------+
      |
      v
+----------------+
| Object Storage |
+----------------+


Images stored in distributed object storage.

5️⃣ Media Delivery (CDN)

Photos and videos are served through CDN.

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
Image Storage


Example CDN

Cloudflare

Benefits

Low latency
Reduced backend load

6️⃣ Feed Generation (Core Problem)

Instagram feed shows posts from followed users.

Two approaches exist.

Approach 1 — Fanout on Write

When a user posts → push post to all followers.

User creates post
       |
       v
    Kafka Event
       |
       v
+---------------+
| Feed Worker   |
+---------------+
       |
       v
Add post to followers feed
       |
       v
      Redis


Feed structure

feed:user123
[post9, post8, post7]


Advantages

Fast feed loading


Disadvantage

Celebrity users with millions of followers

Approach 2 — Fanout on Read

Feed generated when user opens app.

User opens feed
      |
      v
+------------+
| Feed API   |
+------------+
      |
      v
Fetch posts from followed users
      |
      v
Merge & sort by time


Advantages

Less write load


Disadvantage

Slower feed generation

Real Instagram Approach

Hybrid model.

Normal users → fanout on write
Celebrities → fanout on read


This reduces huge fanout cost.

7️⃣ Feed Architecture
                 Users
                   |
                   v
              +--------+
              |  CDN   |
              +--------+
                   |
                   v
             +-----------+
             | API Gate  |
             +-----------+
                   |
        ---------------------------------
        |             |                 |
        v             v                 v
   +--------+    +--------+       +--------+
   |PostSvc |    |UserSvc |       |FeedSvc |
   +--------+    +--------+       +--------+
        |             |               |
        v             v               v
  Object Storage   User DB        Redis Cache
        |
        v
      Kafka
        |
        v
   Feed Workers

8️⃣ Feed Read Flow

When user opens Instagram.

User opens app
       |
       v
+-------------+
| Feed API    |
+-------------+
       |
       v
+-------------+
| Redis Cache |
+-------------+
       |
       v
Return latest posts


Example response

[
 post1,
 post2,
 post3
]

9️⃣ Notification System

User receives notifications.

User Action
    |
    v
+-----------+
| Event Bus |
+-----------+
    |
    v
+-------------+
| Notification|
| Service     |
+-------------+
    |
    v
Push Notification


Queue system example

Apache Kafka

🔟 Database Design Example

Users table

userId
name
followersCount


Posts table

postId
userId
imageUrl
caption
timestamp


Followers table

userId
followerId

1️⃣1️⃣ Scaling Techniques
CDN

Serve images from edge servers.

Example

Cloudflare

Redis Feed Cache

Store precomputed feeds.

Redis

Message Queue

Async feed processing.

Apache Kafka

Database Sharding

Split posts across servers.

Shard1 → users 1-1M
Shard2 → users 1M-2M

1️⃣2️⃣ Final Instagram Architecture
                      Users
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
        --------------------------------------
        |            |            |          |
        v            v            v          v
     +------+     +------+     +------+   +--------+
     |Post  |     |User  |     |Feed  |   |Notify  |
     |Svc   |     |Svc   |     |Svc   |   |Svc     |
     +------+     +------+     +------+   +--------+
        |            |            |           |
        v            v            v           v
 Object Storage   User DB      Redis       Kafka

1️⃣3️⃣ Interview Questions

Interviewers may ask:

Q1

How do you handle celebrity users?

Answer

Use hybrid feed generation
fanout-on-write + fanout-on-read

Q2

How do you reduce feed latency?

Answer

Use Redis feed cache

Q3

How do you scale image delivery?

Answer

Serve images through CDN edge servers


✅ If you want, I can also show the most advanced system design question for backend interviews:

"Design WhatsApp (real-time messaging architecture)"

This one is extremely important for Node.js backend engineers and FAANG interviews.
Designing a Twitter Feed System is a very common system design interview question. I’ll explain it step-by-step with ASCII architecture, focusing on scalability (millions of users).

The real product example is X (formerly Twitter).

1️⃣ Functional Requirements

User should be able to:

Post tweet

Follow / unfollow users

See home feed (latest tweets)

Like / retweet

Real-time updates

2️⃣ Non-Functional Requirements

System should support:

Millions of users

Low latency feed (<200ms)

High availability

Scalable reads

Important fact:

Reads >> Writes


Example

Tweets per second: 5k
Feed reads per second: 300k


Feed systems are read heavy.

3️⃣ High Level Architecture
              Users
                |
                v
         +---------------+
         | API Gateway   |
         +---------------+
                |
        -----------------------
        |          |          |
        v          v          v
 +------------+ +-----------+ +-----------+
 | Tweet svc  | | User svc  | | Feed svc  |
 +------------+ +-----------+ +-----------+
        |              |           |
        v              v           v
    Tweet DB        User DB     Feed Cache
        |                          |
        v                          v
      Kafka                    Redis


Technologies example:

Redis

Apache Kafka

MongoDB

4️⃣ Tweet Creation Flow

When user posts tweet.

User
  |
  v
API Gateway
  |
  v
Tweet Service
  |
  v
Tweet Database
  |
  v
Kafka Event
  |
  v
Feed Service updates followers feed


ASCII

User
 |
 v
+-----------+
| Tweet API |
+-----------+
      |
      v
+-------------+
| Tweet Store |
| (MongoDB)   |
+-------------+
      |
      v
+-----------+
| Kafka     |
+-----------+
      |
      v
+-------------+
| Feed Worker |
+-------------+


Kafka distributes tweet events.

5️⃣ Feed Generation (Important)

Two main approaches.

Approach 1 — Fanout on Write

When user tweets → push to all followers.

User posts tweet
        |
        v
   Kafka Event
        |
        v
+-------------------+
| Feed Generator    |
+-------------------+
        |
        v
Add tweet to followers feed
        |
        v
      Redis


Feed storage

UserFeed:
user123 → [tweet9, tweet8, tweet7]


Advantages

Fast feed read

Good for normal users

Disadvantage

If celebrity has 10M followers
→ huge fanout cost

Approach 2 — Fanout on Read

Feed generated when user opens app.

User opens app
      |
      v
+------------+
| Feed API   |
+------------+
      |
      v
Get tweets from followed users
      |
      v
Merge & sort


Advantages

Less write cost

Disadvantage

Feed generation slower

Real Hybrid Approach

Real systems combine both.

Normal users → fanout on write
Celebrities → fanout on read


Used in large social networks.

6️⃣ Feed Architecture
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
          ---------------------
          |         |         |
          v         v         v
    +----------+ +---------+ +---------+
    | TweetSvc | |UserSvc  | |FeedSvc  |
    +----------+ +---------+ +---------+
          |           |          |
          v           v          v
       MongoDB      MongoDB     Redis
          |
          v
        Kafka
          |
          v
      Feed Workers

7️⃣ Feed Read Flow
User opens home feed
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
Return latest tweets


Example response

[
 tweet1,
 tweet2,
 tweet3,
 tweet4
]

8️⃣ Database Schema Example

Users

Users
-----
userId
name
followersCount


Tweets

Tweets
------
tweetId
userId
text
timestamp


Follow Table

Followers
---------
userId
followerId

9️⃣ Scaling Techniques

To support hundreds of millions of users.

1 Sharding
Tweets shard by userId


Example

Shard1 → user1-user1M
Shard2 → user1M-user2M

2 Redis Cache

Store feeds

feed:user123

3 CDN

Images/videos cached by CDN.

Example

Cloudflare

4 Message Queue

Kafka processes events asynchronously.

Apache Kafka

🔟 Final Scalable Architecture
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
        ---------------------------------
        |               |               |
        v               v               v
   +---------+     +---------+     +---------+
   |TweetSvc |     |UserSvc  |     |FeedSvc  |
   +---------+     +---------+     +---------+
        |               |               |
        v               v               v
     MongoDB         MongoDB          Redis
        |
        v
      Kafka
        |
        v
    Feed Workers

Interview Bonus Question

Interviewer may ask:

Q: How do you handle celebrity accounts?

Answer

Use hybrid model

Normal users → fanout on write
Celebrity users → fanout on read


✅ If you want, I can also show next-level FAANG interview designs like:

YouTube System Design

WhatsApp System Design

Uber System Design

Google Drive Storage Design

These are EXTREMELY popular system design interview questions.
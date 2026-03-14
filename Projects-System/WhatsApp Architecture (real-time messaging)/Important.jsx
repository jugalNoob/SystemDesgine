Designing a WhatsApp-like real-time messaging system is one of the most common advanced system design interview questions. The real product is WhatsApp owned by Meta Platforms.

The main challenge:

Billions of users
Real-time messaging
Very low latency
Reliable delivery

1️⃣ Functional Requirements

Users should be able to:

Send messages

Receive messages instantly

Show online / offline status

Show read receipts

Send images / videos

Group chats

2️⃣ Non-Functional Requirements

System must support:

Very low latency (<100 ms)

High availability

Billions of messages per day

End-to-end encryption

Important pattern:

Real-time communication


Uses persistent connections.

3️⃣ High Level Architecture
                 Users
                   |
                   v
                +------+
                | DNS  |
                +------+
                   |
                   v
            +-------------+
            | LoadBalancer|
            +-------------+
                   |
        --------------------------------
        |              |               |
        v              v               v
   +-----------+  +-----------+  +-----------+
   | Chat Srv1 |  | Chat Srv2 |  | Chat Srv3 |
   +-----------+  +-----------+  +-----------+
        |              |               |
        v              v               v
        +------ Message Queue --------+
                       |
                       v
                 Message Storage


Example queue system

Apache Kafka

4️⃣ Persistent Connection (Very Important)

WhatsApp uses persistent TCP/WebSocket connections.

Example technology

WebSocket

Architecture

User Phone
    |
    v
Persistent Connection
    |
    v
Chat Server


Benefit

Instant message delivery

5️⃣ Message Sending Flow

When user sends message.

User A
   |
   v
Chat Server
   |
   v
Message Queue
   |
   v
Chat Server
   |
   v
User B


ASCII flow

User A
  |
  v
+-----------+
| Chat Srv  |
+-----------+
      |
      v
+-----------+
| Kafka MQ  |
+-----------+
      |
      v
+-----------+
| Chat Srv  |
+-----------+
      |
      v
User B

6️⃣ Message Storage

Messages stored for offline users.

Example database

Messages
--------
messageId
senderId
receiverId
content
timestamp
status


Database example

Cassandra

Why Cassandra?

High write throughput
Horizontal scaling

7️⃣ Offline Message Handling

If receiver is offline.

User A sends message
        |
        v
Message stored in DB
        |
        v
User B comes online
        |
        v
Pending messages delivered


ASCII diagram

User A
  |
  v
Chat Server
  |
  v
Message DB
  |
  v
User B reconnects
  |
  v
Messages delivered

8️⃣ Media Messaging (Images / Videos)

Media not sent directly through chat server.

User uploads media
       |
       v
Media Upload Service
       |
       v
Object Storage
       |
       v
URL shared in chat


Example storage

Amazon S3

9️⃣ Notification System

If user is offline.

Message arrives
     |
     v
Notification Service
     |
     v
Push Notification


Push systems

Firebase Cloud Messaging

🔟 Online Presence System

Tracks whether users are online.

User connects
     |
     v
Presence Service
     |
     v
Redis store


Example tool

Redis

Redis stores

user123 → online
user456 → offline

1️⃣1️⃣ Final WhatsApp Architecture
                      Users
                        |
                        v
                     +------+
                     | DNS  |
                     +------+
                        |
                        v
                 +-------------+
                 | LoadBalancer|
                 +-------------+
                        |
        -----------------------------------------
        |             |             |           |
        v             v             v           v
   +---------+   +---------+   +---------+  +---------+
   |ChatSrv  |   |ChatSrv  |   |ChatSrv  |  |Presence |
   +---------+   +---------+   +---------+  +---------+
        |             |             |           |
        v             v             v           v
        +----------- Kafka Queue --------------+
                        |
                        v
                  Message Storage
                        |
                        v
                    Cassandra
                        |
                        v
                  Media Storage
                        |
                        v
                       S3

1️⃣2️⃣ Scaling Techniques
Horizontal Scaling

Add more chat servers.

ChatSrv1
ChatSrv2
ChatSrv3
ChatSrv4

Message Queue

Handle burst traffic.

Example

Apache Kafka

Distributed Database

Use scalable DB.

Example

Cassandra

Media Storage

Large files stored separately.

Example

Amazon S3

1️⃣3️⃣ Interview Questions
Q1

How does WhatsApp deliver messages instantly?

Answer

Persistent WebSocket connections

Q2

How does WhatsApp handle offline users?

Answer

Messages stored in database
Delivered when user reconnects

Q3

How does WhatsApp scale to billions of users?

Answer

Horizontal chat servers
Distributed database
Message queues


✅ If you want, I can also show the 10 most important System Design interview questions that appear again and again in FAANG/backend interviews, with complete architectures and scaling math (for example 100K requests/min calculations).
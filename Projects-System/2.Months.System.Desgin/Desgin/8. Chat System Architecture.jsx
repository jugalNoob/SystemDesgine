8. Chat System Architecture
Users
  |
  v
+------------+
| WebSocket  |
|  Gateway   |
+------------+
       |
       v
+-------------+
| Chat Server |
+-------------+
       |
       v
+-------------+
| Redis PubSub|
+-------------+
       |
       v
+-------------+
| Database    |
+-------------+

Interview Tip

When interviewer asks System Design, answer in this order:

1 Requirements
2 Traffic estimation
3 High-level architecture
4 Database design
5 Scaling
6 Bottlenecks
7 Improvements


If you want, I can also show 10 FAANG-level System Design diagrams like:

YouTube Architecture

WhatsApp Architecture

Uber Architecture

Twitter Feed System

Google Drive Storage System

These are very common in backend interviews.
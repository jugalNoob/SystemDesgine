Complete Evolution of Server Architecture
Local Server
     ↓
On-Premise Server
     ↓
Dedicated Server
     ↓
VPS
     ↓
Virtual Machines
     ↓
Containers (Docker)
     ↓
Cloud Infrastructure
     ↓
Serverless
     ↓
Edge Computing

Real Production Architecture (Example)

Example large scale system:

User
 │
CDN
 │
Load Balancer
 │
Kubernetes Cluster
 │
├── Node.js API
├── Kafka Consumer
├── Redis Cache
└── Worker Service
 │
Database Cluster


Technologies used:

Node.js

Apache Kafka

Redis

MongoDB

Kubernetes

✅ Since you are working on Node.js + Redis + Kafka architecture, the most important server types for you are:

Cloud servers

Containers (Docker)

Kubernetes cluster

Serverless functions
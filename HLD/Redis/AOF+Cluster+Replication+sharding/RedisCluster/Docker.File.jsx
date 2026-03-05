This automatically:

Assigns hash slots

Links replicas

Enables auto failover

🚀 Production Docker Compose Example
version: '3'

services:
  redis-node-1:
    image: redis:7
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7000:7000"
    volumes:
      - ./redis7000.conf:/usr/local/etc/redis/redis.conf

  redis-node-2:
    image: redis:7
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7001:7001"


(Repeat for all 6)

In real production → use Kubernetes StatefulSet.

🧩 Node.js Connection (ioredis)





🔥 Show Redis cluster config 

🔥 Let’s design a Production-Ready Redis Cluster (5-Nines style)

This is how companies like Google, Amazon and Netflix deploy Redis for high availability.

🧠 What is Redis Cluster?

Redis Cluster:

Splits data into 16384 hash slots

Distributes slots across multiple master nodes

Each master has a replica

Automatic failover

Minimum production setup:

3 Masters
3 Replicas
= 6 Nodes total


If 1 master dies → replica becomes master automatically.

🏗 Architecture
        ┌─────────────┐
        │   Node.js   │
        └──────┬──────┘
               ↓
        ┌─────────────────────┐
        │     Redis Cluster   │
        ├─────────┬───────────┤
        │ Master1 │ Master2   │ Master3
        │   ↓      │   ↓       │   ↓
        │ Replica1 │ Replica2  │ Replica3
        └─────────────────────┘

🔧 Step 1 — redis.conf (for each node)

Each Redis node needs cluster enabled.

Example redis.conf:

port 7000
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
appendfsync everysec
protected-mode no
bind 0.0.0.0


Important:

cluster-enabled yes → enables clustering

appendonly yes → durability (AOF)

cluster-node-timeout 5000 → failover detection

You will run:

7000
7001
7002
7003
7004
7005


6 instances total.

🔥 Step 2 — Start 6 Redis Nodes
redis-server redis-7000.conf
redis-server redis-7001.conf
redis-server redis-7002.conf
redis-server redis-7003.conf
redis-server redis-7004.conf
redis-server redis-7005.conf

🔥 Step 3 — Create Cluster

Run:

redis-cli --cluster create \
127.0.0.1:7000 \
127.0.0.1:7001 \
127.0.0.1:7002 \
127.0.0.1:7003 \
127.0.0.1:7004 \
127.0.0.1:7005 \
--cluster-replicas 1

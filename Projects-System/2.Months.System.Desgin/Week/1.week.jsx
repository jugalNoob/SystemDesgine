Week 1 — System Design Fundamentals
Goal

Understand how large systems are structured.

Topics

Client → Server Architecture

Request lifecycle

Latency vs Throughput

Horizontal vs Vertical Scaling

Load balancing

Stateless vs Stateful servers

Example architecture
User
  |
  v
Load Balancer
  |
  v
App Servers (Node.js cluster)
  |
  v
Database

Learn Load Balancing

Example tools

Nginx

HAProxy

Types

Round Robin

Least Connections

IP Hash

Practice Design

Design:

URL shortener

Simple REST API
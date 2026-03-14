Week 4 — Message Queues & Async Systems
Goal

Handle high traffic and background jobs

Tools

Apache Kafka

RabbitMQ

Architecture
Producer
   |
   v
Kafka Topic
   |
   v
Consumer Group


Example

User Signup
   |
   v
Kafka Event
   |
   +---- Email service
   +---- Analytics service

Benefits

Decoupling

High throughput

Retry systems

Practice

Design

Order processing system

Email notification service
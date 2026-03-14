🏗 Final Architecture

Client
   ↓
API (Express)
   ↓
MongoDB Transaction
   ├── users
   └── outbox
   ↓
Outbox Publisher Service
   ↓
BullMQ
   ↓
Worker
   ↓
Email Service



🔥 Clean separation:

Business logic

Outbox logic

Queue logic

Worker logic

Email service


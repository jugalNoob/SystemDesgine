10. Microservice Server Architecture

Instead of one server → multiple services.

Architecture
User
 │
API Gateway
 │
├── Auth Service
├── Payment Service
├── Search Service
└── Notification Service


Each service runs on separate server/container.
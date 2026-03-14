src/
│
├── app.js
├── server.js
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── modules/
│   └── user/
│       ├── user.controller.js
│       ├── user.service.js
│       ├── user.model.js
│       └── user.routes.js
│
├── outbox/
│   ├── outbox.model.js
│   ├── outbox.publisher.js
│   └── outbox.constants.js
│
├── queues/
│   ├── email.queue.js
│   └── queue.constants.js
│
├── workers/
│   └── email.worker.js
│
├── services/
│   └── email.service.js
│
└── utils/
    └── asyncHandler.js

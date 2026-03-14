project/
├─ src/
│  ├─ queues/
│  │  ├─ bullmqConnection.js       # BullMQ setup (Redis connection)
│  │  ├─ jobs/
│  │  │  ├─ processEventJob.js     # Job processor (consumer logic)
│  │  │  └─ addEventJob.js         # Job producer (adds events to queue)
│  │  └─ inbox/                    
│  │     ├─ inboxModel.js          # MongoDB collection for Inbox (store processed events)
│  │     └─ inboxService.js        # Inbox pattern logic: check & mark processed
│  ├─ models/
│  │  └─ user.js                   # Example domain model (MongoDB)
│  ├─ services/
│  │  └─ userService.js            # Business logic (e.g., create/update user)
│  ├─ routes/
│  │  └─ userRoutes.js             # Express routes
│  ├─ utils/
│  │  └─ buildQuery.js             # Query builder (for search/filter)
│  ├─ app.js                        # Express app & route setup
│  └─ server.js                     # Start server & DB connection
├─ package.json
├─ .env
└─ README.md

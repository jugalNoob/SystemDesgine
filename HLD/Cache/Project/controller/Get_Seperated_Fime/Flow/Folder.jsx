🧠 Final mental model (remember this)
ETag check → L1 → Redis → DB


ETag avoids everything
L1 avoids Redis
Redis avoids DB


src/
│
├── cache/
│   ├── l1Cache.js        # Local (Node-cache)
│   ├── redisClient.js    # Redis connection
│
├── etag/
│   └── etagHelper.js    # ETag logic
│
├── services/
│   └── studentCache.js  # Cache read/write logic (L1 + L2)
│
├── controllers/
│   └── student.controller.js  # GET API (important logic)
│
└── models/
    └── student.js

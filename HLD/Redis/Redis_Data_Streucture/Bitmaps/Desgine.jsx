          ┌──────────────────────┐
          │      Client/API      │
          │  (Browser / App)    │
          └─────────┬──────────┘
                    │
          Login / Logout / Check Status
                    │
                    ▼
          ┌──────────────────────┐
          │   Node.js REST API   │
          │   (Express Server)  │
          └─────────┬──────────┘
                    │
      ┌─────────────┴─────────────┐
      ▼                           ▼
  User Logs In                User Logs Out
  SETBIT online:users          SETBIT online:users
  offset = userID             offset = userID
  value = 1                   value = 0
      │                           │
      ▼                           ▼
 ┌───────────────┐          ┌───────────────┐
 │ Redis Bitmap  │          │ Redis Bitmap  │
 │ Key: online: │          │ Key: online: │
 │ users        │          │ users        │
 └─────┬────────┘          └─────┬────────┘
       │                           │
       ▼                           ▼
Check Status / Count Online Users
       │
       ▼
 GETBIT online:users userID       BITCOUNT online:users
 Returns 0 / 1                    Returns total online users
       │
       ▼
   Optional Operations
       │
       ▼
 BITOP AND/OR/XOR multiple keys
 e.g., active users last 7 days

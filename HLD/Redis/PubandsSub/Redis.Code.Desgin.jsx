          ┌──────────────────────┐
          │      Client/API      │
          │  (Browser / App)    │
          └─────────┬──────────┘
                    │
             Sends Event / Message
                    │
                    ▼
          ┌──────────────────────┐
          │   Node.js Publisher  │
          │    (Redis Client)    │
          └─────────┬──────────┘
                    │
              PUBLISH mychannel
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
┌───────────────┐           ┌───────────────┐
│ Subscriber 1  │           │ Subscriber 2  │
│ (Node.js App) │           │ (Node.js App) │
└───────┬───────┘           └───────┬───────┘
        │                           │
 Receives messages             Receives messages
 in real-time                  in real-time

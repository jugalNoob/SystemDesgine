                    ┌─────────────────────┐
                    │       Client        │
                    │  (POST /register)   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express API       │
                    │  user_form()        │
                    │                     │
                    │ emailQueue.add()    │
                    └──────────┬──────────┘
                               │
                               ▼
                ┌────────────────────────────┐
                │        Redis Server        │
                │                            │
                │  Queue: send-welcome-email │
                │                            │
                │  waiting                   │
                │  active                    │
                │  completed                 │
                │  failed                    │
                └──────────┬─────────────────┘
                           │
                           ▼
                ┌────────────────────────────┐
                │        Worker              │
                │ concurrency: 5             │
                │ limiter: 10/sec            │
                │ attempts: 3                │
                └──────────┬─────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌─────────────────┐                  ┌───────────────────┐
│  SUCCESS PATH   │                  │   FAILURE PATH    │
└─────────────────┘                  └───────────────────┘
        │                                     │
        ▼                                     ▼
Send Email                          Retry (max 3 times)
        │                                     │
        ▼                                     ▼
Mark Completed                      Max Attempts Reached?
(removeOnComplete:45)                        │
        │                                     ▼
        │                           ┌──────────────────────┐
        │                           │ Move to DLQ Queue    │
        │                           │ send-welcome-email   │
        │                           │ _DLQ                 │
        │                           └──────────┬───────────┘
        │                                      │
        ▼                                      ▼
┌─────────────────────┐             ┌──────────────────────┐
│  Clean Completed    │             │ DLQ (Redis)          │
│ every 60 seconds    │             │ waiting jobs         │
└─────────────────────┘             └──────────┬───────────┘
                                               │
                                               ▼
                                   ┌──────────────────────┐
                                   │ DLQ Monitor          │
                                   │ getJobCounts()       │
                                   │ every 30 seconds     │
                                   └──────────┬───────────┘
                                              │
                                ┌─────────────┴─────────────┐
                                │                           │
                                ▼                           ▼
                       Healthy (<10)                ALERT (>10)
                     Log Healthy Status        🚨 Alert Triggered

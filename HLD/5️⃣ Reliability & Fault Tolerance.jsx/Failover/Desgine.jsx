                              ┌──────────────────────┐
                              │        USERS         │
                              │  (Asia / US / EU)    │
                              └──────────┬───────────┘
                                         │
                                         ▼
                         ┌────────────────────────────────┐
                         │  Global DNS (Latency Routing)  │
                         │  Health Checks Enabled         │
                         └──────────┬───────────┬─────────┘
                                    │           │
                    ┌───────────────┘           └───────────────┐
                    ▼                                           ▼

            ┌─────────────────┐                         ┌─────────────────┐
            │   REGION A      │                         │   REGION B      │
            │   (Primary)     │                         │   (Secondary)   │
            └────────┬────────┘                         └────────┬────────┘
                     │                                             │
                     ▼                                             ▼

        ┌────────────────────────┐                    ┌────────────────────────┐
        │   CDN / Edge Cache     │                    │   CDN / Edge Cache     │
        └───────────┬────────────┘                    └───────────┬────────────┘
                    │                                             │
                    ▼                                             ▼

        ┌────────────────────────┐                    ┌────────────────────────┐
        │ Reverse Proxy Layer    │                    │ Reverse Proxy Layer    │
        │ (Nginx / Envoy)        │                    │ (Nginx / Envoy)        │
        └───────────┬────────────┘                    └───────────┬────────────┘
                    │                                             │
                    ▼                                             ▼

        ┌────────────────────────┐                    ┌────────────────────────┐
        │ API Gateway            │                    │ API Gateway            │
        │ Rate Limit / Auth      │                    │ Rate Limit / Auth      │
        └───────────┬────────────┘                    └───────────┬────────────┘
                    │                                             │
                    ▼                                             ▼

        ┌────────────────────────┐                    ┌────────────────────────┐
        │ Redis Cluster          │                    │ Redis Cluster          │
        │ (Local to Region)      │                    │ (Local to Region)      │
        └───────────┬────────────┘                    └───────────┬────────────┘
                    │ MISS                                        │ MISS
                    ▼                                             ▼

        ┌────────────────────────┐                    ┌────────────────────────┐
        │ App Service Cluster    │                    │ App Service Cluster    │
        │ (Docker / K8s Pods)    │                    │ (Docker / K8s Pods)    │
        └───────────┬────────────┘                    └───────────┬────────────┘
                    │                                             │
                    ▼                                             ▼

        ┌────────────────────────┐                    ┌────────────────────────┐
        │ MongoDB Replica Set    │◄──────────────────►│ MongoDB Replica Set    │
        │ Primary (Region A)     │   Cross-Region     │ Secondary Replica      │
        │ Secondary Local        │   Replication      │ (Can Promote)          │
        └────────────────────────┘                    └────────────────────────┘

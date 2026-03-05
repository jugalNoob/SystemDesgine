| Pattern / Component  | File                       | Purpose / Description                                                                          | Use Case / Benefit                                                           |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Circuit Breaker      | `CricuitBreaker.jsx`       | Prevents repeated DB/API calls when a service is failing. Trips when error threshold exceeded. | Protects your system from cascading failures; improves resilience.           |
| Failover             | `FailOver.jsx`             | Switches to a secondary resource or service if primary fails.                                  | Ensures high availability; reduces downtime.                                 |
| Graceful Degradation | `GraceFull_Degradtion.jsx` | System continues operating in a reduced capacity when parts fail.                              | Provides partial functionality; improves user experience during outages.     |
| Retry                | `Retry.jsx`                | Automatically retries failed operations with optional backoff strategy.                        | Handles transient errors; increases success rate for network/database calls. |
| All Types Overview   | `allTyoes.jsx`             | Consolidated demo of all failure-handling patterns in one place.                               | Useful for testing and comparing patterns; project reference.                |


BulkHead


| Pattern               | Purpose                              | Example in Your Project                             |
| --------------------- | ------------------------------------ | --------------------------------------------------- |
| Circuit Breaker       | Protect from repeated failure        | DB/API stops being overwhelmed during errors        |
| Failover              | Switch to backup service             | Redis fail → fallback to DB                         |
| Graceful Degradation  | Partial functionality during failure | Show cached or limited user data                    |
| Retry                 | Retry failed operations              | Retry DB fetch if transient network error           |
| SWR + Cache + Redlock | Serve data fast and safely           | L1/L2 cache + background refresh + distributed lock |
| Null Cache            | Prevent cache penetration            | Cache empty DB query results briefly                |
| Random TTL            | Prevent cache avalanche              | Avoid all cache keys expiring at once               |
| ETag + GZIP           | Reduce payload and use browser cache | Faster response to client, saves bandwidth          |




✅ Big Picture / Flow

Client hits Node.js API.

API first checks L1 cache (memory). If hit → fast return.

If miss → check L2 cache (Redis).

If L2 miss → Redlock distributed lock prevents all requests from hitting DB at once.

Fetch from DB.

Update caches (L1/L2) with random TTL and null cache for empty results.

Serve stale data while refreshing in the background (SWR).

Apply Circuit Breaker to DB calls → fallback if DB unstable.

Retry failed calls if transient errors occur.

Failover to backups if primary services fail.

Return data with ETag + GZIP → client caching + reduced payload.
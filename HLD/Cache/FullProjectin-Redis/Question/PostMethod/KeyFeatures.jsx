🔑 Key Takeaways / What This Practises

Validation → Always validate input before DB write.

Write to DB first → DB is the source of truth.

Invalidate Cache → Prevents stale reads.

Optional write-behind update → Shows how cache can be updated after DB write for efficiency.

L1 + Redis → Multi-layer caching even on writes.

Promise.all → Concurrent cache deletions, efficient in async environments.
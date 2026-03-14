Case: Server crashes after DB commit

users   → saved ✅
outbox  → saved (PENDING) ✅
queue   → not published ❌

After restart:
Publisher finds PENDING
Pushes to queue
System recovers automatically

→ Zero event loss

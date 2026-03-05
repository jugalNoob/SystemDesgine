Background Refresh (Stale-While-Revalidate)


Yes ✅ Background Refresh (Stale-While-Revalidate) is often better than simple expiry.

Now let’s understand:

🔥 Problem in Your Current Code

Right now:

TTL = 60
After 60 sec → key fully removed
Next request → DB hit
If 1000 requests come → DB spike ❌


So even with L1 + L2, you still have stampede risk.

🟢 What We Want Instead

We want this behavior:

TTL = 60

At 55 sec → refresh in background

Users still get OLD cache

No empty cache

No DB spike

This is called:

🔥 Stale While Revalidate

🧠 How To Implement Background Refresh (Concept Only)

Instead of relying only on Redis TTL:

We store:

{
  data: [...],
  expiryTime: timestamp
}


Then logic becomes:

✅ Step 1: Always Return Cached Data Immediately

Even if expired.

User never waits.

✅ Step 2: If Cache Near Expiry → Trigger Background Refresh

Example logic:

if (now > expiryTime - 5 seconds) {
   trigger async refresh
}


But do NOT await it.

Just trigger.

🔥 Updated Flow For Your user_Get
1️⃣ Check L1

Return immediately.

If near expiry → refresh in background.

2️⃣ Check Redis

Return immediately.

If near expiry → refresh in background.

3️⃣ If No Cache → DB + Set Cache
💡 Important: Prevent Multiple Background Refresh

If 1000 requests detect near expiry:

All will try to refresh ❌

So you must:

👉 Use Redis lock

Like:

SET refresh_lock 1 NX EX 5


Only one server refreshes.

Others skip.

This makes it production safe.

🏗 Real Architecture Pattern
Client
  ↓
Node API
  ↓
L1 Cache
  ↓
Redis (L2)
  ↓
MongoDB


With:

TTL = 60

Soft expiry = 55

Hard expiry = 60

Background refresh

Redis lock

That is high-scale design.

🚀 Why This Is Better Than Normal TTL?

Normal TTL:

Expire → DB spike


Background Refresh:

Serve old data
Refresh silently
No spike


Much safer.

🎯 Interview-Ready Explanation

If asked:

How do you prevent cache stampede?

You say:

"I use stale-while-revalidate strategy. I serve cached data immediately and trigger background refresh before expiry. I also use Redis distributed locking to ensure only one instance refreshes the cache."

🔥 That is senior-level answer.
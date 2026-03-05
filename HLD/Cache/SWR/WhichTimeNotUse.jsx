Excellent question 🔥
SWR is powerful — but using it blindly can cause serious data problems.

Let’s clearly understand when NOT to use Stale-While-Revalidate (SWR).

🚫 1️⃣ Financial / Payment Systems
Example:

Wallet balance

Bank transactions

Payment confirmation

Stock trading price

If you serve stale data:

User sees ₹1000
Actual balance = ₹200

That’s dangerous.

Companies like:

PayPal

Stripe

Visa

👉 Do NOT allow stale reads for critical financial data.

For these systems:

Strong consistency required

Read-after-write guarantee

No stale window

🚫 2️⃣ Authentication / Authorization Data

Example:

User role changed from "admin" → "user"

Account banned

Token revoked

If SWR serves stale:

User might still access restricted APIs.

That’s a security issue.

Never use SWR for:

Access control

Permission checks

JWT revocation lists

🚫 3️⃣ Inventory / Real-Time Stock Systems

Example:

1 product left

100 users hitting checkout

If stale is served:
Multiple users see “available”
Overselling happens.

E-commerce companies like:

Amazon

Use:

Atomic stock decrement

Distributed locks

Strong consistency

Not SWR for stock counts.

🚫 4️⃣ Real-Time Analytics Dashboards

Example:

Live trading dashboard

Live server metrics

Fraud detection systems

If stale data is shown:

Wrong decisions made

False alerts

Systems like:

Bloomberg

Require real-time consistency.

🚫 5️⃣ Write-Heavy Systems

SWR works best when:

Reads >> Writes

If your system is:

Constantly updating data

Highly dynamic

Changing every few seconds

Then stale window becomes useless.

Example:

Chat applications

Real-time messaging

Multiplayer games

🚫 6️⃣ Legal / Compliance Systems

Example:

Medical records

Legal case data

Tax filing

Serving outdated data could have legal impact.

🚫 7️⃣ Strong Consistency Required Systems

If your system requires:

Linearizability

Strong consistency

Read-after-write guarantee

SWR is not appropriate.

Distributed systems like:

Google Spanner

Are designed for strong consistency instead of stale reads.

🧠 Quick Decision Rule

Use SWR when:

✅ Data can tolerate slight delay
✅ Read-heavy system
✅ Performance > perfect freshness
✅ High traffic

Avoid SWR when:

❌ Money involved
❌ Security involved
❌ Inventory involved
❌ Critical decisions involved
❌ Strict consistency required

🎯 Interview Answer (Short & Powerful)

I would avoid SWR in systems requiring strong consistency such as payments, inventory management, authentication, or real-time analytics. SWR is best suited for read-heavy systems where slight data staleness is acceptable in exchange for improved performance and resilience.

🚀 Advanced Insight

Many FAANG systems:

Use SWR for feeds, recommendations, search results

Do NOT use SWR for payments, auth, stock

Same company.
Different strategies per service.

If you want next:
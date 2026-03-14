1️⃣ First Understand the Problem

A Bloom Filter (like the one in Redis using BF.ADD) is designed for fast existence checks.

Example:

Email: user1@gmail.com


You add it to Bloom filter:

BF.ADD usersBloom user1@gmail.com


Now when login happens:

BF.EXISTS usersBloom user1@gmail.com


It quickly tells:

maybe exists
or
definitely not exists


So DB is saved from many queries.

2️⃣ The Big Limitation

Bloom filters cannot remove elements safely.

Example:

User1 signed up → added to bloom filter
User1 deletes account


You cannot safely do:

BF.REMOVE usersBloom user1@gmail.com


Because Bloom filter uses hash bits, not actual values.

Removing one value may break other values.

So deletion is not supported.

3️⃣ Solution Used in Real Systems

Instead of deleting entries, companies rebuild the bloom filter periodically.

Meaning:

Delete old bloom filter
Create new bloom filter
Add all current users again

4️⃣ Simple Example

Suppose your database has users:

user1@gmail.com
user2@gmail.com
user3@gmail.com


You rebuild Bloom filter like this.

Step 1 — delete old filter

await redis.del("usersBloom")


Step 2 — create new one

await redis.call("BF.RESERVE", "usersBloom", 0.01, 1000000)


Step 3 — load users from DB

const users = await User.find({})


Step 4 — add again

for (const user of users) {
  await redis.call("BF.ADD", "usersBloom", user.email)
}


Now Bloom filter contains only active users.

5️⃣ What "Rebuild Every 24 Hours" Means

A background job runs daily:

Every 24 hours
      │
      ▼
Fetch all users from DB
      │
      ▼
Delete old bloom filter
      │
      ▼
Create new bloom filter
      │
      ▼
Insert all emails again


This keeps Bloom filter clean and accurate.

6️⃣ How Companies Run This Job

They run a background worker using tools like:

BullMQ

Apache Kafka

Cron

Kubernetes scheduled jobs

Example cron:

0 3 * * *


Meaning:

Run at 3 AM every day


Rebuild Bloom filter.

7️⃣ Interview One-Line Answer

If interviewer asks:

"Bloom filters don't support deletion. What would you do?"

Best answer:

Bloom filters do not support deletion efficiently, so the common approach is to periodically rebuild the filter. A background job loads all active users from the database and recreates the Bloom filter to remove stale entries.

8️⃣ Very Simple Analogy

Imagine a guest list written with a permanent marker.

You cannot erase names.

So every night you:

Throw away the paper
Write a fresh list again


That is exactly Bloom filter rebuilding.
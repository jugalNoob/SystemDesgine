Cache Prewarming🔥 6️⃣ Cache Prewarming (Advanced)

Before traffic spike (like 9 AM):

Run background job:

const hotKeys = await getTopQueries();

for (const key of hotKeys) {
  const data = await fetchFromDB(key);
  await redis.set(key, JSON.stringify(data));
}


Preload popular keys.

Used heavily in:

Amazon

Netflix
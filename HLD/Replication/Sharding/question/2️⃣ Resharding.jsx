2️⃣ Resharding
Simple Meaning

Resharding means changing the shard key of a collection.

Example:

Old shard key:

userId


New shard key:

email


This requires redistributing all data across shards again.

Example

Before resharding:

Shard Key → userId


Distribution:

Shard1 → userId 1–1M
Shard2 → userId 1M–2M
Shard3 → userId 2M–3M


After resharding:

Shard Key → region


Distribution:

Shard1 → Asia users
Shard2 → US users
Shard3 → Europe users


Data gets fully redistributed.

3️⃣ Why Resharding Is Needed

Sometimes engineers choose a bad shard key.

Example problem:

createdAt shard key


All new data goes to one shard → hot shard problem.

Solution:

Reshard to hashed(userId)

4️⃣ Difference Between Rebalancing and Resharding


| Feature       | Rebalancing            | Resharding                  |
| ------------- | ---------------------- | --------------------------- |
| Purpose       | Even data distribution | Change shard key            |
| Automatic     | Yes                    | Usually manual              |
| Data movement | Move chunks            | Redistribute entire dataset |
| Shard key     | Same                   | Changes                     |


5️⃣ Simple Example

Initial system:

Shard1 → 50 GB
Shard2 → 10 GB
Shard3 → 10 GB


Rebalancing

Shard1 → 25 GB
Shard2 → 25 GB
Shard3 → 20 GB


If shard key is wrong:

userId → email


This is Resharding.

6️⃣ Interview Answer

Rebalancing

MongoDB rebalancing automatically moves chunks between shards to ensure even data distribution.

Resharding

Resharding is the process of changing the shard key of a collection and redistributing the data across shards.
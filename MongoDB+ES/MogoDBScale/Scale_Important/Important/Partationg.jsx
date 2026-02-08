⚙️ 7️⃣ PARTITIONING
🏁 Purpose

Partitioning means dividing large datasets (tables or collections) into smaller, faster, and more manageable pieces — without changing how you query them.

🎯 Goals

Reduce query response time

Improve I/O performance (scan smaller chunks)

Optimize storage and backup

Distribute load across servers or disks

Support scalability for massive datasets

🧩 Types of Partitioning


| Type                                   | Description                                                          | Scope                        |
| -------------------------------------- | -------------------------------------------------------------------- | ---------------------------- |
| **Horizontal Partitioning (Sharding)** | Split rows (documents) into multiple tables/collections based on key | Data-level scaling           |
| **Vertical Partitioning**              | Split columns (fields) across tables or collections                  | Schema-level optimization    |
| **Functional Partitioning**            | Separate data by use-case or service                                 | Microservices-based DB split |

🧱 1️⃣ Horizontal Partitioning (Sharding)
📖 Definition

Splits data by rows, each shard contains a subset of total records.

💡 Example


Orders Shard 1 → Jan–Jun 2025
Orders Shard 2 → Jul–Dec 2025


Each shard can live on a different server or region, improving parallelism and throughput.

⚙️ Example (MongoDB Sharding)

MongoDB supports automatic horizontal partitioning (sharding).

sh.enableSharding("ecommerce")
sh.shardCollection("ecommerce.orders", { orderDate: 1 })


✅ Splits data into chunks by orderDate
✅ Distributes chunks across shards automatically
✅ Each shard holds part of the collection

⚙️ Example (PostgreSQL Partitioning by Range)
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_date DATE NOT NULL,
  customer_id INT,
  amount NUMERIC
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2025_01 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE orders_2025_02 PARTITION OF orders
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');


✅ Queries like:

SELECT * FROM orders WHERE order_date BETWEEN '2025-01-01' AND '2025-02-01';


only scan relevant partitions (e.g., orders_2025_01).

🧱 2️⃣ Vertical Partitioning
📖 Definition

Split columns (fields) into separate tables or collections based on access patterns.


| Table           | Columns                   | Use                 |
| --------------- | ------------------------- | ------------------- |
| `users_core`    | id, name, email           | Frequently accessed |
| `users_details` | id, address, dob, hobbies | Rarely accessed     |



CREATE TABLE users_core (
  user_id INT PRIMARY KEY,
  name TEXT,
  email TEXT
);

CREATE TABLE users_details (
  user_id INT REFERENCES users_core(user_id),
  address TEXT,
  dob DATE
);


✅ Faster queries for lightweight user lookups.
✅ Heavy data (like address, profile pic) stays in separate storage.

⚙️ Example (MongoDB)

MongoDB encourages document normalization or embedding, but vertical partitioning can be achieved via subcollections:

// Core info
db.users_core.insert({ _id: 1, name: "Jugal", email: "jugal@xyz.com" });

// Extended info
db.users_details.insert({ user_id: 1, address: "Delhi", dob: "1999-10-01" });


✅ Common in microservice design — e.g., UserService and ProfileService use different collections.

🧱 3️⃣ Range Partitioning


📖 Definition

Data divided based on a range of values (numeric or date).

| Partition        | Range          |
| ---------------- | -------------- |
| `orders_2025_01` | Jan 1 – Jan 31 |
| `orders_2025_02` | Feb 1 – Feb 28 |



⚙️ PostgreSQL Example
CREATE TABLE orders (
  id SERIAL,
  order_date DATE,
  amount NUMERIC
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_q1 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');
CREATE TABLE orders_q2 PARTITION OF orders
  FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');


✅ Easy maintenance → Drop old partitions (DROP TABLE orders_2024_q4)

⚙️ MongoDB Equivalent (Range-Based Sharding)
sh.shardCollection("shop.orders", { orderDate: 1 })


MongoDB will shard based on key ranges:

Shard A → orders from Jan–Mar

Shard B → Apr–Jun

etc.

🧱 4️⃣ List Partitioning
📖 Definition

Partition based on a discrete list of values.


| Partition       | Value List            |
| --------------- | --------------------- |
| `orders_asia`   | (‘India’, ‘China’)    |
| `orders_europe` | (‘Germany’, ‘France’) |


CREATE TABLE orders (
  id SERIAL,
  region TEXT,
  amount NUMERIC
) PARTITION BY LIST (region);

CREATE TABLE orders_asia PARTITION OF orders
  FOR VALUES IN ('India', 'China');

CREATE TABLE orders_europe PARTITION OF orders
  FOR VALUES IN ('Germany', 'France');


  ⚙️ MongoDB Equivalent (Zone Sharding)

MongoDB uses zone sharding for list-based distribution:

sh.addShardTag("shard1", "ASIA");
sh.addShardTag("shard2", "EUROPE");
sh.addTagRange("shop.orders", { region: "India" }, { region: "Japan" }, "ASIA");
sh.addTagRange("shop.orders", { region: "Germany" }, { region: "Spain" }, "EUROPE");


✅ Distributes data by region value to specific shards.

🧱 5️⃣ Hash Partitioning
📖 Definition

Rows/documents assigned to partitions based on a hash function of key values.

✅ Ensures even data distribution
✅ Prevents “hot partitions” (uneven load)

⚙️ PostgreSQL Example
CREATE TABLE orders (
  id SERIAL,
  customer_id INT,
  amount NUMERIC
) PARTITION BY HASH (customer_id);

CREATE TABLE orders_hash_1 PARTITION OF orders FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE orders_hash_2 PARTITION OF orders FOR VALUES WITH (MODULUS 4, REMAINDER 1);


✅ Spreads customer_ids evenly across 4 partitions.

⚙️ MongoDB Hash Sharding Example
sh.shardCollection("shop.orders", { customerId: "hashed" })


✅ MongoDB hashes the key to evenly spread documents across shards.
✅ Perfect for user-based data, log storage, IoT, etc.

🧱 6️⃣ Composite Partitioning (Hybrid)

You can combine range + hash or list + hash to balance time and uniformity.

⚙️ Example (PostgreSQL)
CREATE TABLE orders (
  order_id INT,
  order_date DATE,
  customer_id INT
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2025 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01')
  PARTITION BY HASH (customer_id);


✅ Split by time range, then by hash for even load distribution.

🧩 Example: Orders Table Partitioned by Month/Year
🧱 PostgreSQL
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_date DATE NOT NULL,
  customer_id INT,
  amount NUMERIC
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2025_01 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE orders_2025_02 PARTITION OF orders
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');


✅ Monthly partitioning simplifies purging old data:

DROP TABLE orders_2025_01;

🧱 MongoDB (Monthly Range Sharding)
sh.enableSharding("shop")
sh.shardCollection("shop.orders", { orderMonth: 1 })


Sample document:

{
  orderId: 1001,
  orderMonth: "2025-10",
  customerId: 500,
  total: 1999
}


✅ Queries for orderMonth: '2025-10' only hit that shard.
✅ Easy to drop old month shards when data expires.

🧮 Performance Impact


| Query Type                | Without Partitioning | With Partitioning         |
| ------------------------- | -------------------- | ------------------------- |
| Full table scan (1B rows) | Scans all data       | Scans relevant partitions |
| Index scan                | Global index         | Local partition index     |
| Deletion                  | Slow (row-by-row)    | Drop partition = instant  |
| Backup                    | Full dump            | Per-partition dump        |



⚖️ Trade-offs


| Advantage                     | Disadvantage                              |
| ----------------------------- | ----------------------------------------- |
| Faster queries on subsets     | More complex DDL (create/drop partitions) |
| Easier archival & maintenance | Slightly higher metadata overhead         |
| Parallelism                   | Requires partition key in query           |
| Scales horizontally           | Uneven distribution if key chosen poorly  |



🧠 Choosing Partition Key

✅ Good Keys

High cardinality fields (userId, orderDate, region)

Frequently filtered columns

Stable (not frequently updated)

🚫 Bad Keys

Boolean fields

Low cardinality values

Random fields with uneven distribution

📊 MongoDB Sharding vs SQL Partitioning Summary


| Feature           | MongoDB             | PostgreSQL                       |
| ----------------- | ------------------- | -------------------------------- |
| Term              | Sharding            | Partitioning                     |
| Distribution      | Across shards/nodes | Across tablespaces or partitions |
| Key Type          | Range / Hash / Zone | Range / List / Hash              |
| Auto balancing    | Yes                 | Manual                           |
| Dropping old data | Drop shard chunks   | Drop partition                   |
| Best for          | Horizontal scaling  | Logical dataset segmentation     |



🧩 Functional Partitioning (Bonus)

In microservices architecture, each service has its own partitioned DB:

UserService → users_db

OrderService → orders_db

PaymentService → payments_db

✅ Keeps systems isolated
✅ Enables independent scaling
✅ Reduces coupling

🚀 Best Practices

✅ Choose the right partition key (query-driven design)
✅ Keep partition count moderate (100s not 1000s)
✅ Use composite partitions for balance
✅ Drop/archive old partitions periodically
✅ Monitor shard balance in MongoDB (sh.status())
✅ In PostgreSQL, use pg_partman or native declarative partitioning
✅ Avoid cross-partition joins unless indexed

🔥 Summary Table


| Type       | Example              | DB         | Use Case               |
| ---------- | -------------------- | ---------- | ---------------------- |
| Horizontal | Sharding by `userId` | MongoDB    | Scale across nodes     |
| Vertical   | Split columns        | Both       | Separate hot/cold data |
| Range      | By `date`            | Both       | Time-based logs        |
| List       | By `region`          | Both       | Geo-partition          |
| Hash       | By `customerId`      | Both       | Even load              |
| Composite  | Range + Hash         | PostgreSQL | Time + uniformity      |




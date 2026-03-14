ACID and BASE are two models used in databases to handle data consistency and reliability, especially in distributed systems.

These concepts appear in databases like MongoDB, MySQL, and Apache Cassandra.

1️⃣ ACID

ACID is used in traditional relational databases to guarantee strong consistency and reliable transactions.

ACID stands for:

A → Atomicity
C → Consistency
I → Isolation
D → Durability

Atomicity

Meaning:

A transaction happens completely or not at all.

Example:

Transfer money
Account A → -100
Account B → +100


If second step fails:

Transaction rollback


No partial update.

Consistency

Meaning:

Data always stays valid and correct.

Example:

Account balance cannot become negative


Database rules are maintained.

Isolation

Meaning:

Multiple transactions do not interfere with each other.

Example:

User1 updating record
User2 reading record


Database keeps them separate.

Durability

Meaning:

Once data is saved, it will not be lost.

Even if:

Server crashes
Power failure


Data remains stored.
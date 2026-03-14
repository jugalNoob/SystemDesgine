CAP Theorem is a very important concept in distributed systems and databases like MongoDB, Apache Cassandra, and Amazon DynamoDB.

1️⃣ What is CAP Theorem?

CAP theorem says that a distributed system can guarantee only two of the following three properties at the same time:

C → Consistency
A → Availability
P → Partition Tolerance


You can only choose 2 out of 3.

2️⃣ Consistency (C)

Consistency means:

All users see the same data at the same time.

Example:

User updates balance = 500
All servers immediately show 500


No outdated data.

3️⃣ Availability (A)

Availability means:

Every request gets a response, even if some servers fail.

Example:

User sends request
Server always returns response


System never stops responding.

4️⃣ Partition Tolerance (P)

Partition tolerance means:

The system continues working even if network communication between servers fails.

Example:

Server1  ----X----  Server2
(network failure)


System still runs.

5️⃣ CAP Triangle
       Consistency
           /\
          /  \
         /    \
        /      \
Availability ---- Partition


A distributed system can choose:

CP
AP
CA (rare in distributed systems)

6️⃣ Example Systems
CP Systems

Prioritize:

Consistency + Partition tolerance


Example:

MongoDB

HBase

If network fails:

System may reject requests

AP Systems

Prioritize:

Availability + Partition tolerance


Example:

Apache Cassandra

Amazon DynamoDB

These use eventual consistency.

CA Systems

Prioritize:

Consistency + Availability


But no partition tolerance.

Example:

Single database server


Not good for distributed systems.

7️⃣ Example Scenario

Suppose we have 2 database nodes:

Server A
Server B


Network breaks:

A   X   B


System must choose:

Option 1 → Consistency
Option 2 → Availability


Cannot guarantee both.

8️⃣ Easy Real-Life Example

ATM system:

Consistency → correct balance
Availability → ATM always working
Partition → network failure


Banks usually choose:

Consistency + Partition tolerance

9️⃣ Interview Answer

CAP theorem states that a distributed system can only guarantee two of the following three properties at the same time: Consistency, Availability, and Partition Tolerance.
8️⃣ Consistent Hashing

Definition:
Consistent Hashing is a load balancing/data distribution
 technique where requests or data are mapped to servers 
 using a hash function in a way that minimizes re-distribution
  when servers are added or removed.

✅ Commonly used in CDNs, distributed caches (Redis,
     Memcached), and distributed databases.

How It Works

Imagine a hash ring (a circle).

Each server is assigned a position on
 the ring using a hash of its ID.

Each request or key is hashed → 
placed on the ring.

The request is sent to the next
 server clockwise on the ring.

Key Idea:

If a server is added/removed, only a small
 portion of keys move to other servers.

This avoids massive re-distribution like 
in normal modulo-based hashing.



Example: 3 Servers

Servers on Hash Ring:

Server1 → hash → position 10

Server2 → hash → position 40

Server3 → hash → position 70

Requests / Keys:

Key A → hash 15 → next server clockwise → Server2

Key B → hash 50 → next server clockwise → Server3

Key C → hash 80 → next server clockwise → Server1


If Server2 fails:

Only keys mapped to Server2 are reassigned → minimal disruption

Advantages

Minimal re-distribution when servers change

Works well for distributed caches and CDNs

Balances load efficiently if hash function is good

Disadvantages

Needs a good hash function

Slightly more complex to implement than Round Robin

Quick ASCII Diagram
Hash Ring (0 - 100)
       [Server1(10)]
             \
              \
       [Server2(40)]
                 \
                  \
       [Server3(70)]
                   \
                   (wrap around to Server1)

Key A(15)  → Server2
Key B(50)  → Server3
Key C(80)  → Server1

✅ Interview Tip

“Consistent Hashing maps requests or data to 
servers using a hash ring. When servers are added or
 removed, only a small portion of requests are remapped, 
 making it ideal for CDNs, caching, and distributed databases.”
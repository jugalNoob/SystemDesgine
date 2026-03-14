Sharding is a database scaling technique where data is split 
across multiple servers (shards) so that each server stores
only a portion of the data. This helps handle very large 
datasets and high traffic.

Example:
Instead of 1 MongoDB server storing 100 million users, you 
divide data across 3 servers.

Shard 1 → Users A–H
Shard 2 → Users I–P
Shard 3 → Users Q–Z


This improves performance, scalability, and load distribution.
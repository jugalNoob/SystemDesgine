3️⃣ Database Write RPS

Total writes per day = 2M

Average write RPS:

2M / 86,400 ≈ 23 writes/sec


Peak write RPS (5×):

≈ 115 writes/sec


🎯 So your DB must support:

120 writes/sec

~120 reads/sec (if 1:1 read-write ratio)

Even a single node of MongoDB can handle this easily.

🔥 Interview Enhancement Answer

If interviewer asks:

Can one DB handle this?

You say:

“Yes, but I’d still add:

Read replicas

Connection pooling

Redis caching layer

Horizontal scaling if growth expected”

That sounds senior.

🚀 If We Scale to 1 Million Users?

Everything multiplies by 10:

30 TB/year storage

10 MB/sec bandwidth

1000+ write RPS

Now we need:

Sharding

Load balancer

Caching

Possibly Kafka
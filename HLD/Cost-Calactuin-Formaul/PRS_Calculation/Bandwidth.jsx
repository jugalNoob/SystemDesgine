2️⃣ Bandwidth Per Second

Now calculate network bandwidth.

Assume:

Request payload = 1 KB

Response payload = 10 KB

Total per request = 11 KB

Average Bandwidth

Average RPS:

2M / 86,400 ≈ 23 RPS


Bandwidth per second:

23 × 11 KB ≈ 253 KB/sec


≈ 0.25 MB/sec

Peak Bandwidth (5×)

Peak RPS:

23 × 5 ≈ 115 RPS


Bandwidth:

115 × 11 KB ≈ 1265 KB/sec
≈ 1.2 MB/sec


That’s tiny. One small EC2 can handle this easily.

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
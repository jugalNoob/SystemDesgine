2️⃣ CPU Requirement

Given: CPU time per request (t_cpu) in seconds


Total CPU time per second=RPS×tcpu​

Number of CPU cores required:

Cores=⌈1 secRPS×tcpu​​⌉



t_cpu = 100 ms = 0.1 s

RPS = 1,667

Cores=⌈1,667×0.1⌉=167 cores





 2️⃣ Calculate CPU Requirement

Given:

CPU per request = let's assume 100 ms (0.1 s)

Total CPU time per second=RPS×CPU_per_request


1667×0.1 s≈166.7 seconds CPU needed per second!


Interpretation:

One CPU core can do 1 second of processing per second.

So number of cores required:

Cores=1166.7​≈167 cores


💡 Tip: You can reduce CPU requirement by optimizing code or caching.
API System Sizing Formula Sheet
1️⃣ Convert Requests per Minute (RPM) to Requests per Second (RPS)

RPS=60
RPM
	​


RPM = 100,000 → RPS = 100,000 / 60 ≈ 1,667 requests/sec





Ah! You want to calculate system requirements for a GET API with 100,000 requests 
per minute (RPM) under 60 seconds, i.e., 100k RPM in 1 minute. Let’s do
 this step by step with clear formulas.


 1️⃣ Convert RPM to RPS (Requests per Second)

 RPS=60RPM​

 Sec=60
 RPS=60/100,000​≈1,667 requests/sec


 100000/60 =1667 



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
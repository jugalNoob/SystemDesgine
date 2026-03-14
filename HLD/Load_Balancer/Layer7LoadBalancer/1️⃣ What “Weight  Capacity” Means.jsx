1️⃣ What “Weight / Capacity” Means

Weight = how much load a server can handle relative to other servers.

Servers with higher weight are faster or more powerful, so they can take more requests.

Servers with lower weight are weaker or slower, so they take fewer requests.


| Server  | Weight | Meaning                                  |
| ------- | ------ | ---------------------------------------- |
| Server1 | 5      | Very powerful → can handle more requests |
| Server2 | 3      | Medium power → handle moderate requests  |
| Server3 | 1      | Weak → handle fewer requests             |


2️⃣ How Load Balancer Uses Weight

Load balancer keeps track of each server’s capacity (weight)

When a request comes in, it distributes requests according to weight:

Weighted Round Robin (WRR):

Server1 (weight 5) gets 5 requests per cycle

Server2 (weight 3) gets 3 requests

Server3 (weight 1) gets 1 request

Weighted Least Connections (WLC):

Load balancer checks current active connections on each server

Divides by weight → finds server with lowest “effective load”

Sends request there

Effective Load = Active Connections / Weight


Example:

Server1: 10 active / weight 5 → 2

Server2: 4 active / weight 2 → 2

Server3: 1 active / weight 1 → 1 ← request goes here

3️⃣ Why Websites Use Weight / Capacity

Websites have servers with different specs (CPU, RAM, disk)

Example:

Some servers are powerful → handle heavy API calls or image processing

Some servers are weaker → handle light traffic

Weight ensures powerful servers get more requests, preventing overloading weak servers

Result:

Better performance

Fewer crashes

Balanced traffic distribution

4️⃣ Simple Analogy

Think of servers as workers in a factory:

Worker1 (Weight 5) → can do 5 tasks in the same time

Worker2 (Weight 3) → can do 3 tasks

Worker3 (Weight 1) → can do 1 task

Assign tasks based on how many each worker can handle → no worker is overloaded

✅ Interview Tip:

“Weight or capacity represents how much load a server can handle relative to others. The load balancer uses it to send more requests to stronger servers and fewer requests to weaker servers, ensuring efficient distribution and stable website performance.”

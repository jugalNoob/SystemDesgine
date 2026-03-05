2️⃣ Partial Failure Is Real

In normal programming:

Either everything works or crashes

In distributed systems:

DB works but cache fails

Service A works but Service B is slow

Network drops for 2 seconds

Now you must design for:

✔ Retries
✔ Timeouts
✔ Circuit breakers
✔ Fallbacks

This is mentally harder.
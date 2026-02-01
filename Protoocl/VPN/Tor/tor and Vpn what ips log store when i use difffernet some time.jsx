Got it 👍
You’re asking which IPs are logged and stored when you use Tor, VPN, or combinations of both, especially at different times.

I’ll explain clearly, legally, and step‑by‑step, with simple flow + log tables.

Tor & VPN — What IPs Are Logged and Stored?

We’ll look at 4 real scenarios.

1️⃣ Normal Internet (No Tor, No VPN)
You → ISP → Website

Logs stored
ISP logs:
Your real IP
Websites visited
Timestamps
Data usage

Website logs:
Your real IP
Browser details
Time & activity


❌ No privacy

2️⃣ VPN Only
You → ISP → VPN Server → Website

ISP logs:
Your real IP
VPN server IP
Connection time
Data volume

VPN provider MAY log:
Your real IP
Assigned VPN IP
Timestamps


(depends on policy)

Website logs:
VPN IP
Location = VPN server


✔ Website doesn’t see you
❌ VPN provider might

3️⃣ Tor Browser Only
You → ISP → Tor Entry → Tor Network → Website

ISP logs:
Your real IP
Tor Entry Node IP
Time & data size

Tor network:
No central logging
Each node knows only partial info

Website logs:
Tor Exit Node IP


✔ No single party knows everything
✔ Strong anonymity

4️⃣ VPN + Tor (VPN → Tor) ⭐ Common
You → ISP → VPN → Tor Entry → Tor → Website

ISP logs:
Your real IP
VPN IP

VPN logs:
Your real IP
Connection time
NO website info

Tor:
VPN IP becomes "user IP"

Website logs:
Tor Exit Node IP


✔ ISP doesn’t see Tor
✔ Tor doesn’t see real IP
❌ VPN must be trusted

5️⃣ Tor + VPN (Tor → VPN) ❌ Rare & Risky
You → ISP → Tor → VPN → Website

ISP logs:
Tor usage

VPN logs:
Tor Exit IP

Website logs:
VPN IP


⚠️ VPN can break anonymity
⚠️ Not recommended

🔍 What Happens When You Switch Methods at Different Times?

Example timeline:

10 AM → Normal browsing
12 PM → VPN
3 PM → Tor

Logs look like:
ISP view:
10 AM → google.com (real IP)
12 PM → VPN IP
3 PM → Tor Entry IP

Websites:
Morning → Real IP
Afternoon → VPN IP
Evening → Tor Exit IP


🚨 Correlation risk exists if you log into same accounts

📦 What IPs Are Actually Stored (Summary Table)



| Entity  | IP Stored                 |
| ------- | ------------------------- |
| ISP     | Your real IP always       |
| Website | Exit IP (VPN or Tor)      |
| VPN     | Your real IP (if logging) |
| Tor     | No central logs           |



⚠️ BIGGEST MISTAKE PEOPLE MAKE

Using:

Same browser account

Same email

Same login
Across:

Normal → VPN → Tor

➡️ Logs become linkable.

✅ Safe Concept (High-Level)

Each layer only knows one side of the connection.
Tracing requires correlating multiple independent logs.

🧠 Interview‑Style One‑Line Answer

Depending on whether a user uses VPN, Tor, or both, different entities log different IPs—ISPs always log the real IP, websites log the exit IP, VPNs may log user mappings, and Tor has no centralized logging.

If you want next, I can explain:

Exact police tracing flow (step‑by‑step)

Why “no‑log VPN” still can expose users

Real Tor + VPN mistakes cases

ASCII flow chart for all combinations
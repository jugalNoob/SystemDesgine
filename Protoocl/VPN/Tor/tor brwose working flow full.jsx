Below is the FULL Tor Browser working flow, explained step‑by‑step, with ASCII flow diagrams, who sees what, and what is logged.
This is the complete picture—no gaps.

🔐 Tor Browser Working Flow (FULL)
1️⃣ User Opens Tor Browser
[ Your Device ]
Tor Browser (Hardened Firefox)

What happens:

Fingerprinting defenses enabled

Uniform screen size & fonts

JavaScript restrictions (Safer / Safest modes)

HTTPS‑Only mode

✔ Prevents browser tracking
✔ Prevents identity leaks

2️⃣ Tor Bootstrap (Connection Setup)
Tor Browser → Directory Authorities


Tor downloads:

List of Tor relays

Public keys

Network consensus

✔ No browsing yet
✔ Just network setup

3️⃣ Circuit Creation (Critical Step)

Tor creates a 3‑hop circuit:

[ Entry (Guard) ] → [ Middle ] → [ Exit ]

Selection rules:

Entry node is long‑term (months)

Middle node random

Exit node supports target port (80/443)

4️⃣ Layered Encryption (Onion Routing)

Each request is encrypted 3 times:

Encrypted for Exit
Encrypted for Middle
Encrypted for Entry


Like layers of an onion 🧅

5️⃣ ISP View (Very Important)
You → ISP → Tor Entry Node

ISP sees:
Your real IP
Tor entry node IP
Encrypted traffic
Time + data size


❌ ISP does NOT see websites
✔ ISP knows Tor is used

6️⃣ Entry (Guard) Node View
Entry Node

Knows:

✔ Your IP
✔ Middle node IP

Does NOT know:

❌ Website
❌ Content

7️⃣ Middle Node View
Middle Node

Knows:

✔ Entry node IP
✔ Exit node IP

Does NOT know:

❌ Your IP
❌ Website

8️⃣ Exit Node View
Exit Node → Website

Knows:

✔ Website IP
✔ Plain traffic (if HTTP)

Does NOT know:

❌ Your IP

🚨 Exit node is weakest point
🚨 HTTPS protects content

9️⃣ Website View
Website (photo.com)

Sees:
Tor Exit Node IP
Tor Browser fingerprint (generic)


❌ Cannot see real IP
❌ Cannot identify user

🔄 Response Flow (Reverse Direction)
Website → Exit → Middle → Entry → You


Same circuit
Same encryption layers

📊 WHO SEES WHAT (TABLE)#


| Entity      | Sees Your IP | Sees Website |
| ----------- | ------------ | ------------ |
| ISP         | ✔            | ❌            |
| Entry Node  | ✔            | ❌            |
| Middle Node | ❌            | ❌            |
| Exit Node   | ❌            | ✔            |
| Website     | ❌            | ✔ (Exit IP)  |



🧾 LOGGING REALITY
ISP logs:
Real IP → Tor Entry IP → Time

Tor nodes:

No central logging

Each node sees partial info

Cannot identify user alone

Website logs:
Tor Exit IP

🔐 Circuit Rotation

New circuit every ~10 minutes

New exit IP

Same entry node (for safety)

✔ Limits tracking
✔ Prevents long‑term correlation

⚠️ Where Tor Can Fail (User Errors)

❌ Logging into real accounts
❌ Downloading files & opening outside Tor
❌ Browser resizing
❌ Installing extensions
❌ Mixing identities

🧠 One‑Line Interview Answer

Tor Browser routes traffic through a three‑node encrypted circuit, separating user identity from destination, ensuring no single party can link source and website.

🧩 FULL ASCII FLOW (ONE VIEW)
[ YOU ]
   |
   | Encrypted
   v
[ ISP ]
   |
   v
[ ENTRY NODE ]  ← knows YOU
   |
   v
[ MIDDLE NODE ] ← knows NOTHING
   |
   v
[ EXIT NODE ]   ← knows WEBSITE
   |
   v
[ WEBSITE ]

🏁 Final Reality

Tor Browser provides strong anonymity by design, but it depends on correct user behavior and realistic threat models.
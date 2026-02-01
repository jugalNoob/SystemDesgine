Below is a clear, real-world + legal-process explanation of how police trace an IP address via an ISP, exactly the way it happens in practice (and how it’s asked in interviews).

High-Level Idea

Police do NOT directly know who you are from an IP.
They need the ISP, because only the ISP knows which customer had which IP at a specific time.

Step-by-Step: How Police Trace IP via ISP
1️⃣ Incident Happens (Website / App / Crime Scene)

Example:

photo.com detects:
Suspicious activity from IP: 49.36.88.120
Time: 2026-01-18 14:32:10 IST


The website logs:

IP address

Timestamp

Action performed

2️⃣ Website Gives Logs to Police

Website owner shares:

IP Address: 49.36.88.120
Timestamp: 2026-01-18 14:32:10
Time Zone: IST


⚠️ Without timestamp → tracing is almost impossible.

3️⃣ Police Identify the ISP (WHOIS)

Police check:

49.36.88.120 → ISP = Airtel / Jio / BSNL


This is done using WHOIS / IP registry databases.

4️⃣ Legal Notice Sent to ISP

Police cannot ask verbally.

They send:

Court order / warrant

Legal notice under IT Act / CrPC

Request:

Who was using IP 49.36.88.120
on 2026-01-18 at 14:32:10 IST?

5️⃣ ISP Checks Its Logs

ISP maintains logs like:

+----------------+--------------------+----------------+
| Public IP      | Assigned To User  | Timestamp      |
+----------------+--------------------+----------------+
| 49.36.88.120   | Customer_ID_84721 | 14:00–15:00   |
+----------------+--------------------+----------------+


ISP can map:

Public IP → Customer account

Time window

Location (approximate)

6️⃣ ISP Responds to Police

ISP provides:

Customer name

Registered phone number

Installation address

Connection type (Mobile / Broadband)

Device info (if available)

⚠️ ISP cannot see HTTPS content, only metadata.

7️⃣ Police Reach the Person

Police may:

Visit address

Seize router / mobile

Check device logs

Cross-verify timeline

ASCII Diagram: IP Tracing Flow
+------------+
| Website /  |
| App Logs   |
+------------+
      |
      v
+------------+
|  Police    |
+------------+
      |
      | Legal Notice
      v
+------------+
|   ISP      |
| (IP Logs)  |
+------------+
      |
      v
+------------+
| Customer   |
| Details    |
+------------+

Very Important Scenarios
🔁 Dynamic IP (Most Common)

IP changes frequently

Timestamp is critical

ISP uses DHCP logs

📱 Mobile Internet (NAT / CGNAT)

Many users share one public IP.

ISP uses:

IP + Port + Timestamp


Example:

49.36.88.120:44321 → User A
49.36.88.120:55782 → User B

🏠 Wi-Fi Router

ISP identifies router owner, not individual user.

Police must:

Check devices inside home

Match activity timing

🛡️ VPN / Proxy

Tracing stops at:

User → VPN → Internet


Police must then:

Contact VPN company

VPN logs may or may not exist

What Police Can See vs Cannot See


| Can See           | Cannot See              |
| ----------------- | ----------------------- |
| IP address        | Website content (HTTPS) |
| Timestamp         | Passwords               |
| ISP account       | Messages                |
| Location (approx) | Encrypted data          |




Common Interview Question Answer (Short)

Police trace an IP by collecting logs from the website,
 identifying the ISP via WHOIS, and legally requesting
  IP-to-customer mapping from the ISP using timestamps. The ISP maps the public IP to a subscriber using DHCP/NAT logs.
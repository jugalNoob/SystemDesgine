What Does an ISP Store? (Full Explanation)
First, Understand One Thing

ISP does NOT store your WhatsApp messages, passwords, or website content.
They store connection metadata, not content.

Think of ISP logs like call records, not call audio.

1️⃣ Basic Information ISP Stores (Subscriber Data)

When you take a connection, ISP stores:

Name

Address

Phone number

ID proof (Aadhaar / PAN etc.)

Customer ID

Connection type (Mobile / Fiber / Broadband)

📌 Stored as long as the account exists
📌 Used for billing & legal identification

2️⃣ IP Address Logs (MOST IMPORTANT)

ISP logs which IP was assigned to which user and when.

Example Log Entry
Customer ID : 84721
Public IP   : 49.36.88.120
Start Time  : 14:00:05 IST
End Time    : 15:02:41 IST

Why this is stored?

To identify misuse

To respond to legal requests

Network troubleshooting

⏳ Retention: 6 months – 1 year

3️⃣ Timestamp (Time Logs)

ISP records:

Session start time

Session end time

Without timestamp:
❌ IP tracing is impossible (because IPs change).

4️⃣ Port Number Logs (Mobile Internet / CGNAT)

Mobile networks use shared IPs.

ISP stores:

IP Address + Port Number + Time


Example:

49.36.88.120:44321 → User A
49.36.88.120:55782 → User B


📌 Stored because thousands of users share one IP

5️⃣ NAT / CGNAT Logs

Used in:

Mobile data

Some broadband networks

Stored data:

Private IP

Public IP

Port mapping

Timestamp

⏳ Retention: ~6 months

6️⃣ DNS Query Logs (Limited & Short)

Some ISPs log:

Which domain was resolved (example: photo.com)

Time of request

❌ Not full URLs
❌ Not page content

⏳ Stored very briefly or anonymized

7️⃣ Location Data (Approximate)

ISP can infer:

City

Area

Tower location (mobile)

❌ Exact GPS location is NOT stored.

8️⃣ Device & Network Info

Sometimes logged:

Router MAC (broadband)

SIM ID (IMSI)

Device type

Used for:

Fraud detection

Network management

9️⃣ What ISP Does NOT Store ❌
Not Stored
Website passwords
Messages
Emails
HTTPS page content
Bank details
Uploaded files
10️⃣ Special Case: VPN Logs (India)

Under CERT-In 2022:

VPNs must store:

User name

IP address

Timestamp

Purpose of use

⏳ Retention: 5 YEARS

Full ASCII Diagram: What ISP Stores
+------------------+
|      USER        |
|  Mobile / WiFi   |
+------------------+
        |
        v
+------------------+
|       ISP        |
|------------------|
| Subscriber Info  |
| IP Assigned      |
| Timestamp        |
| Port Number      |
| NAT Logs         |
| Approx Location  |
+------------------+

Simple Analogy (Easy to Remember)

📞 Phone Company Analogy

Stores: Who called whom & when

Does NOT store: Call recording

🌐 ISP Analogy

Stores: IP + time

Does NOT store: Website content

Interview-Ready One-Line Answer

ISPs store subscriber details, IP assignment logs, timestamps, port/NAT logs, and basic connection metadata for 6–12 months, but they do not store browsing content or encrypted data.

Very Common Confusion (Clarified)

Q: Can ISP see what website I open?
✔ Domain (sometimes)
❌ Pages/content (HTTPS)

Q: Can ISP see private messages?
❌ No

Q: Can police get data without ISP?
❌ No
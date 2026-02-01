Below is the clear, correct, real-world answer to “How long ISPs store logs”, with India-specific rules and interview-ready points.

Short Answer (Interview)

ISPs store IP logs for 6 months to 1 year in India, depending on regulation and ISP policy. Some metadata may be retained longer for legal or security reasons.

What Logs ISPs Store

ISPs do NOT store website content, only metadata.

Typical ISP logs:

Public IP address

Customer ID

Timestamp (start & end)

Port number (important for mobile internet)

Protocol (TCP/UDP)

Location (approx)

Device / SIM (mobile networks)

Log Retention Period (India 🇮🇳)
📜 As per Indian Regulations

(ISPs follow DoT + IT Act + CERT-In directions)


| Type of Log                           | Retention Period              |
| ------------------------------------- | ----------------------------- |
| IP assignment logs                    | **6 months – 1 year**         |
| NAT / CGNAT logs                      | **6 months minimum**          |
| VPN / proxy logs (if Indian provider) | **5 years (CERT-In 2022)**    |
| Subscriber details                    | **As long as account exists** |
| Billing records                       | **5–7 years**                 |



⚠️ CERT-In (2022) mandates 180 days minimum for certain logs, and 5 years for VPN service providers operating in India.

Why Logs Are Not Stored Forever

Huge storage cost

Privacy laws

Legal limits

Performance reasons

Important Scenarios Explained
🔁 Dynamic IP

IP changes frequently

ISP uses DHCP logs

Retention: 6–12 months

Without timestamp → ❌ tracing impossible.

📱 Mobile Internet (CGNAT)

Many users share one public IP.

ISP stores:

IP + Port + Timestamp


Retention:

Usually 6 months

Sometimes shorter due to massive data volume

🏠 Broadband (Home Wi-Fi)

Easier to trace

Logs stored longer than mobile

Up to 1 year commonly

🛡️ VPN Services (India)

Under CERT-In:

Must store:

User name

IP address

Usage timestamps

Retention: 5 YEARS

(Some VPNs exit India to avoid this.)

What Happens After Logs Expire?

Logs are deleted or anonymized

Police cannot trace IP

Case becomes technically untraceable

This is why cyber complaints must be filed quickly.

ASCII Timeline View
Day 0     30     90     180     365
 |-------|------|------|--------|
 IP logs  Mobile  CERT-In  Some ISPs
 active   logs    minimum  delete

Common Interview Q&A

Q: Can police trace IP after 2 years?
➡️ Usually NO, unless:

Case already registered

Logs preserved by court order

Q: Do ISPs store browsing history?
➡️ ❌ NO (HTTPS encryption)

Q: Why timestamp is mandatory?
➡️ Dynamic IP + shared IP makes timestamp critical.

One-Line Final Answer

ISPs generally store IP and connection logs for 6 months to 1 year in India, while VPN providers must retain logs for 5 years under CERT-In rules.
Email system architecture (Gmail-like)


📧 GMAIL-LIKE EMAIL SYSTEM ARCHITECTURE (ASCII)
🔹 High-Level Architecture
USER
 |
 | Web / Mobile App
 v
API GATEWAY
 |
 | Auth, Rate Limit
 v
MAIL FRONTEND SERVICE
 |
 |---------------------------------------|
 |                                       |
 v                                       v
SMTP INGRESS                        IMAP / POP3
(Send Mail)                         (Read Mail)
 |                                       |
 v                                       v
MAIL PROCESSING PIPELINE            MAILBOX SERVICE
 |                                       |
 v                                       v
SPAM / VIRUS FILTER                 MESSAGE STORE
 |                                       |
 v                                       v
DELIVERY ENGINE                     SEARCH INDEX
 |                                       |
 v                                       v
RECIPIENT MAIL SERVER               USER INBOX

🧠 STEP-BY-STEP FLOW (SEND EMAIL)
User → Gmail UI
  ↓
API Gateway (Auth)
  ↓
SMTP Ingress
  ↓
Spam + Virus Scan
  ↓
Queue (Kafka / PubSub)
  ↓
Delivery Engine
  ↓
Recipient Mail Server

1️⃣ CLIENT LAYER (USER SIDE)
Web Browser
Mobile App
Desktop Client


Protocols:

HTTPS (UI)

SMTP (send)

IMAP (read)

2️⃣ API GATEWAY
Responsibilities:
- Authentication (OAuth / JWT)
- Rate limiting
- Request routing


Why needed:
✔ Security
✔ Traffic control
✔ DDoS protection

3️⃣ SMTP INGRESS (SEND EMAIL)
SMTP Client → SMTP Server


Handles:

AUTH LOGIN

MAIL FROM

RCPT TO

DATA

Uses:

TCP + TLS

Port 587

4️⃣ MAIL PROCESSING PIPELINE
Incoming Mail
   |
   v
Spam Filter (ML based)
   |
   v
Virus Scan
   |
   v
Policy Check (SPF / DKIM / DMARC)


Why:
✔ Prevent spam
✔ Protect users
✔ Improve trust score

5️⃣ MESSAGE QUEUE (CRITICAL FOR SCALE)
Kafka / PubSub / SQS


Why queue?
✔ Millions of emails/sec
✔ Async processing
✔ Retry & durability

6️⃣ DELIVERY ENGINE
Queue → Delivery Worker


Responsibilities:

MX lookup (DNS)

Retry logic

Backoff strategy

SMTP relay

7️⃣ MAILBOX SERVICE (READ EMAIL)
IMAP / POP3


IMAP:

Sync emails

Multi-device support

POP3:

Legacy support

8️⃣ MESSAGE STORAGE (VERY IMPORTANT)
Object Storage (Body)
Metadata DB (Headers)


Example:

Email body → Blob storage

Subject, sender → DB

Why split?
✔ Faster search
✔ Cheaper storage
✔ Scalable

9️⃣ SEARCH INDEX (GMAIL MAGIC)
Elasticsearch / Bigtable


Supports:

Fast search

Filters

Labels

🔐 SECURITY & TRUST LAYER
SPF → Who can send?
DKIM → Message integrity
DMARC → Policy decision


Protects against:
❌ Spoofing
❌ Phishing
❌ Spam

📦 COMPLETE PROTOCOL USAGE TABLE


| Purpose    | Protocol |
| ---------- | -------- |
| Send mail  | SMTP     |
| Read mail  | IMAP     |
| UI access  | HTTPS    |
| Security   | TLS      |
| DNS lookup | MX       |



🧱 OSI LAYER VIEW
Application   → SMTP / IMAP / HTTP
Presentation  → TLS
Transport     → TCP
Network       → IP

⚙️ SCALING STRATEGY (HOW GMAIL SCALES)




| Component   | Scaling Method |
| ----------- | -------------- |
| SMTP        | Horizontal     |
| Queue       | Partitioned    |
| Storage     | Sharded        |
| Search      | Indexed        |
| Spam Filter | ML models      |



🔥 INTERVIEW-READY ONE-LINE EXPLANATION

“Gmail uses SMTP for sending, IMAP for reading, queues for scalability, object storage for messages, indexes for search, and ML-based filters for spam — all secured with TLS and DNS-based trust.”

🧠 WHY THIS DESIGN WORKS

✔ Async & fault-tolerant
✔ Massive scale support
✔ Secure by default
✔ Fast search & sync
✔ Multi-device friendly

✅ FINAL SUMMARY



| Layer    | Responsibility |
| -------- | -------------- |
| Client   | UI             |
| Gateway  | Auth           |
| SMTP     | Send           |
| Pipeline | Filter         |
| Queue    | Scale          |
| Delivery | Route          |
| IMAP     | Read           |
| Storage  | Persist        |
| Index    | Search         |

📧 EMAIL PROTOCOLS – DIFFERENCE TABLE (A → Z)

1️⃣ Core Purpose Difference

| Protocol | Main Job       | Meaning             |
| -------- | -------------- | ------------------- |
| **SMTP** | Send emails    | Push mail to server |
| **POP3** | Receive emails | Download mail       |
| **IMAP** | Receive emails | Sync mail           |

2️⃣ Data Storage Behavior (MOST IMPORTANT)

| Feature               | SMTP   | POP3          | IMAP   |
| --------------------- | ------ | ------------- | ------ |
| Where email is stored | Server | Client device | Server |
| Delete from server    | ❌      | ✅ (default)   | ❌      |
| Multiple device sync  | ❌      | ❌             | ✅      |


3️⃣ Online vs Offline

| Feature         | SMTP | POP3             | IMAP    |
| --------------- | ---- | ---------------- | ------- |
| Needs internet  | Yes  | Only to download | Mostly  |
| Offline reading | ❌    | ✅                | Limited |
| Mobile friendly | ❌    | ❌                | ✅       |



4️⃣ Performance & Bandwidth


| Feature              | SMTP       | POP3       | IMAP          |
| -------------------- | ---------- | ---------- | ------------- |
| Data transfer        | Full email | Full email | Headers first |
| Bandwidth usage      | Medium     | High       | Low           |
| Fast on slow network | ❌          | ❌          | ✅             |



5️⃣ Folder & Flag Support

| Feature            | SMTP | POP3 | IMAP |
| ------------------ | ---- | ---- | ---- |
| Folders            | ❌    | ❌    | ✅    |
| Read / Unread flag | ❌    | ❌    | ✅    |
| Star / Labels      | ❌    | ❌    | ✅    |



7️⃣ OSI Layer Mapping


| Layer        | Protocol           |
| ------------ | ------------------ |
| Application  | SMTP / POP3 / IMAP |
| Presentation | TLS                |
| Transport    | TCP                |
| Network      | IP                 |



8️⃣ Real-World Usage (IMPORTANT)


| Use Case        | Best Protocol | Why          |
| --------------- | ------------- | ------------ |
| Sending email   | SMTP          | Push-based   |
| Gmail / Outlook | IMAP          | Multi-device |
| Old desktop app | POP3          | Offline      |
| Backend email   | SMTP          | Automation   |



9️⃣ System Design View

| Component    | Protocol    |
| ------------ | ----------- |
| Backend App  | SMTP        |
| Mail Server  | SMTP + IMAP |
| User Inbox   | IMAP        |
| Legacy Inbox | POP3        |


🔥 ONE-LINE MEMORY TABLE


| Protocol | Remember As  |
| -------- | ------------ |
| SMTP     | **Send**     |
| POP3     | **Download** |
| IMAP     | **Sync**     |





✅ FINAL INTERVIEW SUMMARY

| Statement                          | True? |
| ---------------------------------- | ----- |
| POP3 is simple & offline           | ✅     |
| IMAP supports multi-device         | ✅     |
| Both use TCP + TLS                 | ✅     |
| SMTP + IMAP completes email system | ✅     |

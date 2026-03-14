🔴 2️⃣ Pessimistic Locking
🔹 Meaning:

Assume conflicts WILL happen.
Lock the row before updating.
Others must wait.

🧠 How It Works

In SQL:

SELECT * FROM students WHERE id=1 FOR UPDATE;


Now:

Row is locked

Other transactions wait

After commit → unlock

🔥 Flow
Lock row
   ↓
Update
   ↓
Commit
   ↓
Unlock

✅ Advantages

No lost updates

Safe for critical systems

❌ Disadvantages

Waiting

Slower

Risk of deadlock

🏦 Used In:

Banking

Payment systems

Inventory deduction

📊 Comparison Table



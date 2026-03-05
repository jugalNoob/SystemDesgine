🔥 What is MinHash?

MinHash (Minimum Hashing) is a probabilistic technique used to estimate 
similarity between two sets efficiently.



👉 Simple meaning:

Instead of comparing two large datasets directly, MinHash gives a small 
“signature” to each set.
Then we compare signatures to estimate similarity.



🧠 Why Do We Need MinHash?

Suppose you want to compare:

Two documents (plagiarism detection)

Two users’ liked posts

Two product descriptions

Duplicate web pages

Normal way:

similarity = intersection / union


This is called Jaccard Similarity:

J(A,B)=∣A∪B∣∣A∩B∣​


❌ Problem:

If sets are huge (millions of items)

Computing intersection is expensive

Not scalable

MinHash solves this efficiently.


❌ Problem:

If sets are huge (millions of items)

Computing intersection is expensive

Not scalable

MinHash solves this efficiently.

🎯 What MinHash Does

Instead of storing full sets:

Set A → {a, b, c, d, e}
Set B → {b, c, d, x}


MinHash generates small signatures:

Signature A → [12, 4, 7, 3]
Signature B → [12, 9, 7, 5]


Then similarity ≈ % of matching signature positions.

📊 Where MinHash Is Used?
1️⃣ Plagiarism Detection

Compare documents quickly.

2️⃣ Duplicate Web Page Detection

Search engines use this.

3️⃣ Recommendation Systems

Find similar users.

4️⃣ Near-Duplicate Image/Text Detection
🏢 Real-World Usage

Google → duplicate web detection

Facebook → similar content detection

Twitter → spam detection

Amazon → similar product matching

🧠 How MinHash Works (Step-by-Step)
Step 1️⃣ Convert data to set

Example document:

"I love apple phone"


Convert to shingles (words):

{I, love, apple, phone}

Step 2️⃣ Apply multiple hash functions

Example hash functions:

h1(x)
h2(x)
h3(x)

Step 3️⃣ For each hash function

Find minimum hash value for the set.

That minimum becomes one element of signature.

Step 4️⃣ Compare signatures

If 100 hash functions used:

If 80 positions match

Similarity ≈ 0.8

🟣 Simple JavaScript Example (Basic Concept)
function simpleHash(str, seed) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * seed + str.charCodeAt(i)) % 1000;
  }
  return hash;
}

function minHashSignature(set, numHashes) {
  const signature = [];

  for (let i = 1; i <= numHashes; i++) {
    let min = Infinity;
    for (let item of set) {
      const hash = simpleHash(item, i);
      if (hash < min) min = hash;
    }
    signature.push(min);
  }

  return signature;
}

const setA = new Set(["apple", "banana", "orange"]);
const setB = new Set(["apple", "banana", "grape"]);

const sigA = minHashSignature(setA, 5);
const sigB = minHashSignature(setB, 5);

console.log("Signature A:", sigA);
console.log("Signature B:", sigB);


Similarity:

function similarity(sigA, sigB) {
  let match = 0;
  for (let i = 0; i < sigA.length; i++) {
    if (sigA[i] === sigB[i]) match++;
  }
  return match / sigA.length;
}

📊 MinHash vs Jaccard vs Other Structures


| Feature              | Jaccard Direct | MinHash | HyperLogLog | CMS |
| -------------------- | -------------- | ------- | ----------- | --- |
| Exact similarity     | ✅              | ❌       | ❌           | ❌   |
| Memory efficient     | ❌              | ✅       | ✅           | ✅   |
| Counts frequency     | ❌              | ❌       | ❌           | ✅   |
| Counts unique        | ❌              | ❌       | ✅           | ❌   |
| Similarity detection | ❌              | ✅       | ❌           | ❌   |



🔥 Production Architecture Example (Search Engine)
Web Crawler
      ↓
Document Processing
      ↓
Shingling
      ↓
MinHash Signatures
      ↓
LSH (Locality Sensitive Hashing)
      ↓
Duplicate Detection


This avoids comparing every document pair.

🧠 What Is LSH (Bonus Concept)

MinHash is often combined with:

Locality Sensitive Hashing (LSH)

LSH groups similar signatures into buckets so we:

Compare only likely similar documents

Avoid O(n²) comparisons

🎯 When NOT To Use

❌ Small datasets
❌ Need exact similarity
❌ Counting frequencies
❌ Real-time billing

🧠 Interview One-Line Answer

MinHash is a probabilistic algorithm used to efficiently estimate Jaccard 
similarity between large sets by comparing compact hash-based signatures
 instead of full datasets.

🚀 Fits Your High-Scale Backend

If you build:

Search engine

Product recommendation system

Duplicate content detection

Spam filtering

MinHash helps reduce:

Memory

CPU usage

Distributed comparison cost

If you want next:

🔥 MinHash + LSH deep explanation

🔥 Sliding window similarity detection

🔥 Full system design for plagiarism detection

🔥 Compare MinHash vs SimHash
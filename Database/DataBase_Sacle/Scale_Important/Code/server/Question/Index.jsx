💡 Summary Table

| Scenario                | Keys Examined | Docs Examined | Notes                                   |
| ----------------------- | ------------- | ------------- | --------------------------------------- |
| Without index (`price`) | 0             | 151           | Full collection scan, slower            |
| With index (`price`)    | 5             | 5             | Uses index, fast, scales for large data |



1️⃣ Without Index (totalKeysExamined: 0)
"executionStats": {
  "executionSuccess": true,
  "nReturned": 5,
  "executionTimeMillis": 0,
  "totalKeysExamined": 0,
  "totalDocsExamined": 151
}


totalKeysExamined: 0 → No index is used.

totalDocsExamined: 151 → MongoDB scanned all 151 documents to find matching results.

This is called a collection scan (COLLSCAN).

✅ Works fine but slower for large collections.

2️⃣ With Index on price (totalKeysExamined: 5)
"executionStats": {
  "executionSuccess": true,
  "nReturned": 5,
  "executionTimeMillis": 1,
  "totalKeysExamined": 5,
  "totalDocsExamined": 5
}


totalKeysExamined: 5 → MongoDB scanned 5 index entries (much fewer than 151 documents).

totalDocsExamined: 5 → Only 5 documents were checked after using the index.

Execution time is lower because the query uses the price index efficiently.

✅ This is exactly the benefit of indexing: fewer documents scanned, faster query.
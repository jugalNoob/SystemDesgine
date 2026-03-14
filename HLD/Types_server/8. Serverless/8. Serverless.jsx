8. Serverless
Meaning

You do not manage servers.
Cloud provider runs code automatically.

You only deploy functions.

Example

AWS Lambda

Google Cloud Functions

Azure Functions

Architecture
User Request
    │
API Gateway
    │
Lambda Function
    │
Database

Example flow
User uploads image
      │
API Gateway
      │
Lambda
      │
Store in S3

Advantages

✔ Auto scaling
✔ Pay per request
✔ No server management

Disadvantages

❌ Cold start latency
❌ Limited execution time
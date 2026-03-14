I’ll explain the real flow + simple Node.js code for this architecture:

User → API (Node.js)
        |
        v
     MongoDB
        |
     Kafka Queue
        |
        v
   Elasticsearch Index


Using

MongoDB

Apache Kafka

Elasticsearch

This is a very common backend architecture for search systems.

1️⃣ Step 1 — User Creates Data (API)

Example: User creates a product.

Node.js API
const express = require("express")
const { MongoClient } = require("mongodb")
const { Kafka } = require("kafkajs")

const app = express()
app.use(express.json())

const mongo = new MongoClient("mongodb://localhost:27017")
const kafka = new Kafka({ brokers: ["localhost:9092"] })
const producer = kafka.producer()

let db

async function start(){
 await mongo.connect()
 db = mongo.db("shop")

 await producer.connect()
}

start()

app.post("/product", async (req,res)=>{
    
 const product = req.body

 // 1️⃣ store in MongoDB
 await db.collection("products").insertOne(product)

 // 2️⃣ send event to Kafka
 await producer.send({
   topic:"product-created",
   messages:[
     { value: JSON.stringify(product) }
   ]
 })

 res.send("Product saved")
})

app.listen(3000)


Flow:

User request
   |
Node.js API
   |
Save in MongoDB
   |
Send event → Kafka

2️⃣ Step 2 — Kafka Consumer

Consumer receives event and sends data to Elasticsearch.

const { Kafka } = require("kafkajs")
const { Client } = require("@elastic/elasticsearch")

const kafka = new Kafka({ brokers:["localhost:9092"] })

const consumer = kafka.consumer({ groupId:"search-group" })

const elastic = new Client({
 node:"http://localhost:9200"
})

async function run(){

 await consumer.connect()

 await consumer.subscribe({
   topic:"product-created"
 })

 await consumer.run({
  eachMessage: async ({message}) => {

   const product = JSON.parse(message.value.toString())

   await elastic.index({
     index:"products",
     document: product
   })

   console.log("Indexed in Elasticsearch")
  }
 })
}

run()


Flow:

Kafka
  |
Consumer
  |
Index data
  |
Elasticsearch

3️⃣ Step 3 — Search API

User searches product.

app.get("/search", async (req,res)=>{

 const q = req.query.q

 const result = await elastic.search({
   index:"products",
   query:{
     match:{
       name:q
     }
   }
 })

 res.json(result.hits.hits)
})


User request:

GET /search?q=iphone


Flow:

User
 |
Search API
 |
Elasticsearch
 |
Results

4️⃣ Complete Architecture
           User
            |
            v
       Node.js API
            |
      +-----+------+
      |            |
      v            |
   MongoDB         |
(store data)       |
      |            |
      v            |
   Kafka Queue ----+
      |
      v
   Consumer
      |
      v
 Elasticsearch
 (Search Index)


MongoDB = source of truth
Elasticsearch = search engine

5️⃣ Is Elasticsearch Free?

Yes and No.

Free Version

Elasticsearch open-source basic version is free.

You can install locally:

Docker
Linux
Mac
Windows


Basic features free:

✔ indexing
✔ search
✔ shards
✔ replicas
✔ aggregations

Paid Features

The company Elastic NV sells paid plans for:

security

advanced monitoring

machine learning

alerting

6️⃣ Free Alternative

Many companies now use:

OpenSearch

It was created by
Amazon.

OpenSearch = fully open-source Elasticsearch fork.

✅ Interview Tip

Good system design answer:

MongoDB stores application data.
Kafka handles asynchronous events.
Elasticsearch indexes the data for fast searching.

If you want, I can also show a very powerful architecture used by big companies:

MongoDB + Kafka + Elasticsearch + Redis search caching (100k searches/sec system design).
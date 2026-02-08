📘 Elasticsearch — Topics Explained with Code (Node.js)
1️⃣ What is Elasticsearch (with example)

Use case: Product search

// Search "iphone" in millions of products
GET /products/_search


Why ES?

Fast

Distributed

Full-text search

Near real-time

2️⃣ Cluster & Node (Concept)

You don’t code this directly, but you design it.

Cluster
 ├── Master Node (metadata)
 ├── Data Node (stores shards)
 └── Coordinating Node (query router)


Production:

3 master nodes

N data nodes

3️⃣ Index & Document
Create Index
await es.indices.create({
  index: 'products'
});

Insert Document
await es.index({
  index: 'products',
  id: '1',
  document: {
    name: 'iPhone 15',
    price: 80000,
    category: 'mobile'
  }
});

4️⃣ Shards & Replicas
await es.indices.create({
  index: 'products',
  settings: {
    number_of_shards: 3,
    number_of_replicas: 1
  }
});


Why?

Shards → scale

Replicas → high availability + faster GET

5️⃣ Mapping & Field Types
await es.indices.create({
  index: 'products',
  mappings: {
    properties: {
      name: { type: 'text' },
      category: { type: 'keyword' },
      price: { type: 'integer' },
      createdAt: { type: 'date' }
    }
  }
});


Rule:

text → search

keyword → filter / sort

6️⃣ Analyzer (Text Processing)
name: {
  type: 'text',
  analyzer: 'standard'
}


Custom analyzer (autocomplete):

analyzer: {
  autocomplete: {
    tokenizer: 'edge_ngram'
  }
}

7️⃣ Indexing (Write Path)
Single insert
await es.index({ index: 'products', document: data });

Bulk insert (FAST)
await es.bulk({
  operations: [
    { index: { _index: 'products' } },
    { name: 'Macbook', price: 120000 }
  ]
});

8️⃣ Search Basics (GET API)
await es.search({
  index: 'products',
  query: {
    match: { name: 'iphone' }
  }
});

9️⃣ Query Types
Match (full-text)
match: { name: 'iphone' }

Term (exact)
term: { category: 'mobile' }

Range
range: {
  price: { gte: 50000, lte: 100000 }
}

🔟 Bool Query (MOST IMPORTANT)
query: {
  bool: {
    must: [{ match: { name: 'iphone' } }],
    filter: [{ term: { category: 'mobile' } }],
    must_not: [{ term: { brand: 'fake' } }]
  }
}


📌 filter = cached & fast

1️⃣1️⃣ Pagination
Normal (small data)
from: 0,
size: 10

Large data (BEST)
search_after: [lastSortValue]

1️⃣2️⃣ Sorting
sort: [
  { price: 'asc' }
]

1️⃣3️⃣ Aggregations (Analytics)
aggs: {
  avg_price: {
    avg: { field: 'price' }
  }
}


Example:

Filters

Charts

Dashboards

1️⃣4️⃣ Scoring & Relevance
function_score: {
  query: { match: { name: 'iphone' } },
  boost: 2
}


Used in:

Ranking products

Recommendations

1️⃣5️⃣ Redis + Elasticsearch (GET Optimization)
const cache = await redis.get(key);
if (cache) return JSON.parse(cache);

const result = await es.search({...});
await redis.setEx(key, 60, JSON.stringify(result));


🔥 Redis absorbs traffic
🔥 ES does real search

1️⃣6️⃣ Ingest Pipeline
PUT _ingest/pipeline/add_timestamp
{
  "processors": [
    { "set": { "field": "createdAt", "value": "{{_ingest.timestamp}}" } }
  ]
}


Used for:

Logs

Cleanup

Enrichment

1️⃣7️⃣ Data Modeling
Denormalized (BEST)
{
  "orderId": "1",
  "userName": "Jugal",
  "productName": "iPhone"
}


Avoid joins — ES hates joins.

1️⃣8️⃣ Scaling Strategy

Increase shards → write scale

Increase replicas → read scale

Add Redis → API scale

Add Kafka → ingestion scale

1️⃣9️⃣ Failure Handling

Node crash → replica promoted

ES down → fallback cache

Data lost → rebuild from DB

2️⃣0️⃣ Security
Authorization: ApiKey xxxx


Also:

TLS

RBAC

Index-level permissions

2️⃣1️⃣ Monitoring
GET _cluster/health
GET _cat/nodes
GET _cat/indices

2️⃣2️⃣ Elasticsearch + Kafka
MongoDB → Kafka → ES


Consumer example:

consumer.on('message', async msg => {
  await es.index({ index: 'products', document: msg.value });
});

2️⃣3️⃣ Time-Series (Logs)

Index per day

ILM policy

Hot → Warm → Cold

2️⃣4️⃣ Best Practices (INTERVIEW GOLD)

✅ Use filters
❌ Avoid deep pagination
✅ Use aliases
❌ Don’t overshard
✅ Monitor heap

🎯 Final Interview Statement

“Elasticsearch is used for distributed full-text search and analytics, combined with Redis for caching and Kafka for ingestion, while a database remains the source of truth.”
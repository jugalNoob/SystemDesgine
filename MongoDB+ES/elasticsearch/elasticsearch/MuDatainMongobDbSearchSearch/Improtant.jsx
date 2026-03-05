Very good question Jugal 🔥
This is exactly where many developers get confused.

You’re asking:

My real data is in MongoDB.
How does Elasticsearch know about that data?

Excellent 🔥
Because Elasticsearch is NOT your primary database.

🧠 Important Concept
MongoDB = Source of Truth
Elasticsearch = Search Index
Redis = Cache


Elasticsearch does NOT automatically know about MongoDB data.
You must sync data from MongoDB → Elasticsearch.

🔥 3 Ways To Sync MongoDB With Elasticsearch
✅ Method 1 (Simple & Practical) — Update ES When You Write to DB

Whenever you:

Create product

Update product

Delete product

You update both MongoDB and Elasticsearch.

Example: Create Product API
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body); // MongoDB

  // Index in Elasticsearch
  await elastic.index({
    index: "products",
    id: product._id.toString(),
    body: {
      name: product.name,
      price: product.price,
      description: product.description
    }
  });

  res.json(product);
});


Now ES knows about your product.

Update Product
app.put("/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  await elastic.index({
    index: "products",
    id: updated._id.toString(),
    body: updated
  });

  res.json(updated);
});

Delete Product
await Product.findByIdAndDelete(id);

await elastic.delete({
  index: "products",
  id: id
});

✅ Method 2 (Production Level) — Kafka Sync (Best Practice)

Better architecture:

MongoDB write
     ↓
Publish event to Kafka
     ↓
Consumer updates Elasticsearch


Why better?

Async

Faster API response

No tight coupling

More scalable

✅ Method 3 — Initial Bulk Sync

If you already have 1 million products in MongoDB:

You must index them once.

const products = await Product.find();

for (const product of products) {
  await elastic.index({
    index: "products",
    id: product._id.toString(),
    body: product
  });
}


In production, use bulk API instead.

🚀 Full Data Flow (Correct Architecture)
User creates product
        ↓
MongoDB stores data
        ↓
Event published
        ↓
Elasticsearch index updated
        ↓
Search API queries Elasticsearch
        ↓
Result cached in Redis

⚠ Important Rule

Never search MongoDB for full-text search at scale.

Bad:

Product.find({ name: /iphone/i })


Good:

Elasticsearch match query

🧠 Why Not Just Use MongoDB Text Index?

MongoDB text index is OK for:

Small scale

Basic search

Elasticsearch is better for:

Fuzzy search

Ranking

Autocomplete

Aggregation

High scale

Analytics

🎯 Final Answer To Your Question

Elasticsearch knows about MongoDB data because:

👉 You explicitly push data to Elasticsearch
OR
👉 You use event-based sync

It does NOT magically sync.

💡 Pro Tip For Interview

If interviewer asks:

“How do you keep MongoDB and Elasticsearch consistent?”

You say:

DB is source of truth

Use event-driven architecture

Use Kafka to update ES

Use bulk indexing for re-sync

Accept eventual consistency

That is senior-level answer.

If you want next, I can show:

🔥 How to use Elasticsearch Bulk API
🔥 How to implement Kafka-based sync
🔥 How to design search ranking system
🔥 How to avoid stale search results
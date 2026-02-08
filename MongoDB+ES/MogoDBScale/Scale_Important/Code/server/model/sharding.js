const { MongoClient } = require("mongodb");

async function setupSharding() {
  const client = await MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true });
  const adminDb = client.db("admin");

  // Enable sharding for database
  await adminDb.command({ enableSharding: "apiProject" });

  // Add shards (if not already added)
  await adminDb.command({ addShard: "shard1Repl/localhost:27020" });
  await adminDb.command({ addShard: "shard2Repl/localhost:27021" });

  // Shard the collection
  await adminDb.command({
    shardCollection: "apiProject.restapis",
    key: { email: 1 }
  });

  console.log("✅ Sharding setup complete!");
  client.close();
}

// setupSharding();
module.exports =setupSharding;

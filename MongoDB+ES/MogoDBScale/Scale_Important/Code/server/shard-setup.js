// // Enable sharding for database
// sh.enableSharding("local")

// // Shard the users collection using "email" as the shard key
// sh.shardCollection("local.restapis", { email: 1 })

// console.log(sh.shardCollection("testDB.users", { email: 1 }))
// // Check distribution of documents across shards
// db.restapis.getShardDistribution()


sh.status()               
// sh.enableSharding("apiProject")
// sh.addShard("shard1Repl/localhost:27020")
// sh.addShard("shard2Repl/localhost:27021")
// sh.shardCollection("apiProject.restapis", { email: 1 })



// You said:
// 4️⃣ Optional: Check in Compass

// Connect Compass to your mongos router.

// Open testDB.users.

// Use Filter → { email: "jugal@example.com" }.

// Use Aggregation → $collStats → StorageStats to see which shard holds which documents.

// 🔹 2. Run File in mongosh

// In terminal (where mongosh is installed):

// mongosh < shard-setup.js


// This will:

// Connect to MongoDB.

// Run the commands in your file.

// Print out the shard distribution.

// 🔹 3. Example Output

// If you inserted a few documents earlier, you’ll see:

// Shard shard0000 at localhost:27018
//     data : 2 docs
// Shard shard0001 at localhost:27019
//     data : 1 doc

// 🔹 4. Re-Usable Setup

// You can keep multiple files for automation:

// create-shard.js → for enabling sharding + shardCollection

// check-distribution.js → just for running db.users.getShardDistribution()
🔥 GeoHash Library Code Explained (Node.js)

Instead of manually implementing GeoHash, in real projects we use a library.

One popular library:

ngeohash


Install:

npm install ngeohash

🔵 1️⃣ Basic Usage
const ngeohash = require("ngeohash");

// Encode
const hash = ngeohash.encode(28.6139, 77.2090, 6);
console.log("GeoHash:", hash);

// Decode
const decoded = ngeohash.decode(hash);
console.log("Decoded:", decoded);

Output:
GeoHash: ttnf3v
Decoded: { latitude: 28.61..., longitude: 77.20... }

🧠 What encode() Does Internally
ngeohash.encode(latitude, longitude, precision)

Parameters:

latitude → number

longitude → number

precision → length of geohash string

Example:
ngeohash.encode(28.6139, 77.2090, 5);


Output:

ttnf3


Higher precision → smaller area.

🔵 2️⃣ Decode Example
const result = ngeohash.decode("ttnf3v");

console.log(result.latitude);
console.log(result.longitude);


It returns approximate center of the grid box.

🔥 3️⃣ Bounding Box
const bbox = ngeohash.decode_bbox("ttnf3v");
console.log(bbox);


Output:

[minLat, minLon, maxLat, maxLon]


This gives the exact area covered by the geohash.

Very useful for:

Drawing map boundaries

Region filtering

🔥 4️⃣ Get Neighboring Geohashes

This is very important for nearby search.

const neighbors = ngeohash.neighbors("ttnf3v");
console.log(neighbors);


Output:

[
  'ttnf3u', 'ttnf3w',
  'ttnf3t', 'ttnf3y',
  ...
]


Why this matters?

If you search only prefix "ttnf3v",
you might miss nearby points in adjacent boxes.

So you search:

Current geohash

All neighbors

🔥 Example: Nearby Search Simulation
const userHash = ngeohash.encode(28.6139, 77.2090, 6);

const searchHashes = [
  userHash,
  ...ngeohash.neighbors(userHash)
];

console.log("Search in these regions:", searchHashes);


Then query DB:

WHERE geohash IN (...)


Fast prefix-based search.

🧠 Real-World Use Cases

GeoHash is used in:

Uber (driver matching)

Swiggy

Zomato

Elasticsearch (geo indexing)

Redis GEO commands

🔥 Example: Store GeoHash in MongoDB
{
  name: "Restaurant A",
  location: {
    lat: 28.6139,
    lng: 77.2090
  },
  geohash: "ttnf3v"
}


Now searching nearby:

db.restaurants.find({
  geohash: { $regex: "^ttnf3" }
})


Fast because string prefix index.

🔥 GeoHash Precision Guide


| Precision | Approx Area |
| --------- | ----------- |
| 4         | ~20km       |
| 5         | ~5km        |
| 6         | ~1km        |
| 7         | ~150m       |
| 8         | ~40m        |

Choose precision based on use case.

🧠 Interview Answer

If asked:

How do you implement GeoHash in Node.js?

Say:

I use the ngeohash library to encode lat/lng into a base32 string. For nearby search, I query using prefix matching and include neighboring geohashes to avoid edge-case misses.

That’s a strong system design answer.

🚀 Since you're preparing advanced system design

Next I can explain:

🔥 Build Uber-like driver matching system using GeoHash

🔥 GeoHash + Redis GEOADD comparison

🔥 GeoHash sharding strategy

🔥 MongoDB 2dsphere vs GeoHash

🔥 How Elasticsearch stores geo indexes internally
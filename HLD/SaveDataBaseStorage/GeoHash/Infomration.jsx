🔥 What is GeoHash?

GeoHash is a way to encode latitude and longitude into a short string of characters.

Example:

Lat: 28.6139
Lng: 77.2090

GeoHash → "ttnf3v"


It converts geographic coordinates into a base32 string.

🧠 Why GeoHash Is Powerful

GeoHash allows:

✅ Fast nearby location search
✅ Spatial indexing
✅ Prefix-based location grouping
✅ Efficient geo queries in databases

🔥 Core Idea

GeoHash works by:

Dividing the world into a grid

Splitting latitude and longitude alternately

Encoding the result in base32

Longer GeoHash → More precision.

📏 Precision Table



| GeoHash Length | Approx Area Size |
| -------------- | ---------------- |
| 3 chars        | ~150 km          |
| 5 chars        | ~5 km            |
| 6 chars        | ~1 km            |
| 8 chars        | ~20 meters       |
| 9+ chars       | Few meters       |



More characters = smaller box.

🗺 Real Systems Using GeoHash

Uber (driver matching)

Swiggy (restaurant proximity)

Zomato

Elasticsearch (geo indexing)

Redis (GEO commands)

MongoDB (2dsphere index alternative concept)

🔥 Why Not Just Store Lat/Lng?

If you store:

lat = 28.6139
lng = 77.2090


Finding nearby users requires:

distance formula calculation for every row


That is slow.

GeoHash lets you:

WHERE geohash LIKE 'ttnf%'


Fast prefix matching.

🧠 How GeoHash Works Internally (Simplified)

It:

Divides latitude range (-90 to 90)

Divides longitude range (-180 to 180)

Alternates splitting lat/lng

Converts binary to base32 string

It is similar to a binary search over space.

🔥 Example (Simple Node.js Usage)

Install:

npm install ngeohash


Example:

const ngeohash = require("ngeohash");

// Encode
const hash = ngeohash.encode(28.6139, 77.2090, 6);
console.log("GeoHash:", hash);

// Decode
const location = ngeohash.decode(hash);
console.log("Decoded:", location);


Output:

GeoHash: ttnf3v
Decoded: { latitude: 28.61..., longitude: 77.20... }

🔥 Use Case: Uber-like System

Driver location stored as:

driver_id | geohash


To find nearby drivers:

Get user geohash

Search same prefix + neighbors

Filter by exact distance

Very fast lookup.

🧠 GeoHash in Distributed Systems

GeoHash is useful for:

Sharding by region

Partitioning data geographically

Reducing cross-region queries

Example:

Shard 1 → prefix ttn
Shard 2 → prefix ttq

🔥 Interview Definition

GeoHash is a spatial indexing technique that encodes latitude
 and longitude into a hierarchical string, enabling efficient 
 proximity searches using prefix matching.

🔥 GeoHash vs Other Spatial Indexes


| Feature           | GeoHash | R-Tree | QuadTree |
| ----------------- | ------- | ------ | -------- |
| Easy to implement | Yes     | Medium | Medium   |
| Prefix search     | Yes     | No     | No       |
| Used in NoSQL     | Yes     | Yes    | Yes      |
| Sharding friendly | Yes     | Medium | Medium   |




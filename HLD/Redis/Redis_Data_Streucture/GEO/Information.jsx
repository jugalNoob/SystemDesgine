Perfect 🔥 let’s deep dive into Redis Geo and explain all concepts, commands, and simple code examples for projects.

🌐 What is Redis Geo?

Redis Geo is a geospatial data type built on top of Sorted Sets (ZSet).

Stores longitude, latitude, and member in a key.

Supports distance calculation, radius queries, and sorting by distance.

Think of it as location-based storage for things like stores, drivers, users, or events.

🧠 Key Concepts

GEOADD → Add location

GEOPOS → Get coordinates of a member

GEODIST → Get distance between two members

GEORADIUS / GEORADIUSBYMEMBER → Find members within a radius

GEOHASH → Get a geohash string for a member (useful for indexing)

🔥 Core Commands
1️⃣ GEOADD

Add location (longitude, latitude, member)

GEOADD cities 13.4050 52.5200 Berlin
GEOADD cities 2.3522 48.8566 Paris
GEOADD cities -0.1276 51.5074 London


cities → Redis key

longitude latitude member → Coordinates + name

2️⃣ GEOPOS

Get coordinates of a member

GEOPOS cities Berlin
# Returns: 13.4050, 52.5200

3️⃣ GEODIST

Get distance between two members

GEODIST cities Berlin Paris km
# Returns: 878 km


Units: m, km, mi, ft

4️⃣ GEORADIUS / GEORADIUSBYMEMBER

Find all members within a radius

# Find cities within 1000 km of Berlin
GEORADIUS cities 13.4050 52.5200 1000 km

# Find cities within 1000 km of Berlin using member name
GEORADIUSBYMEMBER cities Berlin 1000 km


Returns members inside radius

Can sort by distance using ASC or DESC

5️⃣ GEOHASH

Get a geohash for spatial indexing

GEOHASH cities Berlin
# Returns: u33dc0

🏗 Node.js Example
const redis = require('redis');
const client = redis.createClient();
await client.connect();

// Add cities
await client.geoAdd('cities', [
    { longitude: 13.4050, latitude: 52.5200, value: 'Berlin' },
    { longitude: 2.3522, latitude: 48.8566, value: 'Paris' },
    { longitude: -0.1276, latitude: 51.5074, value: 'London' }
]);

// Get coordinates of Berlin
const pos = await client.geoPos('cities', ['Berlin']);
console.log('Berlin coordinates:', pos);

// Distance between Berlin and Paris
const dist = await client.geoDist('cities', 'Berlin', 'Paris', 'km');
console.log('Distance Berlin-Paris:', dist, 'km');

// Find cities within 1000 km of Berlin
const nearby = await client.geoRadius('cities', 13.4050, 52.5200, 1000, 'km');
console.log('Nearby cities:', nearby);

🔹 Project Use-Cases

Delivery / Ride-Hailing Apps

Find nearest drivers or riders

Store Locator / Geo-Fencing

Find stores or events near a location

Gaming

Track player locations in AR games (like Pokémon Go)

Proximity Notifications

Notify users about events happening nearby

🔑 Key Notes

Geo data is stored efficiently using a ZSet internally

Radius queries are fast → no need to scan all members

Can combine with TTL, Hash, or Streams for advanced use-cases
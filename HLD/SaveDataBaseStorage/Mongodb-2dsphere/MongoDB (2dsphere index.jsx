🔥 MongoDB (2dsphere Index) — What Is the Meaning?
🧠 Simple Meaning

A 2dsphere index in MongoDB is:

A special spatial index used to store and query Earth-like (spherical) geographic data.

It understands:

Latitude

Longitude

Real Earth curvature 🌍

🔵 Why “2dsphere”?

Because Earth is:

Not flat

A sphere (approx)

So distance between two points must be calculated using:

Spherical geometry

Haversine formula internally

🔥 What Problems Does It Solve?

Without 2dsphere index:

Find nearby drivers
Find restaurants within 5km
Check if user inside geo-fence


You must scan all documents → ❌ Slow

With 2dsphere:

MongoDB uses spatial index → O(log n)


Fast and scalable.

🔥 Example Document
{
  name: "Restaurant A",
  location: {
    type: "Point",
    coordinates: [77.5946, 12.9716] // [longitude, latitude]
  }
}


⚠️ Order is:

[longitude, latitude]


NOT (lat, long)

🔥 Create 2dsphere Index
db.restaurants.createIndex({ location: "2dsphere" })


Now MongoDB builds spatial tree index internally.

🔥 Query Examples
1️⃣ Find Nearby (Within 5km)
db.restaurants.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [77.59, 12.97]
      },
      $maxDistance: 5000
    }
  }
})

2️⃣ Geo-Fencing (Inside Polygon)
db.restaurants.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[
          [77.5, 12.9],
          [77.6, 12.9],
          [77.6, 13.0],
          [77.5, 13.0],
          [77.5, 12.9]
        ]]
      }
    }
  }
})

🔥 Where It Fits in Real Projects
🚗 Ride Sharing (Uber Type)

Used by:

Uber

Use cases:

Find nearest driver

Detect if user in service zone

Driver heat map

🍔 Food Delivery

Used by:

Zomato

Swiggy

Use cases:

Show nearby restaurants

Delivery radius check

🗺 Map Systems

Google Maps

🔥 2dsphere vs 2d Index


| Feature          | 2d  | 2dsphere |
| ---------------- | --- | -------- |
| Flat surface     | Yes | No       |
| Real Earth       | No  | Yes      |
| Supports GeoJSON | No  | Yes      |
| Recommended      | ❌   | ✅        |


Always use 2dsphere for real applications.

🔥 How MongoDB Stores It Internally

MongoDB uses:

Geohash-like indexing

R-tree-like spatial partitioning

It divides world into regions for faster lookup.

🔥 Performance Benefit

Without index:

O(n)


With 2dsphere:

O(log n)


Huge improvement for millions of records.

🔥 Interview Definition

A 2dsphere index in MongoDB is a geospatial index that supports spherical geometry queries on GeoJSON objects, enabling efficient location-based searches such as proximity and geo-fencing.

🚀 Since You're Learning System Design
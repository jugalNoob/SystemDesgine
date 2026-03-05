🔥 GeoHash Code Explained (Step-by-Step)

We’ll understand:

How to encode latitude & longitude → GeoHash

How to decode GeoHash → latitude & longitude

Why it works

We’ll implement a simple version in pure Node.js (no library).

🧠 Core Idea of GeoHash

GeoHash:

Splits latitude range (-90 → 90)

Splits longitude range (-180 → 180)

Alternates between longitude and latitude

Converts result into base32 string

Base32 characters used:

0123456789bcdefghjkmnpqrstuvwxyz

🔥 Step 1: Encode Function (Manual Implementation)
const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

function encodeGeohash(lat, lon, precision = 6) {
  let latRange = [-90, 90];
  let lonRange = [-180, 180];

  let geohash = "";
  let isEvenBit = true;
  let bit = 0;
  let ch = 0;

  while (geohash.length < precision) {
    if (isEvenBit) {
      // Longitude split
      let mid = (lonRange[0] + lonRange[1]) / 2;
      if (lon > mid) {
        ch |= 1 << (4 - bit);
        lonRange[0] = mid;
      } else {
        lonRange[1] = mid;
      }
    } else {
      // Latitude split
      let mid = (latRange[0] + latRange[1]) / 2;
      if (lat > mid) {
        ch |= 1 << (4 - bit);
        latRange[0] = mid;
      } else {
        latRange[1] = mid;
      }
    }

    isEvenBit = !isEvenBit;

    if (bit < 4) {
      bit++;
    } else {
      geohash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return geohash;
}

🔥 Step 2: Test Encoding
const hash = encodeGeohash(28.6139, 77.2090, 6);
console.log("GeoHash:", hash);


Example output:

GeoHash: ttnf3v

🧠 What Is Happening Internally?

Let’s simplify:

Longitude range starts as:

[-180, 180]


Split into two halves:

[-180, 0]  and  [0, 180]


If longitude > 0 → choose right half.

Then split latitude.

Alternate until we create 5 bits → convert to base32 char.

Repeat until precision reached.

More characters = smaller box = higher precision.

🔥 Step 3: Decode Function
function decodeGeohash(hash) {
  let latRange = [-90, 90];
  let lonRange = [-180, 180];

  let isEvenBit = true;

  for (let char of hash) {
    let charIndex = BASE32.indexOf(char);

    for (let bit = 4; bit >= 0; bit--) {
      let bitValue = (charIndex >> bit) & 1;

      if (isEvenBit) {
        let mid = (lonRange[0] + lonRange[1]) / 2;
        if (bitValue === 1) {
          lonRange[0] = mid;
        } else {
          lonRange[1] = mid;
        }
      } else {
        let mid = (latRange[0] + latRange[1]) / 2;
        if (bitValue === 1) {
          latRange[0] = mid;
        } else {
          latRange[1] = mid;
        }
      }

      isEvenBit = !isEvenBit;
    }
  }

  return {
    latitude: (latRange[0] + latRange[1]) / 2,
    longitude: (lonRange[0] + lonRange[1]) / 2
  };
}

🔥 Test Decoding
const decoded = decodeGeohash(hash);
console.log("Decoded:", decoded);


Output:

Decoded: { latitude: 28.61..., longitude: 77.20... }


It returns approximate center of the GeoHash box.

🧠 Why GeoHash Is Powerful

Instead of storing:

lat = 28.6139
lng = 77.2090


You store:

geohash = ttnf3v


Now nearby locations share prefix:

ttnf3v
ttnf3w
ttnf3u


You can search:

WHERE geohash LIKE 'ttnf%'


Very fast lookup.

🔥 Real Systems Using GeoHash

Uber (driver matching)

Zomato

Elasticsearch (geo indexing)

Redis (GEOADD, GEORADIUS)

🔥 Interview Answer

If asked:

How does GeoHash work internally?

You say:

GeoHash alternates splitting latitude and longitude ranges, encodes the binary representation into base32 characters, and produces a hierarchical spatial index where shared prefixes indicate geographic proximity.

That’s strong.
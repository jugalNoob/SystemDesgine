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
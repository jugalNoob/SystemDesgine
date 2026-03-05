import { createClient } from 'redis';

const client = createClient();
await client.connect();

// 1️⃣ Create Bloom Filter
// bf.reserve key error_rate capacity
await client.sendCommand([
  'BF.RESERVE',
  'product_filter',
  '0.01',     // 1% false positive rate
  '1000000'   // capacity
]);

// 2️⃣ Add existing product IDs
await client.sendCommand([
  'BF.ADD',
  'product_filter',
  '123'
]);

// 3️⃣ Check if product exists
const exists = await client.sendCommand([
  'BF.EXISTS',
  'product_filter',
  '123'
]);

if (exists === 1) {
  console.log('Product might exist');
} else {
  console.log('Product definitely does NOT exist');
}

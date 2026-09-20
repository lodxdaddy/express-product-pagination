const assert = require('node:assert/strict');
const test = require('node:test');
const http = require('node:http');
const { app } = require('../server');

let server;
let baseUrl;

test.before(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

async function getProducts(query) {
  const response = await fetch(`${baseUrl}/products?${query}`);
  return { status: response.status, body: await response.json() };
}

test('returns the first page with the requested size', async () => {
  const result = await getProducts('page=1&limit=2');

  assert.equal(result.status, 200);
  assert.deepEqual(result.body.items, ['notebook', 'pen']);
});

test('returns the correct items for later pages', async () => {
  const result = await getProducts('page=2&limit=2');

  assert.equal(result.status, 200);
  assert.deepEqual(result.body.items, ['stapler', 'folder']);
});

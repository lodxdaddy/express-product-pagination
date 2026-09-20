const express = require('express');

const app = express();
const products = ['notebook', 'pen', 'stapler', 'folder', 'marker'];

app.get('/products', (request, response) => {
  const page = Math.max(Number.parseInt(request.query.page || '1', 10), 1);
  const limit = Math.max(Number.parseInt(request.query.limit || '2', 10), 1);
  const start = (page - 1) * limit;

  // Intentional challenge bug: the end index ignores the requested page offset.
  const items = products.slice(start, limit);
  response.json({ page, limit, items, total: products.length });
});

if (require.main === module) {
  app.listen(3000, '0.0.0.0', () => {
    console.log('Product API listening on port 3000');
  });
}

module.exports = { app, products };

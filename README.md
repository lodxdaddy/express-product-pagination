# Fix Product Pagination

## Overview

This Express API exposes a small product catalog with page-based pagination at `GET /products`.

## Bug Description

The endpoint returns incorrect results when a page other than the first is requested. The pagination slice uses the page size as its end boundary instead of applying the page offset.

## Expected Behavior

`page` and `limit` should return the corresponding window of products. For example, `page=2&limit=2` should return `stapler` and `folder`.

## How to Test

Install dependencies and run the offline test suite:

```bash
npm install
npm test
```

The initial test suite is expected to fail. Fix the pagination calculation in `server.js`, then run `npm test` again.

## Runtime

- Runtime type: `node-express`
- Port: `3000`
- Start command: `node server.js`

const express = require('express');
const bodyParser = require('body-parser');

const createWithShop = require('../middleware/withShop');
const createShopifyAuthRouter = require('./shopifyAuth');
const shopifyApiProxy = require('./shopifyApiProxy');

module.exports = function createRouter(shopifyConfig) {
  const router = express.Router();
  const rawParser = bodyParser.raw({ type: '*/*' });
  router.use(bodyParser.urlencoded({
      extended: true
  }));
  router.use(bodyParser.json());

  router.use('/auth/shopify', rawParser, createShopifyAuthRouter(shopifyConfig));
  router.use(
    '/api',
    rawParser,
    createWithShop({ redirect: false }),
    shopifyApiProxy,
  );

  return router;
};

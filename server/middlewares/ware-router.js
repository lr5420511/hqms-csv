'use strict';

const router = require('koa-router')();
const { ROUTES } = require('../config');

// Regist routes
ROUTES.reduce((ctx, cur) => (require(cur)(ctx) || 1) && ctx, router);

module.exports = router.routes();
'use strict';

const KoaStatic = require('koa-static');
const { ROOT_DIRECTORY } = require('../config');

module.exports = KoaStatic(ROOT_DIRECTORY);
'use strict';

const { createServer, Server } = require('http');
const { EventEmitter } = require('events');
const Koa = require('koa');
const promiseify = require('new-promiseify');
const { TCP_PORT, MIDDLE_WARES, KOA_TIMEOUT } = require('./config');

const [listen, once] = promiseify(
    Server.prototype.listen,
    [EventEmitter.prototype.once, 1, 2]
);

const app = new Koa();

// Regist koa middlewares
MIDDLE_WARES.reduce((ctx, cur) => ctx.use(require(cur)), app);

// Unknow error handle
(async () => {
    const err = await once.call(process, 'uncaughtException');
    console.log(`The current nodejs process need to exit, because ${err}.`);
    process.exit();
})();

// Open koa http service
(async () => {
    const server = createServer(app.callback()).setTimeout(KOA_TIMEOUT);
    await listen.call(server, TCP_PORT);
    console.log(`Koa application has been opened, and tcp ${TCP_PORT} port.`);
})();



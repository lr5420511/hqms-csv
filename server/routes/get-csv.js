'use strict';

const csvGenerator = require('../services/service-csv');

module.exports = router =>
    router.get('/csv/:code', async ctx => {
        const groups = decodeURIComponent(ctx.params.code).match(/[^ ;\:]+\:[^;]+;/g);
        ctx.assert(groups, 404, 'The directive is invaild.');
        const res = await csvGenerator(groups.reduce((ctx, cur) => {
            const ar = cur.match(/[^ \:\,;]+/g);
            if(ar) {
                const [key, value] = [ar[0], ar.slice(1)];
                ctx[key] = ctx[key] ? [...ctx[key], ...value] : value;
            }
            return ctx;
        }, {}));
        ctx.assert(res, 404, 'The directive is unsupported.');
        Object.assign(ctx, {
            status: 200, type: 'application/json', body: res
        });
    });
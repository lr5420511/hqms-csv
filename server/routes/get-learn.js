'use strict';

const getLearn = require('../services/service-learn');

module.exports = router => 
    router.get('/learn', async ctx => {
        const learn = await getLearn();
        Object.assign(ctx, {
            status: 200, type: 'application/json', body: learn
        });
    });
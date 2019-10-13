'use strict';

const assert = require('assert');
const oracledb = require('oracledb');
const { ORACLE_URL, ORACLE_DB, ORACLE_ROOT, ORACLE_PWD } = require('../config');

const outs = exports;

oracledb.fetchAsString = [oracledb.NUMBER];

outs.query = async function(sql, options) {
    assert(/^[ \r\n]*select[ \r\n]+/i.test(sql), 'sql is invaild, and only execute select.');
    const connect = await oracledb.getConnection({
        user: ORACLE_ROOT,
        password: ORACLE_PWD,
        connectString: [ORACLE_URL, ORACLE_DB].join('/')
    }),
    res = await connect.execute(sql, options);
    await connect.close();
    return res.rows.map(cur => res.metaData.reduce((ctx, key, i) =>
        ((ctx[key.name] = cur[i]) || 1) && ctx, {}
    ));
};
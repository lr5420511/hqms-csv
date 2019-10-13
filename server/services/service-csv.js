'use strict';

const { readFile } = require('fs');
const promiseify = require('new-promiseify');
const each = require('async-series-each');
const { query } = require('../utils/oracled');
const { HQMS_MAIN_PATHS, HQMS_COMMANDS, HQMS_FIELD_RULES } = require('../config');

const rdFile = promiseify(readFile);
const DECODE_TYPE = 'utf8';

module.exports = async function(kvs) {
    const cmds = await each(Object.keys(kvs)).reduce(async (res, key) => {
        const curValue = HQMS_COMMANDS[key];
        if(curValue) {
            const [path, hook] = curValue;
            res.push([await rdFile(path, DECODE_TYPE), hook(...kvs[key])]);
        }
        return res;
    }, []);
    if(!cmds.length) return null;
    const res =  await each(HQMS_MAIN_PATHS).reduce(async (res, pat) => {
        const main = await rdFile(pat, DECODE_TYPE);
        return [...res, ...(await query(
            [main, ...cmds.map(cur => cur[0])].join(' and '),
            cmds.reduce((res, cur) => [...res, ...cur[1]], [])
        ))];
    }, []);
    return res.map(cur => HQMS_FIELD_RULES.reduce((ctx, cur) => {
        const [prop, rule] = cur;
        ctx[prop] = rule(ctx[prop]);
        return ctx;
    }, cur));
};
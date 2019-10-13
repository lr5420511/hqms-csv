'use strict';

const { readFile } = require('fs');
const promiseify = require('new-promiseify');

const [rdFile, LEARN_PATH] = [
    promiseify(readFile), './json/learn.json'
];

module.exports = async function() {
    const res = await rdFile(LEARN_PATH, 'utf8');
    return JSON.parse(res);
};
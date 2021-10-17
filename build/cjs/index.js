'use strict';

var lodash = require('lodash');

var helloworld = (function (whom) {
    if (whom === void 0) { whom = "TS"; }
    return console.info("HelloWorld," + lodash.kebabCase(whom));
});

module.exports = helloworld;

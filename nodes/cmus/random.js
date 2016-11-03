#!/usr/bin/nodejs

const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');

var args = ARGS.buildArgs();
var beet = BEET.makeBeet();
console.log(JSON.stringify(beet.Random(+args.Get("n", "50"))));

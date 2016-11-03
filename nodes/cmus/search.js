#!/usr/bin/nodejs

const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');

var args = ARGS.buildArgs();
var beet = BEET.makeBeet();
args.Ensure(['q']);
console.log(JSON.stringify(beet.Query(args.Get('q'))));

#!/usr/bin/nodejs

const CMUS = require('../lib/cmus.js');
const ARGS = require('../lib/args.js');

var args = ARGS.buildArgs();
args.Ensure(["path"]);

var cmus = CMUS.makeCmus();
cmus.TopQueue(args.Get("path"));
console.log(JSON.stringify(cmus.QueueStatus()));



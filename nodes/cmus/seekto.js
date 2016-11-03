#!/usr/bin/nodejs

const CMUS = require('../lib/cmus.js');
const ARGS = require('../lib/args.js');

var args = ARGS.buildArgs();
args.Ensure(["s"]);

var cmus = CMUS.makeCmus();
cmus.Seek.To(args.Get("s"));
console.log(JSON.stringify(cmus.PlayerStatus()));


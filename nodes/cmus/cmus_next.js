#!/usr/bin/nodejs

const CMUS = require('../lib/cmus.js');
var cmus = CMUS.makeCmus();
cmus.Next();
console.log(JSON.stringify(cmus.PlayerStatus()));


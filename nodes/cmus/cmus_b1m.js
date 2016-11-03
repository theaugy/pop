#!/usr/bin/nodejs

const CMUS = require('../lib/cmus.js');
var cmus = CMUS.makeCmus();
cmus.Seek.Backward(60);
console.log(JSON.stringify(cmus.PlayerStatus()));



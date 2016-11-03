#!/usr/bin/nodejs

const CMUS = require('../lib/cmus.js');
var cmus = CMUS.makeCmus();
cmus.Play();
console.log(JSON.stringify(cmus.PlayerStatus()));

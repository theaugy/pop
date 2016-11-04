#!/usr/bin/nodejs
const CMUS = require('../lib/cmus.js');
console.log(JSON.stringify(CMUS.makeCmus().PlayerStatus()));

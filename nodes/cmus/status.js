#!/usr/bin/nodejs
const CMUS = require('../lib/cmus.js');
const cmus = CMUS.makeCmus();
module.exports = {
   run: function(req) {
      return JSON.stringify(cmus.PlayerStatus());
   }
};

#!/usr/bin/nodejs

const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');
var beet = BEET.makeBeet();

module.exports = {
   run: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(['q']);
      return JSON.stringify(beet.Query(args.Get('q')));
   }
};

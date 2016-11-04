#!/usr/bin/nodejs

const CMUS = require('../lib/cmus.js');
const ARGS = require('../lib/args.js');
var cmus = CMUS.makeCmus();

module.exports = {
   run: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["s"]);
      cmus.Seek.To(args.Get("s"));
      return JSON.stringify(cmus.PlayerStatus());
   }
};

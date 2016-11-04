#!/usr/bin/nodejs

const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');
const LOG  = require('../lib/log.js');
const J = JSON.stringify;

var args = ARGS.buildArgs();
var beet = BEET.makeBeet();
beet.Random(+args.Get("n", "50")).then(
      function(qresult) { console.log(J(qresult)); },
      function(err) { LOG.warn("Problem getting random (" + J(args) + "): " + err); }
      );

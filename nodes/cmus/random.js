#!/usr/bin/nodejs

const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');
const LOG  = require('../lib/log.js');
const J = JSON.stringify;
var beet = BEET.makeBeet();

module.exports = {
   run: function(req, res) {
      var args = ARGS.buildArgs(req);
      var result = "";
      beet.Random(+args.Get("n", "50")).then(
            function(qresult) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(qresult), 'binary');
               res.end();
            },
            function(err) { LOG.warn("Problem getting random (" + J(args) + "): " + err); }
            );
   }
};

#!/usr/bin/nodejs

const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');
var pl = PL.makePlaylistInterface();

module.exports = {
   run: function(req) {
      return pl.List().names.join("\n");
   }
};

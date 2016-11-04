#!/usr/bin/nodejs

const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');
var pl = PL.makePlaylistInterface();

module.exports = {
   run: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["name", "path"]);
      pl.AddTo(args.Get("name"), args.Get("path"));
   }
};

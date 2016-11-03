#!/usr/bin/nodejs

const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');

var args = ARGS.buildArgs();
args.Ensure(["name", "path"]);

var pl = PL.makePlaylistInterface();
pl.AddTo(args.Get("name"), args.Get("path"));

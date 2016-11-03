#!/usr/bin/nodejs

const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');

var args = ARGS.buildArgs();
args.Ensure(["name"]);

var pl = PL.makePlaylistInterface();
console.log(JSON.stringify(pl.Cat(args.Get("name"))));


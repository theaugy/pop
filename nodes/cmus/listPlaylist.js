#!/usr/bin/nodejs

const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');

var pl = PL.makePlaylistInterface();
console.log(JSON.stringify(pl.List().names));



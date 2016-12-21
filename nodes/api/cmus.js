const CMUS = require('../lib/cmus.js');
const ARGS = require('../lib/args.js');
const PL = require('../lib/playlists.js').makePlaylistInterface();
var cmus = CMUS.makeCmus();

const R = function(result, res, req) {
   res.writeHead(200, {'Content-type': 'application/json' });
   res.write(JSON.stringify(result), 'utf8');
   res.end();
   return true;
}

// j => R(j, res, req) means "write JSON response to the result"
module.exports = {
   seekto: function(req, res) {
      var args = ARGS.buildArgs(req);
      cmus.Seek.To(args.Get("s")).then(j => R(j, res, req));
   },
   status: function(req, res) {
      cmus.PlayerStatus().then(j => R(j, res, req));
   },
   play: function(req, res) {
      cmus.Play().then(j => R(j, res, req));
   },
   next: function(req, res) {
      cmus.Next().then(j => R(j, res, req));
   },
   pause: function(req, res) {
      cmus.Pause().then(j => R(j, res, req));
   },
   queue: function(req, res) {
      cmus.QueueStatus().then(j => R(j, res, req));
   },
   enqueue: function(req, res) {
      var args = ARGS.buildArgs(req);
      cmus.Enqueue(args.map).then(j => R(j, res, req));
   },
   dequeue: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.Dequeue(args.map).then(j => R(j, res, req));
   },
   topqueue: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.TopQueue(args.Get("path")).then(j => R(j, res, req));
   },
   queueJump: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.QueueJump(args.Get("path")).then(j => R(j, res, req));
   },
   setMain: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.SetMainPlaylist(args.Get('path')).then(() => {
            res.writeHead(200, {'Content-type': 'text/plain' });
            res.write("OK");
            res.end()
      });
   },
   setMainPos: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.SetMainPlaylistPos(args.Get('pos')).then(j => R(j, res, req));
   },
   getMain: function(req, res) {
      cmus.GetMainPlaylist().then(j => R(j, res, req));
   },
   updatePlaylistSongFields: function(req, res) {
      cmus.UpdatePlaylistSongFields().then(j => R(j, res, req));
   },
   newPlaylist: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmu.NewPlaylist(args.map).then(j => R(j, res, req));
   },
   addPlaylist: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.AppendToPlaylist(args.map).then(j => R(j, res, req));
   },
   listPlaylist: function(req, res) {
      cmus.ListPlaylist().then(j => R(j, res, req));
   },
   getPlaylist: function(req, res) {
      cmus.PlaylistStatus(ARGS.buildArgs(req, res).map).then(j => R(j, res, req));
   },
   loadPhone: function(req, res) {
      cmus.MagicPlaylist().then(j => R(j, res, req));
   },
}


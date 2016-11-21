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
   addPlaylist: function(req, res) {
      var args = ARGS.buildArgs(req);
      PL.AddTo(args.Get("name"), args.Get("path"));
      return ""; // to get an empty response written. which is a-ok.
   },
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
      cmus.Enqueue(args.Get("path")).then(j => R(j, res, req));
   },
   dequeue: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.Dequeue(args.Get("path")).then(j => R(j, res, req));
   },
   topqueue: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      cmus.TopQueue(args.Get("path")).then(j => R(j, res, req));
   }
}


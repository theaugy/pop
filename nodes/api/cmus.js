const CMUS = require('../lib/cmus.js');
const ARGS = require('../lib/args.js');
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
   shuffle: function(req, res) {
      cmus.Shuffle().then(j => R(j, res, req));
   },
   next: function(req, res) {
      cmus.Next().then(j => R(j, res, req));
   },
   pause: function(req, res) {
      cmus.Pause().then(j => R(j, res, req));
   },
   setMain: function(req, res) {
      var args = ARGS.buildArgs(req, res);
      var paths = [];
      if (args.Has('path'))
      {
         paths = args.Get('path');
      }
      else
      {
         // assume, somewhat dangerously, that this is a POST request
         // and that the body contains newline-separated paths
         req.body.split('\n').forEach(p => paths.push(p));
      }
      cmus.SetMainPlaylist(paths).then(() => {
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
   loadAugysPhone: function(req, res) {
      cmus.MagicPlaylist("new", "phone").then(j => R(j, res, req));
   },
   loadStellasPhone: function(req, res) {
      cmus.MagicPlaylist("new", "stellaphone").then(j => R(j, res, req));
   },
}


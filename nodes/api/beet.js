const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');
const J = JSON.stringify;
var beet = BEET.makeBeet();

const JR = function(res, object) {
   res.writeHead(200, {'Content-type': 'application/json' });
   res.write(J(object));
   res.end();
}

module.exports = {
   random: function(req, res) {
      var args = ARGS.buildArgs(req);
      beet.Random(+args.Get("n", "50")).then(
            function(qresult) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(qresult), 'utf8');
               res.end();
            },
            function(err) { LOG.warn("Problem getting random (" + J(args) + "): " + err); }
            );
   },
   randomTagged: function(req, res) {
      var args = ARGS.buildArgs(req);
      beet.RandomTagged(+args.Get("n", "50")).then(qresult => JR(res, qresult));
   },
   search: function(req, res) {
      // NOTE: this function can return a synchronous string response OR a promise.
      // Probably wise to standardize on promises one day.
      var args = ARGS.buildArgs(req);
      const q = args.Get('q');
      var m = q.match(/artist::^./);
      if (m !== null) {
         var songs = beet.ArtistStartQuery(m[1]);
         res.writeHead(200, {'Content-type': 'application/json' });
         res.write(J(songs), 'utf8');
         res.end();
         return;
      }

      beet.Query(q).then(
            function(result) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(result), 'utf8');
               res.end();
            },
            function(err) { LOG.warn("Problem getting query (" + J(args) + "): " + err); }
            );
   },
   tag: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      var paths = args.Get('path');
      if (!Array.isArray(paths)) {
         paths = [paths];
      }
      JR(res, beet.Tag(tag, paths));
   },
   untag: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      var paths = args.Get('path');
      if (!Array.isArray(paths)) {
         paths = [paths];
      }
      JR(res, beet.Untag(tag, paths));
   },
   tagDelete: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      JR(res, beet.TagDelete(tag));
   },
   tagStatus: function(req, res) {
      JR(res, beet.TagStatus());
   },
   tagFetch: function(req, res) {
      JR(res, beet.TagFetch(ARGS.buildArgs(req).map));
   },
   refreshArtistCache: function(req, res) {
      beet.RefreshArtistCache().then(r => JR(res, r));
   },
   updateTagTracksToLatestFields: function(req, res) {
      beet.UpdateTagTracksToLatestFields().then(r => JR(res, r));
   }
}


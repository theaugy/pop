const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');
const J = JSON.stringify;
var beet = BEET.makeBeet();

module.exports = {
   random: function(req, res) {
      var args = ARGS.buildArgs(req);
      beet.Random(+args.Get("n", "50")).then(
            function(qresult) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(qresult), 'binary');
               res.end();
            },
            function(err) { LOG.warn("Problem getting random (" + J(args) + "): " + err); }
            );
   },
   search: function(req, res) {
      // NOTE: this function can return a synchronous string response OR a promise.
      // Probably wise to standardize on promises one day.
      var args = ARGS.buildArgs(req);
      args.Ensure(['q']);
      const q = args.Get('q');
      var m = q.match(beet.artistStartRegex);
      if (m !== null) {
         return beet.ArtistStartQuery(m[1]);
      }

      beet.Query(q).then(
            function(result) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(result), 'binary');
               res.end();
            },
            function(err) { LOG.warn("Problem getting query (" + J(args) + "): " + err); }
            );
   }
}


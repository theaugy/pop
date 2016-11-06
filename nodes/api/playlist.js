const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');
var pl = PL.makePlaylistInterface();
const J = JSON.stringify;

module.exports = {
   addPlaylist: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["name", "path"]);
      pl.AddTo(args.Get("name"), args.Get("path"));
   },
   listPlaylist: function() {
      return pl.List().names.join("\n");
   },
   getPlaylist: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["name"]);
      return J(pl.Cat(args.Get("name")));
   }
}

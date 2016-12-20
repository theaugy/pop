const PL = require('../lib/playlists.js');
const ARGS = require('../lib/args.js');
var pl = PL.makePlaylistInterface();
const J = JSON.stringify;

module.exports = {
   convertM3us: function() {
      var names = this.listPlaylist().split("\n");
      //pl.ConvertM3uToJson('/m/playlists/' + names[0] + '.m3u', names[0]);
      names.forEach(n => pl.ConvertM3uToJson('/m/playlists/' + n + '.m3u', n));
      return "OK";
   },
}

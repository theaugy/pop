const spawn = require('child_process').spawnSync;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const QUERY = require('../lib/songquery.js');
const SONG = require('../lib/song.js');
const fs = require('fs');

function makeplList(plPaths) {
   var ret = { names: [] };
   var c = 0;
   plPaths.forEach((pl) => {
      var p = pl;
      p = p.replace(/^\/m\/playlists\//, "");
      p = p.replace(/\.m3u$/, "");
      if (!p || p === "") {
         return;
      }
      ret.names.push(p);
      ++c;
   });
   ret.names.sort();
   return ret;
}

// playlist interface
const pliProto = {
   nameToPath: function(plName) {
      if (plName.match(/\.\./) !== null) {
         throw "Playlist name cannot contain dot-dot: " + plName;
      }
      return '/m/playlists/' + plName + '.m3u';
   },
   List: function() {
      var output = spawn("/usr/bin/find", ['/m/playlists', '-name', '*.m3u']);
      var paths = output.stdout.toString();
      paths = paths.split('\n');
      LOG.info("Listing " + paths.length + " playlists");
      return makeplList(paths);
   },
   Cat: function(plName) {
      var output = spawn("/bin/cat", [this.nameToPath(plName)]);
      var songs = SONG.parseSongs(output.stdout.toString().split("\n"));
      LOG.info("Cat'ing " + songs.length + " songs in " + plName);
      return QUERY.makeQueryResult("Playlist " + plName, songs);
   },
   AddTo: function(plName, path) {
      LOG.info("Adding " + path + " to " + this.nameToPath(plName));
      var file = fs.createWriteStream(this.nameToPath(plName), { flags: 'a' } );
      file.write(path + "\n");
      /*
      var songs = Cat(plName).split("\n");
      var song = SONG.parseSong(path);
      songs.push(song);
      this.Write(plName, songs);
      */
   },
   // overwrites the file
   Write: function(plName, songs) {
      LOG.info("Overwriting " + plName + " with " + songs.length + " songs");
      var file = fs.createWriteStream(this.nameToPath(plName), { flags: 'w' } );
      songs.forEach((song) => {
         file.write(song.path + "\n");
      });
   }
};

module.exports = {
   makePlaylistInterface: function() {
      return Object.create(pliProto);
   }
}

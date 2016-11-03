const SAFETY = require('../lib/safety.js');

const songProto = {
   title: null,
   artist: null,
   album: null,
   path: null
};

function makeSong(artist, title, album, path) {
   var ret = Object.create(songProto);
   SAFETY.ensureDefined([artist, title, album, path],
         ['artist', 'title', 'album', 'path']);
   ret.title = title;
   ret.artist = artist;
   ret.album = album;
   ret.path = path;
   return ret;
};

var songRegex = {
   artist_title: /[0-9]+ ([^-]*) - (.*).(flac|mp3|mp4|alac|m4a)/,
   year_album: /[0-9][0-9][0-9][0-9] (.*)/,
   artist_singles: /(.*) singles$/,
   n_artist_title: /([0-9]+) (.*) - (.*).(flac|mp3|mp4|alac|m4a)/,
};

function makeSongFromPath (path) {
   var pathParts = path.split("/");
   if (pathParts.length !== 5) {
      LOG.warn("Can't parse (part count=" + pathParts.length + "): " + path);
      return makeSong("NO_ARTIST", "NO_TITLE", "NO_ALBUM", path);
   }

   // try as a single
   var isSingles = pathParts[3].match(songRegex.artist_singles);
   if (isSingles !== null) {
      var a_t = pathParts[4].match(songRegex.artist_title);
      if (a_t !== null) {
         return makeSong(a_t[1], a_t[2], "single", path);
      }
   }

   // try as an album track
   var isAlbum = pathParts[3].match(songRegex.year_album);
   if (isAlbum !== null) {
      var n_a_t = pathParts[4].match(songRegex.n_artist_title);
      if (n_a_t !== null) {
         return makeSong(n_a_t[2], n_a_t[3], isAlbum[1], path);
      }
   }

   // fallback when nothing parses
   LOG.warn("Can't parse: " + path);
   return makeSong("NO_ARTIST", "NO_TITLE", "NO_ALBUM", path);
}

module.exports = {
   parseSong: function(path) {
      return makeSongFromPath(path);
   },
   parseSongs: function(paths) {
      var songs = [];
      var This = this;
      paths.forEach(path => {
         if (path === "")
            return;
         songs.push(This.parseSong(path));
      });
      return songs;
   }
};

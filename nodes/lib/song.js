const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');

const songProto = {
   title: null,
   artist: null,
   album: null,
   path: null
};

var _songCaches = [];
var _songCacheCount = 0;
var _songCacheMax = 10;

var _cacheMisses = 0;

function _makeSongCache(songs) {
   var ret = {};
   songs.forEach(s => ret[s.path] = s);
   return ret;
}

function _addSongCache(sc) {
   _songCaches.push(sc);
   if (_songCaches.length > _songCacheMax) {
      _songCaches.shift();
   }
}

function _getCachedSong(path) {
   var ret = null;
   _songCaches.forEach(sc => {
      if (!ret) {
         if (sc[path] !== undefined) {
            ret = sc[path];
         }
      }
   });
   return ret;
}

// song should basically have everything already. We'll just enforce
// some basics.
function makeSong(song) {
   SAFETY.ensureDefined([song.artist, song.title, song.album, song.path],
         ['artist', 'title', 'album', 'path']);
   return song;
};

module.exports = {
   parseSong: function(path) {
      var s = _getCachedSong(path);
      if (!s) {
         LOG.warn("Cache miss for " + path + " (total " + _cacheMisses + ")");
         throw "Cache miss for " + path;
      }
      return s;
   },
   parseSongs: function(paths) {
      var songs = [];
      var This = this;
      var misses = false;
      paths.forEach(path => {
         if (path === "")
            return;
         var s = _getCachedSong(path);
         if (!s) {
            misses = true;
            ++_cacheMisses;
         } else {
            songs.push(s);
         }
      });
      if (misses === true) {
         LOG.warn("cache misses! total is now " + _cacheMisses);
      }
      return songs;
   },
   songFromFields: function(fields) {
      return makeSong(fields);
   },
   cacheSongs: function(songs) {
      if (songs.length > 0) {
         _addSongCache(_makeSongCache(songs));
      }
   },
   getCacheMisses: function() {
      return _cacheMisses;
   }
};

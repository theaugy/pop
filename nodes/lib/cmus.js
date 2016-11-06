const spawn = require('child_process').spawnSync;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const decoder = new (require("string_decoder").StringDecoder);

const queueStatusProto = {
};

function makeQueueStatus(songList) {
   var ret = Object.create(queueStatusProto);
   ret.songs = [];
   SAFETY.ensureDefined([songList], ['songList']);
   ret.songs = songList;
   return ret;
}

const playerStatusProto = {
};

function makePlayerStatus(args)
{
   var ret = Object.create(playerStatusProto);
   var tryMatch = function(line, name, re) {
      var m = line.match(re);
      if (m !== null) {
         ret[name] = m[1];
         return true;
      }
      return false;
   }
   args.forEach((arg) => {
      if (!tryMatch(arg, "status", /status (\w+)/) &&
            !tryMatch(arg, "duration", /duration (\d+)/) &&
            !tryMatch(arg, "position", /position (\d+)/) &&
            !tryMatch(arg, "artist", /tag artist (.+)/) &&
            !tryMatch(arg, "album", /tag album (.+)/) &&
            !tryMatch(arg, "title", /tag title (.+)/) &&
            !tryMatch(arg, "shuffle", /set shuffle (\w+)/) &&
            !tryMatch(arg, "path", /^file (.+)/)) {
      }});

   SAFETY.ensureDefined(
         [ret.status, ret.duration, ret.position, ret.artist, ret.album, ret.title, ret.shuffle, ret.path],
         ["status", "duration", "position", "artist", "album", "title", "shuffle", "path"]);
   return ret;
}

const seekProto = {
   Forward: function(numSeconds) {
      spawn(this.cmus.CmusRemotePath(), ['-C', 'seek +' + numSeconds + 's']);
   },
   Backward: function(numSeconds) {
      spawn(this.cmus.CmusRemotePath(), ['-C', 'seek -' + numSeconds + 's']);
   },
   To: function(offsetSeconds) {
      spawn(this.cmus.CmusRemotePath(), ['-C', 'seek ' + offsetSeconds + 's']);
   },
   cmus: null
};

const makeSeek = function(cmus) {
   var ret = Object.create(seekProto);
   ret.cmus = cmus;
   return ret;
}

const cmusProto = {
   CmusRemotePath: function() {
      return "/usr/local/bin/cmus-remote";
   },
   QueueStatus: function() {
      var output = spawn(this.CmusRemotePath(), ["-C", "save -q -" ]);
      var paths = output.stdout.toString();
      paths = paths.split("\n");
      LOG.info("Returning queue status with " + paths.length + " paths");
      return makeQueueStatus(this.PathsToSongs(paths));
   },
   PlayerStatus: function() {
      var output = spawn(this.CmusRemotePath(), ["-Q"]);
      var lines = decoder.write(output.stdout);
      lines += decoder.end();
      lines = lines.split("\n");
      return makePlayerStatus(lines);
   },
   PathToSong: function(path) {
      return SONG.parseSong(path);
   },
   PathsToSongs: function(paths) {
      return SONG.parseSongs(paths);
   },
   Enqueue: function(path) {
      LOG.info("Enqueueing '" + path + "'");
      this.enqueue(path);
   },
   enqueue: function(path) {
      spawn(this.CmusRemotePath(), ["-q", path]);
   },
   ClearQueue: function() {
      LOG.info("Clearing queue");
      this.clearQueue();
   },
   clearQueue: function() {
      spawn(this.CmusRemotePath(), ['-c', '-q']);
   },
   Dequeue: function(path) {
      LOG.info("Dequeueing '" + path + "'");
      var current = this.QueueStatus();
      this.clearQueue();
      var This = this;
      // re-add each song that does not match
      current.songs.forEach(function(song) {
         if (song.path !== path) {
            This.enqueue(song.path);
         }
      });
   },
   TopQueue: function(path) {
      LOG.info("Top Queueing '" + path + "'");
      var current = this.QueueStatus();
      this.clearQueue();
      this.enqueue(path);
      var This = this;
      current.songs.forEach(function(song) {
         if (song.path !== path) {
            This.enqueue(song.path);
         }
      });
   },
   GetPlaylist: function() {
      // NOTE: I don't believe anyone calls this
      LOG.warn("GetPlaylist() called, yet I don't know why.");
      var output = spawn(this.CmusRemotePath(), ["-C", "save -p -" ]);
      var paths = output.stdout.toString();
      paths = paths.split("\n");
      return makeQueueStatus(this.PathsToSongs(paths));
   },
   Seek: null,
   Play: function() {
      spawn(this.CmusRemotePath(), ['--play']);
   },
   Pause: function() {
      spawn(this.CmusRemotePath(), ['--pause']);
   },
   Next: function() {
      spawn(this.CmusRemotePath(), ['--next']);
   },
   Previous: function() {
      spawn(this.CmusRemotePath(), ['--prev']);
   },
   FavoriteCurrentlyPlaying: function() {
      spawn("/home/pi/bin/am", ['now', '/m/playlists/fav.m3u']);
   },

};

module.exports = {
   makeCmus: function() {
      var ret = Object.create(cmusProto);
      ret.Seek = makeSeek(ret);
      return ret;
   }
};

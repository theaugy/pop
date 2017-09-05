'use strict';
const spawn = require('child_process').spawnSync;
const spawnAsync = require('child_process').spawn;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const decoder = new (require("string_decoder").StringDecoder);
const fs = require('fs');
const queueFile = "/m/meta/queues.json";
const BEET = require('../lib/beet.js').makeBeet();
const QUERY = require('../lib/songquery.js');

const hit = function(period) {
   return Math.floor(Math.random() * period) % period === 0;
}

function makeQueueStatus(name, songList) {
   var ret = {};
   ret.songs = [];
   SAFETY.ensureDefined([songList], ['songList']);
   ret.songs = songList;
   ret.name = name;
   return ret;
}

function lastSevenQuery() {
   var y = new Date().getFullYear();
   var m = new Date().getMonth() + 1;
   var d = new Date().getDate();
   if (d <= 7) {
      d = d + 28 - 7;
      if (m == 1) {
         y--;
         m = 12;
      } else {
         m--;
      }
   } else {
      d = d - 7;
   }
   var q = "added:" + y + "-" + m + "-" + d + ".. album+";
   return q;
}

function makePlayerStatus(args)
{
   var ret = {};
   var tryMatch = function(line, name, re) {
      var m = line.match(re);
      if (m !== null) {
         ret[name] = m[1];
         return true;
      }
      return false;
   };
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

   SAFETY.fillInMissing(
         [ret.status, ret.duration, ret.position, ret.artist, ret.album, ret.title, ret.shuffle, ret.path],
         ["status", "duration", "position", "artist", "album", "title", "shuffle", "path"]);
   return ret;
}

const makeSeek = function(cmus) {
   var S = function(args) { return cmus.S(args); };
   var ret = {
      Forward: function(numSeconds) {
         return S(this.cmus.oneShot(['-C', 'seek +' + numSeconds + 's']));
      },
      Backward: function(numSeconds) {
         return S(this.cmus.oneShot(['-C', 'seek -' + numSeconds + 's']));
      },
      To: function(offsetSeconds) {
         return S(this.cmus.oneShot(['-C', 'seek ' + offsetSeconds + 's']));
      },
   };
   ret.cmus = cmus;
   return ret;
}
const cmusRemotePath = "/usr/local/bin/cmus-remote";

const makeCmusRemote = function() {
   var ret = {
      command: function(args) {
         var This = this;
         var output = spawn(cmusRemotePath, args);
         var text = decoder.write(output.stdout);
         text += decoder.end();
         return text;
      },

      // run a callback after other sync() callbacks finish.
      // Most cmus remote commands require this.
      // The callback must return a promise.
      sync: function(makePromise) {
         var This = this;
         // when the current lastCmd promise finishes, run callback
         This.lastCmd = This.lastCmd.then(lastResult => {
            return makePromise();
         });
         // lastCmd can now be used to trigger the next callback passed to sync()
         return This.lastCmd;
      },
   };
   // kick off the cmd chain
   ret.lastCmd = Promise.resolve("start");
   return ret;
};

const writeToTempM3u = function(paths) {
   var This = this;
   var path = "/tmp/cmr-tmp.m3u";
   var file = fs.createWriteStream(path, { flags: 'w', defaultEncoding: 'utf8' });
   paths.forEach(p => file.write(p + "\n"));
   file.end();
   return new Promise(function(res) { file.on('finish', () => res(path)); });
};

// C() set up in makeCmus()
// S() set up in makeCmus()
// The lowercase versions return functions that create promises, suitable
// for passing to sync().
// The uppercase version calls S() to sync. Only one of these is
// allowed per request. The function passed to S() should create a promise.
// As long as we never call an uppercase function, the system works.
const cmusProto = {
   // NOTE: We don't have a good way of getting the cmus playlist status, short of issuing
   // a 'save' command and cat'ing ~/.cmus/playlists/default. In theory though, this won't
   // be necessary: the ui defines what goes in the playlist, and as long as nobody else
   // messes with it, it will be as the ui last left it.
   SetMainPlaylist: function(paths) {
      return this.cmusLoadPlaylist(paths);
   },
   SetMainPlaylistPos: function(pos) {
      var This = this;
      return this.cmusGotoPlaylistPositionAnd(pos, ['win-activate'])().then(This.playerStatus());
   },
   getMainPlaylist: function() {
      var This = this;
      return function() {
         This.C(['-C', 'save']); // have cmus dump its state
         var r = fs.createReadStream('/home/pi/.cmus/playlists/default', { encoding: 'utf8' });
         var d = "";
         var mainPlaylist = { name: "CmusMainPlaylist", songs: [] };
         var ret = new Promise(function(resolve) {
            r.on('data', chunk => d += chunk);
            r.on('end', () => {
               var paths = d.split("\n");
               return BEET._pathsToSongs(paths)
                  .then(songs => BEET.populateTags(songs))
                  .then(songs => {
                     mainPlaylist.songs = songs;
                     resolve(mainPlaylist);
                  });
            });
         });
         return ret;
      };
   },
   GetMainPlaylist: function(paths) {
      return this.getMainPlaylist()();
   },
   cmusLoadPlaylist: function(paths) {
      var This = this;
      // write the passed playlist to a temp m3u, then replace the cmus playlist with that.
      return writeToTempM3u(paths).then(
            (plpath) => {
               // expect that the playlist list is focused. this is janky af.
               This.C(['-C', 'win-next'])
                  This.C(['-C', 'view playlist', 'clear']);
               This.C(['-c', plpath])
            });
   },
   // pos is zero-indexed playlist position.
   cmusGotoPlaylistPositionAnd: function(pos, andThen) {
      var This = this;
      return function() {
         // also expect the playlist list is focused.
         var cmds = ["-C", 'view playlist', 'win-next', "win-top" ];
         for (var i = 0; i < pos; ++i) {
            cmds.push("win-down");
         }

         // perform whatever operation is requested at this location
         andThen.forEach(c => cmds.push(c));

         // then go back to playlist list
         cmds.push('win-next');
         This.C(cmds);
         return Promise.resolve(true);
      };
   },
   QueueStatus: function() {
      throw "QueueStatus is probably broken.";
      return this.S(this.queueStatus());
   },
   playerStatus: function() {
      var This = this;
      return function() {
         var lines = This.C(["-Q"]);
         lines = lines.split("\n");
         return Promise.resolve(makePlayerStatus(lines));
      };
   },
   PlayerStatus: function() {
      var This = this;
      return this.S(This.playerStatus());
   },
   pathsToSongs: function(paths) {
      return SONG.parseSongs(paths);
   },
   oneShot: function(args) {
      var This = this;
      return function() { return Promise.resolve(This.remote.command(args)).then(This.playerStatus()); };
   },
   play: function() { return this.oneShot(['--play']); },
   Play: function() { return this.S(this.play()); },
   pause: function() { return this.oneShot(['--pause']); },
   Pause: function() { return this.S(this.pause()); },
   next: function() { return this.oneShot(['--next']); },
   Next: function() { return this.S(this.next()); },
   previous: function() { return this.oneShot(['--prev']); },
   Previous: function() { return this.S(this.previous()); },
   Shuffle: function() { return this.S(this.shuffle()); },
   shuffle: function() { return this.oneShot(['-S']); },
   MagicPlaylist: function(tagname, phoneName) {
      let rands = BEET.Random(50);
      let recents = BEET.Query(lastSevenQuery());
      if (phoneName === undefined) {
         phoneName = "phone";
      }
      let fromtag = BEET.TagFetch({ tag: tagname });
      let randTagged = BEET.RandomTagged(100);
      let magicList = [];
      return Promise.all([rands, recents, randTagged, fromtag])
      .then(values => {
         magicList = values[3].songs; // start with tagname songs
         magicList = magicList.concat(values[1].songs);
         magicList = magicList.concat(values[2].songs);
         magicList = magicList.concat(values[0].songs);
         LOG.info("Magic playlist has " + magicList.length + " tracks.");
         return magicList;
      })
      .then(() => {
         let This = this;
         let path = "/tmp/MagicPlaylist.m3u";
         let seen = {};
         return new Promise(function(resolve) {
            var file = fs.createWriteStream(path, { flags: 'w', defaultEncoding: 'utf8' });
            magicList.forEach(s => {
               if (seen[s.id] !== 1) { // prevent duplicates
                  seen[s.id] = 1;
                  file.write(s.path + "\n");
               }
            });
            file.end();
            file.on('close', () => { resolve(path); });
         });
      })
      .then((path) => {
         LOG.info("Transferring to phone: " + path);
         var output = spawnAsync("/bin/bash", ['-i', '/m/s/plToPhone.sh', path, phoneName]);
         output.on('exit', (code) => {
            LOG.info("Transfer to phone done. Exit code " + code);
         });
         return path;
      });
   }
};

var _cmus = (function() {
   var ret = Object.create(cmusProto);
   ret.Seek = makeSeek(ret);
   ret.remote = makeCmusRemote();
   ret.C = function(args) { return ret.remote.command(args); };
   ret.S = function(s) { return ret.remote.sync(s); };
   return ret;
})();

module.exports = {
   makeCmus: function() {
      return _cmus;
   }
};

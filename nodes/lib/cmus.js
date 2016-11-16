const spawn = require('child_process').spawnSync;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const decoder = new (require("string_decoder").StringDecoder);
const fs = require('fs');

function makeQueueStatus(songList) {
   var ret = {};
   ret.songs = [];
   SAFETY.ensureDefined([songList], ['songList']);
   ret.songs = songList;
   return ret;
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
      // returns a function that runs the command
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

// C() set up in makeCmus()
// S() set up in makeCmus()
// The lowercase versions return functions that create promises, suitable
// for passing to sync().
// The uppercase version calls S() to sync. Only one of these is
// allowed per request. The function passed to S() should create a promise.
// As long as we never call an uppercase function, the system works.
const cmusProto = {
   queueStatus: function() {
      var This = this;
      return function() {
         var paths = [];
         // sometimes, cmus hits an error where it prints "Can't save while tracks are being added".
         // Retrying a moment later fixes it.
         var goodRun = false;
         var retryCount = 0;
         do
         {
            var paths = This.C(["-C", "save -q -" ]);
            if (paths.split("can't save when tracks are being added").length == 1) {
               goodRun = true; // didn't observe the error
               paths = paths.split("\n");
               LOG.warn("Error getting cmus status. Retry " + ++retryCount);
            }
         } while (!goodRun);
         return Promise.resolve(makeQueueStatus(This.pathsToSongs(paths)));
      };
   },
   QueueStatus: function() {
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
   Enqueue: function(path) {
      LOG.info("Enqueueing " + path);
      var This = this;
      return this.S(function() {
         return This.enqueue(path)().then(This.queueStatus());
      });
   },
   // puts paths in a temporary m3u, then pushes the path of that temporary
   // file onto cmusRemoteArgs and calls cmus-remote
   doToPathArray: function(paths, cmusRemoteArgs) {
      const tmpFilename = "/tmp/" + Math.random() + ".m3u";
      var file = fs.createWriteStream(tmpFilename, { flags: 'w', defaultEncoding: 'utf8' });
      file.write(paths.join("\n") + "\n");
      file.end();
      var This = this;
      cmusRemoteArgs.push(tmpFilename);
      return new Promise(function(resolve) {
         file.on('finish', () => {
            This.remote.command(cmusRemoteArgs);
            fs.unlink(tmpFilename);
            resolve(paths);
         });
      });
   },
   enqueue: function(path) {
      var This = this;
      return function() {
         return new Promise(function(resolve, reject) {
            if (Array.isArray(path)) {
               This.doToPathArray(path, ['-q']).then(enqueued => resolve(enqueued));
            } else {
               This.remote.command(["-q", path]);
               resolve([path]);
            }
         });
      }
   },
   clearQueue: function() {
      return this.remote.command(['-c', '-q']);
   },
   dequeue: function(path) {
      var This = this;
      var pathsToKeep = [];
      return function() {
         return This.queueStatus()()
            .then((current) => {
               // re-add each song that does not match
               if (Array.isArray(path)) {
                  current.songs.forEach(function(song) {
                     if (path.indexOf(song.path) < 0) {
                        pathsToKeep.push(song.path);
                     }
                  });
               } else {
                  current.songs.forEach(function(song) {
                     if (song.path !== path) {
                        pathsToKeep.push(song.path);
                     }
                  });
               }
            })
            .then(This.clearQueue())
            .then(This.enqueue(pathsToKeep));
      };
   },
   Dequeue: function(path) {
      LOG.info("Dequeueing " + path);
      var This = this;
      return this.S(() => This.dequeue(path)().then(This.queueStatus()));
   },
   topQueue: function(path) {
      var This = this;
      var tops = []; // paths that go on top
      var restOfSongs = []; // everything after
      return function () {
         return This.queueStatus()()
            .then(function(current) {
               if (Array.isArray(path)) path.forEach(v => tops.push(v));
               else tops.push(path);

               current.songs.forEach(function(song) {
                  if (tops.indexOf(song.path) < 0) {
                     restOfSongs.push(song.path);
                  }
               });
            })
            .then(This.clearQueue())
            .then(This.enqueue(tops))
            .then(This.enqueue(restOfSongs))
            .then(This.queueStatus());
      }
   },
   TopQueue: function(path) {
      LOG.info("Top Queueing " + path);
      return this.S(this.topQueue(path));
   },
   oneShot: function(args) {
      var This = this;
      return function() { return new Promise(resolve => resolve(This.remote.command(args))); };
   },
   play: function() { return this.oneShot(['--play']); },
   Play: function() { return this.S(this.play()); },
   pause: function() { return this.oneShot(['--pause']); },
   Pause: function() { return this.S(this.pause()); },
   next: function() { return this.oneShot(['--next']); },
   Next: function() { return this.S(this.next()); },
   previous: function() { return this.oneShot(['--prev']); },
   Previous: function() { return this.S(this.previous()); },
      /* This doesn't really fit within the remote.command paradigm, and it isn't used,
       * so I'm going to just avoid dealing with it right now.
   FavoriteCurrentlyPlaying: function() {
      spawn("/home/pi/bin/am", ['now', '/m/playlists/fav.m3u']);
   },
   */

};

module.exports = {
   makeCmus: function() {
      var ret = Object.create(cmusProto);
      ret.Seek = makeSeek(ret);
      ret.remote = makeCmusRemote();
      ret.C = function(args) { return ret.remote.command(args); };
      ret.S = function(s) { return ret.remote.sync(s); };
      return ret;
   }
};

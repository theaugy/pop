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

function makePlaylist(name) {
   if (name.match(/\.\./) !== null) {
      throw "Playlist name cannot contain dot-dot: " + name;
   }
   if (name.match(/\//) !== null) {
      throw "Playlist name cannot contain slash: " + name;
   }
   var ret = {};
   ret.songs = [];
   ret.name = name;
   retrofitPlaylist(ret);
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

function retrofitPlaylist(pq) {
   pq.remove = function(paths) {
      var before = this.songs.length;
      if (Array.isArray(paths)) {
         var keep = [];
         this.songs.forEach(song => {
            if (paths.indexOf(song.path) < 0) {
               keep.push(song);
            }
         });
         this.songs = keep;
      } else {
         // individual song
         var keep = [];
         this.songs.forEach(song => {
            if (song.path !== paths) {
               keep.push(song);
            }
         });
         this.songs = keep;
      }
      return before - this.songs.length;
   };
   pq.append = function(paths) {
      var This = this;
      var i = This.songs.length;
      if (Array.isArray(paths)) {
         paths.forEach
            (p =>
             {
                  if (p && p.length > 0)
                  {
                     var parsed = SONG.parseSong(p);
                     if (parsed)
                     {
                        This.songs.push(parsed);
                     }
                  }
             }
            );
      } else {
         var parsed = SONG.parseSong(paths);
         if (parsed)
         {
            This.songs.push(parsed);
         }
      }
      // update tags when a song is added
      while (i < This.songs.length) {
         BEET.RefreshSongTags([This.songs[i]]);
         ++i;
      }
   };
   pq.writeToTempM3u = function() {
      var This = this;
      var path = "/tmp/" + This.name + ".m3u";
      var file = fs.createWriteStream(path, { flags: 'w', defaultEncoding: 'utf8' });
      This.songs.forEach(s => file.write(s.path + "\n"));
      file.end();
      return new Promise(function(res) { file.on('finish', () => res(path)); });

   };
   pq.getFilePath = function() {
      return '/m/meta/playlists/' + this.name + ".json";
   };
}

var PlaylistSet = {};

(function () {
   var output = spawn("/usr/bin/find", ['/m/meta/playlists', '-name', '*.json']);
   var paths = output.stdout.toString().split("\n");
   paths.forEach((p) => {
      if (!p) return;
      var r = fs.createReadStream(p, { encoding: 'utf8' });
      var d = "";
      r.on('data', chunk => d += chunk);
      r.on('end', () => {
         var pl = JSON.parse(d);
         retrofitPlaylist(pl);
         PlaylistSet[pl.name] = pl;
         if (pl.name === "CmusMainPlaylist") {
            SONG.cacheSongs(pl.songs);
         }
      });
   });
})();

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

// C() set up in makeCmus()
// S() set up in makeCmus()
// The lowercase versions return functions that create promises, suitable
// for passing to sync().
// The uppercase version calls S() to sync. Only one of these is
// allowed per request. The function passed to S() should create a promise.
// As long as we never call an uppercase function, the system works.
const cmusProto = {
   cmusQueueStatus: function() {
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
         return Promise.resolve(makeQueueStatus("Cmus Queue", This.pathsToSongs(paths)));
      };
   },
   // NOTE: We don't have a good way of getting the cmus playlist status, short of issuing
   // a 'save' command and cat'ing ~/.cmus/playlists/default. In theory though, this won't
   // be necessary: the ui defines what goes in the playlist, and as long as nobody else
   // messes with it, it will be as the ui last left it.
   SetMainPlaylist: function(paths) {
      var tmpPlaylist = makePlaylist("CmusMainPlaylist");
      tmpPlaylist.append(paths);
      return this.savePlaylist(tmpPlaylist)().then(this.cmusLoadPlaylist(tmpPlaylist));
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
               mainPlaylist.songs = SONG.parseSongs(paths);
               BEET.RefreshSongTags(mainPlaylist.songs);
               resolve(mainPlaylist);
            });
         });
         return ret;
      };
   },
   GetMainPlaylist: function(paths) {
      return this.getMainPlaylist()();
   },
   cmusLoadPlaylist: function(playlist) {
      var This = this;
      return function() {
         // write the passed playlist to a temp m3u, then replace the cmus playlist with that.
         return playlist.writeToTempM3u().then(
               (plpath) => {
                  // expect that the playlist list is focused. this is janky af.
                  This.C(['-C', 'win-next'])
                  This.C(['-C', 'view playlist', 'clear']);
                  This.C(['-c', plpath])
               });
      };
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
   playlistStatus: function(playlist) {
      var This = this;
      return function() {
         return Promise.resolve(QUERY.makeQueryResult(playlist.name, playlist.songs));
      };
   },
   QueueStatus: function() {
      throw "QueueStatus is probably broken.";
      return this.S(this.queueStatus());
   },
   PlaylistStatus: function(args) {
      var pl = this.getPlaylist(args);
      return this.playlistStatus(pl)().then(s => {
         BEET.RefreshSongTags(pl.songs);
         SONG.cacheSongs(pl.songs);
         return s;
      });
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
   Enqueue: function(args) {
      var playlist = this.getPlaylist(args);
      LOG.info("Enqueueing " + args.path + " to " + playlist.name);
      var This = this;
      return this.S(function() {
         playlist.append(args.path);
         return This.savePlaylist(playlist)().then(This.playlistStatus(playlist));
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
         return This.cmusQueueStatus()()
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
   getPlaylist: function(args) {
      var playlist = PlaylistSet[args.playlist];
      if (!playlist) {
         playlist = PlaylistSet[args.name];
      }
      if (!playlist || playlist === undefined) {
         LOG.warn("no playlist named " + args.playlist + " or " + args.name);
         throw "no playlist named " + args.playlist + " or " + args.name;
      }
      return playlist;
   },
   Dequeue: function(args) {
      var playlist = this.getPlaylist(args);
      LOG.info("Dequeueing " + args.path + " from " + playlist.name);
      var This = this;
      return this.S(() => {
         var rem = playlist.remove(args.path);
         if (rem > 0) {
            return This.savePlaylist(playlist)().then(This.playlistStatus(playlist));
         } else {
            // no change
            return This.playlistStatus(playlist)();
         }
      });
   },
   topQueue: function(path) {
      LOG.warning("topQueue probably doesn't do what you want anymore.");
      throw "topQueue is probably broken.";
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
      };
   },
   TopQueue: function(path) {
      LOG.info("Top Queueing " + path);
      return this.S(this.topQueue(path));
   },
   queueJump: function(path) {
      LOG.info("No longer supporting queue jump. Using SetMainPlaylistPos() (perhaps setMainPos?pos=N) instead.");
      return function() {
         return This.playerStatus()();
      };
      /*
      var This = this;
      var toQ = [];
      return function() {
         // enqueue everything at or after 'path' in PopQ
         var matched = false;
         PopQ.songs.forEach(s => {
            if (!matched) matched = (s.path === path);
            if (matched) {
               toQ.push(s.path);
            }
         });
         return Promise.resolve(This.clearQueue())
            .then(This.enqueue(toQ))
            .then(This.next())
            .then(This.playerStatus())
      };
      */
   },
   QueueJump: function(path) {
      return this.S(this.queueJump(path));
   },
   savePlaylist: function(playlist) {
      return function() {
         const path = playlist.getFilePath();
         LOG.info("Saving playlist to " + path);
         var file = fs.createWriteStream(path, { flags: 'w', defaultEncoding: 'utf8' });
         file.write(JSON.stringify(playlist));
         return Promise.resolve(true);
      };
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
   UpdatePlaylistSongFields: function() {
      var count = 0;
      const keys = Object.keys(PlaylistSet);
      var p = Promise.resolve(true);
      keys.forEach(k => {
         var playlist = PlaylistSet[k];
         LOG.info("Updating " + playlist.name + " (" + playlist.songs.length + ")");
         playlist.songs.forEach(s => {
            p = p.then(() => {
               ++count;
               var updatePromise = BEET.UpdateSongWithLatestFields(s);
               return updatePromise;
            }).then(This.savePlaylist(playlist));
         });
      });
      var This = this;
      return p.then(() => { return {count: count}; });
   },
   NewPlaylist: function(args) {
      if (PlaylistSet[args.name] !== undefined) {
         LOG.warn("playlist named '" + name + "' already exists.");
         throw "playlist named '" + name + "' already exists.";
      }
      var pl = makePlaylist(name);
      PlaylistSet[name] = pl;
      LOG.info("Writing out new playlist: " + name);
      var This = this;
      return This.savePlaylist(pl)().then(This.playlistStatus(pl));
   },
   AppendToPlaylist: function(args) {
      var playlist = this.getPlaylist(args);
      playlist.append(args.path);
      return this.savePlaylist(playlist)().then(this.playlistStatus(playlist));
   },
   ListPlaylist: function() {
      var ret = {};
      var names = Object.keys(PlaylistSet);
      names.forEach(n => {
         var p = PlaylistSet[n];
         if (p.name) {
            ret[n] = { name: p.name, count: p.songs.length };
         }
      });
      return Promise.resolve(ret);
   },
   MagicPlaylist: function(stashPlaylist, phoneName) {
      var rands = BEET.Random(70);
      var recents = BEET.Query(lastSevenQuery());
      if (stashPlaylist === undefined) {
         stashPlaylist = "stash/augy";
      }
      if (phoneName === undefined) {
         phoneName = "phone";
      }
      var stash = this.PlaylistStatus({ playlist: stashPlaylist });
      // TODO: update this (now returned as query, used to be
      // map<path, song>
      var tagged = BEET.RandomTagged(100);
      var magicList = [];
      return Promise.all([rands, recents, stash])
      .then(values => {
         var randResult = values[0];
         var recentResult = values[1];
         var stashResult = values[2];
         var recentTagged = [];
         var notRecentTagged = [];
         var recentTaggedByPath = {};
         recentResult.songs.forEach(s => {
            if (tagged[s.path] !== undefined) {
               recentTagged.push(s); // tagged, recently added
               recentTaggedByPath[s.path] = s;
            }
         });
         var taggedPaths = Object.keys(tagged);
         taggedPaths.forEach(p => {
            if (recentTaggedByPath[p] === undefined) {
               // this is tagged but not recent.
               notRecentTagged.push(tagged[p]);
            }
         });
         var min = function(l, r) {
            return l < r? l : r;
         }
         // 40% recent+tagged, 30% stash, 20% old+tagged, 10% random.
         var recentTaggedCount = min(recentTagged.length, 40);
         var stashCount = min(stashResult.songs.length, 30);
         var notRecentTaggedCount = 20 + (70 - recentTaggedCount - stashCount);
         var randomCount = 100 - recentTaggedCount - notRecentTaggedCount - stashCount;
         var appendAtRandom = function(list, count) {
            var period = list.length / count;
            list.forEach(i => {
               if (hit(period)) {
                  magicList.push(i);
               }
            });
         };
         stashResult.songs.forEach(s => magicList.push(s));
         //appendAtRandom(stashResult.songs, stashCount);
         appendAtRandom(recentTagged, recentTaggedCount);
         appendAtRandom(notRecentTagged, notRecentTaggedCount);
         appendAtRandom(randResult.songs, randomCount);
         LOG.info("Magic playlist has " + magicList.length + " tracks.");
         return magicList;
      })
      .then(() => {
         var This = this;
         var path = "/tmp/MagicPlaylist.m3u";
         return new Promise(function(resolve) {
            var file = fs.createWriteStream(path, { flags: 'w', defaultEncoding: 'utf8' });
            magicList.forEach(s => file.write(s.path + "\n"));
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
      /* This doesn't really fit within the remote.command paradigm, and it isn't used,
       * so I'm going to just avoid dealing with it right now.
   FavoriteCurrentlyPlaying: function() {
      spawn("/home/pi/bin/am", ['now', '/m/playlists/fav.m3u']);
   },
   */

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

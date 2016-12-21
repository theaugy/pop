const spawn = require('child_process').spawnSync;
const spawnAsync = require('child_process').spawn;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const QUERY = require('../lib/songquery.js');
const fs = require('fs');
const readline = require('readline');
const tagsFile = "/m/meta/tags.json";

const hit = function(period) {
   return Math.floor(Math.random() * period) % period === 0;
}

const ensureValidTagName = function(name) {
   if (!name) throw "Invalid tag name (kinda falsy amirite?)";
   var r = /^[a-zA-Z][a-zA-Z.0-9]+$/;
   if (!name.match(r))
      throw "Tag name '" + name + " doesn't match regex " + r + ". Tag names need to be letters and periods only.";
}

var _refreshArtistCacheInProgress = false;

function makeTag(tag) {
   var ret = {};
   ret.name = tag;
   ret.songs = {};
   retrofitTag(ret);
   return ret;
}

function retrofitTag(ret) {
   ret.AddSong = function(song) {
      if (ret.songs[song.path] === undefined) {
         ret.songs[song.path] = song;
      }
   };
   // maybe not needed...
   ret.GetSongs = function() {
      var list = [];
      for (p in ret.songs) {
         list.push(ret.songs[p]);
      }
      return list;
   };
   ret.HasSong = function(song) {
      return ret.songs[song.path] !== undefined;
   };
   return ret;
}

var Tags = {};

function retrofitTags(tags) {
   tags.Tag = function(tag, songs) {
      var t = this[tag];
      if (t === undefined) {
         ensureValidTagName(tag);
         // new tag.
         LOG.info("New tag: " + tag);
         t = makeTag(tag);
         this[tag] = t;
      }
      songs.forEach(song => t.AddSong(song));
   };
   // returns number of changes
   tags.Untag = function(tag, songs) {
      var t = this[tag];
      if (t === undefined) {
         LOG.warn("Asked to untag from " + tag + ", but no tag with that name exists.");
         return 0;
      }
      var count = 0;
      songs.forEach(song => {
         if (t.songs[song.path] !== undefined) {
            ++count;
            delete t.songs[song.path];
         }
      });
      return count;
   };
   tags.Get = function(tag) {
      var t = this[tag];
      if (t === undefined) {
         LOG.warn("Asked for non-existent tag " + tag);
         throw tag + " doesn't exist.";
      }
      return t;
   };
   tags.Delete = function(tag) {
      var t = this[tag];
      if (t === undefined) {
         LOG.warn("Asked to delete non-existent tag " + tag);
         return 0;
      }
      var count = 0;
      for (s in t.songs) {
         ++count;
      }
      delete this[tag];
      return count;
   };
   tags.RefreshSongs = function(songs) {
      var ts = [];
      Object.keys(tags).forEach(name => { if (Tags[name].songs) { ts.push(Tags[name]); } });
      songs.forEach(s => {
         s.tags = [];
         ts.forEach(t => { if (t.HasSong(s)) s.tags.push(t.name) });
      });
   };
   tags.GetTagNames = function() {
      var names = Object.keys(this);
      var ret = [];
      names.forEach(n => { if (this[n].songs !== undefined) ret.push(n); });
      return ret;
   };
}

(function () {
   var r = fs.createReadStream(tagsFile, { encoding: 'utf8' });
   var d = "";
   r.on('data', chunk => d += chunk);
   r.on('end', () => {
      Tags = JSON.parse(d);
      for (t in Tags) {
         retrofitTag(Tags[t]);
      }
      retrofitTags(Tags);
   });
})();

const BEET_EOC = "CMR_SERVER_REQUEST_END_OF_COMMAND_OUTPUT";

//beetPath: function() { return "/usr/bin/beet"; },
const beetPath = function() { return "/usr/local/bin/beet"; };
const magicSeparator = "<-_-_-_-_->"; // not awesome.
const parseableFormat=
"$artist" + magicSeparator +
"$title" + magicSeparator +
"$album" + magicSeparator +
"$year" + magicSeparator +
"$length" + magicSeparator +
"$track" + magicSeparator +
"$id" + magicSeparator +
"$format" + magicSeparator +
"$bitrate" + magicSeparator +
"$path";

const beetProto = {
   GuessTotalSongsInCollection: function() {
      return 32000; // just a guess. that happens to be right.
   },
   Random: function(count) {
      var This = this;

      var p = new Promise(function(resolve, reject) {
         var infile = fs.createReadStream('/m/meta/artist-cache');
         infile.setEncoding('utf8');
         var rl = readline.createInterface({ input: infile });
         var counter = 0;
         var period = This.GuessTotalSongsInCollection() / count;
         var songs = [];
         var matches = 0;
         var firsterr = null;

         infile.on('error', function(err) { LOG.error("Error in artist cache: " + err); });

         rl.on('line', function(line) {
            if (hit(period)) {
               songs.push(This.parseableFormatToSong(line));
            }
            ++counter;
         });

         rl.on('close', function() {
            LOG.info("Finished getting " + songs.length + " random out of " + counter + " lines. period "
                     + period + ". Returning " + songs.length);
            SONG.cacheSongs(songs);
            Tags.RefreshSongs(songs);
            resolve(QUERY.makeQueryResult("random " + count, songs));
         });
      });

      return p;
   },
   cleanupId: function(id) {
      // for reasons I don't understand, requesting --format=$id can have 'undefined' in
      // the first line. So this function comes in handy
      const first = id.charAt(0);
      if (isNaN(first))
         id = id.match(/([0-9]+)/)[1];
      return parseInt(id);
   },
   parseableFormatToSong: function(parseableOutput) {
      const b = parseableOutput;
      if (b.charAt(b.length-1) == "\n")
         b = b.substr(0, b.length-1);
      var fields = b.split(magicSeparator);
      if (fields.length < 4)
         throw "Error getting fields from " + b + ": " + fields.length + " < 4";
      return SONG.songFromFields({
         artist: fields[0],
         title: fields[1],
         album: fields[2],
         year: fields[3],
         length: fields[4],
         track: fields[5],
         id: fields[6],
         format: fields[7],
         bitrate: fields[8],
         path: fields[9]
      });
   },
   RefreshArtistCache: function() {
      if (_refreshArtistCacheInProgress === true) {
         LOG.warn("Artist cache refresh already in progress.");
         throw "Only one artist cache refresh can be in progress at once.";
      }
      var This = this;
      return new Promise(function(resolve) {
         var count = 0;
         // because this will be a _huge_ dump, it makes sense to process as we go.
         // So don't use the This.beet to do it.
         LOG.info("RefreshArtistCache underway");
         var beet = spawnAsync(beetPath(), ['ls', '--format=' + parseableFormat]);
         beet.stdout.setEncoding('utf8');
         beet.readline = readline.createInterface({ input: beet.stdout });
         var w = fs.createWriteStream('/m/meta/artist-cache', { flags: 'w', defaultEncoding: 'utf8' });
         beet.readline.on('line', l => {
            ++count;
            w.write(l + "\n");
         });
         beet.readline.on('close', () => {
            _refreshArtistCacheInProgress = false;
            LOG.info("RefreshArtistCache done (count: " + count + ")");
            resolve({ count: count });
         });
      });
   },
   Query: function(q) {
      var This = this;
      var songs = [];
      var start = Date.now();
      var p = new Promise(function(resolve) {
         This.beetEocCallback.push(function() {

            const parseables = This.outputBuffer.split("\n");
            This.outputBuffer = "";
            resolve(parseables);
         });
         const cmd = "ls --format=" + parseableFormat + " " + q + "\n";
         This.beet.stdin.write(cmd);
         // NOTE: I have experimented with returning an id, then converting the id to
         // parseable format. Which feels a bit cleaner to me. This slows things down
         // massively, though.
      })
      .then(function(parseables) {
         var ms = Date.now() - start;
         parseables.forEach((p) => {
            try
            {
               if (p.length > 0)
                  songs.push(This.parseableFormatToSong(p));
            }
            catch(err)
            {
               LOG.warn("Couldn't parse output " + p + ": " + err);
            }
         });
         LOG.info("Querying for " + q + " returned " + songs.length + " songs in " + ms + "ms");
         SONG.cacheSongs(songs);
         Tags.RefreshSongs(songs);
         return QUERY.makeQueryResult(q, songs);
      });
      return p;
   },
   // This should be passed a song with a .path field.
   UpdateSongWithLatestFields: function(song) {
      if (!song.path) {
         LOG.warn("Cannot update a song with no path: " + JSON.stringify(song));
         throw "Cannot update song with no path";
      }
      var This = this;
      return new Promise(function(resolve) {
         This.beetEocCallback.push(function() {
            const parseables = This.outputBuffer.split("\n");
            This.outputBuffer = "";
            var latestSong = null;
            parseables.forEach(p => {
               if (p.length > 0) {
                  if (!latestSong) {
                     latestSong = This.parseableFormatToSong(p);
                  } else {
                     LOG.warn("Somehow, " + song.path + " resolved to multiple results.");
                     throw song.path + " is not a unique path.";
                  }
               }
            });
            if (latestSong) {
               const keys = Object.keys(latestSong);
               // copy over latest
               keys.forEach(k => { song[k] = latestSong[k] });
               LOG.info("Updated " + song.path);
               resolve(song);
            } else {
               LOG.warn("Doesn't seem to exist: " + song.path);
               resolve(null);
            }
         });
         const cmd = "ls --format=" + parseableFormat + " \"path:" + song.path + "\"\n";
         This.beet.stdin.write(cmd);
      });
   },
   ArtistStartQuery: function(letter) {
      var output = spawn('../private/bash-scripts/artist-first-letter.sh', [letter]);
      var parseables = output.stdout.toString().split("\n");
      var songs = [];
      parseables.forEach(p => songs.push(this.parseableFormatToSong(p)));
      LOG.info("Artists beginning with " + letter + " returned " + songs.length + " songs");
      SONG.cacheSongs(songs);
      Tags.RefreshSongs(songs);
      return QUERY.makeQueryResult("Artists beginning with " + letter, songs);
   },
   beetOutputLineListener: function(line) {
      if (line === BEET_EOC) {
         // pop the first callback (the one we're about to call)
         if (this.beetEocCallback.length > 0) {
            var cb = this.beetEocCallback[0];
            var tmp = [];
            for (var i = 1; i < this.beetEocCallback.length; ++i) {
               tmp.push(this.beetEocCallback[i]);
            }
            this.beetEocCallback = tmp;
            cb();
         } else {
            info.error("BEET_EOC with no callback");
            throw "BEET_EOC encountered, but no callback set";
         }
      } else {
         this.outputBuffer += line + "\n";
      }
   },
   Tag: function(tag, paths) {
      var songs = SONG.parseSongs(paths);
      Tags.Tag(tag, songs);
      LOG.info("Tagged as " + tag + ": " + paths);
      this.saveTags();
      return this.TagStatus();
   },
   Untag: function(tag, paths) {
      var songs = SONG.parseSongs(paths);
      var count = Tags.Untag(tag, songs);
      LOG.info("Untagged " + count + " from " + tag + ": " + paths);
      if (count > 0) {
         this.saveTags();
      }
      return this.TagStatus();
   },
   TagStatus: function() {
      var ts = Object.keys(Tags);
      var ret = [];
      ts.forEach(k => {
         if (Tags[k].songs) {
            var count = Object.keys(Tags[k].songs).length;
            ret.push({ name: Tags[k].name, count: count });
         }
      });
      return ret;
   },
   TagFetch: function(args) {
      var t = Tags.Get(args.tag);
      var songs = [];
      var paths = Object.keys(t.songs);
      paths.forEach((p) => {
         songs.push(t.songs[p]);
      });
      SONG.cacheSongs(songs);
      Tags.RefreshSongs(songs);
      return QUERY.makeQueryResult(t.name, songs);
   },
   // returns APPROXIMATELY n songs
   TagFetchRandom: function(n) {
      var tags = Tags.GetTagNames();
      // make superset of all tagged songs
      var songs = {};
      tags.forEach(tag => {
         var obj = Tags[tag];
         var paths = Object.keys(obj.songs);
         paths.forEach(p => songs[p] = obj.songs[p]);
      });
      var paths = Object.keys(songs);
      var period = paths.length / n;
      var ret = {};
      paths.forEach(p => {
         if (hit(period)) {
            ret[p] = songs[p];
         }
      });
      return ret;
   },
   TagDelete: function(tag) {
      var count = Tags.Delete(tag);
      LOG.info("Tag " + tag + " no longer exists (had " + count + " tracks)");
      this.saveTags();
      return Tags;
   },
   UpdateTagTracksToLatestFields: function() {
      var keys = Object.keys(Tags);
      var This = this;
      var p = Promise.resolve(true);
      keys.forEach((k) => {
         var t= Tags[k];
         var paths = Object.keys(t.songs);
         paths.forEach((path) => {
            p = p.then(() => { return This.UpdateSongWithLatestFields(t.songs[path]); });
         });
      });
      return p.then(() => { This.saveTags(); return "OK"; });
   },
   RefreshSongTags: function(songs) {
      Tags.RefreshSongs(songs);
   },
   saveTags: function() {
      var file = fs.createWriteStream(tagsFile, { flags: 'w', defaultEncoding: 'utf8' });
      file.write(JSON.stringify(Tags));
   },
   beetEocCallback: []
};

var _beet = (function() {
   var ret = Object.create(beetProto);
   ret.beet = spawnAsync(beetPath(), ['cmdin', '--end-line=' + BEET_EOC]);
   ret.beet.stdout.setEncoding('utf8');
   ret.beet.readline = readline.createInterface({ input: ret.beet.stdout });
   ret.beet.readline.on('line', function(line) {
      ret.beetOutputLineListener(line);
   });
   ret.beet.readline.on('close', function() {
      LOG.info("beet stdout closed");
   });
   return ret;
})();

module.exports = {
   makeBeet: function() {
      return _beet;
   }
};

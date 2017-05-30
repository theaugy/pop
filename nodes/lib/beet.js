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
   ret.entries = [];
   ret.songs = {};
   retrofitTag(ret);
   return ret;
}

function retrofitTag(ret) {


   ret.rebuild = function() {
      // maps path to index
      ret.songs = {};
      ret.entries.forEach((e,i) => {
         ret.songs[e.song.path] = i;
      });
   }

   ret.rebuild();

   ret.AddSong = function(song) {
      if (ret.songs[song.path] === undefined) {
         ret.entries.push(
               {
                  added: Date.now() / 1000,
                  song: song
               });
         ret.songs[song.path] = ret.entries.length - 1;
      }
   };
   // maybe not needed...
   ret.GetSongs = function() {
      var list = [];
      for (e in ret.entries) {
         list.push(e.song);
      }
      return list;
   };
   ret.HasSong = function(song) {
      return ret.songs[song.path] !== undefined;
   };
   ret.RemoveSong = function(song) {
      if (!ret.HasSong(song)) return;
      ret.entries.splice(ret.songs[song.path], 1);
      ret.rebuild();
   }
   return ret;
}

var Tags = { tags: [], indexes: {} };

function retrofitTags(tags) {

   tags.rebuild = function() {
      tags.indexes = {};
      tags.tags.forEach((t,i) => tags.indexes[t.name] = i);
   };
   tags.rebuild();

   tags.Tag = function(tag, songs) {
      var t;
      try
      {
         t = tags.Get(tag);
      }
      catch(e)
      {
         ensureValidTagName(tag);
         // new tag.
         LOG.info("New tag: " + tag);
         t = makeTag(tag);
      }
      if (t === undefined) {
         throw tag + ' does not exist and is not a valid tag name';
      }
      songs.forEach(song => t.AddSong(song));
   };
   // returns number of changes
   tags.Untag = function(tag, songs) {
      var t = tags.Get(tag);
      var count = 0;
      songs.forEach(song => {
         if (t.songs[song.path] !== undefined) {
            ++count;
            t.RemoveSong(song);
         }
      });
      return count;
   };
   tags.Get = function(tag) {
      var index = tags.indexes[tag];
      if (index === undefined) {
         LOG.warn("Asked for non-existent tag " + tag);
         throw tag + " doesn't exist.";
      }
      return tags.tags[index];
   };
   tags.Delete = function(tag) {
      var t = tags.Get(tag);
      var count = t.entries.length;
      tags.tags.splice(tags.indexes[t.name], 1);
      tags.rebuild();
      return count;
   };
   tags.RefreshSongs = function(songs) {
      var ts = [];
      songs.forEach(s => {
         s.tags = [];
         tags.tags.forEach(
               t =>
               {
                  if (t.HasSong(s)) s.tags.push(t.name)
               });
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
      Tags.tags.forEach(t => retrofitTag(t));
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
   RandomTagged: function(count) {
      var names = Tags.GetTagNames();
      // TODO: there is probably a more efficient way to do this.
      var allTagged = {};
      names.forEach(name => {
         var t = Tags.Get(name);
         if (t !== null) {
            t.GetSongs().forEach(s => {
               allTagged[s.path] = s;
            });
         }
      });
      var size = 0;
      for (s in allTagged) {
         ++size;
      }
      var period = size / count;
      var songs = [];
      for (path in allTagged) {
         if (hit(period)) {
            songs.push(allTagged[path]);
         }
      }
      SONG.cacheSongs(songs);
      Tags.RefreshSongs(songs);
      return Promise.resolve(QUERY.makeQueryResult("random from tagged: " + count, songs));
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
      var ret = [];
      Tags.tags.forEach(
            t =>
            {
               ret.push({ name: t.name, count: t.entries.length });
            }
            );
      return ret;
   },
   TagFetch: function(args) {
      var t = Tags.Get(args.tag);
      var songs = [];
      t.entries.forEach(e => songs.push(e.song));
      SONG.cacheSongs(songs);
      Tags.RefreshSongs(songs);
      return QUERY.makeQueryResult(t.name, songs);
   },
   TagDelete: function(tag) {
      var count = Tags.Delete(tag);
      LOG.info("Tag " + tag + " no longer exists (had " + count + " tracks)");
      this.saveTags();
      return Tags;
   },
   UpdateTagTracksToLatestFields: function() {
      var This = this;
      var p = Promise.resolve(true);
      Tags.tags.forEach(
            t =>
            {
               t.entries.forEach(
               e =>
               {
                  p = p.then(
                        () =>
                        {
                           return This.UpdateSongWithLatestFields(e.song);
                        });
               });
            });
      return p.then(() => { This.saveTags(); return "OK"; });
   },
   RefreshSongTags: function(songs) {
      Tags.RefreshSongs(songs);
   },
   saveTags: function() {
      var file = fs.createWriteStream(tagsFile, { flags: 'w', defaultEncoding: 'utf8' });
      file.write(JSON.stringify(Tags, null, '  '));
   },
   beetEocCallback: [],
   outputBuffer: ""
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

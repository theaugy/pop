'use strict';
const spawnAsync = require('child_process').spawn;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const QUERY = require('../lib/songquery.js');
const fs = require('fs');
const readline = require('readline');
const tagsFile = "/m/meta/tags.json";

// TODO: a TagCreate api?
const ensureValidTagName = function(name) {
   if (!name) throw "Invalid tag name (kinda falsy amirite?)";
   var r = /^[a-zA-Z][a-zA-Z.0-9]+$/;
   if (!name.match(r))
      throw "Tag name '" + name + " doesn't match regex " + r + ". Tag names need to be letters and periods only.";
}

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
   Random: function(count) {
      return this._beetSongQuery("order by RANDOM() limit " + count)
         .then(songs => this.populateTags(songs))
         .then(songs => QUERY.makeQueryResult("random " + count, songs));
   },
   RandomTagged: function(count) {
      return this._tagQuery(
            "select distinct beets_id from tagged order by RANDOM() limit " + count)
         .then(ids => this._idToSong(ids))
         .then(songs => QUERY.makeQueryResult("random from tagged: " + count, songs));
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
      {
         console.log("Error getting fields from " + b + ": " + fields.length + " < 4");
         throw "Error getting fields from " + b + ": " + fields.length + " < 4";
      }
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
      })
      .then((parseables) => {
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
         return this.populateTags(songs);
      })
      .then(songs => QUERY.makeQueryResult(q, songs));
      return p;
   },
   ArtistStartQuery: function(letter) {
      return this._beetSongQueryWhere("artist like '" + letter + "%'")
         .then(songs => QUERY.makeQueryResult("Artists beginning with " + letter, songs));
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
   _sqlTagSingleSong: function(tagid, song, position) {
      return this._tagQuery("insert into tagged "
            + "(beets_id, tag_id, created, position) "
            + "select "
            + song.id + ", "
            + tagid + ", "
            + "'" + Date.now() / 1000 + "', "
            + position
            + " "
            + "where not exists(select 1 from tagged "
            + "where beets_id = " + song.id + " "
            + "and tag_id = " + tagid + ") "
            + ";"
            );
   },
   _sqlGetTagId: function(tagname) {
      return this._tagQuery("select id from tags where name = '" + tagname + "'");
   },
   Tag: function(tag, paths) {
      let beetSongs = [];
      let tagid;
      return this._pathsToSongs(paths)
         .then(songs => {
            beetSongs = songs;
            return this._sqlGetTagId(tag);
         })
         .then(tag_id => {
            tagid = tag_id;
            return this._tagQuery("select position from tagged "
                  + "order by position desc "
                  + "limit 1");
         })
         .then(last_pos => {
            let prom;
            beetSongs.forEach(song => {
               if (!prom) prom = this._sqlTagSingleSong(tagid, song, ++last_pos);
               else prom = prom.then(() => this._sqlTagSingleSong(tagid, song, ++lastPos));
            });
            return prom;
         })
         .then(() => this.TagStatus());
   },
   _or: function(prefix, list, suffix) {
      let ret = "";
      let fixed = [];
      list.forEach(l => {
         let f = "";
         if (prefix) f = prefix;
         f += l;
         if (suffix) f += suffix;
         fixed.push(f);
      });
      return fixed.join(" or ");
   },
   Untag: function(tag, paths) {
      let idlist = "";
      return this._pathsToIds(paths)
         .then(ids => {
            idlist = ids;
            return this._sqlGetTagId(tag);
         })
         .then(tagid => {
            return this._tagQuery("delete from tagged "
                  + "where tag_id = " + tagid + " "
                  + "and (" + this._or("beets_id = ", idlist) + ")")
         })
         .then(() => this.TagStatus());
   },
   TagStatus: function() {
      return this._tagQuery("select name,count(*) from tags "
            + "left join tagged on tagged.tag_id = tags.id "
            + "group by tags.name "
            + "order by tags.name;")
         .then(lines => {
            let ret = [];
            lines.forEach(line => {
               let split = line.split(magicSeparator);
               if (split.length === 2) {
                  ret.push({ name: split[0], count: split[1] });
               }
            });
            return ret;
         });
   },
   TagFetch: function(args) {
      return this._tagQuery("select tagged.beets_id from tagged "
            + "join tags where tags.id = tagged.tag_id and tags.name = '" + args.tag + "' "
            + "order by tagged.position,tagged.created,tagged.beets_id asc")
         .then(idlist => {
            return this._idToSong(idlist);
         })
         .then(songs => this.populateTags(songs))
         .then(songs => {
            return QUERY.makeQueryResult(args.tag, songs);
         });
   },
   TagCreate: function(tag) {
      return this._tagQuery("insert into tags (name, created) "
            + "select '" + tag + "', "
            + "'" + Date.now() / 1000 + "' "
            + "where not exists ( select 1 from tags "
            + "where name = '" + tag + "'"
            + ")"
            + ";")
         .then(() => {
            return this.TagStatus();
         });
   },
   TagDelete: function(tag) {
      return this._tagQuery("delete from tags where name = '" + tag + "'")
         .then(() => this.TagStatus());
   },
   beetEocCallback: [],
   outputBuffer: "",

   _sqlQuery: function(dbpath, query, options) {
      var sq3 = spawnAsync('sqlite3', [
            '-separator', magicSeparator,
            'file:' + dbpath + (options.readOnly? '?mode=ro' : ''),
            query]);
      sq3.stdout.setEncoding('utf8');
      sq3.readline = readline.createInterface({ input: sq3.stdout });
      if (options.onLine)
         sq3.readline.on('line', options.onLine);
      if (options.onClose) {
         sq3.readline.on('close', options.onClose);
      }
      return sq3;
   },
   // given a where clause that selects the desired song(s), builds a song object
   // out of the results
   _beetSongQueryWhere: function(whereClause) {
      return this._beetSongQuery("where " + whereClause);
   },
   _beetSongQuery: function(clauses) {
      return new Promise((resolve, reject) => {
         let objs = [];
         let query = 'select artist,title,album,year,length,track,id,format,bitrate,path from items '
            + clauses;
         this._sqlQuery('/m/beetslibrary/beetslibrary.blb', query, {
            readOnly: true,
            onLine: l => objs.push(this.parseableFormatToSong(l)),
            onClose: () => resolve(objs)
         });
      });
   },
   _beetRawQuery: function(query) {
      return new Promise((resolve, reject) => {
         let lines = [];
         this._sqlQuery('/m/beetslibrary/beetslibrary.blb', query, {
            readOnly: true,
            onLine: l => lines.push(l),
            onClose: () => resolve(lines)
         });
      });
   },
   _tagQueryPromiseSerializer: Promise.resolve(true),
   _tagQuery: function(query) {
      this._tagQueryPromiseSerializer = this._tagQueryPromiseSerializer
         .then(() => {
            return new Promise((resolve, reject) => {
               let lines = [];
               let sq3 = this._sqlQuery('/m/meta/tags.sqlite3', query, {
                  onLine: l => lines.push(l),
                  onClose: () => resolve(lines)
               });
            });
         });
      return this._tagQueryPromiseSerializer;
   },
   _pathsClause: function(paths) {
      let pathsClause = [];
      if (Array.isArray(paths))
         paths.forEach(p => {
            if (p && p.length > 0) {
               pathsClause.push("path = x'" + this._hexify(p)  + "'")
            };
         });
      else
         pathsClause.push("path = x'" + this._hexify(paths) + "'");
      return pathsClause.join(" or ");
   },
   _pathsToSongs: function(paths) {
      if (!paths) return Promise.resolve(null);
      return this._beetSongQueryWhere(this._pathsClause(paths));
   },
   _hexify: function(string) {
      let ret = "";
      for (let i = 0; i < string.length; ++i) {
         ret += string.charCodeAt(i).toString(16);
      }
      return ret;
   },
   _pathsToIds: function(paths) {
      if (!paths) return Promise.resolve(null);
      return this._beetRawQuery("select id from items where " + this._pathsClause(paths));
   },
   // does a direct sqlite3 query against the beets database.
   // Accepts an individual id or an array of ids.
   // Always returns an array of song objects
   _idToSong: function(id) {
      if (!id) {
         return Promise.resolve(null);
      }
      let idClause = [];
      if (Array.isArray(id)) {
         id.forEach(i => idClause.push(" id = " + i));
      } else {
         idClause.push('id = ' + id);
      }
      return this._beetSongQueryWhere(idClause.join(" or "));
   },
   populateTags: function(songs) {
      let ids = [];
      let lookup = {};
      songs.forEach(s => {
         ids.push(s.id);
         s.tags = [];
         lookup[s.id] = s;
      });
      const query =
         "select tagged.beets_id,tags.name from tags "
         + "join tagged on (" + this._or("tagged.beets_id = ", ids) + ") "
         + "and tagged.tag_id = tags.id";
      return this._tagQuery(query)
         .then(lines => {
            let count = 0;
            lines.forEach(l => {
               let split = l.split(magicSeparator);
               if (split[0] in lookup) {
                  lookup[split[0]].tags.push(split[1]);
                  ++count;
               }
            });
            return songs;
         });
   },
   unzipFile: function(path, targetDir) {
      return new Promise((resolve, reject) => {
         console.log("Zip file at " + path + " -> " + targetDir);
         let unzip = spawnAsync('unzip', ['-d', targetDir, path]);
         unzip.on('exit', (code) => {
            if (code !== 0) {
               reject("unzip failed (code " + code + "): " + unzip.stderr);
            }
            console.log("unzipped " + path + " to " + targetDir);
            resolve(targetDir);
         });
      });
   },
   importDirectory: function(dir) {
      return new Promise((resolve, reject) => {
         let beet_import = spawnAsync('bash', [ '/sb/s/torrentFinished.sh', dir]);
         console.log("Running import on " + dir);
         beet_import.stdout.on('data', (data) => {
            console.log("IDOUT: " + data);
         });
         beet_import.stderr.on('data', (data) => {
            console.log("IDERR: " + data);
         });
         beet_import.on('exit', (code) => {
            if (code !== 0) {
               console.log("Import failed: " + dir);
               reject("importDirectory failed (code " + code + "): "
                     + beet_import.stdout + "\n" + beet_import.stderr);
               return;
            }
            console.log("Import successful: " + dir + "\n"
                     + beet_import.stdout + "\n" + beet_import.stderr);
            resolve(dir);
         });
      });
   },
   makeDirectory: function(dir) {
      return new Promise((resolve, reject) => {
         let mkdir = spawnAsync('mkdir', [ dir ]);
         mkdir.on('exit', (code) => {
            if (code !== 0) {
               reject("mkdir failed (code " + code + "): " + dir + " "
                     + beet_import.stdout + "\n" + beet_import.stderr);
            }
            console.log("mkdir " + dir);
            resolve(dir);
         });
      });
   },
   moveFile: function(file, dest) {
      return new Promise((resolve, reject) => {
         let mkdir = spawnAsync('mv', [ file, dest ]);
         mkdir.on('exit', (code) => {
            if (code !== 0) {
               reject("mv failed (code " + code + "): " + file + " -> " + dest + " "
                     + beet_import.stdout + "\n" + beet_import.stderr);
            }
            console.log("mv " + file + " " + dest);
            resolve(dest);
         });
      });
   },
   importFromFile: function(path, key, args) {
      let setupDirPromise;
      if (args.map.ext === 'zip') {
         setupDirPromise = this.unzipFile(path, '/m/_incoming/' + key)
      }
      const exts = ['mp3', 'flac', 'm4a', 'alac'];
      if (exts.indexOf(args.map.ext) >= 0) {
         // make a directory and move the individual file into it.
         setupDirPromise = this.makeDirectory('/m/_incoming/' + key)
            .then(dir => this.moveFile(path, '/m/_incoming/' + key))
      }
      if (setupDirPromise) {
         let p = setupDirPromise
         .then(dir => this.importDirectory(dir))
         .then(dir => {
               // since we don't yet have a good way to retrieve only
               // the songs just added, return the songs added today.
               let d = new Date();
               var q = "added:" + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + ".. album+";
               return this.Query(q);
         });
         return p;
      }
      throw "Unrecognized extension: " + args.map.ext;
   }
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

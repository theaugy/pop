const spawn = require('child_process').spawnSync;
const spawnAsync = require('child_process').spawn;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const QUERY = require('../lib/songquery.js');
const fs = require('fs');
const readline = require('readline');

const hit = function(period) {
   return Math.floor(Math.random() * period) % period === 0;
}

const BEET_EOC = "CMR_SERVER_REQUEST_END_OF_COMMAND_OUTPUT";

//beetPath: function() { return "/usr/bin/beet"; },
const beetPath = function() { return "/usr/local/bin/beet"; };
const magicSeparator = "<-_-_-_-_->"; // not awesome.
const parseableFormat=
"$artist" + magicSeparator +
"$title" + magicSeparator +
"$album" + magicSeparator +
"$path";

const beetProto = {
   GuessTotalSongsInCollection: function() {
      return 32000; // just a guess. that happens to be right.
   },
   outputToSongs: function(output) {
      const paths = output.split("\n");
      const songs = SONG.parseSongs(paths);
      return songs;
   },
   Random: function(count) {
      var This = this;

      var p = new Promise(function(resolve, reject) {
         var infile = fs.createReadStream("./artist-cache");
         infile.setEncoding('utf8');
         var rl = readline.createInterface({ input: infile });
         var errs = 0;
         var startLetter_path = /(.) (.+)/;
         var counter = 0;
         var period = This.GuessTotalSongsInCollection() / count;
         var songs = [];
         var matches = 0;
         var firsterr = null;

         infile.on('error', function(err) { LOG.error("Error in artist cache: " + err); });

         rl.on('line', function(line) {
            var m = line.match(startLetter_path);
            if (m !== null) {
               ++matches;
               if (hit(period))
                  songs.push(SONG.parseSong(m[2]));
            } else {
               if (firsterr === null) firsterr = line;
               errs++;
            }
            ++counter;
         });

         rl.on('close', function() {
            if (errs > 0) {
               LOG.warn(errs + " errors while reading artist-cache lines. First error: " + firsterr);
            }
            LOG.info("Finished getting " + count + " random out of " + counter + " lines. period "
                     + period + ". Returning " + songs.length);
            resolve(QUERY.makeQueryResult("random " + count, songs));
         });
      });

      return p;
   },
   artistStartRegex: /artist::\^(.)/,
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
         path: fields[3]
      });
   },
   idToSong: function(id) {
      var This = this;
      return new Promise(function(resolve, reject) {
         This.beetEocCallback.push(function() {
            const s = This.parseableFormatToSong(This.outputBuffer);
            This.outputBufer = "";
            resolve(s);
         });
         This.beet.stdin.write("ls --format=" + parseableFormat + " id: " + id + "\n");
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
         return QUERY.makeQueryResult(q, songs);
      });
      return p;
   },
   ArtistStartQuery: function(letter) {
      var output = spawn('../../private/bash-scripts/artist-first-letter.sh', [letter + []]);
      var songs = SONG.parseSongs(paths);
      LOG.info("Artists beginning with " + letter + " returned " + songs.length + " songs");
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
            throw "BEET_EOC encountered, but no callback set";
         }
      } else {
         this.outputBuffer += line + "\n";
      }
   },
   beetEocCallback: []
};

module.exports = {
   makeBeet: function() {
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
   }
};

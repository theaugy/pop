const spawn = require('child_process').spawnSync;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const QUERY = require('../lib/songquery.js');
const fs = require('fs');
const readline = require('readline');

const hit = function(period) {
   return Math.floor(Math.random() * period) % period === 0;
}

const beetProto = {
   GuessTotalSongsInCollection: function() {
      return 32000; // just a guess. that happens to be right.
   },
   outputToSongs: function(output) {
      var songs = [];
      var paths = output.stdout.toString();
      paths = paths.split("\n");
      songs = SONG.parseSongs(paths);
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
   beetPath: function() { return "/usr/bin/beet"; },
   Query: function(q) {
      var m = q.match(this.artistStartRegex);
      if (m !== null) {
         return this.ArtistStartQuery(m[1]);
      }
      var output = spawn(this.beetPath(), ['ls', '--format=$path'].concat(q.split(/\s+/)));
      var songs = this.outputToSongs(output);
      LOG.info("Querying for " + q + " returned " + songs.lenth + " songs");
      return QUERY.makeQueryResult(q, songs);
   },
   ArtistStartQuery: function(letter) {
      var output = spawn('../../private/bash-scripts/artist-first-letter.sh', [letter + []]);
      var songs = SONG.parseSongs(paths);
      LOG.info("Artists beginning with " + letter + " returned " + songs.length + " songs");
      return QUERY.makeQueryResult("Artists beginning with " + letter, songs);
   }
};

module.exports = {
   makeBeet: function() {
      return Object.create(beetProto);
   }
};

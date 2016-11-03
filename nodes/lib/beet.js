const spawn = require('child_process').spawnSync;
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const SONG = require('../lib/song.js');
const QUERY = require('../lib/songquery.js');
const fs = require('fs');
const readline = require('readline');

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
   }
   Random: function(count) {
      var output = spawn('../../private/bash-scripts/random-tracks.sh', [count + [] ]);
      var songs = this.outputToSongs(output);
      LOG.info("Returning " + songs.length + " songs (asked for " + count + ")");
      // TODO: This sucks. why is it so fucking hard to read a fucking file in node.js?
      /*
      var infile = fs.createReadStream("../../public/artist-cache");
      infile.setEncoding('utf8');
      var errs = 0;
      var startLetter_path = /(.) (.+)/;
      var counter = 0;
      var period = this.GuessTotalSongsInCollection() / count;
      var This = this;
      var perline = function(line) {
         var m = line.match(startLetter_path);
         if (m !== null && Math.random() % period === 0) {
            songs.push(This.PathToSong(m[2]));
         } else {
            errs++;
         }
         ++counter;
      };
      var prev;
      while(1) {
         var data = infile.read();
         if (data === null)
            break;
         var split = data.split("\n");
         prev += split[0];
         if (split.length > 1) {
            // found a newline
            perline(prev);
            prev = "";
            for (var i = 1; i < split.length; ++i) {
               prev = split[i];
               if (i+1 == split.length) {
                  break;
               } else {
                  // prev ends and another line begins, so prev is a full line
                  perline(prev);
                  prev = "";
               }
            }
         }
      }
      if (prev) {
         perline(prev);
      }
      if (errs > 0) {
         LOG.warn(errs + " errors while reading artist-cache lines");
      }
      LOG.info("Finished getting " + count + " random out of " + counter + " lines. Returning " + songs.length);
      */
      return QUERY.makeQueryResult("random " + count, songs);
   },
   artistStartRegex = /artist::\^(.)/;
   beetPath: function() { return "/usr/bin/beet"; },
   Query: function(q) {
      var m = q.match(artistStartRegex);
      if (m !== null) {
         return this.ArtistStartQuery(m[1]);
      }
      var output = spawn(this.beetPath(), ['ls', '--format=$path'] + q.split(/\s+/));
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
   };
};

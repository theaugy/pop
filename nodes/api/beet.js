'use strict'
const spawnAsync = require('child_process').spawn;
const BEET = require('../lib/beet.js');
const ARGS = require('../lib/args.js');
const fs = require('fs');
const LOG = require('../lib/log.js');
const J = JSON.stringify;
var beet = BEET.makeBeet();

const JR = function(res, object) {
   res.writeHead(200, {'Content-type': 'application/json' });
   res.write(J(object));
   res.end();
}

module.exports = {
   random: function(req, res) {
      var args = ARGS.buildArgs(req);
      beet.Random(+args.Get("n", "50")).then(
            function(qresult) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(qresult), 'utf8');
               res.end();
            },
            function(err) { LOG.warn("Problem getting random (" + J(args) + "): " + err); }
            );
   },
   randomTagged: function(req, res) {
      var args = ARGS.buildArgs(req);
      beet.RandomTagged(+args.Get("n", "50")).then(qresult => JR(res, qresult));
   },
   search: function(req, res) {
      // NOTE: this function can return a synchronous string response OR a promise.
      // Probably wise to standardize on promises one day.
      var args = ARGS.buildArgs(req);
      const q = args.Get('q');
      var m = q.match(/artist::^./);
      if (m !== null) {
         var songs = beet.ArtistStartQuery(m[1]);
         res.writeHead(200, {'Content-type': 'application/json' });
         res.write(J(songs), 'utf8');
         res.end();
         return;
      }

      beet.Query(q).then(
            function(result) {
               res.writeHead(200, {'Content-type': 'application/json' });
               res.write(J(result), 'utf8');
               res.end();
            },
            function(err) { LOG.warn("Problem getting query (" + J(args) + "): " + err); }
            );
   },
   tag: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      var paths = args.Get('path');
      if (!Array.isArray(paths)) {
         paths = [paths];
      }
      beet.Tag(tag, paths).then(r => JR(res, r));
   },
   untag: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      var paths = args.Get('path');
      if (!Array.isArray(paths)) {
         paths = [paths];
      }
      beet.Untag(tag, paths).then(r => JR(res, r));
   },
   tagCreate: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      beet.TagCreate(tag).then(r => JR(res, r));
   },
   tagDelete: function(req, res) {
      var args = ARGS.buildArgs(req);
      const tag = args.Get('tag');
      beet.TagDelete(tag).then(r => JR(res, r));
   },
   tagStatus: function(req, res) {
      beet.TagStatus().then(r => JR(res, r));
   },
   tagFetch: function(req, res) {
      beet.TagFetch(ARGS.buildArgs(req).map).then(r => JR(res, r));
   },
   // NOTE: this is a POST request (all others are GET)
   postToLibrary: function(req, res) {
      const args = ARGS.buildArgs(req);
      const key = Math.random();
      const tmpFile = "/m/_incoming/postToLibrary-file-" + key + "." + args.map.ext;
      let file = fs.createWriteStream(tmpFile, { flags: 'w' });
      let bytes = 0;
      const max = 500 * 1024 * 1024;
      if (req.body.length > max) {
            LOG.warn("Incoming file exceeds max length of " + max + " (~500G)");
            file.end();
            fs.unlinkSync(tmpFile);
            req.connection.destroy();
            reject(37);
      }
      else {
         LOG.info("Saving " + req.body.length + " bytes at " + tmpFile);
      }
      file.write(req.body);
      file.end();
      let songs;
      try
      {
         beet.importFromFile(tmpFile, key, ARGS.buildArgs(req))
            .then(songs => {
               JR(res, songs);
            });
      }
      catch (err)
      {
         LOG.warn("Error importing " + tmpFile + ": " + err);
         res.writeHead(200, {'Content-type': 'text/plain' });
         res.write("error: " + err);
         res.end();
         console.log("Cleaning up " + tmpFile);
         spawnAsync('rm', ['-rf', tmpFile]);
      }
   }
}


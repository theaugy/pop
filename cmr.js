#!/usr/bin/nodejs
'use strict';
console.log(process.cwd());
const http = require('http');
const dispatcher = require('httpdispatcher');
const LOG = require('./nodes/lib/log.js');
const API = require('./nodes/dispatch.js');

function tidyUrl(req) {
   return req.url.substring(0, 32);
}

var RequestsInFlight = 0;
var RequestId = 0;
var RequestsMap = {};

function handleRequest(req, resp) {
   let rid = ++RequestId;
   try {
      let atStart = RequestsInFlight;
      LOG.info("--- Request [" + rid + "] (" + atStart + "): " + tidyUrl(req));
      RequestsMap[rid] = req;
      ++RequestsInFlight;
      resp.on('finish', () => {
         --RequestsInFlight;
         delete RequestsMap[rid];
         LOG.info("--- Finish [" + rid + "] (" + RequestsInFlight + ", span " + (RequestId - rid) + "): " + tidyUrl(req));
      });

      if (req.url.indexOf('/stat') === 0) {
         resp.writeHead(200, {'Content-type': 'text/plain' });
         for (let requestId in RequestsMap) {
            const s = requestId + " " + RequestsMap[requestId].url;
            console.log(s);
            resp.write(s);
            resp.write("\n");
         }
         resp.end();
      }
      else {
         dispatcher.dispatch(req, resp);
      }
   } catch (err) {
      --RequestsInFlight;
      delete RequestsMap[rid];
      LOG.error("--- Error serving request " + tidyUrl(req) + ": " + err.stack);
   }
}

const URL = require('url');
// for historical reasons, the endpoints for cmus and non-cmus calls is
// under /cmus/*
dispatcher.onGet(/^\/cmus\//, function(req, res) {
   res.setHeader('Access-Control-Allow-Origin', 'null');
	var url = URL.parse(req.url, true);
   var target = url.pathname.split("/");
   if (target.length !== 3) {
      throw "url has wrong number of parts: " + tidyUrl(req);
   }
   var result = API.dispatch(target[2], req, res);
   var writeText = function(result) {
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.write(result, 'utf8');
      res.end();
   }
   if (result !== undefined) {
      writeText(result);
   } else {
      // assume the cmus function will write the response for us.
   }
});

dispatcher.onPost(/^\/cmus\//, function(req, res) {
   res.setHeader('Access-Control-Allow-Origin', 'null');
	var url = URL.parse(req.url, true);
   var target = url.pathname.split("/");
   if (target.length !== 3) {
      throw "url has wrong number of parts: " + tidyUrl(req);
   }
   var result = API.dispatch(target[2], req, res);
   var writeText = function(result) {
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.write(result, 'utf8');
      res.end();
   }
   if (result !== undefined) {
      writeText(result);
   } else {
      // assume the cmus function will write the response for us.
   }
});

dispatcher.onGet("/", function(req, res) {
   dispatcher.serveFile("./index.html", req, res);
});
dispatcher.onGet(/^\/node_modules/, function(req, res) {
	var url = URL.parse(req.url, true).pathname;
   url.replace(/\.\./g, '__');
   dispatcher.serveFile(".." + url, req, res);
});
dispatcher.onGet(/^\/dist/, function(req, res) {
	var url = URL.parse(req.url, true).pathname;
   url.replace(/\.\./g, '__');
   dispatcher.serveFile("./" + url, req, res)
});

dispatcher.on('options', /.*/, function(req, res) {
   res.setHeader('Access-Control-Allow-Origin', 'null');
   res.setHeader('Access-Control-Allow-Headers', 'content-type,Cache-Control');

   res.writeHead(200, { 'Content-type': 'text/plain' });
   res.write("OK", 'utf8');
   res.end();
});

dispatcher.setStatic("static");
dispatcher.setStaticDirname("/");

var server = http.createServer(handleRequest);
const port = 8000;
server.listen(port, function() { console.log("cmr on " + port); });



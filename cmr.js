console.log(process.cwd());
const http = require('http');
const dispatcher = require('httpdispatcher');
const LOG = require('./nodes/lib/log.js');
const API = require('./nodes/dispatch.js');

function tidyUrl(req) {
   return req.url.substring(0, 32);
}

function handleRequest(req, resp) {
   try {
      LOG.info("--- Request: " + tidyUrl(req));
      dispatcher.dispatch(req, resp);
   } catch (err) {
      LOG.error("--- Error serving request " + tidyUrl(req) + ": " + err.stack);
   }
}

const URL = require('url');
// for historical reasons, the endpoints for cmus and non-cmus calls is
// under /cmus/*
dispatcher.onGet(/^\/cmus\//, function(req, res) {
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
   dispatcher.serveFile("./static/cmrsearch.html", req, res);
});

dispatcher.setStatic("static");
dispatcher.setStaticDirname("/");

var server = http.createServer(handleRequest);
const port = 8000;
server.listen(port, function() { console.log("cmr on " + port); });


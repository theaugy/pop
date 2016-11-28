const ARGS = require('../lib/args.js');
const SAFETY = require('../lib/safety.js');
const LOG = require('../lib/log.js');
const spawn = require('child_process').spawn;
const J = JSON.stringify;

const allowedScripts = {
   chromecast: "../private/tools/chromecast.sh",
   desk: "../private/tools/desk.sh"
};

module.exports = {
   tool: function(req, res) {
      var args = ARGS.buildArgs(req);
      if (args.Get('name').split("..").length !== 1) {
         LOG.warn("Name included dots: " + args.name);
      }
      if (allowedScripts[args.Get('name')] === undefined)
      {
         LOG.warn("Unrecognized/disallowed script: " + args.Get('name'));
      }
      const script = args.Get('name');
      const path = allowedScripts[script];
      var proc = spawn(path, []);
      proc.stdout.setEncoding('utf8');
      var procResult = { script: script, stdout: "" };
      proc.stdout.on('data', function(d) {
         procResult.stdout += d;
      });
      proc.on('close', function(exitCode) {
         res.writeHead(200, {'Content-type': 'application/json' });
         LOG.info(script + " exitCode: " + exitCode);
         procResult.exitCode = exitCode;
         res.write(J(procResult), 'utf8');
         res.end();
      });
   }
}

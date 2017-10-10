const fs = require('fs');

var log_targetFile = "/tmp/cmr.log"

module.exports = {
   raw: function(msg) {
      console.log(msg);
      fs.appendFile(this.target, msg + "\n");
   },
   info: function(msg) {
      this.raw(this.datestamp() + " INFO : " + msg);
   },
   warn: function(msg) {
      this.raw(this.datestamp() + " WARN : " + msg);
   },
   error: function(msg) {
      this.raw(this.datestamp() + " EROR : " + msg);
   },
   datestamp: function() {
      return new Date(Date.now()).toISOString();
   },
   target: "/tmp/cmr.log"
};

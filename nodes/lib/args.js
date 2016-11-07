function makeArgs() {
   return {
      Ensure: function(names) {
         var This = this;
         names.forEach(function(val) {
            if (This.map[val] === null) throw "Args do not contain " + val;
         });
      },
      Get: function(name, fallback) {
         var ret = this.map[name];
         if (ret === undefined) {
            if (fallback === undefined)
               throw name + " is not present in arguments (" + this.map + ")";
            return fallback;
         }
         return ret;
      },
      Has: function(name) {
         return this.map[name] !== undefined;
      },
      map: {}
   };
}

function buildArgsPrivate(req) {
   var ret = makeArgs();
   if (req === null) { // assume running directly from command line
      var seenMarker = false;
      var lastName = null;
      process.argv.forEach(function(val, index, array) {
         if (!seenMarker) {
            if (val === "--url-args") {
               seenMarker = true;
            }
            return;
         } else {
            if (lastName === null) {
               lastName = val;
            } else {
               ret.map[lastName] = val;
               lastName = null;
            }
         }
      });
   } else { // assume it's an HTTP request with a params map
      ret.map = req.params;
   }
   return ret;
}

module.exports = {
   buildArgs: function(req) { return buildArgsPrivate(req); }
};

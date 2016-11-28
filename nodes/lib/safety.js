
module.exports = {
   ensureDefined: function (ary, names) {
      ary.forEach(function (val, index) {
         if (val === undefined) {
            var e = new Error('');
            var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
               .replace(/^\s+at\s+/gm, '')
               .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@');
            throw "Not defined: " + names[index] + " at:\n" + stack;
         }
      });
   },
   fillInMissing: function (ary, names) {
      ary.forEach(function (val, index) {
         if (val === undefined) {
            ary[index] = "";
         }
      });
   }
};

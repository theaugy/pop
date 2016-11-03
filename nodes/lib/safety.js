
module.exports = {
   ensureDefined: function (ary, names) {
      ary.forEach(function (val, index) {
         if (val === undefined) throw "Not defined: " + names[index];
      });
   }
};

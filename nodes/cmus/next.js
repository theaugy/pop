const CMUS = require('../lib/cmus.js');
const J = JSON.stringify;
var cmus = CMUS.makeCmus();

module.exports = {
   run: function(req) {
      cmus.Next();
      return J(cmus.PlayerStatus());
   }
};


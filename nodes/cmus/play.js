const CMUS = require('../lib/cmus.js');
const J = JSON.stringify;
var cmus = CMUS.makeCmus();

module.exports = {
   run: function(req) {
      cmus.Play();
      return J(cmus.PlayerStatus());
   }
};

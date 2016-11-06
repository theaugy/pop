const CMUS = require('./api/cmus.js');
const BEET = require('./api/beet.js');
const PL = require('./api/playlist.js');

// dispatch.js translates the REST endpoints into API calls.
// Each API has a function with a name maching the REST endpoint.
// TODO: combine CMUS, BEET, and PL into a single API object and
// just call on that directly?
module.exports = {
   dispatch: function(f, request, response) {
      if (CMUS[f] !== undefined) {
         return CMUS[f](request, response);
      } else if (BEET[f] !== undefined) {
         return BEET[f](request, response);
      } else if (PL[f] !== undefined) {
         return PL[f](request, response);
      } else {
         const err = "API function not recognized: " + f;
         throw err;
      }
   }
}


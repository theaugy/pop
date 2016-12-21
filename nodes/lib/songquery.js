const SAFETY = require('../lib/safety.js');

const queryResultProto = {
   query: "NO QUERY NAME",
   songs: []
};

module.exports = {

   makeQueryResult: function (name, list) {
      var ret = Object.create(queryResultProto);
      SAFETY.ensureDefined([name, list], ['query name', 'songList']);
      ret.name = name;
      ret.query = name;
      ret.songs = list;
      return ret;
   }
};

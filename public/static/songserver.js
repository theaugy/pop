
function makeSongServer(name) {
   var ret = {
      name: name,
      SetSongs: function(songs) {
         this.songs = songs;
         this.Updated.trigger();
      }
   };
   ret.Updated = new Event(name + "_Updated");
   ret.songs = [];
   return ret;
}


function makeSongList() {
   var ret = {
      addDefaultColumns: function(columns) {
         if (!columns) {
            if (window.mobilecheck()) {
               columns = "Artist|Title|Album";
            } else {
               columns = "Artist|Title|Album|Path";
            }
         }
         if (columns.includes("Artist")) {
            this.artist = new CustomColumn("Artist");
            this.artist.Text(function(song) { return song["artist"]; });
            this.AddCustomColumn(this.artist);
         }
         if (columns.includes("Title")) {
            this.title = new CustomColumn("Title");
            this.title.Text(function(song) { return song["title"]; });
            this.AddCustomColumn(this.title);
         }
         if (columns.includes("Album")) {
            this.album = new CustomColumn("Album");
            this.album.Text(function(song) { return song['album']; });
            this.AddCustomColumn(this.album);
         }
         if (columns.includes("Path")) {
            this.path = new CustomColumn("Path");
            this.path.Text(function(song) { return song['path']; });
            this.path.Polish(function(td) {
               td.style.fontSize = "smaller";
            });
            this.AddCustomColumn(this.path);
         }
      },
      makeSongRow: function(song, key) {
         var tr = document.createElement("tr");
         tr.song = song;
         tr.songValue = song[key];
         return tr;
      },
      fillAsDivider: function(tr) {
         var text = document.createTextNode(tr.songValue);
         tr.appendChild(text);
         tr.appendChild(this.makeDivider());
         tr.className += " SongListDivider";
      },
      makeDivider: function() {
         var d = document.createElement("hr");
         d.className = "SongListHorizontalDivider";
         return d;
      },
      fillAsChild: function(tr) {
         var text = document.createTextNode(tr.songValue);
         tr.appendChild(text);
         tr.className += " SongListChild";
      },
      Clear: function() {
         var t = this.table;
         while (t.lastChild) {
            t.removeChild(t.lastChild);
         }
      },
      addTR: function(tr) {
         this.table.appendChild(tr);
      }
      SetSongs: function(songs) {
         this.Clear();
         var This = this;
         var lastAlbum = "INIT_LAST_ALBUM";
         songs.forEach(song => {
            if (song['album'] !== lastAlbum) {
               // create a new divider
               var tr = This.makeSongRow(song, 'album');
               This.fillAsDivider(tr);
               This.addTR(tr);
               lastAlbum = song['album'];
            }
            // make
            var tr = This.makeSongRow(song, 'title');
            This.fillAsChild(tr);
            This.addTR(tr);
         });
      }
   };

   ret.table = document.createElement("table");
   ret.table.className = "SongList";
}

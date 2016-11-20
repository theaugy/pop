
function makeSongList(tableId) {
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
      getMatching: function(field, value, clickedSong) {
         var foundMatch = false;
         if (clickedSong === null) foundMatch = true;
         var matches = [];
         for (var i = 0; i < this.currentSongs.length; ++i) {
            if (!foundMatch && this.currentSongs[i] === clickedSong) {
               foundMatch = true; // start at the clicked song
            }
            if (foundMatch && this.currentSongs[i][field] === value) {
               matches.push(this.currentSongs[i]);
            } else if (foundMatch) {
               break; // first non-match after the original breaks
            }
         }
         return matches;
      },
      makeButton: function(icon, cb) {
         var iconClass = "fa fa-" + icon;
         var div = document.createElement("div");
         div.style.display = "inline-block";
         div.style.fontSize = "smaller";
         var i = document.createElement("i");
         i.className = iconClass
         div.appendChild(i);
         div.customColumn = this;
         div.onclick = cb;
         div.className = "SongListIcon";
         return div;
      },
      fillAsDivider: function(tr, text) {
         var div = document.createElement("div");

         var This = this;
         div.appendChild(this.makeButton("times",
                  () => {
                     var matches = This.getMatching("album", tr.song["album"], tr.song);
                     if (matches.length > 0) Backend.DequeueSongs(matches);
                  }));
         div.appendChild(this.makeButton("plus",
               () => {
                  var matches = This.getMatching("album", tr.song["album"], tr.song);
                  if (matches.length > 0) Backend.EnqueueSongs(matches);
               }));
         div.appendChild(this.makeButton("play-circle-o",
               () => {
                  var matches = This.getMatching("album", tr.song["album"], tr.song);
                  if (matches.length > 0) {
                     Backend.EnqueueSongs(matches);
                     Backend.MoveSongsToTopOfQueue(matches);
                  }
               }));
         div.appendChild(this.makeButton("floppy-o",
               () => {
                  var matches = This.getMatching("album", tr.song["album"], tr.song);
                  // TODO: Add multiple at a time
                  matches.forEach(m => Backend.AddSongToPlaylist(m));
               }));

         var text = document.createTextNode(text);
         div.appendChild(text);
         tr.appendChild(div);
         tr.className += "SongListDivider";
         tr.rowType = "divider";
      },
      makeDivider: function() {
         var d = document.createElement("div");
         d.className = "hrule";
         return d;
      },
      fillAsChild: function(tr) {
         var div = document.createElement("div");
         var text = document.createTextNode(tr.songValue);
         var This = this;
         div.appendChild(this.makeButton("times",
                  ()=>Backend.DequeueSong(tr.song)));
         div.appendChild(this.makeButton("plus",
               () => Backend.EnqueueSong(tr.song)));
         div.appendChild(this.makeButton("play-circle-o",
                  // NOTE: inherently racy
               () => { Backend.EnqueueSong(tr.song); Backend.MoveSongToTopOfQueue(tr.song); } ));
         div.appendChild(this.makeButton("floppy-o",
               evt => {
               selectPlaylist(evt.pageX, evt.pageY,
                  playlist => { Backend.AddSongToPlaylist(tr.song, playlist); });
               }));
         div.appendChild(text);
         tr.appendChild(div);
         tr.className += "SongListChild";
         tr.rowType = "child";
      },
      Clear: function() {
         var t = this.table;
         while (t.lastChild) {
            t.removeChild(t.lastChild);
         }
      },
      addTR: function(tr) {
         this.table.appendChild(tr);
      },
      SetSongs: function(songs) {
         this.Clear();
         var This = this;
         var lastAlbum = "INIT_LAST_ALBUM";
         this.currentSongs = songs;
         songs.forEach(song => {
            if (song['album'] !== lastAlbum) {
               // create a new divider
               var tr = This.makeSongRow(song, 'album');
               This.fillAsDivider(tr, song['artist'] + " - " + song['album']);
               This.addTR(tr);
               lastAlbum = song['album'];
            }
            // make
            var tr = This.makeSongRow(song, 'title');
            This.fillAsChild(tr);
            This.addTR(tr);
         });
      },
      SetCookieStore: function() {
         // TODO
      }
   };

   ret.table = document.getElementById(tableId);
   ret.table.className = "SongList";
   ret.currentSongs = [];
   return ret;
}

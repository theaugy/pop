// Requires:
// selectPlaylist

var SongListUuidCounter = 0;
// set up to use an existing table
function makeSongList(tableId) {
   var ret = {
      makeSongRow: function(song) {
         var tr = document.createElement("tr");
         tr.song = song;
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
      fillAsDivider: function(tr, heavyText, lightText) {
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
                  selectPlaylist(playlist => {
                     // TODO: Add multiple at a time
                     matches.forEach(m => Backend.AddSongToPlaylist(m, playlist));
                  });
               }));

         var heavyDiv = document.createElement("div");
         heavyDiv.appendChild(document.createTextNode(heavyText));
         heavyDiv.className = "SongListHeavy";
         div.appendChild(heavyDiv);

         var lightDiv = document.createElement("div");
         lightDiv.appendChild(document.createTextNode(lightText));
         lightDiv.className = "SongListLight";
         div.appendChild(lightDiv);

         tr.appendChild(div);
         tr.className += "SongListDivider";
         tr.rowType = "divider";
      },
      makeDivider: function() {
         var d = document.createElement("div");
         d.className = "hrule";
         return d;
      },
      fillAsChild: function(tr, text) {
         var div = document.createElement("div");
         var text = document.createTextNode(text);
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
               selectPlaylist(playlist => { Backend.AddSongToPlaylist(tr.song, playlist); });
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
         // This is called by clients who just want to put up a static list of
         // songs.
         this.ClearSongServer();
         this.setSongs(songs);
      },
      setSongs: function(songs) {
         this.Clear();
         var This = this;
         var lastAlbum = "INIT_LAST_ALBUM";
         this.currentSongs = songs;
         var thisSection = [];
         var commitSection = function() {
            if (thisSection.length === 0) return;

            // should we use the first artist's name or Various Artists?
            var albumArtist = thisSection[0].artist;
            var isVA = false;
            for (var i = 0; i < thisSection.length; ++i) {
               if (thisSection[i].artist !== albumArtist) {
                  albumArtist = "Various Artists";
                  isVA = true;
                  break;
               }
            }

            const dividerSong = thisSection[0]; // doesn't really matter which
            var tr = This.makeSongRow(dividerSong);
            This.fillAsDivider(tr, albumArtist, dividerSong.album);
            This.addTR(tr);

            thisSection.forEach(song => {
               var tr = This.makeSongRow(song);
               if (isVA) {
                  This.fillAsChild(tr, song.artist + " - " + song.title);
               } else {
                  This.fillAsChild(tr, song.title);
               }
               This.addTR(tr);
            });

            thisSection = [];
         };

         songs.forEach(song => {
            if (song.album !== lastAlbum) {
               commitSection();
            }
            lastAlbum = song.album;
            thisSection.push(song);
         });
         commitSection();
      },
      ClearSongServer: function() {
         if (this.server !== null) {
            this.server.Updated.removeCallback(this.uuid);
            console.log("setting server to null");
            this.server = null;
         }
      },
      SetSongServer: function(server) {
         this.ClearSongServer();
         this.server = server;
         var This = this;
         this.server.Updated.addCallback(function() {
            This.setSongs(This.server.songs);
         }, this.uuid);
         This.setSongs(server.songs);
      },
      SetCookieStore: function() {
         // TODO
      }
   };

   ret.uuid = "SongList_" + (SongListUuidCounter++);
   ret.server = null;
   ret.table = document.getElementById(tableId);
   ret.table.className = "SongList";
   ret.currentSongs = [];
   return ret;
}

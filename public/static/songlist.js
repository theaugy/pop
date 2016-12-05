// Requires:
// selectPlaylist
// Settings

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
      toggleChildVisibility: function(childRows)
      {
         if (childRows.length === 0) return;
         var vis;
         var cur = childRows[0].style.display;
         if (cur !== "default" && cur !== "") {
            vis = "";
         } else {
            vis = "none";
         }
         childRows.forEach(r => r.style.display = vis);
      },
      fillAsDivider: function(tr, heavyText, lightText, childRows) {
         var div = document.createElement("div");
         var This = this;

         var buttons = this.dividerButtons;
         var mask = this.getButtonMask();
         mask.forEach(b => div.append(buttons[b](tr.song)));

         var heavyDiv = document.createElement("div");
         heavyDiv.appendChild(document.createTextNode(heavyText));
         heavyDiv.className = "SongListHeavy";
         heavyDiv.onclick = () => { This.toggleChildVisibility(childRows); };
         div.appendChild(heavyDiv);

         var lightDiv = document.createElement("div");
         lightDiv.appendChild(document.createTextNode(lightText));
         lightDiv.className = "SongListLight";
         lightDiv.onclick = () => { This.toggleChildVisibility(childRows); };
         div.appendChild(lightDiv);

         if (Settings.Get("albumDefaultState") === "collapsed")
            This.toggleChildVisibility(childRows);

         tr.appendChild(div);
         tr.className += "SongListDivider";
         tr.rowType = "divider";
      },
      getButtonMask: function() {
         var mask;
         if (this.server)
            mask = this.server.buttonMask;
         if (mask === undefined)
            mask = this.defaultButtonMask;
         return mask;
      },
      fillAsChild: function(tr, text) {
         var div = document.createElement("div");
         var text = document.createTextNode(text);
         var This = this;
         var buttons = this.songButtons;
         var mask = this.getButtonMask();
         mask.forEach(b => div.appendChild(buttons[b](tr.song)));
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

            // construct child TRs without actually adding them
            var childRows = [];
            thisSection.forEach(song => {
               var tr = This.makeSongRow(song);
               if (isVA) {
                  This.fillAsChild(tr, song.artist + " - " + song.title);
               } else {
                  This.fillAsChild(tr, song.title);
               }
               childRows.push(tr);
            });

            // pass those child TRs into fillAsDivider
            const dividerSong = thisSection[0]; // doesn't really matter which
            var tr = This.makeSongRow(dividerSong);
            This.fillAsDivider(tr, albumArtist, dividerSong.album, childRows);
            This.addTR(tr);

            childRows.forEach(tr => This.addTR(tr));

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
   ret.defaultButtonMask = ['add', 'save'];

   ret.songButtons = {
      add: function(song) {
         return ret.makeButton("plus", ()=>Backend.EnqueueSong(song));
      },
      save: function(song) {
         return ret.makeButton("floppy-o", ()=> {
               selectPlaylist(playlist => { Backend.AddSongToPlaylist(song, playlist); });
               });
      },
      play: function(song) {
         return ret.makeButton("play-circle-o", ()=> Backend.QueueJump(song));
      },
      remove: function(song) {
         return ret.makeButton("times", ()=>Backend.DequeueSong(song));
      }
   };
   ret.dividerButtons = {
      add: function(song) {
         return ret.makeButton("plus",
               () => {
                  var matches = ret.getMatching("album", song["album"], song);
                  if (matches.length > 0) Backend.EnqueueSongs(matches);
               });
      },
      play: function(song) {
         return ret.makeButton("play-circle-o",
               () => {
                  var matches = ret.getMatching("album", song["album"], song);
                  if (matches.length > 0) {
                     Backend.QueueJump(matches[0]);
                  }
               });
      },
      save: function(song) {
         return ret.makeButton("floppy-o",
               () => {
                  var matches = ret.getMatching("album", song["album"], song);
                  selectPlaylist(playlist => {
                     // TODO: Add multiple at a time
                     matches.forEach(m => Backend.AddSongToPlaylist(m, playlist));
                  });
               });
      },
      remove: function(song) {
         return ret.makeButton("times",
               () => {
               var matches = ret.getMatching("album", song["album"], song);
               if (matches.length > 0) Backend.DequeueSongs(matches);
         });
      }
   };
   return ret;
}

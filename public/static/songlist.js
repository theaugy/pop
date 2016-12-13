// Requires:
// selectPlaylist
// Settings
// Tags (the library or plugin or whatever they call it)
// TrackChanged
// PlayerStatus

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
      heavyDiv: function(text) {
         var heavyDiv = document.createElement("div");
         heavyDiv.appendChild(document.createTextNode(text));
         heavyDiv.className = "SongListHeavy";
         return heavyDiv;
      },
      lightDiv: function(text) {
         var lightDiv = document.createElement("div");
         lightDiv.appendChild(document.createTextNode(text));
         lightDiv.className = "SongListLight";
         return lightDiv;
      },
      mediumDiv: function(text) {
         var mediumDiv = document.createElement("div");
         mediumDiv.appendChild(document.createTextNode(text));
         mediumDiv.className = "SongListMedium";
         return mediumDiv;
      },
      safeAppend: function(div, child) {
         if (child) {
            div.append(child);
         }
      },
      fillAsDivider: function(tr, heavyText, lightText, childRows) {
         var div = document.createElement("div");
         var This = this;

         var buttons = this.dividerButtons;
         var mask = this.getButtonMask();
         mask.forEach(b => This.safeAppend(div, buttons[b](tr.song)));

         var heavyDiv = this.heavyDiv(heavyText);
         heavyDiv.onclick = () => { This.toggleChildVisibility(childRows); };
         div.appendChild(heavyDiv);

         var lightDiv = this.lightDiv(lightText);
         lightDiv.onclick = () => { This.toggleChildVisibility(childRows); };
         div.appendChild(lightDiv);

         if (Settings.Get("albumDefaultState") === "collapsed")
            This.toggleChildVisibility(childRows);

         var post = this.getPostMask();
         post.forEach(b => This.safeAppend(div, buttons[b](tr.song)));

         tr.appendChild(div);
         tr.className += "SongListDivider";
         tr.rowType = "divider";
      },
      fillAsSingle: function(tr, heavyText, mediumText, lightText, childRows) {
         var div = document.createElement("div");
         var This = this;

         var buttons = this.songButtons;
         var mask = this.getButtonMask();
         mask.forEach(b => This.safeAppend(div, buttons[b](tr.song)));

         div.appendChild(this.heavyDiv(heavyText));
         div.appendChild(this.mediumDiv(mediumText));
         div.appendChild(this.lightDiv(lightText));

         var post = this.getPostMask();
         post.forEach(b => This.safeAppend(div, buttons[b](tr.song)));

         if (tr.song.path === PlayerStatus.path) {
            div.className = "CurrentlyPlaying";
         }
         tr.appendChild(div);
         // not exactly a divider, but hopefully you're looking at rowType instead of
         // the className to figure out what you're looking at.
         tr.className += "SongListSingle";
         tr.rowType = "single";
      },
      getButtonMask: function() {
         var mask;
         if (this.server)
            mask = this.server.buttonMask;
         if (mask === undefined)
            mask = this.defaultButtonMask;
         return mask;
      },
      getPostMask: function() {
         var post;
         if (this.server)
            post = this.server.postMask;
         if (post === undefined)
            post = this.defaultPostMask;
         return post;
      },
      fillAsChild: function(tr, opts) {
         var div = document.createElement("div");
         var song = tr.song;
         if (opts.isVa)
         {
            opts.artist = true;
            opts.title = true;
            opts.album = false;
         }
         else
         {
            opts.artist = false;
            opts.title = true;
            opts.album = false;
         }
         var This = this;
         var buttons = this.songButtons;
         var mask = this.getButtonMask();
         mask.forEach(b => This.safeAppend(div, buttons[b](tr.song)));
         if (opts.artist)
            div.appendChild(this.heavyDiv(song.artist));
         if (opts.title)
            div.append(this.mediumDiv(song.title));
         if (opts.album)
            div.append(this.lightDiv(song.title));

         var post = this.getPostMask();
         post.forEach(b => This.safeAppend(div, buttons[b](tr.song)));

         if (tr.song.path === PlayerStatus.path) {
            div.className = "CurrentlyPlaying";
         }
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

            if (thisSection.length > 1) {
               // construct child TRs without actually adding them
               var childRows = [];
               thisSection.forEach(song => {
                  var tr = This.makeSongRow(song);
                  if (isVA) {
                     This.fillAsChild(tr, { isVa: true });
                  } else {
                     This.fillAsChild(tr, {});
                  }
                  childRows.push(tr);
               });

               // pass those child TRs into fillAsDivider
               const dividerSong = thisSection[0]; // doesn't really matter which
               var tr = This.makeSongRow(dividerSong);
               This.fillAsDivider(tr, albumArtist, dividerSong.album, childRows);
               This.addTR(tr);
               childRows.forEach(tr => This.addTR(tr));
            } else {
               // make a single row
               var song = thisSection[0];
               var tr = This.makeSongRow(song);
               This.fillAsSingle(tr, song.artist, song.title, song.album);
               This.addTR(tr);
            }

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
   ret.defaultButtonMask = ['add', 'save' ];
   ret.defaultPostMask = ['tag'];

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
      },
      tag: function(song) {
         var div = document.createElement("div");
         div.className = "tagEditor";
         var tags = new Taggle(div, {
            placeholder: "",
            tags: TagsForSong(song),
            onTagAdd: function(evt, name) {
               Backend.TagSong(name, song);
            },
            onTagRemove: function(evt, name) {
               Backend.UntagSong(name, song);
            }
         });
         song.tagger = tags;
         return div;
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
      },
      tag: function(song) {
         var div = document.createElement("div");
         div.className = "tagEditor";
         var tags = new Taggle(div, {
            placeholder: "",
            tags: [], // nothing by default
            onTagAdd: function(evt, name) {
               var matches = ret.getMatching("album", song.album, song);
               if (matches.length > 0) {
                  Backend.TagSongs(name, matches, () => {
                     matches.forEach(m => { m.tagger.removeAll(); m.tagger.add(TagsForSong(m)); });
                  });
               }
            },
            onTagRemove: function(evt, name) {
               var matches = ret.getMatching("album", song.album, song);
               if (matches.length > 0) {
                  Backend.UntagSongs(name, matches, () => {
                     matches.forEach(m => { m.tagger.removeAll(); m.tagger.add(TagsForSong(m)); });
                  });
               }
            }
         });
         return div;
      }
   };
   TrackChanged.addCallback(() => {
      console.log("Looking for " + PlayerStatus.path);
      ret.table.childNodes.forEach(tr => {
         if (tr.song) {
            console.log("Considering " + tr.song.path);
            if (tr.song.path === PlayerStatus.path) {
               tr.childNodes[0].className = "CurrentlyPlaying";
            } else {
               tr.childNodes[0].className = "";
            }
         }
      })
   });
   return ret;
}

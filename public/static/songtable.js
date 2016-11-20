SongTable = function(tableId, defaultColumns) {
   this.table = document.getElementById(tableId);
   this.customColumns = [];
   this.mobile = window.mobilecheck();

   // NOTE: this adds members for custom columns named:
   // artist, title, album, path
   this.addDefaultColumns(defaultColumns);

   this.Clear();
   this.historySize = 5;
   this.previousSongs = [];
   // by default, the button says 'Enqueue' and adds the song to the current play queue
   this.buttonText = "Enqueue";
   this.onButtonClick = function(song) {
      return function() { Backend.EnqueueSong(song); }
   }
   this.cookieStore = "";
}

SongTable.prototype.addDefaultColumns = function(columns) {
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
}

SongTable.prototype.makeMobileRow = function(song) {
   var ret = document.createElement("td");
   var mr = new MobileRow(this, song);
   ret.appendChild(mr.GetElement());
   return ret;
}

SongTable.prototype.makeHeaderRow = function() {
   var h = document.createElement("tr");
   var st = this;
   if (this.mobile) {
      var row = this.makeMobileRow(null);
      h.appendChild(row);
   }
   else {
      this.customColumns.forEach(cc => h.appendChild(st.makeTH(cc)));
   }
   if (this.mobile) {
      h.className = "songTableHeaderMobile";
   } else {
      h.className = "songTableHeader";
   }
   return h;
}

// document.getElementById("transport").appendChild(makeTransport().element);
SongTable.prototype.Clear = function() {
   var t = this.table;
   while (t.lastChild) {
      t.removeChild(t.lastChild);
   }
   t.appendChild(this.makeHeaderRow());
}

SongTable.prototype.makeTH = function(cc) {
   var h = document.createElement("th");
   h.appendChild(document.createTextNode(cc.name));
   var i = cc.GetIcon();
   if (i !== null) {
      h.appendChild(i);
      i.className = "headerIcon";
   }
   return h;
}

SongTable.prototype.makeTD = function(cc, song) {
   var text = cc.GetText(song);
   var td = document.createElement("td");
   td.appendChild(document.createTextNode(text));
   return td;
}

SongTable.prototype.makeTDEl = function (el) {
   var td = document.createElement("td");
   td.appendChild(el);
   return td;
}

SongTable.prototype.getMatchingSongs = function(clickedSong, field) {
   var todo = [];
   var foundMatch = false;
   var value = clickedSong[field];
   if (clickedSong === null) foundMatch = true;
   for (var i = 0; i < this.currentSongs.length; ++i) {
      if (!foundMatch && this.currentSongs[i] === clickedSong) {
         foundMatch = true; // start at the clicked song
      }
      if (foundMatch && this.currentSongs[i][field] === value) {
         todo.push(this.currentSongs[i]);
      } else if (foundMatch) {
         break; // first non-match after the original breaks
      }
   }
   return todo;
}

SongTable.prototype.getMatchingItems = function(clickedItem) {
   var tr = clickedItem.parentElement;
   var ret = [];
   var foundMatch = false;
   var foundDiff = false;
   var matchText = clickedItem.customColumn.GetText(tr.cmr_song);
   for (var i = 0; i < this.table.children.length; ++i) {
      var r = this.table.children[i]; // row
      if (!foundMatch && r === tr) {
         foundMatch = true; // start at the clicked song
      }
      if (foundMatch && r.cmr_song) {
         for (var j = 0; j < r.children.length; ++j) {
            var rchild = r.children[j];
            if (rchild.customColumn === clickedItem.customColumn) {
               if (matchText === rchild.customColumn.GetText(r.cmr_song)) {
                  ret.push(rchild);
               } else {
                  foundDiff = true;
               }
            }
         }
      }
      if (foundDiff) {
         break; // first non-match after the original breaks
      }
   }
   return ret;
}

// Pass a song data object, which should have:
// artist, title, album, path
SongTable.prototype.add = function(s) {
   var tr = document.createElement("tr");
   var st = this;
   if (this.mobile) {
      child = this.makeMobileRow(s);
      tr.appendChild(child);
      this.customColumns.forEach(function(cc) {
         if (cc.polishcb) {
            cc.polishcb(child);
         }
      });
   } else {
      this.customColumns.forEach(function(cc) {
         var child = null;

         if (cc.IsButton()) {
            child = st.makeTDEl(cc.GetButton(s));
         } else {
            child = st.makeTD(cc, s);
         }
         child.customColumn = cc;
         var c = cc.GetIcon();
         if (c !== null) {
            c.className = "iconWrapper";
            child.appendChild(c);
            child.iconEl = c;
            c.style.color = "transparent";
            if (cc.buttonAppliesToMatches) {
               // configure onmouseover/onmouseleave such that it
               // affects all matched items
               child.onmouseover = evt => st.getMatchingItems(child).forEach(m => m.iconEl.style.color = "");
               child.onmouseleave = evt => st.getMatchingItems(child).forEach(m => m.iconEl.style.color = "transparent");
            } else {
               child.onmouseover = evt => c.style.color = "";
               child.onmouseleave = evt => c.style.color = "transparent";
            }
            if (child.children[0].clickHandler) {
               c.onclick = evt => {
                  child.children[0].clickHandler(evt);
               };
            }
         }
         tr.appendChild(child);
         if (cc.polishcb) {
            cc.polishcb(child);
         }
      });
   }
   tr.cmr_song = s;
   this.table.appendChild(tr);
   return tr;
}

SongTable.prototype.AddAll = function(songs) {
   if (songs === null) {
      console.log("Null songs passed to AddAll()");
   }

   // TODO: This is messy. The notion of a 'current song list'
   // is better encapsulated by SetSongs() than AddAll()
   if (songs) { // don't store null/empty songs in history
      this.previousSongs.push(songs);
      if (this.previousSongs.length > this.historySize) {
         this.previousSongs.shift();
      }

      if (this.cookieStore !== "") {
         var data = JSON.stringify(this.previousSongs);
         window.localStorage.setItem(this.cookieStore, data);
      }
   }

   this.currentSongs = songs;

   this.addSongs(songs);
}

SongTable.prototype.SetSongs = function(songs) {
   this.Clear();
   this.AddAll(songs);
}

SongTable.prototype.addSongs = function(songs) {
   for (i = 0; i < songs.length; ++i) {
      this.add(songs[i]);
   }
}

SongTable.prototype.Back = function() {
   if (this.currentSongs === null) {
      console.log("No current songs; can't go back");
      return;
   }
   var p = this.previousSongs;
   for (i = 0; i < p.length; ++i) {
      if (p[i] == this.currentSongs) {
         if (i > 0) {
            this.Clear();
            this.currentSongs = p[i-1];
            this.addSongs(p[i-1]);
            return;
         } else {
            console.log("beginning of history");
            return;
         }
      }
   }
   console.log("ERROR: current song list is not in history; can't go back");
}

SongTable.prototype.Forward = function() {
   if (this.currentSongs === null) {
      console.log("No current songs; can't go forward");
      return;
   }
   var p = this.previousSongs;
   for (i = 0; i < p.length; ++i) {
      if (p[i] == this.currentSongs) {
         if (i + 1 < p.length) {
            this.Clear();
            this.currentSongs = p[i+1];
            this.addSongs(p[i+1]);
            return;
         } else {
            console.log("end of history");
            return;
         }
      }
   }
   console.log("ERROR: current song list is not in history; can't go forward");
}

SongTable.prototype.enqueueButton = function (song) {
   var b = document.createElement("button");
   b.appendChild(document.createTextNode(this.buttonText));
   b.onclick = this.onButtonClick(song);
   return b;
}

SongTable.prototype.SetCookieStore = function (cname) {
   this.cookieStore = cname;
   var prev = window.localStorage.getItem(cname);
   var tmp = JSON.parse(prev);
   if (tmp) {
      this.previousSongs = tmp;
      if (this.previousSongs.length > 0) {
         this.Clear();
         this.currentSongs = this.previousSongs[this.previousSongs.length-1];
         this.addSongs(this.currentSongs);
      } else {
         console.log("Zero length: " + prev);
      }
   }
}

SongTable.prototype.AddCustomColumn = function (cc) {
   if (cc !== null) {
      var tmp = this.currentSongs;
      this.customColumns.push(cc);
      this.Clear();
      if (tmp) {
         this.addSongs(tmp);
      }
   }
}

SongTable.prototype.ModifyColumnsIcon = function (cclist, newIcon) {
   cclist.forEach(cc => this.ModifyColumnIcon(cc, newIcon));
}

SongTable.prototype.ModifyColumnIcon = function (cc, newIcon) {
   if (cc === null) return;
   if (this.table === null) {
      cc.Icon(newIcon); // don't have to update anything
      return;
   }
   cc.Icon(newIcon);
   var icons = document.querySelectorAll("table td div.iconWrapper");
   icons.forEach(icon => cc.ModifyIcon(icon));
   var hicons = document.querySelectorAll("table th div.headerIcon");
   icons.forEach(icon => cc.ModifyIcon(icon));
}


MobileRow = function(songtable, song) {
   this.songTable = songtable;
   this.song = song;
   // the primary field is emphasized
   if (this.songTable.title)
      this.primary = this.songTable.title;
   else
      this.primary = this.songTable.customColumns[0];

   // the secondary field is emphasized (less so)
   if (this.songTable.artist)
      this.secondary = this.songTable.artist;
   else if (this.songTable.customColumns.length > 1)
      this.secondary = this.songTable.customColumns[1];
   else this.secondary = null;

   this.element = document.createElement("div");
   this.element.className = "mobileRow";

   // Shaped like:
   // PrimaryDiv
   // SecondaryDiv OtherDiv

   this.primaryDiv = document.createElement("div");
   this.primaryDiv.className = "primaryMobileFieldContainer";
   this.element.appendChild(this.primaryDiv);

   this.secondaryDiv = document.createElement("div");
   this.secondaryDiv.className = "secondaryMobileFieldContainer";
   this.element.appendChild(this.secondaryDiv);

   this.otherDiv = document.createElement("div");
   this.otherDiv.className = "nonPrimaryMobileFieldContainer";
   // I'm not sure why I thought that putting other fields in a ul
   // would be better than just inlining yet more divs. Maybe i was
   // reading a tutorial that was using <ul>. who knows.
   this.otherList = document.createElement("ul");
   this.otherDiv.appendChild(this.otherList);

   this.element.appendChild(this.otherDiv);
   this.songTable.customColumns.forEach(cc => {
      if (cc === this.primary) this.addPrimaryColumn(cc);
      else if (cc === this.secondary) this.addSecondaryColumn(cc);
      else this.addOtherColumn(cc);
   });
   this.element.mobileRow = this;
}

MobileRow.prototype.getCCElement = function(cc) {
   if (this.song === null) {
      return document.createTextNode(cc.name);
   }

   if (cc.IsButton()) {
      return cc.GetButton(this.song);
   } else {
      return document.createTextNode(cc.GetText(this.song));
   }
}

MobileRow.prototype.addPrimaryColumn = function(cc) {
   this.primaryDiv.appendChild(this.getCCElement(cc));
}

MobileRow.prototype.addSecondaryColumn = function(cc) {
   this.secondaryDiv.appendChild(this.getCCElement(cc));
}

MobileRow.prototype.addOtherColumn = function(cc) {
   if (this.otherList.children.length === 0) {
      this.otherList.appendChild(document.createElement("li"));
   } else {
      var spacer = document.createElement("div");
      spacer.className = "spacer";
      this.otherList.lastChild.appendChild(spacer);
   }
   this.otherList.lastChild.appendChild(this.getCCElement(cc));
}

MobileRow.prototype.GetElement = function() {
   return this.element;
}

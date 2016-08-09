SongTable = function(tableId) {
   this.table = document.getElementById(tableId);
   this.customColumns = [];
   this.Clear();
   this.enableButton = true;
   this.historySize = 5;
   this.previousSongs = [];
   // by default, the button says 'Enqueue' and adds the song to the current play queue
   this.buttonText = "Enqueue";
   this.onButtonClick = function(song) {
      return function() {
         sendCmr("enqueue?" + makeArgs(["path", song["path"]]),
               function (statstr) { newPlayerStatus(statstr); cmus_queue(newQueueStatus); }
               );
      }
   };
   this.cookieStore = "";
}

SongTable.prototype.makeHeaderRow = function() {
   var h = document.createElement("tr");
   h.appendChild(this.makeTH("enqueue"));
   h.appendChild(this.makeTH("artist"));
   h.appendChild(this.makeTH("title"));
   h.appendChild(this.makeTH("album"));
   h.appendChild(this.makeTH("path"));
   var st = this;
   this.customColumns.forEach(function(cc) {
      h.appendChild(st.makeTH(cc.name));
   });
   return h;
}

SongTable.prototype.Clear = function() {
   var t = this.table;
   while (t.lastChild) {
      t.removeChild(t.lastChild);
   }
   t.appendChild(this.makeHeaderRow());
}

SongTable.prototype.makeTH = function(text) {
   var h = document.createElement("th");
   h.appendChild(document.createTextNode(text));
   return h;
}

SongTable.prototype.makeTD = function(text) {
   var td = document.createElement("td");
   td.appendChild(document.createTextNode(text));
   return td;
}

SongTable.prototype.makeTDEl = function (el) {
   var td = document.createElement("td");
   td.appendChild(el);
   return td;
}

// Pass a song data object, which should have:
// artist, title, album, path
SongTable.prototype.add = function(s) {
   var tr = document.createElement("tr");
   if (this.enableButton) {
      tr.appendChild(this.makeTDEl(this.enqueueButton(s)));
   } else {
      tr.appendChild(this.makeTD(""));
   }
   tr.appendChild(this.makeTD(s["artist"]));
   tr.appendChild(this.makeTD(s["title"]));
   tr.appendChild(this.makeTD(s["album"]));
   tr.appendChild(this.makeTD(s["path"]));
   var st = this;
   this.customColumns.forEach(function(cc) {
      if (cc.IsButton()) {
         tr.appendChild(st.makeTDEl(cc.GetButton(s)));
      } else {
         tr.appendChild(st.makeTD(cc.GetText(s)));
      }
   });
   tr.cmr_song = s;
   this.table.appendChild(tr);
   return tr;
}

SongTable.prototype.AddAll = function(songs) {
   if (songs === null) {
      console.log("Null songs passed to AddAll()");
   }

   this.previousSongs.push(songs);
   if (this.previousSongs.length > this.historySize) {
      this.previousSongs.shift();
   }

   if (this.cookieStore !== "") {
      var data = JSON.stringify(this.previousSongs);
      window.localStorage.setItem(this.cookieStore, data);
   }

   this.currentSongs = songs;

   this.addSongs(songs);
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

CustomColumn = function (name) {
   this.name = name;
   this.text = null;
   this.button = null;
}

CustomColumn.prototype.Text = function(textcb) {
   this.textcb = textcb;
}

CustomColumn.prototype.Button = function(cb) {
   this.buttoncb = cb;
}

CustomColumn.prototype.GetText = function(song) {
   if (this.textcb !== null) {
      return this.textcb(song);
   }
   return "";
}

CustomColumn.prototype.IsButton = function() {
   return this.buttoncb !== null;
}

// calls GetText for you
CustomColumn.prototype.GetButton = function(song) {
   if (this.buttoncb !== null) {
      var b = document.createElement("button");
      b.appendChild(document.createTextNode(this.GetText(song)));
      var cb = this.buttoncb;
      b.onclick = (function(s) { 
         var thesong = s;
         return function (evt) {
            cb(thesong, evt);
         }
      })(song);
      return b;
   }
   return null;
}

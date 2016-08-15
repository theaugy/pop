SongTable = function(tableId, defaultColumns) {
   this.table = document.getElementById(tableId);
   this.customColumns = [];

   // NOTE: this adds members for custom columns named:
   // artist, title, album, path
   this.addDefaultColumns(defaultColumns);

   this.Clear();
   this.historySize = 5;
   this.previousSongs = [];
   // by default, the button says 'Enqueue' and adds the song to the current play queue
   this.buttonText = "Enqueue";
   this.onButtonClick = function(song) {
      return function() { cmus_enqueue(song['path'], newQueueStatus); }
   }
   this.cookieStore = "";
}

SongTable.prototype.addDefaultColumns = function(columns) {
   if (!columns) {
      columns = "Artist|Title|Album|Path";
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
      this.AddCustomColumn(this.path);
   }
}

SongTable.prototype.makeHeaderRow = function() {
   var h = document.createElement("tr");
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

CustomColumn = function (name) {
   this.name = name;
   this.text = null;
   this.button = null;
   this.buttoncb = null;
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

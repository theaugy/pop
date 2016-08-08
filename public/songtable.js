SongTable = function(tableId) {
   this.table = document.getElementById(tableId);
   this.Clear();
   this.enableButton = true;
   // by default, the button says 'Enqueue' and adds the song to the current play queue
   this.buttonText = "Enqueue";
   this.onButtonClick = function(song) {
      return function() {
         sendCmr("enqueue?" + makeArgs(["path", song["path"]]),
               function (statstr) { newPlayerStatus(statstr); cmus_queue(newQueueStatus); }
               );
      }
   };
}

SongTable.prototype.makeHeaderRow = function() {
   var h = document.createElement("tr");
   h.appendChild(this.makeTH("enqueue"));
   h.appendChild(this.makeTH("artist"));
   h.appendChild(this.makeTH("title"));
   h.appendChild(this.makeTH("album"));
   h.appendChild(this.makeTH("path"));
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
SongTable.prototype.Add = function(s) {
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
   tr.cmr_song = s;
   this.table.appendChild(tr);
   return tr;
}

SongTable.prototype.AddAll = function(songs) {
   if (songs === null) {
      console.log("Null songs passed to AddAll()");
   }
   for (i = 0; i < songs.length; ++i) {
      this.Add(songs[i]);
   }
}

SongTable.prototype.enqueueButton = function (song) {
   var b = document.createElement("button");
   b.appendChild(document.createTextNode(this.buttonText));
   b.onclick = this.onButtonClick(song);
   return b;
}

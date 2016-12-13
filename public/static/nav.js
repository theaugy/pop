// Needs:
// PlaylistsLoaded
// Playlists
// queryCallback
// ResultsSongTable (from cmr.js... kinda tight coupling there)
// QueueStatus
// QueueUpdated
// Backend
// QueueSongServer
// TagsUpdated

function makeAZCombo() {
   var c = document.createElement("div");
   c.appendChild(makeLetterOption("A"));
   c.appendChild(makeLetterOption("B"));
   c.appendChild(makeLetterOption("C"));
   c.appendChild(makeLetterOption("D"));
   c.appendChild(makeLetterOption("E"));
   c.appendChild(makeLetterOption("F"));
   c.appendChild(makeLetterOption("G"));
   c.appendChild(makeLetterOption("H"));
   c.appendChild(makeLetterOption("I"));
   c.appendChild(makeLetterOption("J"));
   c.appendChild(makeLetterOption("K"));
   c.appendChild(makeLetterOption("L"));
   c.appendChild(makeLetterOption("M"));
   c.appendChild(makeLetterOption("N"));
   c.appendChild(makeLetterOption("O"));
   c.appendChild(makeLetterOption("P"));
   c.appendChild(makeLetterOption("Q"));
   c.appendChild(makeLetterOption("R"));
   c.appendChild(makeLetterOption("S"));
   c.appendChild(makeLetterOption("T"));
   c.appendChild(makeLetterOption("U"));
   c.appendChild(makeLetterOption("V"));
   c.appendChild(makeLetterOption("W"));
   c.appendChild(makeLetterOption("X"));
   c.appendChild(makeLetterOption("Y"));
   c.appendChild(makeLetterOption("Z"));
   c.appendChild(makeLetterOption("_"));
   c.className = "artistFirstLetters indentedNav";
   return c;
}

function makeLetterOption(letter)
{
   var opt = document.createElement("div");
   opt.className = "letterContainer clickable";
   opt.appendChild(document.createTextNode(letter));
   opt.onclick = evt => {
      Backend.SearchForSongs("artist::^" + letter, queryCallback);
   }
   opt.style.display = "inline-block";
   return opt;
}

function lastThirtyClick(evt) {
   var y = new Date().getFullYear();
   var m = new Date().getMonth() + 1;
   var d = new Date().getDate();
   if (m == 1) {
      y--;
      m = 12;
   } else {
      m--;
   }
   if (d > 28) {
      d = 28;
   }
   var q = "added:" + y + "-" + m + "-" + d + ".. album+";
   Backend.SearchForSongs(q, queryCallback);
}

function lastSevenClick(evt) {
   var y = new Date().getFullYear();
   var m = new Date().getMonth() + 1;
   var d = new Date().getDate();
   if (d <= 7) {
      d = d + 28 - 7;
      if (m == 1) {
         y--;
         m = 12;
      } else {
         m--;
      }
   } else {
      d = d - 7;
   }
   var q = "added:" + y + "-" + m + "-" + d + ".. album+";
   Backend.SearchForSongs(q, queryCallback);
}

// configures itself on an existing div
var makeNav = function(divId) {
   var ret = {
      element: document.getElementById(divId),
      resultsAreQueue: false,
      artistsVisible: false,
      playlistsVisible: false,
      Add: function(text, cb) {
         var btn = document.createElement("button");
         btn.onclick = cb;
         btn.appendChild(document.createTextNode(text));
         this.element.appendChild(btn);
         this.element.appendChild(document.createElement("br"));
         return btn;
      },
      playlistItems: [],
      NewPlaylists: function() {
         var div = this.playlists;
         clearChildren(div);
         this.playlistItems = [];
         var This = this;
         Playlists.playlists.forEach((name) => {
            var namediv = document.createElement("div");
            namediv.className = "indentedNav";
            namediv.appendChild(document.createTextNode(name));
            namediv.onclick = () => {
               if (This.playlistClickCb) {
                  console.log("Eating click to satisfy callback: " + This.playlistClickCb);
                  // if somebody is trying to hook playlist clicks, let 'em
                  const tmp = This.playlistClickCb;
                  This.playlistClickCb = null;
                  tmp(name);
                  return;
               }
               Backend.GetPlaylistSongs(name, queryCallback);
            };
            namediv.style.fontWeight = "lighter";
            namediv.style.fontSize = "smaller";
            if (This.playlistsVisible)
               namediv.className += " navShow clickable";
            else
               namediv.className += " navHide";
            This.playlistItems.push(namediv);
            div.appendChild(namediv);
         });
      },
      makeTagDiv: function(tag) {
         var namediv = document.createElement("div");
         namediv.className = "indentedNav";
         namediv.appendChild(document.createTextNode(tag.name + " (" + tag.count + ")"));
         namediv.onclick = () => {
            ResultsSongTable.SetSongServer(TagServers[tag.name]);
         };
         return namediv;
      },
      NewTags: function() {
         var div = this.tags;
         clearChildren(div);
         this.tagItems = [];
         var This = this;
         for (t in TagDb) {
            div.appendChild(this.makeTagDiv(TagDb[t]));
         }
      },
      toggleArtistPicker: function() {
         if (this.artistsVisible) { // visible to hidden
            this.artists.style.display = "none";
            this.artistsVisible = false;
         } else { // hidden to visible
            this.artists.style.display = "";
            this.artistsVisible = true;
         }
      },
      GetPlaylistTarget: function(cb) {
         this.playlistClickCb = cb;
         if (!this.playlistsVisible) {
            this.setPlaylistsVisible();
         }
      },
      setPlaylistsVisible: function() {
         this.playlistItems.forEach(namediv => { namediv.className = "indentedNav navShow clickable" });
         this.playlistsVisible = true;
      },
      setTagsVisible: function() {
         this.tagItems.forEach(namediv => { namediv.className = "indentedNav navShow clickable" });
         this.tagsVisible = true;
      }
   };

   ret.Add("artist", () => ret.toggleArtistPicker());
   ret.artists = makeAZCombo();
   ret.element.appendChild(ret.artists);
   ret.artists.style.display = "none";

   ret.Add("random", () => Backend.GetRandomSongs(50, queryCallback));
   ret.Add("last 30 days", lastThirtyClick);
   ret.Add("last 7 days", lastSevenClick);
   var queueBtn = ret.Add("queue", () => ResultsSongTable.SetSongServer(QueueSongServer));
   ret.Add("playlists", () => {
      if (ret.playlistsVisible) { // going visible to hidden
         if (ret.playlistClickCb) {
            console.log("Cancelling GetPlaylistTarget()");
            ret.playlistClickCb = null; // treat this like 'cancelling' the GetPlaylistTarget() request
         }
         ret.playlistItems.forEach(namediv => { namediv.className = "indentedNav navHide" });
         ret.playlistsVisible = false;
      } else { // going hidden to visible
         ret.setPlaylistsVisible();
      }
   });
   ret.playlists = document.createElement("div");
   ret.playlists.className = "playlists";
   ret.element.appendChild(ret.playlists);

   PlaylistsLoaded.addCallback(() => ret.NewPlaylists());

   ret.Add("tags", () => {
      if (ret.tagsVisible) {
         ret.tagItems.forEach(namediv => { namediv.className = "indentedNav navHide" });
         ret.tagsVisible = false;
      } else {
         ret.setTagsVisible();
      }
      if (TagDb === null) {
         Backend.UpdateTags();
      }
   });
   ret.tags = document.createElement("div");
   ret.tags.className = "tags";
   ret.element.appendChild(ret.tags);
   TagsUpdated.addCallback(() => ret.NewTags());

   // include queue length in the queue button's text
   QueueUpdated.addCallback(() =>
         queueBtn.firstChild.nodeValue =
            "queue (" + QueueStatus['songs'].length + ")");

   ret.NewPlaylists();
   ret.NewTags();
   return ret;
}

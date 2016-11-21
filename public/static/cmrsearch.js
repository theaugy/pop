var Results = null;
var ResultsSongTable = null;
var Transport = null;
var Nav = null;

function refreshResults() {
   if (Results == null) {
      console.log("Can't refresh null Results");
      return;
   }
   var songs = Results["songs"];
   ResultsSongTable.SetSongs(songs);
}

function emptyResultList() {
   ResultsSongTable.Clear();
}

function queryCallback(response) {
   Results = JSON.parse(response);
   refreshResults();
}

function querySubmit() {
   var q = document.getElementById("queryInput").value;
   Backend.SearchForSongs(q, queryCallback);
}

function querySubmit1(field, midfix, text) {
   //getCmr("search?" + makeArgs(["q", field + midfix + text ]), queryCallback);
   Backend.SearchForSongs(field + midifx + text, queryCallback);
}

function releaseYearClick(evt) {
   var p = new Picker({ year: true, month: false, day: false });
   p.SetCallback(function() {
      q = "year:" + p.GetYear();
      Backend.SearchForSongs(q, queryCallback);
   });
   var div = p.Make();
   div.style.position = "absolute";
   div.style.left = evt.clientX;
   div.style.top = evt.clientY;
   document.body.appendChild(div);
}

function dateAddedClick(evt) {
   var p = new Picker({ year: true, month: true, day: true });
   p.SetCallback(function() {
      q = "added:" + p.GetYear() + "-" +  p.GetMonth() + "-" + p.GetDay();
      Backend.SearchForSongs(q, queryCallback);
   });
   var div = p.Make();
   div.style.position = "absolute";
   div.style.left = evt.clientX;
   div.style.top = evt.clientY;
   document.body.appendChild(div);
}

function monthAddedClick(evt) {
   var p = new Picker({ year: true, month: true, day: false });
   p.SetCallback(function() {
      q = "added:" + p.GetYear() + "-" +  p.GetMonth() + " album+";
      Backend.SearchForSongs(q, queryCallback);
   });
   var div = p.Make();
   div.style.position = "absolute";
   div.style.left = evt.clientX;
   div.style.top = evt.clientY;
   document.body.appendChild(div);
}

function enqueueMatching(field, value, clickedSong) {
   var foundMatch = false;
   if (clickedSong === null) foundMatch = true;
   var matches = [];
   for (var i = 0; i < ResultsSongTable.currentSongs.length; ++i) {
      if (!foundMatch && ResultsSongTable.currentSongs[i] === clickedSong) {
         foundMatch = true; // start at the clicked song
      }
      if (foundMatch && ResultsSongTable.currentSongs[i][field] === value) {
         matches.push(ResultsSongTable.currentSongs[i]);
      } else if (foundMatch) {
         break; // first non-match after the original breaks
      }
   }
   if (matches.length > 0) {
      Backend.EnqueueSongs(matches);
   }
}

function cmrsearchInit() {
   ResultsSongTable = makeSongList("resultList");
   ResultsSongTable.historySize = 10; // can probably get away with even more...

   if (ResultsSongTable.album) {
      ResultsSongTable.album.Button(
            (song, evt) => enqueueMatching('album', song['album'], song));
      ResultsSongTable.album.Icon("plus");
      ResultsSongTable.album.buttonAppliesToMatches = true;
   }
   if (ResultsSongTable.artist) {
      ResultsSongTable.artist.Button(
            (song, evt) => enqueueMatching('artist', song['artist'], song));
      ResultsSongTable.artist.Icon("plus");
      ResultsSongTable.artist.buttonAppliesToMatches = true;
   }
   if (ResultsSongTable.title) {
      ResultsSongTable.title.Button(
            (song, evt) => Backend.EnqueueSong(song));
      ResultsSongTable.title.Icon("plus");
      ResultsSongTable.title.buttonAppliesToMatches = true;
   }

   emptyResultList();

   ResultsSongTable.SetCookieStore("CmrResults");
   document.getElementById("queryInput").addEventListener("keyup", function(evt) {
      evt.preventDefault();
      if (evt.keyCode === 13) {
         querySubmit();
      }
   });

   var tools = makeTools();
   document.getElementById("settings").appendChild(tools.element);
   Transport = makeTransport();
   document.getElementById("transport").appendChild(Transport.element);

   Nav = makeNav("nav");

   TrackChanged.addCallback(() => Backend.UpdateQueueStatus());

   if (!window.location.hash) {
      window.location.hash = "#player";
   }
}

function selectPlaylist(callback) {
   Nav.GetPlaylistTarget(callback);
}

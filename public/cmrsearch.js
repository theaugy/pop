var Results = null;
var ResultsSongTable = null;

function refreshResults() {
   if (Results == null) {
      console.log("Can't refresh null Results");
      return;
   }
   var songs = Results["songs"];
   ResultsSongTable.SetSongs(songs);
}

function getResultList() {
   return document.getElementById("resultList");
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
   getCmr("search?" + makeArgs(["q", q]), queryCallback);
}

function querySubmit1(field, midfix, text) {
   //getCmr("search?" + makeArgs(["q", "artist::^a"]), queryCallback);
   getCmr("search?" + makeArgs(["q", field + midfix + text ]), queryCallback);
}

function makeLetter(letter, combo)
{
   var d = document.createElement("button");
   d.className = "letter";
   d.appendChild(document.createTextNode(letter));
   return d;
}

function makeLetterOption(letter, combo)
{
   var opt = document.createElement("div");
   opt.className = "letterContainer";
   opt.appendChild(makeLetter(letter, combo));
   opt.onclick = function (evt) {
      querySubmit1("artist", "::^", letter);
      combo.onblur();
   }
   return opt;
}

function closeButton(combo)
{
   var opt = document.createElement("div");
   opt.className = "letterContainer";
   var btn = document.createElement("button");
   btn.appendChild(document.createTextNode("close"));
   btn.onclick = function (evt) {
      combo.onblur();
   }
   opt.appendChild(btn);
   return opt;
}

function makeAZCombo() {
   var c = document.createElement("div");
   c.className = "letterSelect";
   c.appendChild(makeLetterOption("A", c));
   c.appendChild(makeLetterOption("B", c));
   c.appendChild(makeLetterOption("C", c));
   c.appendChild(makeLetterOption("D", c));
   c.appendChild(makeLetterOption("E", c));
   c.appendChild(makeLetterOption("F", c));
   c.appendChild(makeLetterOption("G", c));
   c.appendChild(makeLetterOption("H", c));
   c.appendChild(makeLetterOption("I", c));
   c.appendChild(makeLetterOption("J", c));
   c.appendChild(makeLetterOption("K", c));
   c.appendChild(makeLetterOption("L", c));
   c.appendChild(makeLetterOption("M", c));
   c.appendChild(makeLetterOption("N", c));
   c.appendChild(makeLetterOption("O", c));
   c.appendChild(makeLetterOption("P", c));
   c.appendChild(makeLetterOption("Q", c));
   c.appendChild(makeLetterOption("R", c));
   c.appendChild(makeLetterOption("S", c));
   c.appendChild(makeLetterOption("T", c));
   c.appendChild(makeLetterOption("U", c));
   c.appendChild(makeLetterOption("V", c));
   c.appendChild(makeLetterOption("W", c));
   c.appendChild(makeLetterOption("X", c));
   c.appendChild(makeLetterOption("Y", c));
   c.appendChild(makeLetterOption("Z", c));
   c.appendChild(makeLetterOption("_", c));
   c.appendChild(closeButton(c));
   return c;
}

function artistClick(evt) {
   var letter = makeAZCombo();
   letter.className = "letterSelector";
   letter.style.position = "absolute";
   letter.style.top = evt.clientY;
   letter.style.left = evt.clientX;
   letter.tabIndex = "0";
   letter.focus();
   letter.onblur = function () {
      document.getElementById("submitWrapper").removeChild(letter);
   }
   document.getElementById("submitWrapper").appendChild(letter);
}

function randomClick(evt) {
   getCmr("random?" + makeArgs(["n", "50"]), queryCallback);
}

function releaseYearClick(evt) {
   var p = new Picker({ year: true, month: false, day: false });
   p.SetCallback(function() {
      q = "year:" + p.GetYear();
      getCmr("search?" + makeArgs(["q", q]), queryCallback);
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
      getCmr("search?" + makeArgs(["q", q]), queryCallback);
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
      q = "added:" + p.GetYear() + "-" +  p.GetMonth();
      getCmr("search?" + makeArgs(["q", q]), queryCallback);
   });
   var div = p.Make();
   div.style.position = "absolute";
   div.style.left = evt.clientX;
   div.style.top = evt.clientY;
   document.body.appendChild(div);
}

function loadPlaylistClick(evt) {
   var x = evt.clientX;
   var y = evt.clientY;
   getCmr("listPlaylist", function(response) {
      var playlists = response.split("\n");
      playlistsLoaded(playlists, x, y, function(picker, pl) {
         return function() {
            getCmr("getPlaylist?" + makeArgs(["name", pl]), queryCallback);
            picker.parentElement.removeChild(picker);
         }
      });
   });
}

function backClick(evt) {
   ResultsSongTable.Back();
}

function forwardClick(evt) {
   ResultsSongTable.Forward();
}

function makePlaylistOption(name) {
   var opt = document.createElement("button");
   opt.appendChild(document.createTextNode(name));
   return opt;
}

function cmrsearchInit() {
   ResultsSongTable = new SongTable("resultList");
   ResultsSongTable.historySize = 10; // can probably get away with even more...
   emptyResultList();
   ResultsSongTable.SetCookieStore("CmrResults");
   document.getElementById("queryInput").addEventListener("keyup", function(evt) {
      evt.preventDefault();
      if (evt.keyCode === 13) {
         querySubmit();
      }
   });
   document.getElementById("searchbtn").onclick=querySubmit;
   document.getElementById("artistbtn").onclick=artistClick;
   document.getElementById("randombtn").onclick=randomClick;
   document.getElementById("dateadded").onclick=dateAddedClick;
   document.getElementById("monthadded").onclick=monthAddedClick;
   document.getElementById("releaseyear").onclick=releaseYearClick;
   document.getElementById("loadplaylist").onclick=loadPlaylistClick;
   document.getElementById("back").onclick=backClick;
   document.getElementById("forward").onclick=forwardClick;
   plainOlPlayerInit();
   plainOlQueueInit();
   toolsInit();

   TrackChanged.addCallback(function() {
      cmus_queue(newQueueStatus);
   });

   var btns = document.getElementById("popButtons");
   btns.appendChild(makeCmusButton("get history", function(evt) {
      var st = PlainOlPlayerSongTable;
      if (st === null) return;
      var h = st.previousSongs;
      var flatHistory = []; // we translate a list-of-lists into a flat list
      for (var i = 0; i < h.length; ++i) {
         var list = h[i];
         for (var j = 0; j < list.length; ++j) {
            flatHistory.push(list[j]);
         }
      }
      ResultsSongTable.SetSongs(flatHistory);
   }));
}


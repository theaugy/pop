var Results = null;
var ResultsSongTable = null;
var Transport = null;
var Nav = null;
var QueueSongServer = null;

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

   emptyResultList();

   ResultsSongTable.SetCookieStore("CmrResults");
   document.getElementById("queryInput").addEventListener("keyup", function(evt) {
      evt.preventDefault();
      if (evt.keyCode === 13) {
         querySubmit();
      }
   });

   CmusPlaylistRecieved.addCallback(function(cmusPlaylist) {
      ResultsSongTable.InitSongs(cmusPlaylist.songs);
   });

   Backend.GetCmusPlaylist(); // initialize the playlist

   var tools = makeTools();
   document.getElementById("settings").appendChild(tools.element);
   Transport = makeTransport();
   document.getElementById("transport").appendChild(Transport.element);
   Transport.songClick.addCallback(() => ResultsSongTable.ScrollToPlaying());

   Nav = makeNav("nav");

   // UpdateQueueStatus causes us to re-set the cmus/"main" playlist, which
   // in turn screws up the song position.
   // The original idea here was that since a track change meant consuming
   // a queue song, you had to refresh the queue status if you noticed that
   // the track changed. But since we no longer consume tracks in the
   // main playlist/queue, we don't have to do this. We definitely need to
   // clarify terminology and behavior of playlist vs. main playlist vs. queue.
   //TrackChanged.addCallback(() => Backend.UpdateQueueStatus());

   if (!window.location.hash) {
      window.location.hash = "#player";
   }

   // create a queue song server. when the queue is updated, update the
   // songs on the server.
   QueueSongServer = makeSongServer("queue");
   QueueSongServer.buttonMask = ['play', 'save', 'remove'];
   QueueUpdated.addCallback(() => {
      QueueSongServer.SetSongs(QueueStatus.songs);
   });
}

function selectPlaylist(callback) {
   Nav.GetPlaylistTarget(callback);
}

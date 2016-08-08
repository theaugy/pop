
var Playlist = null;

function refreshPlaylist() {
   if (Playlist === null) {
      console.log("Can't refresh playlist: null Playlist");
      return;
   }

   emptyPlaylistList();

   var songs = Playlist["songs"];
   console.log("got " + songs.length + " songs");
   for (var i = 0; i < songs.length; ++i) {
      addToPlaylist(songs[i]);
   }
}

function getPlaylist() {
   return document.getElementById("queueList");
}

function addToPlaylist(song) {
   var q = getPlaylist();
   var s = makeSong(song);
   q.appendChild(s);
}

function emptyPlaylistList() {
   var q = getPlaylist();
   while (q.lastChild) {
      q.removeChild(q.lastChild);
   }
}

function playlistCallback(playlistJson) {
   if (playlistJson === null) {
      Playlist = {
         name: "No response from server",
         songs: []
      }
   } else {
      Playlist = JSON.parse(playlistJson);
   }
   refreshPlaylist();
}

var LastCurrent = "";

function statusTimeout(statStr) {
   newPlayerStatus(statStr);
   // find the currently playing track and bold it
   var path = getPlayerStatus()["path"];

   if (path === LastCurrent) {
      return;
   }

   LastCurrent = path;

   var q = getPlaylist();
   var foundNew = 0;
   var foundOld = 0;
   for (var i = 0; i < q.children.length; ++i) {
      var s = q.children[i].cmr_song; // get the song
      if (s != null) {
         if (s["path"] == path) {
            q.children[i].classList.add("currentlyPlaying");
            foundNew = 1;
            if (foundOld) {
               break;
            }
         }
         else {
            if (q.children[i].classList.contains("currentlyPlaying")) {
               q.children[i].classList.remove("currentlyPlaying");
               foundOld = 1;
               if (foundNew) {
                  break;
               }
            }
         }
      }
   }
}

function cmrqInit() {
   emptyPlaylistList()
   addToPlaylist({
      "artist": "Loading...",
      "album": "",
      "title": ""
   })
   cmus_playlist(playlistCallback);
   setInterval (
         function () { cmus_status (statusTimeout); },
         2000
         );
   toolsInit();
}


// gets the cmus remote url 
function cmr ()
{
   //return "http://" + window.location.hostname+ ":8000" + "/cmus";
   return "cmus";
}

function Event(name) {
   this.name = name;
   this.callbacks = [];
}

Event.prototype.addCallback = function(c) {
   if (c !== null) {
      this.callbacks.push(c);
   }
}

Event.prototype.trigger = function() {
   for (var i = 0; i < this.callbacks.length; ++i) {
      this.callbacks[i]();
   }
}

Event.prototype.getName = function() {
   return this.name;
}

var TrackChanged = new Event("TrackChanged");
var QueueAppend = new Event("QueueAppend");
var NowPaused = new Event("NowPaused");
var NowPlaying = new Event("NowPlaying");
var NewPlayerStatus = new Event("NewPlayerStatus");

// sends a remote command
function sendCmr (msg, cb)
{
   if (cb == null) {
      cb = newPlayerStatus;
   }
   getCmr (msg, cb);
}

// gets information from the cmus remote
function getCmr (msg, callback)
{
   document.getElementById("status").style.background = "red";
   var r = new XMLHttpRequest ();
   var rstr = cmr () + "/" + msg;
   var cb = callback;
   r.onreadystatechange = function ()
   {
      if (this.readyState === 4)
      {
         if (this.status === 200) {
            document.getElementById("status").style.background = "white";
            cb (this.responseText);
         } else {
         }
      }
   }

   r.open ("GET", rstr, true);
   r.setRequestHeader("Cache-Control", "no-cache");
   //r.setRequestHeader("Content-Type", "text/html");
   r.send ();
}

// basic cmus control functions
function cmus_play () { sendCmr ("play"); }
function cmus_pause () { sendCmr ("pause"); }
function cmus_next () { sendCmr ("next"); }
function cmus_prev () { sendCmr ("prev"); }
function cmus_status (callback) { getCmr ("status", callback); }
function cmus_fav () { getCmr("fav", function(){}); }
function cmus_f1m(callback) { getCmr("f1m", callback); }
function cmus_b1m(callback) { getCmr("b1m", callback); }
function cmus_seekto(num, callback) { getCmr("seekto?" + makeArgs(["s", num]), callback); }
function cmus_enqueue(path, callback) {
   sendCmr("enqueue?" + makeArgs(["path", path]),
         function (statstr) {
            newPlayerStatus(statstr);
            if (callback !== null) {
               cmus_queue(callback);
            }
         }
         );
}
function cmus_dequeue(path, callback) {
   getCmr("dequeue?" + makeArgs(["path", path]), callback);
}

// get current playlist
function cmus_playlist (callback) { getCmr("playlist", callback); }
// get current queue
function cmus_queue (callback) { getCmr("queue", callback); }

var BTN_PLAYING = "playing";
var BTN_PAUSED = "paused";
function playPauseClick () {
   if (getPlayerStatus ()["status"] === BTN_PAUSED) {
      cmus_play ();
   }
   else if (getPlayerStatus ()["status"] === BTN_PLAYING) {
      cmus_pause ();
   }
}

function nextClick () {
   cmus_next ();
}

function prevClick () {
   cmus_prev ();
}

var PlayerStatus = null;

function getPlayerStatus () {
   return PlayerStatus;
}

// this is the standard callback received whenever you
// play/pause/next/prev
function receivedCmusStatus (statStr) {
   setStatus (statStr);
}


function makeArgs(args) {
   ret = [];
   for (var i = 0; i < args.length; i += 2) {
      ret.push(encodeURIComponent(args[i])
               + "=" +
               encodeURIComponent(args[i+1]));
   }
   return ret.join("&");
}

function clearChildren(el) {
   while (el.lastChild) {
      el.removeChild(el.lastChild);
   }
}

var PlainOlPlayerSongTable = null;

function getPlainOlPlayerSongTable() {
   if (PlainOlPlayerSongTable === null) {
      PlainOlPlayerSongTable = new SongTable("popTable");
      var t = PlainOlPlayerSongTable; // big ol' name
      t.enableButton = false;
      t.historySize = 100;
      t.SetCookieStore("PoPNowPlaying");

      var bm = new CustomColumn("-1m");
      bm.Text(function(){ return "-1m"; });
      bm.Button(function(song) { cmus_b1m(newPlayerStatus); });
      t.AddCustomColumn(bm);

      var fm = new CustomColumn("+1m");
      fm.Text(function(){ return "+1m"; });
      fm.Button(function(song) { cmus_f1m(newPlayerStatus); });
      t.AddCustomColumn(fm);

      var g2 = new CustomColumn("goto");
      g2.Text(function(){ return "goto..."; });
      g2.Button(function(song) {
         var pos = window.prompt("Position in seconds:", "0");
         if (pos != null)
         {
            cmus_seekto(pos, newPlayerStatus);
         }
      });
      t.AddCustomColumn(g2);

      var next = new CustomColumn("Next");
      next.Text(function() { return "Next"; });
      next.Button(function(song) { cmus_next(); });
      t.AddCustomColumn(next);
   }
   return PlainOlPlayerSongTable;
}

function makeCmusButton(text, fn) {
   var b = document.createElement("button");
   b.onclick = fn;
   b.appendChild(document.createTextNode(text));
   return b;
}

function isCurrentlyPlaying(song) {
   var t = getPlainOlPlayerSongTable();
   var current = t.currentSongs;
   if (current == null && song == null) {
      return true;
   }
   if (current == null) {
      return false;
   }
   if (current.length === 0) {
      return false;
   }
   if (current[0]["path"] === song["path"]) {
      return true;
   }
   return false;
}

function updatePlainOlPlayer() {
   var s = getPlayerStatus();
   if (s === null) {
      return;
   }
   if (!isCurrentlyPlaying(s)) {
      // if you just SetSongs() blindly, you'll
      // fill up the player's history with the same song.
      var t = getPlainOlPlayerSongTable();
      t.SetSongs([s]);
   }
   var statusText = document.getElementById("popStatusText");
   clearChildren(statusText);
   statusText.appendChild(
         document.createTextNode(
            s["status"] + " " + s["position"] + "/" + s["duration"]));
   document.title = "PoP: " + s["title"] + " - " + s["artist"] + s["path"];
}

function trackChanged(prev, cur) {
   if (prev === null && cur !== null) {
      return true;
   }
   if (prev["artist"] !== cur["artist"]) {
      return true;
   } else if (prev["title"] !== cur["title"]) {
      return true;
   }
   return false;
}

function nowPlaying(prev, cur) {
   var playing = (cur !== null && cur["status"] === "playing");
   var was = (prev !== null && prev["status"] === "playing");
   return playing && !was;
}

function nowPaused(prev, cur) {
   var paused = (cur !== null && cur["status"] !== "playing");
   var was = (prev !== null && prev["status"] !== "playing");
   return paused && !was;
}

function newPlayerStatus(statStr) {
   var prev = PlayerStatus;
   PlayerStatus = JSON.parse (statStr);
   updatePlainOlPlayer();

   // trigger events
   if (trackChanged(prev, PlayerStatus)) {
      TrackChanged.trigger();
   }
   if (nowPlaying(prev, PlayerStatus)) {
      NowPlaying.trigger();
   }
   else if (nowPaused(prev, PlayerStatus)) {
      NowPaused.trigger();
   }

   NewPlayerStatus.trigger();
}

function getTools() {
   return document.getElementById("tools");
}

function toolCallback(msg) {
   if (msg != null && msg.length > 0) {
      alert(msg);
   }
}

function runTool(name, argstring) {
   getCmr("tool?" + makeArgs([name, argstring]), toolCallback);
}

function makeToolButton(text, tool, argstring) {
   var b = document.createElement("button");
   b.appendChild(document.createTextNode(text));
   b.onclick = function () {
      runTool(tool, argstring);
   }
   return b;
}

function toolsInit() {
   var t = getTools();

   t.appendChild(makeToolButton("Chromecast Init", "chromecast", ""));
   //t.appendChild(makeToolButton("airport_pi Init", "shairport", ""));
   //t.appendChild(makeToolButton("Fix Chromecast", "fixchromecast", ""));
}

var QueueStatus = null;
var QueueSongTable = null;

function getPlainOlQueue() {
   if (QueueSongTable === null) {
      QueueSongTable = new SongTable("plainOlQueue");
      QueueSongTable.enableButton = false;
      QueueSongTable.historySize = 1; // no use for old queue states

      var topButton = new CustomColumn("PlayNext");
      topButton.Text(function(song) { return "PlayNext"; });
      topButton.Button(function(song) {
         getCmr("topqueue?" + makeArgs(["path", song["path"]]), newQueueStatus);
      });
      QueueSongTable.AddCustomColumn(topButton);

      var remove = new CustomColumn("Remove");
      remove.Text(function() { return "Remove"; });
      remove.Button(function(song) {
         cmus_dequeue(song['path'], newQueueStatus);
      });
      QueueSongTable.AddCustomColumn(remove);
   }
   return QueueSongTable;
}

function getQueueButtons() {
   return document.getElementById("plainOlQButtons");
}

function plainOlQueueInit() {
   var q = getPlainOlQueue();
   var buttons = getQueueButtons();
   if (buttons !== null) {
      var b = document.createElement("button");
      b.appendChild(document.createTextNode("refresh"));
      b.onclick=function(evt) {
         cmus_queue(newQueueStatus);
      }
      buttons.appendChild(b);

      var s = document.createElement("button");
      s.appendChild(document.createTextNode("shutter"));
      s.onclick= (function(queue) {
         var q = queue.table;
         return function(evt) {
         if (q.style.display === "none") {
            q.style.display = "";
         } else {
            q.style.display = "none";
         }
      }}) (q);
      buttons.appendChild(s);
   }
   cmus_queue(newQueueStatus);
}

function getQueueStatus() {
   return QueueStatus;
}

function updatePlainOlQueue() {
   var s = getQueueStatus();
   if (s === null) {
      return;
   }
   var q = getPlainOlQueue();
   if (q === null) {
      return;
   }
   q.SetSongs(s["songs"]);
}

function newQueueStatus(statStr) {
   QueueStatus = JSON.parse(statStr);
   updatePlainOlQueue();
}

var StatusTimer = null;

function whilePlaying() {
   StatusTimer = null;
   var s = getPlayerStatus();
   var pos = parseInt(s["position"]);
   var dur = parseInt(s["duration"]);
   if (pos % 10 === 0 || pos >= dur) {
      cmus_status(whilePlayingStatus);
   } else {
      // rather than hammer the the backend every second, just add 1 second.
      s["position"] = (pos + 1) + '';
      StatusTimer = setTimeout(whilePlaying, 1000);
      updatePlainOlPlayer();
   }
}

function whilePlayingStatus(statstr) {
   newPlayerStatus(statstr);
   // if we're still playing, get status again in a second.
   // If we are stopped between now and then, StatusTimer
   // will be cleared.
   if (getPlayerStatus()["status"] === "playing") {
      if (StatusTimer != null) clearTimeout(StatusTimer);
      StatusTimer = setTimeout(whilePlaying, 1000);
   }
}

function keyupHandler(evt) {
   var focused = document.activeElement;
   if (focused.nodeName === "TEXTAREA" ||
       focused.nodeName === "INPUT")
   {
   } else {
      if (evt.which == 67) { // letter c
         cmus_pause();
      } else if (evt.which == 66) { // letter b
         cmus_next();
      } else if (evt.which == 191 && evt.shiftKey) {
         alert("shortcuts:\n" +
               "c: play/pause\n" +
               "b: next");
      }
   }
}

function plainOlPlayerInit() {
   NowPlaying.addCallback(function() {
      if (StatusTimer == null ) {
         StatusTimer = setTimeout(whilePlaying, 1000);
      }
   });
   NowPaused.addCallback(function() {
      if (StatusTimer != null) {
         clearTimeout(StatusTimer);
         StatusTimer = null;
      }
   });

   var btns = document.getElementById("popButtons");
   btns.appendChild(makeCmusButton("Play", cmus_play));
   btns.appendChild(makeCmusButton("Pause", cmus_pause));
   btns.appendChild(makeCmusButton("Next", cmus_next));
   btns.appendChild(makeCmusButton("Previous", cmus_prev));
   btns.appendChild(makeCmusButton("fav", cmus_fav));
   btns.appendChild(makeCmusButton("add to playlist...", addToPlaylistClick));
   // NOTE: btns also modified by cmrsearchinit

   cmus_status(newPlayerStatus);
   document.addEventListener("keyup", keyupHandler, false);
}

function playlistsLoaded(playlists, x, y, onPlClick) {
   var c = document.createElement("div");
   c.className = "letterSelect";
   for (i = 0; i < playlists.length; ++i) {
      var plname = playlists[i];
      if (plname === "") {
         continue;
      }
      var pl = makePlaylistOption(plname);
      pl.onclick = onPlClick(c, plname);
      c.appendChild(pl);
   }
   var nm = document.createElement("button");
   nm.appendChild(document.createTextNode("[nevermind]"));
   nm.onclick=function(evt) {
      c.parentElement.removeChild(c);
   }
   c.appendChild(nm);

   c.className = "letterSelector";
   c.style.position = "absolute";
   c.style.left = x;
   c.style.top = y;
   document.body.appendChild(c);
}

function noOp() {}

function addToPlaylistClick(evt) {
   var x = evt.clientX;
   var y = evt.clientY;
   getCmr("listPlaylist", function(response) {
      var playlists = response.split("\n");
      playlistsLoaded(playlists, x, y - 200, function(picker, pl) {
         return function() {
            getCmr("addPlaylist?" + makeArgs(["name", pl]), noOp);
            picker.parentElement.removeChild(picker);
         }
      });
   });
}

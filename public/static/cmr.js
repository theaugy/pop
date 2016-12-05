
/*
 * Key objects to know about. Further comments should be at their
 * declarations.
 * - The Events (look for 'new Event')
 * - PlayerStatus
 * - StatusTimer
 * - Backend
 * - QueueStatus
 * - Settings
 */

function Event(name) {
   this.name = name;
   this.callbacks = [];
}

window.mobilecheck = function() {
   var check = false;
   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
   return check;
};

Event.prototype.addCallback = function(c, uuid) {
   if (c !== null) {
      this.callbacks.push({ cb: c, uuid: uuid});
   }
}

Event.prototype.removeCallback = function(uuid) {
   if (uuid === undefined) return; // don't allow removing all anonymous callbacks
   var tmp = [];
   this.callbacks.forEach(cb => {
      if (cb.uuid !== uuid) tmp.push(cb);
   });
   this.callbacks = tmp;
}

Event.prototype.trigger = function() {
   for (var i = 0; i < this.callbacks.length; ++i) {
      this.callbacks[i].cb(this.cbData);
   }
}

Event.prototype.getName = function() {
   return this.name;
}

// ALL EVENTS GO HERE. Until we need more fine-grained ones.
// Then we'll have to figure something else out.
var TrackChanged = new Event("TrackChanged");
var QueueUpdated = new Event("QueueUpdated");
var NowPaused = new Event("NowPaused");
var NowPlaying = new Event("NowPlaying");
var NewPlayerStatus = new Event("NewPlayerStatus");
var NextView = new Event("NextView");
var PreviousView = new Event("PreviousView");
var PlaylistsLoaded = new Event("PlaylistsLoaded");

// This holds the current player status. It's a big object containing
// stuff like the current track, whether we're playing or paused, the
// progress of the current track, its duration, etc.
var PlayerStatus = null;

// Some helpers for PlayerStatus. It would be nice to refactor these so
// that PlayerStatus is an object with these as members.
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

// true if we weren't playing before, but are now
function nowPlaying(prev, cur) {
   var playing = (cur !== null && cur["status"] === "playing");
   var was = (prev !== null && prev["status"] === "playing");
   return playing && !was;
}

// true if we WERE playing beofre, but are NOT now
function nowPaused(prev, cur) {
   var paused = (cur !== null && cur["status"] !== "playing");
   var was = (prev !== null && prev["status"] !== "playing");
   return paused && !was;
}

// true if we are playing any song
function isPlaying() {
   if (PlayerStatus["status"] === "playing") {
      return true;
   } else {
      return false;
   }
}

// List of songs currently in the queue and misc. other infos
var QueueStatus = null;


var Settings = {
   settings: {},
   AddSetting: function(s) {
      this.settings[s.name] = s;
      s.changed.trigger();
   },
   get: function(name) {
      var s = this.settings[name];
      if (s === undefined)
         throw "Setting not known: " + name;
      return s;
   },
   Get: function(name) {
      return this.get(name).value;
   },
   Set: function(name, value) {
      var s = this.get(name);
      if (!s.checker(value))
         throw "Cannot set " + name + " to " + value + "; fails check according to " + s.checker;
      s.value = value;
      s.changed.trigger();
   },
   makeSetting: function(humanName, name, defaultValue, checker)
   {
      var ret = {};
      ret.humanName = humanName;
      ret.name = name;
      if (!checker(defaultValue))
      {
         throw humanName + " (" + name + ") has invalid default value " +
            defaultValue + " according to " + checker;
      }
      ret.checker = checker;
      ret.value = defaultValue;
      ret.defaultValue = defaultValue;
      ret.changed = new Event(name + " changed");
      ret.Set = function(value) {
         ret.value = value;
         ret.changed.trigger();
      };
      return ret;
   }
};
Settings.AddSetting(Settings.makeSetting("Album default state",
         "albumDefaultState", "expanded",
         v => ["collapsed", "expanded"].indexOf(v) >= 0));
// something for the queue mode?
// Setings.AddSetting();

// Playlists
var Playlists = { refreshedAt: 0, playlists: [] };

// This follows the convention that "public" functions are CapitalFirstCamelCase.
// "private" functions are lowerFirstCamelCase. So don't call those, bru.
function BackendImpl() {
}

BackendImpl.prototype.indicateRequestStart = function() {
   var s = document.getElementById("status");
   if (s) s.style.background = "red";
}

BackendImpl.prototype.indicateRequestFinish = function() {
   var s = document.getElementById("status");
   if (s) s.style.background = "";
}

BackendImpl.prototype.playerStatusReceived = function(response) {
   var prev = PlayerStatus;
   PlayerStatus = JSON.parse(response);

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


BackendImpl.prototype.queueStatusReceived = function(response) {
   QueueStatus = JSON.parse(response);
   QueueUpdated.trigger();
}

BackendImpl.prototype.requestAndUpdatePlayerStatus = function(req) {
   var This = this;
   var cb = function(response) {
      This.playerStatusReceived(response);
   }
   this.request(req, cb);
}

BackendImpl.prototype.requestAndUpdateQueueStatus = function(req) {
   var This = this;
   var cb = function(response) {
      This.queueStatusReceived(response);
   }
   this.request(req, cb);
}

// gets the cmus remote url 
BackendImpl.prototype.serverUrl = function()
{
   // NOTE: If you wanted to redirect everything to a different server,
   // you would do that here.
   //return "http://" + window.location.hostname+ ":8000" + "/cmus";
   return "cmus";
}

BackendImpl.prototype.request = function(req, callback) {
   this.indicateRequestStart();
   var r = new XMLHttpRequest();
   var rstr = this.serverUrl() + "/" + req;
   var cb = callback;
   var This = this;
   r.onreadystatechange = function()
   {
      if (this.readyState === 4)
      {
         if (this.status === 200) {
            This.indicateRequestFinish();
            if (cb) cb (this.responseText);
         } else {
         }
      }
   }

   r.open("GET", rstr, true);
   r.setRequestHeader("Cache-Control", "no-cache");
   //r.setRequestHeader("Content-Type", "text/html");
   r.send();
}

BackendImpl.prototype.Play = function () {
   this.requestAndUpdatePlayerStatus("play");
}

BackendImpl.prototype.Pause = function () {
   this.requestAndUpdatePlayerStatus("pause");
}

BackendImpl.prototype.NextSong = function() {
   this.requestAndUpdatePlayerStatus("next");
}

BackendImpl.prototype.PreviousSong = function() {
   this.requestAndUpdatePlayerStatus("prev");
}

// You probably shouldn't be calling this, because
// if you supply a callback, you will get the
// raw status response from the backend passed to
// your callback. You'd probably rather call
// UpdatePlayerStatus() and response to NewPlayerStatus
// event.
BackendImpl.prototype.GetPlayerStatus = function(callback) {
   this.request("status", callback);
}

BackendImpl.prototype.UpdatePlayerStatus = function() {
   this.requestAndUpdatePlayerStatus("status");
}

BackendImpl.prototype.UpdateQueueStatus = function() {
   this.requestAndUpdateQueueStatus("queue");
}

BackendImpl.prototype.FavoriteCurrentSong = function() {
   this.request("fav", function(){}); // elicits no response
}

BackendImpl.prototype.SeekForward1Minute = function() {
   this.requestAndUpdatePlayerStatus("f1m");
}

BackendImpl.prototype.SeekBackward1Minute = function() {
   this.requestAndUpdatePlayerStatus("b1m");
}

BackendImpl.prototype.SeekToSecond = function(second) {
   this.requestAndUpdatePlayerStatus("seekto?" + makeArgs(["s", second]));
}

BackendImpl.prototype.AddSongToPlaylist = function(song, pl) {
   this.request("addPlaylist?" + makeArgs(["name", pl, 'path', song["path"]]), function(){});
}

BackendImpl.prototype.MoveSongToTopOfQueue = function(song) {
   this.requestAndUpdateQueueStatus("topqueue?" + makeArgs(["path", song['path']]));
}

// WARNING: MoveSongsToTopOfQueue is somewhat meaningless with the new
// 'persistent queue' feature. Some way to reorder the queue is
// probably needed, but it hasn't been established yet.
BackendImpl.prototype.MoveSongsToTopOfQueue = function(songs) {
   var args = [];
   songs.forEach((s) => { args.push("path"); args.push(s['path']); });
   this.requestAndUpdateQueueStatus("topqueue?" + makeArgs(args));
}

// TODO: It might be nice to enqueue a song without triggering callbacks, or
// enqueue multiple songs at once.
BackendImpl.prototype.EnqueueSong = function(song) {
   this.requestAndUpdateQueueStatus("enqueue?" + makeArgs(["path", song["path"]]));
}
BackendImpl.prototype.EnqueueSongs = function(songs) {
   var args = [];
   songs.forEach((s) => { args.push("path"); args.push(s['path']); });
   this.requestAndUpdateQueueStatus("enqueue?" + makeArgs(args));
}

BackendImpl.prototype.DequeueSong = function(song) {
   this.requestAndUpdateQueueStatus("dequeue?" + makeArgs(["path", song["path"]]));
}

BackendImpl.prototype.DequeueSongs = function(songs) {
   var args = [];
   songs.forEach((s) => { args.push("path"); args.push(s['path']); });
   this.requestAndUpdateQueueStatus("dequeue?" + makeArgs(args));
}

BackendImpl.prototype.QueueJump = function(song) {
   this.requestAndUpdatePlayerStatus("queueJump?" + makeArgs(['path', song.path]));
}

BackendImpl.prototype.SelectQueue = function(name) {
   this.requestAndUpdateQueueStatus("selectQueue?" + makeArgs(['name', name]));
}

// I don't remember the format of the response. Probably { songs: [ song1, song2, ... ] }
BackendImpl.prototype.GetCurrentPlaylist = function(callback) {
   this.request("playlist", callback);
}

// args=name,value,name,value,etc
BackendImpl.prototype.RunServerSideTool = function(args, callback) {
   this.request("tool?" + makeArgs(args), callback);
}

// returns newline-separated playlist names
BackendImpl.prototype.GetPlaylists = function(callback) {
   this.request("listPlaylist", (newlineSeparatedPlaylistNames) =>
         {
            // update playlist state
            var playlists = newlineSeparatedPlaylistNames.split("\n");
            Playlists = { refreshedAt: Date.now(), playlists: playlists };
            PlaylistsLoaded.trigger();
            // now call the passed callback, if any
            if (callback) callback(newlineSeparatedPlaylistNames);
         });
}

// returns something like { songs: [ song1, song2, ... ] }
BackendImpl.prototype.SearchForSongs = function(query, callback) {
   this.request("search?" + makeArgs(["q", query]), callback);
}

// same return as SearchForSongs
BackendImpl.prototype.GetRandomSongs = function(number, callback) {
   this.request("random?" + makeArgs(["n", number]), callback);
}

BackendImpl.prototype.GetPlaylistSongs = function(playlist, callback) {
   this.request("getPlaylist?" + makeArgs(["name", playlist]), callback);
}

var Backend = new BackendImpl();

// StatusTimer is responsible for updating the player status while a track is playing.
// It is designed to provide the illusion of a constantly-updating PlayerStatus, but
// without requiring us to constantly send requests to Backend.
// It would be nice to refactor StatusTimer into a class, or perhaps factor its code
// into PlayerStatus whenever PlayerStatus becomes a class.
var StatusTimer = null;

function whilePlaying() {
   StatusTimer = null;
   var s = getPlayerStatus();
   var pos = parseInt(s["position"]);
   var dur = parseInt(s["duration"]);
   if (pos % 10 === 0 || pos >= dur) {
      Backend.GetPlayerStatus(whilePlayingStatusReceived);
   } else {
      // rather than hammer the the backend every second, just add 1 second.
      s["position"] = (pos + 1) + '';
      StatusTimer = setTimeout(whilePlaying, 1000);
      NewPlayerStatus.trigger();
   }
}

function whilePlayingStatusReceived(statstr) {
   // A rare case where it makes sense to call a "private" Backend
   // function directly.
   Backend.playerStatusReceived(statstr);
   // if we're still playing, get status again in a second.
   // If we are stopped between now and then, StatusTimer
   // will be cleared.
   if (isPlaying()) {
      if (StatusTimer != null) clearTimeout(StatusTimer);
      StatusTimer = setTimeout(whilePlaying, 1000);
   }
}

function initStatusTimer() {
   // when we start playing, call whilePlaying() every second.
   NowPlaying.addCallback(function() {
      if (StatusTimer == null ) {
         StatusTimer = setTimeout(whilePlaying, 1000);
      }
   });

   // when we stop playing, don't call whilePlaying() anymore.
   NowPaused.addCallback(function() {
      if (StatusTimer != null) {
         clearTimeout(StatusTimer);
         StatusTimer = null;
      }
   });
}

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

function keyupHandler(evt) {
   var focused = document.activeElement;
   if (focused.nodeName === "TEXTAREA" ||
       focused.nodeName === "INPUT")
   {
   } else {
      if (evt.which == 67) { // letter c
         Backend.Pause();
      } else if (evt.which == 66) { // letter b
         Backend.NextSong();
      } else if (evt.which === 37) {
         PreviousView.trigger();
      } else if (evt.which === 39) {
         NextView.trigger();
      } else if (evt.which == 191 && evt.shiftKey) {
         alert("shortcuts:\n" +
               "c: play/pause\n" +
               "b: next\n" +
               "left arrow: previous view\n" +
               "right arrow: next view\n");
      }
   }
}

function coreInit() {
   initStatusTimer(); // cofigures player status polling
   NewPlayerStatus.addCallback(function() {
      document.title = "PoP: " + PlayerStatus["title"] + " - " + PlayerStatus["artist"] + PlayerStatus["path"];
   });
   // get initial statuses
   Backend.UpdatePlayerStatus();
   Backend.UpdateQueueStatus();
   Backend.GetPlaylists();
   document.addEventListener("keyup", keyupHandler, false);
}

function makeTextButton(name) {
   var opt = document.createElement("button");
   opt.appendChild(document.createTextNode(name));
   return opt;
}

function stringSelector(strings, icons, onStringClick, autoDestroy) {
   var c = document.createElement("div");
   var useIcons = (icons.length === strings.length);
   for (i = 0; i < strings.length; ++i) {
      var s = strings[i];
      if (s === "") {
         continue;
      }
      var btn = makeTextButton(s);
      if (autoDestroy) {
         btn.onclick = function(str) {
            return function() {
               onStringClick(str);
               c.parentElement.removeChild(c);
            }}(s);
      } else {
         btn.onclick = function (str) {
            return function() {
               onStringClick(str);
            }}(s);
      }
      if (useIcons) {
         var icon = document.createElement("i");
         icon.className = "fa fa-" + icons[i];
         icon.style.fontSize = "smaller";
         icon.style.marginRight = ".2em";
         btn.insertBefore(icon, btn.firstChild);
      }
      c.appendChild(btn);
   }
   var nm = document.createElement("button");

   var nmicon = document.createElement("i");
   nmicon.className = "fa fa-ban";
   nm.appendChild(nmicon);
   nmicon.style.fontSize = "smaller";
   nmicon.style.marginRight = ".2em";
   nm.appendChild(document.createTextNode("[nevermind]"));
   nm.onclick=function(evt) {
      c.parentElement.removeChild(c);
   }
   c.appendChild(nm);

   c.className = "stringSelector";
   return c;
}

function playlistsLoaded(playlists, x, y, onPlClick) {
   var c = stringSelector(playlists, [], onPlClick, true);
   c.style.position = "absolute";
   c.style.left = x;
   c.style.top = y;
   document.body.appendChild(c);
   if (parseInt(c.style.left) + c.clientWidth > window.innerWidth) {
      c.style.left = window.innerWidth - c.clientWidth + "px";
   }
}

function noOp() {}

function platformInit() {
   if (window.mobilecheck()) {
      document.body.style.fontSize = "8vmin";
   } else {
      document.body.style.fontSize = "16px";
   }
}

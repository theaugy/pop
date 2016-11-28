// File requires:
// Backend
// TrackChanged
// NowPlaying
// NowPaused
// NewPlayerStatus

function makeProgressBar() {
   var ret = document.createElement("div");
   ret.className = "popProgress";
   var bar = document.createElement("div");
   bar.className = "popProgressBar";
   ret.appendChild(bar);
   ret.SetPercentProgress = function(prog) {
      bar.style.width = prog + "%";
   };
   ret.onclick = function(evt) {
      var s = PlayerStatus;
      if (s) {
         var x = evt.offsetX;
         var pos = evt.offsetX / ret.offsetWidth;
         pos = Math.round(pos * s['duration']);
         Backend.SeekToSecond(pos);
      }
   };
   return ret;
}

function makePlayButton() {
   var ret = document.createElement("div");
   ret.icon = document.createElement("i");
   ret.className = "playButton";
   ret.appendChild(ret.icon);
   ret.onclick = () => Backend.Pause();
   return ret;
}

function makeNextButton() {
   var ret = document.createElement("div");
   ret.icon = document.createElement("i");
   ret.icon.className = "fa fa-" + "arrow-circle-o-right";
   ret.className = "nextButton";
   ret.appendChild(ret.icon);
   ret.onclick = () => Backend.NextSong();
   return ret;
}

function makeTransport() {
   var ret = {
      SetProgress: function(status) {
         if (!status) return;
         // s is player status
         var pos = status['position'];
         var dur = status['duration'];
         this.progressBar.SetPercentProgress((parseInt(pos) * 100) / parseInt(dur));
         this.progressText.textContent = parseInt(pos) + " / " + parseInt(dur);
      },
      SetCurrentSong: function(status) {
         if (!status) return;
         this.artist.textContent = status['artist'];
         this.title.textContent = status['title'];
         this.album.textContent = status['album'];
      },
      SetPlaying: function() {
         this.playButton.icon.className = "fa fa-" + "play-circle-o";
      },
      SetPaused: function() {
         this.playButton.icon.className = "fa fa-" + "pause-circle-o";
      }
   };
   ret.progressBar = makeProgressBar();

   ret.playButton = makePlayButton();
   ret.nextButton = makeNextButton();
   if (PlayerStatus !== null) {
      if (PlayerStatus['status'] === "playing")
         ret.SetPlaying();
      else
         ret.SetPaused();
   }

   const songText = cn => {
      var d = document.createElement("div");
      d.appendChild(document.createTextNode(""));
      d.className = cn + " " + "songText";
      ret[cn] = d.firstChild;
      return d;
   }

   ret.SetCurrentSong(PlayerStatus);

   ret.progressText = document.createTextNode("");

   ret.element = document.createElement("div");
   ret.element.className = "transport";
   var a = function(e) { ret.element.append(e); };
   a(ret.playButton);
   a(ret.nextButton);
   a(ret.progressBar);
   a(ret.progressText);
   a(document.createElement("br"));
   a(songText("artist"));
   a(songText("title"));
   a(songText("album"));

   NowPlaying.addCallback(() => ret.SetPlaying());
   NowPaused.addCallback(() => ret.SetPaused());
   NewPlayerStatus.addCallback(() => ret.SetProgress(PlayerStatus));
   TrackChanged.addCallback(() => ret.SetCurrentSong(PlayerStatus));
   return ret;
}
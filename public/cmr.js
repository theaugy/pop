
// gets the cmus remote url 
function cmr ()
{
   return "http://" + window.location.hostname+ ":8000" + "/cmus";
}

// sends a remote command
function sendCmr (msg)
{
   getCmr (msg, receivedCmusStatus);
}

// gets information from the cmus remote
function getCmr (msg, callback)
{
   var r = new XMLHttpRequest ();
   var rstr = cmr () + "/" + msg;
   var cb = callback;
   r.onreadystatechange = function ()
   {
      if (this.readyState === 4)
      {
         cb (this.responseText);
      }
   }

   r.open ("GET", rstr, true);
   r.send ();
}

// basic cmus control functions
function cmus_play () { sendCmr ("play"); }
function cmus_pause () { sendCmr ("pause"); }
function cmus_next () { sendCmr ("next"); }
function cmus_prev () { sendCmr ("prev"); }
function cmus_status (callback) { getCmr ("status", callback); }

var BTN_PLAYING = "playing";
var BTN_PAUSED = "paused";
function playPauseClick ()
{
   if (getPlayerStatus ()["status"] === BTN_PAUSED)
   {
      cmus_play ();
   }
   else if (getPlayerStatus ()["status"] === BTN_PLAYING)
   {
      cmus_pause ();
   }
}

function nextClick ()
{
   cmus_next ();
}

function prevClick ()
{
   cmus_prev ();
}

var PlayerStatus = null;

function getPlayerStatus ()
{
   return PlayerStatus;
}

// update the status string
function setStatus (status)
{
   PlayerStatus = JSON.parse (status);
   drawUi ();
}

// this is the standard callback received whenever you
// play/pause/next/prev
function receivedCmusStatus (statStr)
{
   setStatus (statStr);
}

function cmrinit ()
{
   document.getElementById ("playerui").setAttribute ("width", window.innerWidth);
   document.getElementById ("playerui").setAttribute ("height", window.innerHeight);
   document.getElementById ("nextButton").addEventListener ('click', nextClick);
   document.getElementById ("prevButton").addEventListener ('click', prevClick);
   document.getElementById ("playButton").addEventListener ('click', playPauseClick);
}

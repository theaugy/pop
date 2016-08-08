

function getUiCanvas ()
{
   return document.getElementById ("playerui");
}

// miscellaneous colors
function getBackgroundColor () { return "#2b2b2b"; }
function getTextColor () { return "#4ddb9f"; }
function getProgressSoFarColor () { return "#139edb"; }
function getProgressRemainingColor () { return getTextColor (); }
function getProgressIndicatorColor () { return getTextColor (); }
function getBottomBarThickness () { return 10; }
function getCircleThickness () { return 4; }
function getProgressBallRadius () { return 12.5; }
function getTickMarkLength (canvas, ctx) { return getCircleRadius (canvas, ctx) * .09; }
function getTextAreaWidth (canvas, ctx) { return getCircleRadius (canvas, ctx) * 1.2; }
function getTextLineHeight (canvas, ctx) { return ctx.measureText ("ABCDE").height; }
function getPlayButtonHeightRatio () { return 1.2; }
function getPauseButtonHeightRatio () { return .9; }
function getPlayButtonWidthRatio () { return .92; }
function getTextOffsetRatio () { return .7; }
function getTextPadding () { return 5; }
function getNextPrevRatio () { return .7; } // ratio of next/prev button radius to play radius
function getProgressToPlayDistance (canvas, ctx)
{
   // returns distance between the bottom of the progress circle and the top
   // of the play button. canvas/ctx required in case we need to make this proportional
   // to the circle radius
   return getPlayButtonRadius (canvas, ctx) * .8;
}
function getPlayButtonRadius (canvas, ctx)
{
   var r = getCircleRadius (canvas, ctx);
   // for now, just use a set ratio
   return r * .23; 
}
function getPauseToPlayWidthRatio ()
{
   return .45;
}
function getProgressCenterX (canvas)
{
   var x = canvas.clientWidth / 2;
   return x;
}
function getProgressCenterY (canvas, ctx)
{
   var y = canvas.clientHeight / 2;
   y -= getPlayButtonRadius (canvas, ctx);
   return y;
}
function getDurationPadding (canvas, ctx)
{
   return getTickMarkLength (canvas, ctx);
}

function getIdealCircleWidthRatio (shortestDimension)
{
   // higher ratios for smaller canvases, smaller ratios
   // for larger ones.
   // TODO: Make a library to make this easier
   if (shortestDimension < 400)
   {
      return .8;
   }
   else
   {
      return .6;
   }
}

// this is the max circle radius. Even if you're viewing on a
// really big screen, the radius won't get any bigger than this.
var MAX_CIRCLE_RADIUS = 800;
var IDEAL_CIRCLE_WIDTH_RATIO = .60; // how much of the width would we ideally like our circle to take up?
function getCircleRadius (canvas, ctx)
{
   // first, try to get a radius proportional to the size of the canvas
   // Use width or height, whichever is smallest
   var overall;
   if (canvas.clientWidth < canvas.clientHeight)
   {
      overall = canvas.clientWidth;
   }
   else
   {
      overall = canvas.clientHeight;
   }

   overall = overall * getIdealCircleWidthRatio (overall);
   var radius = overall / 2;
   // if the ideal radius is too big, just return the max
   if (radius > MAX_CIRCLE_RADIUS)
   {
      return MAX_CIRCLE_RADIUS;
   }
   else
   {
      // use the ideal radius
      return radius;
   }
}

function drawUi ()
{
   var canvas = getUiCanvas ();
   drawUiOnCanvas (canvas);
}

function fillCanvas (canvas, ctx, c)
{
   ctx.beginPath ();
   ctx.rect (0, 0, canvas.clientWidth, canvas.clientHeight);
   ctx.fillStyle = c;
   ctx.fill ();
}

function drawUiOnCanvas (canvas)
{
   var ctx = canvas.getContext ("2d");

   // fill background
   fillCanvas (canvas, ctx, getBackgroundColor ());

   // bar across bottom
   ctx.beginPath ();
   var y = canvas.clientHeight - (getBottomBarThickness()/2);
   ctx.moveTo (0, y);
   ctx.lineTo (canvas.clientWidth, y);
   ctx.lineWidth = getBottomBarThickness ();
   ctx.strokeStyle = getTextColor ();
   ctx.stroke ();

   // progress circle
   drawProgressCircle (canvas, ctx);

   // play button
   drawPlayButton (canvas, ctx);

   // next/prev buttons
   drawNextButton (canvas, ctx);
   drawPrevButton (canvas, ctx);

   // place text
   placeText (canvas, ctx);
}

function getCanvasField (canvas, field)
{
   var wrapper = canvas.parentNode;

   for (var i = 0; i < wrapper.childNodes.length; ++i)
   {
      if (wrapper.childNodes[i].id === field)
      {
         return wrapper.childNodes[i];
      }
   }
   return null;
}

function digit2 (n)
{
   var ret = "" + n;
   if (ret.length === 1)
   {
      return "0" + ret;
   }
   else
   {
      return ret;
   }
}

function secondsToHMS (seconds)
{
   var h = Math.floor (seconds / 360);
   seconds -= h * 360; // remove seconds 'consumed' by hours
   var m = Math.floor (seconds / 60);
   seconds -= m * 60; // remove seconds 'consumed' by minutes
   var s = seconds; // what remains is just seconds
   return digit2 (h) + " " + digit2(m) + " " + digit2(s);
}

function placeText (canvas, ctx)
{
   var stat = getPlayerStatus ();
   var artist = getCanvasField (canvas, "artistText");
   var title = getCanvasField (canvas, "titleText");
   var album = getCanvasField (canvas, "albumText");
   var duration = getCanvasField (canvas, "durationText");

   // first, update the text
   artist.innerHTML = "<b>" + stat["artist"] + "</b>";
   title.innerHTML = stat["title"];
   album.innerHTML = stat["album"];
   duration.innerHTML = secondsToHMS (stat["position"]);

   var x = getProgressCenterX (canvas) - getCircleRadius (canvas, ctx) * getTextOffsetRatio ();
   var y = getProgressCenterY (canvas, ctx) - artist.clientHeight + 3;

   doTextStyle (artist, x, y);
   y += artist.clientHeight + getTextPadding ();
   doTextStyle (title, x, y);
   y += title.clientHeight + getTextPadding ();
   doTextStyle (album, x, y);

   // duration goes below the dash
   doTextStyle (duration,
         getProgressCenterX (canvas) - duration.clientWidth/2,
         // y position below tick mark
         getProgressCenterY (canvas, ctx) - getCircleRadius (canvas, ctx) + getTickMarkLength (canvas, ctx)
         + getDurationPadding (canvas, ctx));
}

function doTextStyle (t, x, y)
{
   t.style.left = x + "px";
   t.style.top = y + "px";
   t.style.color = getTextColor ();
}

function getProgressPercentage ()
{
   var s = getPlayerStatus ();
   return s["position"] / s["duration"];
}

function getPlayButtonX (canvas, ctx)
{
   var x = getProgressCenterX (canvas); // centered under progress circle
   return x;
}

function getPlayButtonY (canvas, ctx)
{
   var y =
      // start at the center of the progress circle
      getProgressCenterY (canvas, ctx)
      +
      // move to bottom of progress circle
      getCircleRadius (canvas, ctx)
      +
      // add padding between progress/play circle
      getProgressToPlayDistance (canvas, ctx)
      +
      // add radius of play button
      getPlayButtonRadius (canvas, ctx)
      +
      // and compensate for padding necessary due to thickness of the
      // circle
      getCircleThickness ()/2;
   return y;
}

function setWidthHeight (el, width, height)
{
   el.style.width = width;
   el.style.height = height;
   el.setAttribute ("width", width);
   el.setAttribute ("height", height);
}

function drawPlayButton (playerCanvas, playerCtx)
{
   // get playButton div. The play button canvas is its only child.
   var playButtonDiv = getCanvasField (playerCanvas, "playButton");
   var canvas = playButtonDiv.childNodes[0];
   var ctx = canvas.getContext ("2d");

   // get some basic metrics first
   var radius = getPlayButtonRadius (playerCanvas, playerCtx);
   var spacing = getProgressToPlayDistance (playerCanvas, playerCtx);
   var edgePadding = getCircleThickness (); // padding needed along any axis

   // set up geometry of play button div/canvas
   setWidthHeight (canvas, 2*radius+edgePadding, 2*radius+edgePadding);
   setWidthHeight (playButtonDiv, 2*radius+edgePadding, 2*radius+edgePadding);

   fillCanvas (canvas, ctx, getBackgroundColor ());

   var x = getPlayButtonX (playerCanvas, playerCtx);
   // go from center of canvas, to bottom of circle, plus spacing, plus radius of play button
   var y = getPlayButtonY (playerCanvas, playerCtx);
   playButtonDiv.style.left = (x - radius - edgePadding/2) + "px";
   playButtonDiv.style.top = (y - radius - edgePadding/2) + "px";

   // from here to end of function, (x,y) is relative to the player div
   x = radius+edgePadding/2;
   y = radius+edgePadding/2;

   ctx.beginPath ();
   ctx.lineWidth = getCircleThickness ();
   ctx.arc (x, y, radius, 0, 2*Math.PI, false);
   ctx.strokeStyle = getTextColor ();
   ctx.stroke ();

   // get the player state so we know whether to draw a pause or a play symbol
   var status = getPlayerStatus ();

   if (status["status"] === "playing")
   {
      // draw a play triangle. The height of the triangle is relative to the height of the play
      // button circle
      var height = radius * getPlayButtonHeightRatio ();
      var width = radius * getPlayButtonWidthRatio ();

      // this makes the triangle appear centered
      x += width *.07;
      drawTriangleToRight (canvas, ctx, x, y, width, height);
   }
   else if (status["status"] === "paused")
   {
      // draw a pause symbol
      var height = radius * getPauseButtonHeightRatio ();
      var width = radius * getPlayButtonWidthRatio ();
      width *= getPauseToPlayWidthRatio (); // don't space the pause symbol as wide as the play button
      drawPauseSymbol (canvas, ctx, x, y, width, height);
   }
}

// (x,y) == center of the triangle. Note that the actualy geometric center will be
// different, because we move the triangle to match the centroid
// width,height == dimensions of the rect that circumscribes the triangle
function drawTriangleToRight (canvas, ctx, x, y, width, height)
{
   ctx.beginPath ();

   var w = width/2; // we'll use half the width for everything, since relative to center
   var h = height/2; // same here

   ctx.moveTo (x - w, y - h); // start at top left
   ctx.lineTo (x + w, y); // line to mid right
   ctx.lineTo (x - w, y + h); // line to bottom left
   ctx.lineTo (x - w, y - h); // back up to the top
   ctx.fillStyle = getTextColor ();
   ctx.fill ();
}

function drawTriangleToLeft (canvas, ctx, x, y, width, height)
{
   ctx.beginPath ();

   var w = width/2; // we'll use half the width for everything, since relative to center
   var h = height/2; // same here

   ctx.moveTo (x + w, y - h); // start at top right
   ctx.lineTo (x - w, y); // line to mid left
   ctx.lineTo (x + w, y + h); // line to bottom right
   ctx.lineTo (x + w, y - h); // back up to the top
   ctx.fillStyle = getTextColor ();
   ctx.fill ();
}

function drawPauseSymbol (canvas, ctx, x, y, width, height)
{
   var w = width/2; // we'll use half the width for everything, since relative to center
   var h = height/2; // same here

   ctx.strokeStyle = getTextColor ();
   ctx.lineWidth = getCircleThickness () + 3;

   ctx.beginPath ();
   ctx.moveTo (x - w, y - h); // start at top left
   ctx.lineTo (x - w, y + h); // line to bottom left
   ctx.stroke ();

   ctx.beginPath ();
   ctx.moveTo (x + w, y - h); // start at top right
   ctx.lineTo (x + w, y + h); // line to bottom right
   ctx.stroke ();
}

function drawProgressCircle (canvas, ctx)
{
   var radius = getCircleRadius (canvas, ctx);
   var progressPercentage = getProgressPercentage ();

   var offset = 0 - .5 * Math.PI;
   var cutoffRadians = progressPercentage * 2 * Math.PI;

   // do 2 paths: one for the progress so far, and another
   // for the progress still to go.
   ctx.beginPath ();
   ctx.lineWidth = getCircleThickness ();
   ctx.arc (getProgressCenterX (canvas), getProgressCenterY (canvas, ctx), radius, 0 + offset, cutoffRadians + offset, false);
   ctx.strokeStyle = getProgressSoFarColor ();
   ctx.stroke ();

   ctx.beginPath ();
   ctx.lineWidth = getCircleThickness ();
   ctx.arc (getProgressCenterX (canvas), getProgressCenterY (canvas, ctx), radius, cutoffRadians + offset, 2*Math.PI + offset, false);
   ctx.strokeStyle = getProgressRemainingColor ();
   ctx.stroke ();

   // draw the tick mark at the top
   ctx.beginPath ();
   var x = getProgressCenterX (canvas);
   var y = getProgressCenterY (canvas, ctx) - radius - getCircleThickness() / 2;
   ctx.moveTo (x, y);
   ctx.strokeStyle = getProgressRemainingColor ();
   ctx.lineTo (x, y + getTickMarkLength (canvas, ctx));
   ctx.stroke ();
}

function getNextPrevOffset (canvas, ctx)
{
   return getCircleRadius (canvas, ctx) * .7;
}

function getNextPrevBarSpacing () { return getCircleThickness (); }

function drawNextButton (playerCanvas, playerCtx)
{
   // get nextButton div. The next button canvas is its only child.
   var nextButtonDiv = getCanvasField (playerCanvas, "nextButton");
   var canvas = nextButtonDiv.childNodes[0];
   var ctx = canvas.getContext ("2d");

   // next button is sized relative to the play button
   var triangleHeight = getPlayButtonRadius (playerCanvas, playerCtx) * getNextPrevRatio ();
   var triangleWidth = triangleHeight * .7;
   var edgePadding = getCircleThickness () /2;

   var width = triangleWidth + getNextPrevBarSpacing () + getCircleThickness ();
   var height = triangleHeight;

   setWidthHeight (nextButtonDiv, width, height);
   setWidthHeight (canvas, width, height);

   // establish the dead center of the next button on the canvas
   var x = getPlayButtonX (playerCanvas, playerCtx) + getNextPrevOffset (playerCanvas, playerCtx);
   var y = getPlayButtonY (playerCanvas, playerCtx);

   // position div
   nextButtonDiv.style.left = (x - width/2) + "px";
   nextButtonDiv.style.top = (y - height/2) + "px";

   x = width/2;
   y = height/2;

   // draw from here to right

   // first, vertical line
   ctx.beginPath ();
   ctx.lineWidth = getCircleThickness ();
   ctx.strokeStyle = getTextColor ();
   ctx.moveTo (getCircleThickness()/2, 0);
   ctx.lineTo (getCircleThickness()/2, height); // line straight down
   ctx.stroke ();

   drawTriangleToRight (canvas, ctx,
         // center of triangle
         getCircleThickness()/2 + getCircleThickness()/2 + getNextPrevBarSpacing () + triangleWidth/2,
         y,
         triangleWidth,
         triangleHeight);
}

function drawPrevButton (playerCanvas, playerCtx)
{
   // get prevButton div. The prev button canvas is its only child.
   var prevButtonDiv = getCanvasField (playerCanvas, "prevButton");
   var canvas = prevButtonDiv.childNodes[0];
   var ctx = canvas.getContext ("2d");

   // prev button is sized relative to the play button
   var triangleHeight = getPlayButtonRadius (playerCanvas, playerCtx) * getNextPrevRatio ();
   var triangleWidth = triangleHeight * .7;
   var edgePadding = getCircleThickness () /2;

   var width = triangleWidth + getNextPrevBarSpacing () + getCircleThickness () + 2*edgePadding;
   var height = triangleHeight;

   setWidthHeight (prevButtonDiv, width, height);
   setWidthHeight (canvas, width, height);

   // establish the dead center of the prev button on the canvas
   var x = getPlayButtonX (playerCanvas, playerCtx) - getNextPrevOffset (playerCanvas, playerCtx);
   var y = getPlayButtonY (playerCanvas, playerCtx);

   // position div
   prevButtonDiv.style.left = (x - width/2) + "px";
   prevButtonDiv.style.top = (y - height/2) + "px";

   // draw from here to right

   // first, vertical line
   ctx.beginPath ();
   ctx.lineWidth = getCircleThickness ();
   ctx.strokeStyle = getTextColor ();
   ctx.moveTo (width - getCircleThickness (), 0);
   ctx.lineTo (width - getCircleThickness (), height); // line straight down
   ctx.stroke ();

   drawTriangleToLeft (canvas, ctx,
         // center of triangle
         triangleWidth/2+edgePadding,
         triangleHeight/2,
         triangleWidth,
         triangleHeight);
}

function cmrinit () {
   document.getElementById ("playerui").setAttribute ("width", window.innerWidth);
   document.getElementById ("playerui").setAttribute ("height", window.innerHeight);
   document.getElementById ("nextButton").addEventListener ('click', nextClick);
   document.getElementById ("prevButton").addEventListener ('click', prevClick);
   document.getElementById ("playButton").addEventListener ('click', playPauseClick);
   NewPlayerStatus.addCallback(drawUi);
}

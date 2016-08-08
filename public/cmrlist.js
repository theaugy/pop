
function formatSongData(s) {
   return s["artist"] + " - " + s["title"] + " (" + s["album"] + ")";
}

function makeSong(songData) {
   return makeSongTableRow(songData);
}

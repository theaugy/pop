#!/bin/bash

#thisdir=${0%/*};
#beet ls --format="\$artist
#\$path" artist+ | awk '{ if(!b) { b=1; l=""; art=tolower($0); if (art != "") { l = substr(art,1,1); }  } else { b=0; if (l != "") { print l " " $0 ; } } }' | gawk '/^[a-z]/{ print $0 }/^[^a-z]/{match($0,/. (.+)/,m); print "_ " m[1];}' > $thisdir/../../public/artist-cache
# big fat warning: hard-coding the port here.
curl 'http://localhost:8000/cmus/refreshArtistCache'

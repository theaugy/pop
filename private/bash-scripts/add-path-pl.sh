#!/bin/bash
test -f /m/playlists/"$2".m3u && echo "$1" >> /m/playlists/"$2".m3u
echo OK

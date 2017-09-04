#!/bin/bash
function getChromecast() {
pacmd list-sinks | grep -A 1 --no-group-separator index | grep -B 1 chromecast | \
   awk '/index/ { if ($1 == "*") print $3; else print $2; }'
}
function getCmus() {
pacmd list-sink-inputs | egrep '(index|client:|sink:)' | \
   awk 'BEGIN{ i = -1; } /index:/ { i = $2 } /Music Player/ { if (i >= 0) print i }' | tail -1
}
c=$(getChromecast);
[[ "$c" == "" ]] && /usr/local/bin/chromecast.sh &> /dev/null
c=$(getChromecast);
[[ "$c" == "" ]] && { echo "Couldn't find chromecast; init script didn't work." ; exit 1 ; }
m=$(getCmus);
[[ "$m" == "" ]] && { echo "Cmus doesn't seem to be playing. This is OK." ; exit 0 ; }
set -x;
pacmd move-sink-input $m $c || { echo "error doing move-sink-input $m to $c" ; exit 1 ; }

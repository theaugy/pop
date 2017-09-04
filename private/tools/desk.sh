#!/bin/bash
function getDesk() {
pacmd list-sinks | grep -A 1 --no-group-separator index | grep -B 1 Audio_CODEC | \
   awk '/index/ { if ($1 == "*") print $3; else print $2; }'
}
function getCmus() {
pacmd list-sink-inputs | egrep '(index|client:|sink:)' | \
   awk 'BEGIN{ i = -1; } /index:/ { i = $2 } /Music Player/ { if (i >= 0) print i }' | tail -1
}
d=$(getDesk);
[[ "$d" == "" ]] && { echo "Couldn't find desk. Something is wrong with pi audio card." ; exit 1 ; }
m=$(getCmus);
[[ "$m" == "" ]] && { echo "Cmus doesn't seem to be playing. This is OK." ; exit 0 ; }
pacmd move-sink-input $m $d


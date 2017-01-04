#!/bin/bash

curl localhost:8000/cmus/status > /tmp/last-cmus-status-prompted
which cmusfm &> /dev/null && cmusfm "$@"

exit 0
# this will print out the status as a set of newline-separated key/value pairs (newline after each key, each value)
for v in "$@"; do
   echo "$v";
done > /tmp/cmus-status-update

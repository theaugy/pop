#!/bin/bash
newq="$(cmus-remote -C "save -q -" | grep -v -F "$1")"
cmus-remote -c -q # clear the queue
printf "%s\n%s" "$1" "$newq" | xargs -d '\n' -L 1 -i cmus-remote -q {}

#!/bin/bash

newq="$(cmus-remote -C "save -q -" | grep -v -F "$1")"
cmus-remote -c -q # clear the queue
echo "$newq" | xargs -d '\n' -L 1 -i cmus-remote -q "{}"

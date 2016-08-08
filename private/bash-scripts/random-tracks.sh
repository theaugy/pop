#!/bin/bash

thisdir=${0%/*};
cache="$thisdir/../../public/artist-cache"
lines=$(cat $cache | wc -l)
cat -n $cache | gawk 'BEGIN{ srand(); for (i = 0; i < '$1'; ++i) { tmp = int (rand() * '$lines'); n[tmp] = 1; } } {if (match($0,/\s*([0-9]+)\s+(.+)/,m)) { if(m[1] in n) print m[2]; } } ' | sed -e 's/^..//'

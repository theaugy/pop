#!/bin/bash

thisdir=${0%/*};
cache="/m/meta/artist-cache";
letter=${1,,}
if [[ "$letter" =~ ^[a-z] ]]; then
   # every line that starts with the letter
   egrep -i "^$letter" $cache
else
   # every line that _doesn't_ start with a letter
   egrep "^[^a-zA-Z]" $cache
fi

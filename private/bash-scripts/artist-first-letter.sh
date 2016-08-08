#!/bin/bash

thisdir=${0%/*};
cache="$thisdir/../../public/artist-cache"
letter=${1,,}
egrep "^$letter" $cache | sed 's/^..//'

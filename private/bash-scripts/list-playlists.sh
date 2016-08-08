#!/bin/bash
find /m/playlists -name "*.m3u" | sed -e 's/^\/m\/playlists\///' | sed -e 's/.m3u$//' | egrep -v '^$' | sort

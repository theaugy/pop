Some terminology to keep things straight.

PoP has evolved a _ton_. So things are getting a little frayed.

Here are some terms and future design goals:

'main' - the playlist that is being currently played through.
'main pos' - the 0-based index of 'main' that is currently being played.
'stash' - a server-saved named list of files.
'tag' - a string attached to a song.

Theory of Operation:

Whenever the ui displays a list of songs, be it as a result of loading a tag,
stash, query result, or any other method, the songs should have the following
options:

1. add to stash. currently indicated by a '+' plus icon.
2. add to playlist. currently indicated by a save disk icon.
3. play. currently indicated by a '>' play icon.

If the ui happens to be showing a stash, the 'add to stash' option is replaced
by

4. remove from stash. currently indicated by a 'x' times icon.

The effects of each option are:

1. the song is added to a stash. the ui has a 'current stash' state included
   with the server request.

2. the song is appended to the m3u playlist on disk by the server immediately.

3. the song is immediately played. The rest of the results are played in the
   order they are displayed.

4. the song is removed from a stash. As with 1., the ui includes the stash name
   with the request.

-------

Requests have historically always identified songs using their path. This has
always made sense, because it is the common identifier that works in cmus, in
beets, and in the ui.

One issue I would like to see overcome is to no longer use .m3u playlists, and
remove all dependency on path-parsing for song metadata. The current sources
of path parsing are:

- artist-cache. Used when getting random songs and artist by first letter.
- client requests. songs are referred to via path. Translating to a 'real'
  song is possible, but in principle requires doing a beet query for every
  path, which is usually very slow.
  Tag, Untag, Enqueue, CmusQueueStatus, all currently need to parse paths.
- m3u playlists.

In the case of Untag, the interface doesn't strictly need to parse the path; it
only needs the path to know which song to remove. But it feels cleaner to write
interfaces that only accept objects. On the other hand, it also makes sense to
enforce a 'deletion by id must always be possible' rule, which would sidestep
the need for path parsing (or id->song lookup) for Untag/Dequeue/etc.

The server side stuff can be fairly easily eliminated:

- artist-cache: replace path lines with the beet query format we would use for
  a 'proper' lookup
- m3u playlists: replace with .json playlists

The client requests are trickier, but perhaps workable.

The client can only work with songs the server has given it.
Therefore, the server should have a good idea of which songs the client might
need to look up by path, and could therefore do a pretty effective job of
maintaining cache.

If every time the server returned a list of songs, it preserved a path-to-song
cache in a list, it could limit that path-to-song cache list to the number of
devices we ever expect to have connected (lets make it pretty big, say 10),
then we should basically never need to fall back to doing beet queries for
missing paths.

--------

Rather than having requests reset the result list when we add or remove
items from the main playlist, we should be smart enough to append and
remove only the specific tracks. This will keep the songlist from
updating the main playlist in the server and messing up the play order.

--------

Setting the main playlist should be doable automatically. Since the server
provides everything the client sees, we could set the main playlist on
return, which saves a (potentially very large) request.

This would solve the problem of requests being denied because the request URL
is too damn long.

--------

Need to get the api terminology updated

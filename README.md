
### Plain ol' Player

PoP is a for-funsies side project. I am not fluent in any of the languages involved here.

It consists of 2 parts:

#### Server

Recently migrated to an all-nodejs approach.

It is designed to sit in front of a beets library, but the fundamental design of beets (re-loading the database every time) is incompatible with this use case.
So the server's APIs (and the ui's polite usage thereof) are geared towards minimizing the amount of querying we have to do.
The general idea is that the user is only likely to do stuff to the thing(s) they last asked for. So the server keeps a modest cache of database info. It caps
it at around the amount it would need to support a couple of sessions (a half dozen sessions would be more than we'd ever expect).

I've modified beets to accept commands on stdin, so at least it keeps the database in memory between requests now.

It relies pretty heavily on the cmus/beet backend combo. Cmus needs to be configured a bit (e.g., follow=off).

Playlists are stored on disk in a simple .json format, and stored in a hard-coded location: `/m/meta/playlists`.
Tags are stored in a single 'tags.json' file, though this might need breaking up at some point. Hard-coded to `/m/meta/tags.json`.
The server generally assumes it can write wherever and however it pleases in `/m/meta`.

#### Web Page

A mostly functional music player front end. It's good at stuff I need it for. It's bad at basically everything else.

I have put pretty minimal effort into the aesthetics of it. The CSS is kind of a nightmare. Learnin' on the job here.

c/b buttons pause and play-next, respectively (this matches the behavior of `cmus`).

Clicking to the right of a track allows you to tag it. Clicking to the right of any album/divider allows you to apply tags to all tracks in it.

The ui maintains the notion of a 'stash', which is a playlist to which any tracks you "plus" will be added.

You add or remove tracks from the stash. You can add tracks to a playlist by clicking the "disk" icon.

Search is supported, and there are some 'canned queries' (recently added, artist by letter, etc.) available on the left.

-----

This project basically exists to make my pretty-goddern-big music collection as accessible as possible not only to me, but my shell-averse girlfriend.
It's also kinda fun to use a throw-and-go language like javascript instead of C++ (my lingua computera).

I am loathe to add any library unnecessarily. I am using a delicately-hacked version of taggle to support tagging.

I run the server on my raspberry pi (raspbian), which connects to either my computer speakers via sound card or my living room speakers via chromecast.
The server is tightly coupled to my music database (beet) and my music player (cmus).
I access the web ui from my work or personal laptop, or my phone in a pinch. It doesn't seem to load on iOS devices.

I'm not 100% sure how many local scripts glue this thing together, nor how easy it would be to separate it at which levels.
You could probably keep most of the code and replace the beet/cmus calls with another database and music player.

`- Augy`

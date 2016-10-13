
### Plain ol' Player

PoP is a for-funsies side project. I am not fluent in any of the languages involved here.

It consists of 2 parts:

#### Server

A ridiculously simple, terrible python server that is slowly morphing into a shim to call my bash scripts.

It is designed to sit in front of a beets library, but the fundamental design of beets (re-loading the database every time) is fundamentally incompatible with this use case.

#### Web Page

A hideously ugly, functional music player front end. It's good at stuff I need it for. It's bad at basically everything else.

Left/Right arrows switch between views (in the `views` branch, which will become `master` soon).
c/b buttons pause and play-next, respectively (this matches the behavior of `cmus`).

-----

This project basically exists to make my pretty-goddern-big music collection as accessible as possible not only to me, but my shell-averse girlfriend.
It's also kinda fun to use a throw-and-go language like javascript instead of C++ (which I would say I _am_ fluent in).

I am loathe to load _any_ library unnecessarily. No jQuery, lodash, or jflip[^naw] here. I'll probably add QuoJS to support swipes.


`- Augy`

P.S.: The navbar at the top doesn't play nice; you're meant to use the left/right arrows. Maybe I'll fix that soon.

[^naw]:  I made that one up, but I'll bet you thought it was real for a second.

from BaseHTTPServer import BaseHTTPRequestHandler
import SimpleHTTPServer
import SocketServer
import os
import subprocess
import urlparse
import re
import json
import time
import urllib

class CmrRequest (BaseHTTPRequestHandler):
   cmus = "cmus-remote"
   beet = "beet"
   artistFirstLetter = "../private/bash-scripts/artist-first-letter.sh"
   getRandom = "../private/bash-scripts/random-tracks.sh"
   favCurrent = "../private/bash-scripts/favorite-current.sh"
   addCurrent = "../private/bash-scripts/add-current.sh"
   listPlaylists = "../private/bash-scripts/list-playlists.sh"
   getPlaylist = "../private/bash-scripts/get-playlist.sh"
   dequeuePath = "../private/bash-scripts/dequeue-path.sh"
   currentStatus = None

   # issues command and returns immediately
   def _cmrCall(self, args):
      os.system(self.cmus + " " + args)
   # waits for output of the command and returns it
   def _cmrGet(self, args):
      withproc = [self.cmus];
      for a in args:
          withproc.append(a)
      return subprocess.check_output(withproc)

   def run_script(s, name):
      fullPath = "/usr/local/bin/%s" % (name)
      print "Running %s:" % (fullPath)
      start = s.getMilli()
      script_output = subprocess.check_output(fullPath)
      print "... took %dms. Output:\n%s" % (s.getMilli() - start, script_output)
      s.wfile.write(script_output)

   # cmus commands supported
   def cmus_play(self):
      self._cmrCall ("--play")
      return self.cmus_status ()
   def cmus_pause(self):
      self._cmrCall ("--pause")
      return self.cmus_status ()
   def cmus_next(self):
      self._cmrCall ("--next")
      return self.cmus_status ()
   def cmus_prev(self):
      self._cmrCall ("--prev")
      return self.cmus_status ()
   def cmus_status(self):
      status_string = self._cmrGet (["-Q"])
      return self.parseCmusStatus (status_string)
   def cmus_playlist(self):
      return self.parseCmusPlaylist("Playlist", self._cmrGet(["-C", "save -p -"]));
   def cmus_queue(self):
      ret = self.parseCmusPlaylist("Queue", self._cmrGet(["-C", "save -q -"]));
      return ret

   def tryCmusStatus(self, jo, key, line, regex, cap = 1):
      m = re.match ("^" + regex, line)
      if m:
         jo[key] = m.group(cap)
         return True
      return False

   def parseCmusStatus (s, cmusStatus):
      lines = cmusStatus.split ("\n");
      jo = {} # the json object which we'll convert
      for l in lines:
         # status line?
         if s.tryCmusStatus (jo, "status", l, r'status (\w+)'):
            continue
         if s.tryCmusStatus (jo, "duration", l, r'duration (\d+)'):
            continue
         if s.tryCmusStatus (jo, "position", l, r'position (\d+)'):
            continue
         if s.tryCmusStatus (jo, "artist", l, r'tag artist (.+)'):
            continue
         if s.tryCmusStatus (jo, "album", l, r'tag album (.+)'):
            continue
         if s.tryCmusStatus (jo, "title", l, r'tag title (.+)'):
            continue
         if s.tryCmusStatus (jo, "shuffle", l, r'set shuffle (\w+)'):
            continue
         if s.tryCmusStatus (jo, "path", l, r'^file (.+)'):
            continue
      return json.dumps (jo)

   def getMilli(s):
      return int(round(time.time() * 1000))

   def pathsToInfo(s, paths):
       info = [];
       counter = 0
       print "Found %d" % (len(paths))
       for p in paths:
           if not p:
               continue
           counter += 1
           info.append(s.pathToInfo(p))
       return info

   def doArtistStartQuery(s, letter):
       print "Artist starting with %s" % (letter)
       paths = subprocess.check_output([s.artistFirstLetter, letter])
       paths = paths.split("\n");
       jo = {}
       jo["query"] = letter
       jo["songs"] = s.pathsToInfo(paths);
       print "Returning %d" % (len(jo["songs"]))
       return json.dumps(jo)

   def doBeetQuery(s, query):
       if not query:
           return ""
       artistre = re.compile("artist::\\^(.)");
       artistre_match = artistre.match(query)
       if (artistre_match):
           return s.doArtistStartQuery(artistre_match.group(1))

       # TODO: shell-style escaping
       paths = subprocess.check_output([s.beet, "ls",
           "--format=$path"] + re.split('\s+', query))
       paths = paths.split("\n")
       print "Query got back %d paths" % (len(paths))
       jo = {}
       jo["query"] = query
       jo["songs"] = s.pathsToInfo(paths);
       print "Returning %d" % (len(jo["songs"]))
       return json.dumps(jo)

   def pathToInfoFromCmus(s, path):
      if not path:
           return []
      start = s.getMilli();
      args = []
      args.append(s.beet)
      args.append ("ls")
      fmt = "$artist\n$title\n$album"
      args.append("--format=" + fmt)
      args.append("path:" + path)
      artist_title_album = subprocess.check_output (args)
      if not artist_title_album:
          return []
      ata = artist_title_album.split("\n")
      total = s.getMilli() - start;
      print "Took %dms" % (total)
      if len(ata) != 4:
          return []
      return ata

   def pathToInfo(s, path):
       if not path:
           return {}
       ret = {}
       ret["path"] = path
       start = s.getMilli()
       parts = path.split("/")
       parts.pop(0)
       if len(parts) != 4:
           return ret
       # 0: m
       # 1: m
       # 2: YEAR ALBUM or ARTIST singles
       # 3: TRACKNUMBER ARTIST - TITLE or ARTIST - TITLE
       singles = re.compile(".* singles$")
       if singles.match(parts[2]):
          # is a path to single; album won't be known
          artist_title = re.compile("[0-9]+ ([^-]*) - (.*).(flac|mp3|mp4|alac|m4a)")
          a_t = artist_title.match(parts[3]);
          if a_t:
              ret["artist"] = a_t.group(1)
              ret["title"] = a_t.group(2)
              ret["album"] = "single"
              return ret
          else:
            print "\t\tCouldn't parse (single) %s" % (path)
       else:
          # is path to album track
          year_album = re.compile("[0-9][0-9][0-9][0-9] (.*)")
          y_a = year_album.match(parts[2])
          if y_a:
            # goooood
            n_artist_title = re.compile("([0-9]+) (.*) - (.*).(flac|mp3|mp4|alac|m4a)")
            n_a_t = n_artist_title.match(parts[3])
            if n_a_t:
                ret["artist"] = n_a_t.group(2)
                ret["title"] = n_a_t.group(3)
                ret["album"] = y_a.group(1)
                return ret
            else:
                print "\t\tCouldn't parse artist title : %s" % (path)
          else:
            print "\t\tCouldn't parse (not a single): %s" % (path)
       return ret


   def parseCmusPlaylist(s, name, cmusOutput):
      lines = cmusOutput.split("\n");
      jo = {}
      jo["name"] = name # todo
      songs = []
      for l in lines:
          if not l:
              continue
          songs.append(s.pathToInfo(l))
      jo["songs"] = songs
      return json.dumps(jo)


   def do_POST(self):
      print "uuuhhhh..."

   def do_GET (s):
      #print "GET " + s.path
      if s.tryAsRoot():
         return
      if s.tryAsSearch():
          return
      if s.tryAsRandom():
          return
      if s.tryAsEnqueue():
          return
      if s.tryAsFav():
          return
      if s.tryAsPlaylist():
          return
      if s.tryAsTool():
          return
      if s.tryAsCmusCommand():
         return
      if s.tryAsAsset():
         return
      else:
         print "404'ing: %s" % (s.path)
         s.send_response (404)

   def writeFileToResponse (s, fname):
      f = open (fname, "r")
      s.wfile.write (f.read ().encode ())
      f.close ()

   # returns true if the requested path is the root and serves
   # up the cmr player
   def tryAsRoot (s):
      if s.path == "/":
         # serve up the player page
         s.send_response (200)
         s.send_header ("Content type", "text/html")
         s.end_headers ()
         # get ze file
         s.writeFileToResponse ("cmr.html")
         return True
      return False

   def tryAsEnqueue(s):
       parsed = urlparse.urlparse(s.path);
       if parsed.path.startswith("/cmus/enqueue"):
           query = urlparse.parse_qsl(parsed.query)
           for name,value in query:
               if name == "path":
                   print "enqueueing %s" % (value)
                   print s._cmrGet(["-q", value])
                   s.wfile.write(s.cmus_status());
           return True
       elif parsed.path.startswith("/cmus/dequeue"):
           query = urlparse.parse_qsl(parsed.query)
           for name,value in query:
               if name == "path":
                   print "dequeueing %s" % (value)
                   subprocess.check_output([s.dequeuePath, value]);
                   s.wfile.write(s.cmus_queue())
           return True
       return False

   def tryAsRandom(s):
       parsed = urlparse.urlparse(s.path);
       if parsed.path.startswith("/cmus/random"):
           query = urlparse.parse_qsl(parsed.query);
           for name,value in query:
               if (name == "n"):
                   print "Getting %s random" % (value)
                   paths = subprocess.check_output([ s.getRandom, value ])
                   paths = paths.split("\n")
                   jo = {}
                   jo["query"] = "Random %s" % (value)
                   jo["songs"] = s.pathsToInfo(paths)
                   s.wfile.write(json.dumps(jo));
           return True
       return False


   def tryAsSearch(s):
       parsed = urlparse.urlparse(s.path);
       if parsed.path.startswith("/cmus/search"):
           query = urlparse.parse_qsl(parsed.query)
           print "Doing query"
           for name,value in query:
               if name == "q":
                   print "Querying for `%s'" % (value)
                   s.wfile.write(s.doBeetQuery(value))
           return True
       return False

   def tryAsCmusCommand (s):
      # does this look like a cmus command?
      cmusr = re.compile ("^/cmus/(\w+)$")
      match = cmusr.match (s.path)

      if match:
         # indeed it does. grab the command name...
         command = match.group(1)
         # ... and ensure that we have a method that looks like that
         cmus_command_method = getattr (s, "cmus_" + command, None)
         if (callable (cmus_command_method)):
            s.wfile.write (cmus_command_method ())
         else:
            print "Unrecognized command " + command
            s.wfile.write ("bad_cmus_command");
         return True
      return False

   def tryAsFav(s):
      parsed = urlparse.urlparse(s.path);
      if not parsed.path.startswith("/cmus/fav"):
          return False
      subprocess.check_output([s.favCurrent])
      s.wfile.write("favorited currently playing track")
      return True

   def tryAsPlaylist(s):
      cmusr = re.compile ("^/cmus/(\w+)Playlist")
      match = cmusr.match (s.path)
      if match:
          command = match.group(1)
          if command == "list":
              s.wfile.write(subprocess.check_output([s.listPlaylists]))
              return True
          elif command == "get":
              parsed = urlparse.urlparse(s.path);
              query = urlparse.parse_qsl(parsed.query, True)
              for name,value in query:
                  if name == "name":
                      print "Getting playlist %s" % (value)
                      paths = subprocess.check_output([s.getPlaylist, value]);
                      paths = paths.split("\n");
                      jo = {}
                      jo["query"] = "All Playlists"
                      jo["songs"] = s.pathsToInfo(paths)
                      s.wfile.write(json.dumps(jo));
                      return True
          elif command == "add":
              parsed = urlparse.urlparse(s.path);
              query = urlparse.parse_qsl(parsed.query, True)
              for name,value in query:
                  if name == "name":
                      print "Adding current to playlist %s" % (value)
                      s.wfile.write(subprocess.check_output([s.addCurrent, value]))
                      return True
      return False

   def tryAsTool(s):
      parsed = urlparse.urlparse(s.path);
      if not parsed.path.startswith("/cmus/tool"):
          return False
      query = urlparse.parse_qsl(parsed.query, True)
      for name,value in query:
          print "name: %s" % (name)
          if name == "chromecast":
              s.run_script("chromecast.sh")
          elif name == "shairport":
              s.run_script("shairport.sh")
          elif name == "fixchromecast":
              s.run_script("fixchromecast.sh")
      return True

   def tryAsAsset (s):
      # don't allow '..' in the path
      doubler = re.compile ("\\.\\.");
      if (doubler.match (s.path)):
         print "Somebody is being naughty: " + s.path
         s.send_response (404)
         return True

      favi = re.compile(".*favicon.*")
      if favi.match(s.path):
          print "Don't have favicon!"
          s.send_response(404)
          return True

      assetr = re.compile ("^/(\w+)+\\.(\w+)$")
      match = assetr.match (s.path)
      if match:
         name = match.group (1)
         ext = match.group (2)

         # todo: check that extension is OK
         s.writeFileToResponse (name + "." + ext)
         return True
      return False


def runcmr ():
   PORT = 8000
   handler = CmrRequest
   httpd = SocketServer.TCPServer (("", PORT), handler)
   print "cmr on " + str (PORT)
   httpd.serve_forever()

runcmr ()

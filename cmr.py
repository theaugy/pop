from BaseHTTPServer import BaseHTTPRequestHandler
import SimpleHTTPServer
import SocketServer
import os
import subprocess
import urlparse
import re
import json

class CmrRequest (BaseHTTPRequestHandler):
   cmus = "cmus-remote"

   # issues command and returns immediately
   def _cmrCall (self, args):
      os.system (self.cmus + " " + args)
   # waits for output of the command and returns it
   def _cmrGet (self, args):
      return subprocess.check_output ([self.cmus, args])

   # cmus commands supported
   def cmus_play (self):
      self._cmrCall ("--play")
      return self.cmus_status ()
   def cmus_pause (self):
      self._cmrCall ("--pause")
      return self.cmus_status ()
   def cmus_next (self):
      self._cmrCall ("--next")
      return self.cmus_status ()
   def cmus_prev (self):
      self._cmrCall ("--prev")
      return self.cmus_status ()
   def cmus_status (self):
      status_string = self._cmrGet ("-Q")
      return self.parseCmusStatus (status_string)

   def tryCmusStatus (self, jo, key, line, regex, cap = 1):
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
      return json.dumps (jo)


   def do_POST (self):
      print "uuuhhhh..."

   def do_GET (s):
      print "GET " + s.path
      if s.tryAsRoot():
         return
      if s.tryAsCmusCommand():
         return
      if s.tryAsAsset():
         return
      else:
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
            print "Recognized command " + command
            s.wfile.write (cmus_command_method ())
         else:
            print "Unrecognized command " + command
            s.wfile.write ("bad_cmus_command");
         return True
      print "Not cmus..."
      return False

   def tryAsAsset (s):
      # don't allow '..' in the path
      doubler = re.compile ("\\.\\.");
      if (doubler.match (s.path)):
         print "Somebody is being naughty: " + s.path
         s.send_response (404)
      assetr = re.compile ("^/(\w+)+\\.(\w+)$")
      match = assetr.match (s.path)
      if match:
         name = match.group (1)
         ext = match.group (2)

         # todo: check that extension is OK
         print "serving up " + name + "." + ext + "..."
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

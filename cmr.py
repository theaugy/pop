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
   success = 0
   failure = 0
   nodesRoot = "../nodes"
   nodeJsPath = "/usr/bin/nodejs"
   currentStatus = None

   def getMilli(s):
      return int(round(time.time() * 1000))

   def runNode(s):
       parsed = urlparse.urlparse(s.path)
       if ".." in parsed.path: # safety first
            print "404'ing due to dot-dot: %s" % (parsed.path)
            s.send_response (404)
            return False
       query = urlparse.parse_qsl(parsed.query)
       target = s.nodesRoot + parsed.path + ".js";
       if not os.path.isfile(target):
            print "404'ing due to not-a-file: %s as %s" % (parsed.path, target)
            s.send_response (404)
            return False

       args = [];
       args.append(s.nodeJsPath)
       args.append(target)
       args.append("--url-args")
       for name,value in query:
           args.append(name)
           args.append(value)

       s.wfile.write(subprocess.check_output(args))
       return True


   def do_POST(self):
      print "uuuhhhh..."

   def do_GET_private(s):
       start = s.getMilli();

       if s.tryAsRoot():
           s.success += 1
       elif s.tryAsAsset():
           s.success += 1
       elif s.runNode():
           s.success += 1
       else:
           s.failure += 1
       totalms = s.getMilli() - start;
       print "%s: took %dms. Win/Loss Record: %d / %d" % (s.path, totalms, s.success, s.failure)

   def do_GET (s):
      s.do_GET_private();

   def writeFileToResponse (s, fname):
      f = open(fname, "r")
      s.wfile.write(f.read ().encode ())
      f.close()

   def writeBinaryFileToResponse (s, fname):
      f = open (fname, "rb")
      s.wfile.write(f.read ())
      f.close()

   # returns true if the requested path is the root and serves
   # up the cmr player
   def tryAsRoot (s):
      if s.path == "/":
         # serve up the player page
         s.send_response (200)
         s.send_header ("Content type", "text/html")
         s.end_headers ()
         # get ze file
         s.writeFileToResponse ("cmrsearch.html")
         return True
      return False

   def isBinary(s, ext):
      if ext == "jpg" or ext == "jpeg" or ext == "png":
          return True
      return False

   def tryAsAsset (s):
      # don't allow '..' in the path
      doubler = re.compile ("\\.\\.");
      if (doubler.match (s.path)):
         print "Somebody is being naughty: " + s.path
         s.send_response (404)
         return True

      favi = re.compile(".*favicon.*")
      if favi.match(s.path):
          s.writeFileToResponse("pop2.png");
          return True

      assetr = re.compile ("^/(\w+)+\\.(\w+)$")
      match = assetr.match (s.path)
      if match:
         name = match.group (1)
         ext = match.group (2)

         if s.isBinary(ext):
             s.writeBinaryFileToResponse(name + "." + ext)
         else:
             # todo: check that extension is OK
             s.writeFileToResponse (name + "." + ext)
         return True

      fa = re.compile("^/font-awesome/([^?]+)")
      match = fa.match(s.path)
      if match:
         s.writeBinaryFileToResponse("font-awesome/" + match.group(1))
         return True

      return False


def runcmr ():
   PORT = 8000
   handler = CmrRequest
   httpd = SocketServer.TCPServer (("", PORT), handler)
   print "cmr on " + str (PORT)
   httpd.serve_forever()

runcmr ()

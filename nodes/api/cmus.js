const CMUS = require('../lib/cmus.js');
const ARGS = require('../lib/args.js');
const J = JSON.stringify;
var cmus = CMUS.makeCmus();

module.exports = {
   addPlaylist: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["name", "path"]);
      pl.AddTo(args.Get("name"), args.Get("path"));
   },
   seekto: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["s"]);
      cmus.Seek.To(args.Get("s"));
      return this.status();
   },
   status: function() {
      var j = J(cmus.PlayerStatus());
      return j;
   },
   play: function() {
      cmus.Play();
      return this.status();
   },
   next: function() {
      cmus.Next();
      return this.status();
   },
   pause: function() {
      cmus.Next();
      return this.status();
   },
   queue: function() { return J(cmus.QueueStatus()); },
   enqueue: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["path"]);
      cmus.Enqueue(args.Get("path"));
      return this.queue();
   },
   dequeue: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["path"]);
      cmus.Dequeue(args.Get("path"));
      return this.queue();
   },
   topqueue: function(req) {
      var args = ARGS.buildArgs(req);
      args.Ensure(["path"]);
      cmus.TopQueue(args.Get("path"));
      return this.queue();
   }
}


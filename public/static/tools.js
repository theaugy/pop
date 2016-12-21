function makeTools() {
   var ret = {
      Add: function(name, script) {
         var b = document.createElement("button");
         b.toolFinished = (msg) => console.log(JSON.parse(msg));
         b.runTool = () => Backend.RunServerSideTool(['name', script], b.toolFinished);
         b.appendChild(document.createTextNode(name));
         b.onclick = b.runTool;
         ret.element.appendChild(b);
         this.tools.push({ button: b, name: name, script: script });
         ret.element.appendChild(document.createElement("br"));
         return b;
      },
      // means "add a button that doesn't run a backend tool"
      AddNonTool: function(name, cb) {
         var b = document.createElement("button");
         b.appendChild(document.createTextNode(name));
         b.onclick = cb;
         ret.element.appendChild(b);
         ret.element.appendChild(document.createElement("br"));
         return b;
      }
   };
   ret.element = document.createElement("div");
   ret.id = "tools";
   ret.tools = [];

   ret.Add("Chromecast", "chromecast");
   ret.Add("Desk", "desk");
   ret.AddNonTool("Use augy's stash", () => Backend.SelectStash("stash/augy"));
   ret.AddNonTool("Use stella's stash", () => Backend.SelectStash("stash/stella"));
   ret.AddNonTool("Prefer Collapsed", () => Settings.Set("albumDefaultState", "collapsed"));
   ret.AddNonTool("Prefer Expanded", () => Settings.Set("albumDefaultState", "expanded"));
   return ret;
}

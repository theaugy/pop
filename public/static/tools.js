function makeTools() {
   var ret = {
      Add: function(name, script) {
         var b = document.createElement("button");
         b.appendChild(document.createTextNode(name));
         b.toolFinished = (msg) => console.log(JSON.parse(msg));
         b.runTool = () => Backend.RunServerSideTool(['name', script], b.toolFinished);
         b.onclick = b.runTool;
         ret.element.appendChild(b);
         this.tools.push({ button: b, name: name, script: script });
         ret.element.appendChild(document.createElement("br"));
         return b;
      }
   };
   ret.element = document.createElement("div");
   ret.id = "tools";
   ret.tools = [];

   ret.Add("Chromecast", "chromecast");
   ret.Add("Desk", "desk");
   return ret;
}

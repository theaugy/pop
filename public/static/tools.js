function makeTools() {
   var ret = {
      Add: function(name, script) {
         var b = document.createElement("button");
         b.appendChild(document.createTextNode(name));
         const argstring = "";
         b.toolFinished = (msg) => console.log(msg);
         b.runTool = () => Backend.RunServerSideTool(script, argstring, b.toolFinished);
         b.onclick = b.runTool;
         ret.element.appendChild(b);
         this.tools.push({ button: b, name: name, script: script });
         return b;
      }
   };
   ret.element = document.createElement("div");
   ret.id = "tools";
   ret.tools = [];

   ret.Add("Chromecast", "chromecast");
   return ret;
}

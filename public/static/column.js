CustomColumn = function (name) {
   this.name = name;
   this.text = null;
   this.button = null;
   this.buttoncb = null;
   this.polishcb = null;
   this.icon = "";
   // Note: this ONLY affects mouseover icons! CustomColumn does nothing magic to
   // make a click apply to all matching items!
   this.buttonAppliesToMatches = false;
}

CustomColumn.prototype.Text = function(textcb) {
   this.textcb = textcb;
}

CustomColumn.prototype.Button = function(cb) {
   this.buttoncb = cb;
}

CustomColumn.prototype.Icon = function(name) {
   this.icon = name;
}

CustomColumn.prototype.Polish = function(cb) {
   this.polishcb = cb;
}

CustomColumn.prototype.GetText = function(song) {
   if (this.textcb !== null) {
      return this.textcb(song);
   }
   return "";
}

CustomColumn.prototype.IsButton = function() {
   return this.buttoncb !== null;
}

// calls GetText for you
CustomColumn.prototype.GetButton = function(song) {
   if (this.buttoncb !== null) {
      var b = document.createElement("button");
      b.appendChild(document.createTextNode(this.GetText(song)));
      var cb = this.buttoncb;
      b.clickHandler = (function(s) { 
         var thesong = s;
         return function (evt) {
            cb(thesong, evt);
         }
      })(song);
      b.onclick = b.clickHandler;
      return b;
   }
   return null;
}

CustomColumn.prototype.getIconName = function() {
   if (this.icon !== "") {
      return "fa fa-" + this.icon;
   }
   return "";
}

// This icon shows after the column title
CustomColumn.prototype.GetIcon = function() {
   var icon = this.getIconName();
   if (icon === "") icon = " ";
   var div = document.createElement("div");
   div.style.display = "inline-block";
   div.style.fontSize = "smaller";
   var i = document.createElement("i");
   i.className = icon;
   div.appendChild(i);
   div.customColumn = this;
   return div;
}

CustomColumn.prototype.ModifyIcon = function(icon) {
   if (icon.customColumn === this) {
      icon.children[0].className = this.getIconName();
   }
}

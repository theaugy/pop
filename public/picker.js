Picker = function(opts) {
   this.opts = opts;
   this.div = null;
   this.okClicked = false;
   this.cb = null;
   this.year = null;
   this.month = null;
   this.day = null;
}

Picker.prototype.SetCallback = function(cb) {
   this.cb = cb;
}

Picker.prototype.Make = function() {
   if (this.div !== null) {
      return this.div;
   }
   var o = this.opts;
   var ret = document.createElement("div");
   this.year = this.yearPicker();
   ret.appendChild(this.year);
   if (o.month) {
      this.month = this.monthPicker();
      ret.appendChild(this.month);
   }
   if (o.day) {
      this.day = this.dayPicker();
      ret.appendChild(this.day);
   }

   ret.appendChild(this.okButton());
   ret.appendChild(this.cancelButton());

   this.div = ret;
   return ret;
}

Picker.prototype.yearPicker = function() {
   var sel = document.createElement("select");
   var currentyear = new Date().getFullYear();
   for (i = 1900; i <= 2030; ++i) {
      var opt = document.createElement("option");
      opt.text = i + '';
      if (currentyear === i) {
         opt.selected = true;
      }
      sel.add(opt);
   }
   return sel;
}

// number, width
Picker.prototype.pad = function(n, w) {
   var s = n + '';
   while (s.length < w) {
      s = "0" + s;
   }
   return s;
}

Picker.prototype.monthPicker = function() {
   var sel = document.createElement("select");
   var currentmonth = new Date().getMonth() + 1;
   for (i = 1; i <= 12; ++i) {
      var opt = document.createElement("option");
      opt.text = this.pad(i, 2);
      if (i === currentmonth) {
         opt.selected = true;
      }
      sel.add(opt);
   }
   return sel;
}

Picker.prototype.dayPicker = function() {
   var sel = document.createElement("select");
   var currentday = new Date().getDate();
   for (i = 1; i <= 31; ++i) {
      var opt = document.createElement("option");
      opt.text = this.pad(i, 2);
      if (i === currentday) {
         opt.selected = true;
      }
      sel.add(opt);
   }
   return sel;
}

Picker.prototype.okButton = function() {
   var btn = document.createElement("button");
   btn.appendChild(document.createTextNode("ok"));
   var picker = this;
   var cb = this.cb;
   btn.onclick=function(evt) {
      picker.okClicked = true;
      if (cb !== null) {
         cb(picker);
      }
      var p = picker.div.parentElement;
      p.removeChild(picker.div);
   };
   return btn;
}

Picker.prototype.cancelButton = function() {
   var btn = document.createElement("button");
   btn.appendChild(document.createTextNode("no"));
   var picker = this;
   btn.onclick = function(evt) {
      var p = picker.div.parentElement;
      p.removeChild(picker.div);
   }
   return btn;
}

Picker.prototype.GetYear = function() {
   if (this.year !== null) {
      return this.year.value;
   }
}

Picker.prototype.GetMonth = function() {
   if (this.month !== null) {
      return this.month.value;
   }
}

Picker.prototype.GetDay = function() {
   if (this.day !== null) {
      return this.day.value;
   }
}

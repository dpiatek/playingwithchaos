(function() {
  this.chaos = {
    init: function() {
      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");
      return this.setSize(window.innerWidth, window.innerHeight);
    },
    setSize: function(width, height) {
      this.width = this.canvas.width = width;
      return this.height = this.canvas.height = height;
    },
    clear: function(color) {
      if (color) {
        this.context.fillStyle = color;
        return this.context.fillRect(0, 0, this.width, this.height);
      } else {
        return this.context.clearRect(0, 0, this.width, this.height);
      }
    },
    popImage: function() {
      var src, win;
      win = window.open("", "CanvasImage");
      src = this.canvas.toDataURL("image/png");
      win.document.write("<img src=" + src + " width=" + this.width + " height=" + this.height + "/>");
      return void 0;
    }
  };

}).call(this);

//# sourceMappingURL=../../projects/sierpinski/sierpinski.js.map

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

  this.onload = function() {
    var draw, init;
    init = function() {
      chaos.init();
      return document.body.addEventListener("keyup", function(event) {
        switch (event.keyCode) {
          case 32:
            return draw();
          case 80:
            return chaos.popImage();
        }
      });
    };
    draw = function() {
      var b, g, h, r, w, x, y, _ref, _ref1, _ref2;
      _ref = [Math.random() * chaos.width, Math.random() * chaos.height], x = _ref[0], y = _ref[1];
      _ref1 = (function() {
        return [0, 0].map(function() {
          return 20 + Math.random() * 100;
        });
      })(), w = _ref1[0], h = _ref1[1];
      _ref2 = (function() {
        return [0, 0, 0].map(function() {
          return Math.floor(Math.random() * 256);
        });
      })(), r = _ref2[0], g = _ref2[1], b = _ref2[2];
      chaos.context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      return chaos.context.fillRect(x, y, w, h);
    };
    return init();
  };

}).call(this);

//# sourceMappingURL=../js/main.js.map

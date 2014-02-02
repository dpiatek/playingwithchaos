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
    var draw, drawTriangle, init, maxDepth;
    maxDepth = 0;
    init = function() {
      chaos.init();
      draw();
      return document.body.addEventListener("keyup", function(event) {
        switch (event.keyCode) {
          case 32:
            maxDepth += 1;
            return draw();
          case 80:
            return chaos.popImage();
        }
      });
    };
    draw = function() {
      chaos.clear();
      chaos.context.save();
      chaos.context.translate(chaos.width * 0.5, chaos.height * 0.6);
      chaos.context.scale(chaos.height * 0.5, chaos.height * 0.5);
      drawTriangle(maxDepth);
      return chaos.context.restore();
    };
    drawTriangle = function(depth) {
      var angle;
      angle = -Math.PI / 2;
      if (depth === 0) {
        chaos.context.beginPath();
        chaos.context.moveTo(Math.cos(angle), Math.sin(angle));
        angle += Math.PI * 2 / 3;
        chaos.context.lineTo(Math.cos(angle), Math.sin(angle));
        angle += Math.PI * 2 / 3;
        chaos.context.lineTo(Math.cos(angle), Math.sin(angle));
        return chaos.context.fill();
      } else {
        chaos.context.save();
        chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
        chaos.context.scale(0.5, 0.5);
        drawTriangle(depth - 1);
        chaos.context.restore();
        angle += Math.PI * 2 / 3;
        chaos.context.save();
        chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
        chaos.context.scale(0.5, 0.5);
        drawTriangle(depth - 1);
        chaos.context.restore();
        angle += Math.PI * 2 / 3;
        chaos.context.save();
        chaos.context.translate(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5);
        chaos.context.scale(0.5, 0.5);
        drawTriangle(depth - 1);
        return chaos.context.restore();
      }
    };
    return init();
  };

}).call(this);

//# sourceMappingURL=../../projects/sierpinski/sierpinski.js.map

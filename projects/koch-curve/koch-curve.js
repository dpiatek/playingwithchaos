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
    var draw, init, koch, maxDepth;
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
      var p0, p1, p2;
      p0 = {
        x: chaos.width * 0.32,
        y: chaos.height * 0.28
      };
      p1 = {
        x: chaos.width * 0.68,
        y: chaos.height * 0.28
      };
      p2 = {
        x: p1.x + Math.cos(Math.PI * 2 / 3) * (p1.x - p0.x),
        y: p1.y + Math.sin(Math.PI * 2 / 3) * (p1.x - p0.x)
      };
      chaos.clear();
      chaos.context.lineWidth = 2;
      koch(p0, p1, maxDepth);
      koch(p1, p2, maxDepth);
      return koch(p2, p0, maxDepth);
    };
    koch = function(p0, p1, depth) {
      var angle, dist, dx, dy, pa, pb, pc, unit;
      dx = p1.x - p0.x;
      dy = p1.y - p0.y;
      dist = Math.sqrt(dx * dx + dy * dy);
      unit = dist / 3;
      angle = Math.atan2(dy, dx);
      pa = {
        x: p0.x + (Math.cos(angle)) * unit,
        y: p0.y + (Math.sin(angle)) * unit
      };
      pb = {
        x: pa.x + (Math.cos(angle - Math.PI / 3)) * unit,
        y: pa.y + (Math.sin(angle - Math.PI / 3)) * unit
      };
      pc = {
        x: p0.x + (Math.cos(angle)) * unit * 2,
        y: p0.y + (Math.sin(angle)) * unit * 2
      };
      if (depth === 0) {
        chaos.context.beginPath();
        chaos.context.moveTo(p0.x, p0.y);
        chaos.context.lineTo(pa.x, pa.y);
        chaos.context.lineTo(pb.x, pb.y);
        chaos.context.lineTo(pc.x, pc.y);
        chaos.context.lineTo(p1.x, p1.y);
        return chaos.context.stroke();
      } else {
        koch(p0, pa, depth - 1);
        koch(pa, pb, depth - 1);
        koch(pb, pc, depth - 1);
        return koch(pc, p1, depth - 1);
      }
    };
    return init();
  };

}).call(this);

//# sourceMappingURL=../../projects/koch-curve/koch-curve.js.map

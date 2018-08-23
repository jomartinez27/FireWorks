const canvas = document.getElementById("canvas");

const c = canvas.getContext('2d');

c.innerWidth = canvas.width;
c.innerHeight = canvas.height

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

const gravity = 0.08;

class Cannonball {
  constructor(x, y, dx, dy, radius, color, cannon, particleColors) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = -dy;
    this.radius = radius;
    this.color = color;
    this.particleColors = particleColors;
    this.source = cannon;
    this.timeToLive = canvas.height / (canvas.height + 800);

    this.init = function () {
      this.x = Math.cos(this.source.angle) * this.source.width;
      this.y = Math.sin(this.source.angle) * this.source.width;
      this.x = this.x + (canvas.width / 2);
      this.y = this.y + (canvas.height);

      if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
        this.dx = -this.dx;
      }

      this.dy = Math.sin(this.source.angle) * 10;
      this.dx = Math.cos(this.source.angle) * 8;
    }

    this.update = function () {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy;
      } else {
        this.dy += gravity;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();

      this.timeToLive -= 0.01;
    }

    this.draw = function () {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }

    this.init();
  }
}
//OVER

export default Cannonball;

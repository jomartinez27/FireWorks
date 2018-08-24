const canvas = document.getElementById("canvas");

const c = canvas.getContext('2d');

c.innerWidth = canvas.width;
c.innerHeight = canvas.height

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

const gravity = 0.08;

function Cannonball(x, y, dx, dy, radius, color, cannon, particleColors) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = -dy;
  this.radius = radius;
  this.color = color;
  this.particleColors = particleColors;
  this.source = cannon;
  this.timeToLive = canvas.height / (canvas.height + 600);

  this.init = function() {
    this.x = Math.cos(this.source.angle) * this.source.width;
    this.y = Math.sin(this.source.angle) * this.source.width;

    this.x = this.x + (canvas.width / 2);
    this.y = this.y + (canvas.height);
    if (mouse.x - canvas.width / 2 < 0) {
      this.dx = -this.dx;
    }

    this.dy = Math.sin(this.source.angle) * 8;
    this.dx = Math.cos(this.source.angle) * 8;
  };

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();

    this.timeToLive -= 0.01;
  };

  this.draw = function() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 5;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  };

  this.init();
}

export default Cannonball;

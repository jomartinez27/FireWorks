const canvas = document.getElementById("canvas");
const c = canvas.getContext('2d');

function Particle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = -dy;
  this.radius = radius;
  this.color = color;
  this.timeToLive = 1.5;

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius + this.dy < 0) {
      this.dy = -this.dy;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();

    this.timeToLive -= 0.01;
  };

  this.draw = function() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, 7, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    c.closePath();

    c.restore();
  };
}


export default Particle;

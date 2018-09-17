const canvas = document.getElementById("canvas");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 100;


let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener("mousemove", e => {
  let rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

var desiredAngle = 0;

function Cannon(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = 0;
  this.color = color;

  this.update = function() {
    desiredAngle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
    this.angle = desiredAngle;
    this.draw();
  };

  this.draw = function() {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.beginPath();
    c.fillStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 3;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillRect(0, -this.height / 2, this.width, height);
    c.closePath();
    c.restore();
  };
}

export default Cannon;

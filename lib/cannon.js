const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

let isMouseDown = false;

window.addEventListener('mouseup', () => {
  isMouseDown = false;
})

window.addEventListener('mousedown', () => {
  isMouseDown = true;
})

class Cannon {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.angle = 0;

    this.update = function () {
      let desiredAngle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
      this.angle = desiredAngle;
      this.draw();
    }

    this.draw = function () {
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
    }
  }
}

let cannon;
function init() {
  cannon = new Cannon(200, 200, 10, 30, 'red')
}

function animate() {
  requestAnimationFrame(animate);
  cannon.update();
}

init();
animate();

export default Cannon;

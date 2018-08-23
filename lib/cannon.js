const canvas = document.getElementById("canvas");
const c = canvas.getContext('2d');


let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
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
      c.fillRect(0, -this.height / 2, this.width, height);
      c.closePath();
      c.restore();
    }
  }
}

export default Cannon;

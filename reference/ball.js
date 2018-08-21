const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 39) {
    circle.x += 1
  } else if (e.keyCode === 38) {
    circle.x -= 1;
  }
})

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = "green";
      c.fill();
    }

    this.update = function () {
    }
  }
}

let circle;
function init() {
  circle = new Circle(100, 100, 30)
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = '#F00';
  circle.draw();
}

init();
animate();

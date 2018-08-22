import Cannon from './cannon.js'
import Cannonball from './cannonball.js';
import Particle from './particle.js';
import Circle from './circle.js';
import Explosion from './explosion.js';

const canvas = document.getElementById("canvas");

const c = canvas.getContext('2d');

let mouse = {
  x: undefined,
  y: undefined
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

let isMouseDown = false;

// window.addEventListener('mousemove', (e) => {
//   mouse.x = e.offsetX;
//   mouse.y = e.offsetY;
// })

let pressed = false;
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    pressed = true;
  }
})

window.addEventListener('click', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
})

const gravity = 0.08;
let desiredAngle = 0;
let cannon, cannonballs, explosions, colors, circle;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 40, 20, 'white');

  cannonballs = [];
  explosions = [];
  colors = {
      cannonballColor: [
        "#CEC721",
        "#D88A25",
        "#C12929",
        "#7A1FD8",
        "#2781CE"
      ],
      particleColors: [
        "#CEC721",
        "#D88A25",
        "#C12929",
        "#7A1FD8",
        "#2781CE"
      ]
    }

  circle = new Circle(10, 10, 5, "#CEC721")
}

initializeVariables();

let timer = 0;

function animate() {
  const anythingIdk = window.requestAnimationFrame(animate);
  c.fillStyle = "rgba(18, 18, 18, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height)

  cannon.update();
  // circle.x = mouse.x;
  // circle.y = mouse.y;
  // circle.draw();

  for (let i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();


    if (cannonballs[i].timeToLive <= 0) {
      explosions.push(new Explosion(cannonballs[i]));
      cannonballs.splice(i, 1);
    }
  }

  for (var j = 0; j < explosions.length; j++) {
    explosions[j].upate();
    let particle = explosions[j].particles[0];

    if (getDistance(particle.x, particle.y, mouse.x, mouse.y) < particle.radius + 5) {
      console.log("SCORE")
      window.cancelAnimationFrame(anythingIdk)
    }

    if (explosions[j].particles.length <= 0) {
      explosions.splice(j, 1);
    }
  }

  if (pressed === true) {
    timer += 1;
    if (timer % 3 === 0) {
      let randomParticleColorIndex = Math.floor(Math.random() * colors.length);
      let randomColors = colors;
      let randomCannonballColor = colors.cannonballColor[Math.floor(Math.random() * 5)]

      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 10, randomCannonballColor, cannon, randomColors.particleColors[randomParticleColorIndex]));
      pressed = false;
    }
  }
}

animate();

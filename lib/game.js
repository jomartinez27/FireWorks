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

window.addEventListener('mousemove', (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
})

window.addEventListener('mouseup', () => {
  isMouseDown = false;
})

window.addEventListener('mousedown', () => {
  isMouseDown = true;
})

let pressed = false;
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    pressed = true;
  }
})

window.addEventListener('click', (e) => {
  console.log(e)
  mouse.x = e.x;
  mouse.y = e.y;
})

let cannon, cannonballs, explosions, colors, circle;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 40, 20, 'white');

  cannonballs = [];
  explosions = [];
  colors = [
    {
      cannonballColor: '#FFF',
      particleColors: [
        "#CEC721",
        "#D88A25",
        "#C12929",
        "#7A1FD8",
        "#2781CE"
      ]
    }
  ];

  circle = new Circle(mouse.x, mouse.y, 20, 'white')
}

initializeVariables();

let timer = 0;

function animate() {
  window.requestAnimationFrame(animate);

  let img = document.getElementById('img')
  let velocity = 100;
  let distance = 0;

  c.drawImage(img, 0, 0)

  cannon.update();
  circle.x = mouse.x;
  circle.y = mouse.y;
  circle.update();

  for (let i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();

    if (cannonballs[i].timeToLive >= 0) {
      distance += Math.abs(cannonballs[i].dy);
      c.translate(0, distance);
      c.drawImage(img, 0, 0);
      c.drawImage(img, 0, -img.height+1);
      cannonballs[i].update();
    }

    if (cannonballs[i].timeToLive <= 0) {
      explosions.push(new Explosion(cannonballs[i]));
      cannonballs.splice(i, 1);
    }
  }

  for (var j = 0; j < explosions.length; j++) {
    explosions[j].upate();
    let particle = explosions[j].particles[0];

    if (getDistance(particle.x, particle.y, mouse.x, mouse.y) < particle.radius + circle.radius) {
      particle.timeToLive += 1;
      particle.dy = 5;
    } else {
      return null;
    }

    if (explosions[j].particles.length <= 0) {
      explosions.splice(j, 1);
    }
  }

  if (pressed === true) {
    timer += 1;
    if (timer % 3 === 0) {
      let randomParticleColorIndex = Math.floor(Math.random() * colors.length);
      let randomColors = colors[randomParticleColorIndex];

      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 10, randomColors.particleColors[randomParticleColorIndex], cannon, randomColors.particleColors));
      pressed = false;
    }
  }
}

animate();

import Cannon from './cannon.js'
import Cannonball from './cannonball.js';
import Particle from './particle.js';
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

canvas.addEventListener("touchmove", function(event) {
  event.preventDefault();
  mouse.x = event.touches[0].pageX;
  mouse.y = event.touches[0].pageY;
});

let pressed = false;
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    pressed = true;
  }
})

canvas.addEventListener("touchend", function() {
  pressed = false;
});

window.addEventListener('mousedown', (e) => {
  let rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

let cannon, cannonballs, explosions, colors, circle, cannonSound, cannonball, points;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 40, 20, 'white');

  cannonballs = [];
  explosions = [];
  colors = [
    {
      cannonballColor: "#fff",
      particleColors: [
        "#ff4747",
        "#00ceed",
        "#fff",
      ]
    }

  ];
}

initializeVariables();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "rgba(18, 18, 18, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  cannon.update();

  var randomParticleColorIndex = Math.floor(Math.random() * colors.length);
  var randomColors = colors[randomParticleColorIndex];

  cannonball = new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomColors.cannonballColor, cannon, randomColors.particleColors);

  for (let i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();

    if (cannonballs[i].timeToLive <= 0) {
      explosions.push(new Explosion(cannonballs[i]));
      cannonballs.splice(i, 1);
    }
  }

  for (var j = 0; j < explosions.length; j++) {
        //Do something
        explosions[j].update();

      // Remove explosions from scene once all associated particles are removed
      if (explosions[j].particles.length <= 0) {
        explosions.splice(j, 1);
      }
  }

  if (pressed === true) {
    cannonballs.push(cannonball)
    pressed = false;
  }
}

animate();

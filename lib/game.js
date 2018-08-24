import Cannon from './cannon.js'
import Cannonball from './cannonball.js';
import Particle from './particle.js';
import Explosion from './explosion.js';

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 100;
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
  let rect = canvas.getBoundingClientRect();
  event.preventDefault();
  mouse.x = event.touches[0].clientX - rect.left;
  mouse.y = event.touches[0].clientY - rect.top;
});

let pressed = false;
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    pressed = true;
  }
})

canvas.addEventListener("touchend", function() {
  pressed = true;
});

window.addEventListener('mousedown', (e) => {
  let rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

let cannon, cannonballs, explosions, colors, circle, cannonSound, cannonball, points, highScore;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 50, 30, 'white');

  cannonballs = [];
  explosions = [];
  colors = {
      cannonballColor: [
        "#CEC721",
        "#D88A25",
        "#C12929",
        "#7A1FD8",
        "#2781CE",
        "#FFAC00",
        "#9C081C",
        "#FF002F",
        "#150063",
        "#0A02B8",
        "#FF0D6B",
        "#E80CD0",
        "#C800FF",
        "#7C0CE8",
        "#460DFF",
        "#FFF"
      ],
      particleColors: [
        "#CEC721",
        "#D88A25",
        "#C12929",
        "#7A1FD8",
        "#2781CE",
        "#FFAC00",
        "#9C081C",
        "#FF002F",
        "#150063",
        "#0A02B8",
        "#FF0D6B",
        "#E80CD0",
        "#C800FF",
        "#7C0CE8",
        "#460DFF",
        "#FFF"
      ]
    }


    cannonSound = document.getElementById('cannon-shot')
    points = 0;
    highScore = 0;
}

initializeVariables();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "rgba(18, 18, 18, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "40px 'Fredoka One', serif";
  c.fillStyle = '#FFF'
  c.fillText("FireWorks", canvas.width / 2 - 80, 65)

  c.font = "20px 'Fredoka One', serif"
  c.fillStyle = '#FFF';
  c.fillText("Points " + points, canvas.width / 2 + 350, 60)

  c.font = "20px 'Fredoka One', serif"
  c.fillStyle = '#FFF';
  c.fillText("High Score " + highScore, 200, 60)
  cannon.update();
  let sound = document.getElementById('cannon-shot');

  let randomParticleColorIndex = Math.floor(Math.random() * colors.length);
  let randomColors = colors;
  let randomCannonballColor = colors.cannonballColor[Math.floor(Math.random() * 5)]
  cannonball = new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomCannonballColor, cannon, randomColors.particleColors[randomParticleColorIndex])

  for (let i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();

    if (cannonballs[i].timeToLive <= 0) {
      explosions.push(new Explosion(cannonballs[i]));
      cannonballs.splice(i, 1);
    }
  }

  for (var j = 0; j < explosions.length; j++) {
    explosions[j].upate();
    let particle = explosions[j].particles[2] || new Particle();
    let x1 = particle.x || 0;
    let y1 = particle.y || 0;
    particle.color = cannonball.color

    if (explosions[j].particles.length <= 0) {
      explosions.splice(j, 1);
    }

    if (getDistance(x1, y1, mouse.x, mouse.y) < 10) {
      particle.timeToLive = 0
      cannonballs.push(cannonball);
      points += 1
      sound.playbackRate = 1.3;
      sound.play();
    }

    if (highScore < points) {
      highScore = points
    } else {
      highScore = highScore
    }
  }

  if (pressed === true) {
    points = 0;
    sound.playbackRate = 1.3;
    sound.play();
    cannonballs.push(cannonball)
    pressed = false;
  }
}

animate();

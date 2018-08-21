import Cannon from './cannon.js'
import Cannonball from './cannonball.js';

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

let isMouseDown = false;

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})

window.addEventListener('mouseup', () => {
  isMouseDown = false;
})

window.addEventListener('mousedown', () => {
  isMouseDown = true;
})

class Particle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = -dy;
    this.radius = 5;
    this.color = color;
    this.timeToLive = 1;

    this.update = function () {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy;
      }

      if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
        this.dx = -this.dx;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();

      this.timeToLive -= 0.01;
    }

    this.draw = function () {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
      c.shadowColor = this.color;
      c.shadowBlur = 10;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillStyle = this.color;
      c.fill();

      c.closePath();
      c.restore;
    }
  }
}

class Explosion {
  constructor(cannonball) {
    this.particles = [];
    this.rings = [];
    this.source = cannonball;

    this.init = function () {
      for (let i = 0; i < 100; i++) {

        let dx = (Math.random() * 6) - 3;
        let dy = (Math.random() * 6) - 3;

        let randomColorIndex = Math.floor(Math.random() * this.source.particleColors.length);
        let randomParticleColor = this.source.particleColors[randomColorIndex];

        this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, randomParticleColor));
      }

    }
    this.init();

    this.upate = function () {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();

        if (this.particles[i].timeToLive < 0) {
          this.particles.splice(i, 1);
        }
      }

      for (let j = 0; j < this.rings.length; j++) {
        this.rings[j].update();

        if (this.rings[j].timeToLive < 0) {
          this.rings.splice(i, 1);
        }
      }
    }
  }
}

const gravity = 0.08;
let desiredAngle = 0;
let cannon, cannonballs, explosions, colors;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 30, 20, 'white');

  cannonballs = [];
  explosions = [];
  colors = [
    {
      cannonballColor: '#FFF',
      particleColors: [
        "#F44064",
        "#F00"
      ]
    }
  ];
}

initializeVariables();

let timer = 0;

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = '#000';
  c.fillRect(0, 0, canvas.width, canvas.height);
  cannon.update();

  for (let i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();

    if (cannonballs[i].timeToLive <= 0) {
      explosions.push(new Explosion(cannonballs[i]));
      cannonballs.splice(i, 1);
    }
  }

  for (var j = 0; j < explosions.length; j++) {
    explosions[j].upate();

    if (explosions[j].particles.length <= 0) {
      explosions.splice(j, 1);
    }
  }

  if (isMouseDown === true) {
    timer += 1;
    if (timer % 3 === 0) {
      let randomParticleColorIndex = Math.floor(Math.random() * colors.length);
      let randomColors = colors[randomParticleColorIndex];

      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomColors.cannonballColor, cannon, randomColors.particleColors));
    }
  }
}

animate();

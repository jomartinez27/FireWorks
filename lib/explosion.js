// Cannon
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
//OVER


// Cannonball
class Cannonball {
  constructor(x, y, dx, dy, radius, color, cannon, particleColors) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = -dy;
    this.radius = radius;
    this.color = color;
    this.particleColors = particleColors;
    this.source = cannon;
    this.timeToLive = canvas.height / (canvas.height + 800);

    this.init = function () {
      this.x = Math.cos(this.source.angle) * this.source.width;
      this.y = Math.sin(this.source.angle) * this.source.width;
      this.x = this.x + (canvas.width / 2);
      this.y = this.y + (canvas.height);

      if (mouse.x - canvas.width / 2 < 0) {
        this.dx = -this.dx;
      }

      this.dy = Math.sin(this.source.angle) * 8;
      this.dx = Math.cos(this.source.angle) * 8;
    }

    this.update = function () {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy;
      } else {
        this.dy += gravity;
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
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.shadowColor = this.color;
      c.shadowBlur = 5;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }

    this.init();
  }
}
//OVER


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
      for (let i = 0; i < 10; i++) {

        let dx = (Math.random() * 6) - 3;
        let dy = (Math.random() * 6) - 3;

        let randomColorIndex = Math.floor(Math.random() * this.source.particleColors.length);
        let randomParticleColor = this.source.particleColors[randomColorIndex];

        this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, randomParticleColor));
      }

    }
    this.init();

    this.update = function () {
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
let cannon, cannonballs, explosion, colors;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 20, 10, 'white');

  cannonballs = [];
  explosions = [];
  colors = [
    {
      cannonballColor: '#FFF',
      particleColors: [
        'F00',
        '0F0',
        '00F'
      ]
    }
  ]
}

initializeVariables();

let timer = 0;

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = 'rgba(18, 18, 18, 0.2)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  cannon.update();

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

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

var isMouseDown = false;

window.addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("resize", function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  initializeVariables();
});


window.addEventListener("mousedown", function() {
  isMouseDown = true;
});

window.addEventListener("mouseup", function() {
  isMouseDown = false;
});

canvas.addEventListener("touchstart", function() {
  isMouseDown = true;
});

canvas.addEventListener("touchmove", function(event) {
  event.preventDefault();
  mouse.x = event.touches[0].pageX;
  mouse.y = event.touches[0].pageY;
});

canvas.addEventListener("touchend", function() {
  isMouseDown = false;
});


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

function Cannonball(x, y, dx, dy, radius, color, cannon, particleColors) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = -dy;
  this.radius = radius;
  this.color = color;
  this.particleColors = particleColors;
  this.source = cannon;
  this.timeToLive = canvas.height / (canvas.height + 800);

  this.init = function() {
    // Initialize the cannonballs start coordinates (from muzzle of cannon)
    this.x = Math.cos(this.source.angle) * this.source.width;
    this.y = Math.sin(this.source.angle) * this.source.width;

    // Translate relative to canvas positioning
    this.x = this.x + (canvas.width / 2);
    this.y = this.y + (canvas.height);

    // Determine whether the cannonball should be
    // fired to the left or right of the cannon
    if (mouse.x - canvas.width / 2 < 0) {
      this.dx = -this.dx;
    }

    this.dy = Math.sin(this.source.angle) * 8;
    this.dx = Math.cos(this.source.angle) * 8;
  };

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();

    this.timeToLive -= 0.01;
  };

  this.draw = function() {
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
  };

  this.init();
}

function Particle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = -dy;
  this.radius = 5;
  this.color = color;
  this.timeToLive = 1;
  // this.mass = 0.2;

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }
    // this.dy += gravity * this.mass;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();

    this.timeToLive -= 0.01;
  };

  this.draw = function() {
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

    c.restore();
  };
}


function Explosion(cannonball) {
  this.particles = [];
  this.rings = [];
  this.source = cannonball;

  this.init = function() {
    for (var i = 0; i < 10; i++) {

      var dx = (Math.random() * 6) - 3;
      var dy = (Math.random() * 6) - 3;

      // var hue = (255 / 5) * i;
      // var color = "hsl(" + hue + ", 100%, 50%)";
      var randomColorIndex = Math.floor(Math.random() * this.source.particleColors.length);
      var randomParticleColor = this.source.particleColors[randomColorIndex];


        this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, randomParticleColor));
    }

    // Create ring once explosion is instantiated
      // this.rings.push(new Ring(this.source, "blue"));
  };

  this.init();

  this.update = function() {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();

        // Remove particles from scene one time to live is up
        if (this.particles[i].timeToLive < 0) {
          this.particles.splice(i, 1);
        }
    }

    // Render rings
    for (var j = 0; j < this.rings.length; j++) {
      this.rings[j].update();

      // Remove rings from scene one time to live is up
        if (this.rings[j].timeToLive < 0) {
          this.rings.splice(i, 1);
        }
    }
  };
}

var gravity = 0.08;
var desiredAngle = 0;
var cannon, cannonballs, explosions, colors;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 20, 10, "white");
  cannonballs = [];
  explosions = [];
  colors = [


    // Red / Orange
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

var timer = 0;
var isIntroComplete = false;
var introTimer = 0;


function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "rgba(18, 18, 18, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  cannon.update();

  if (isIntroComplete === false) {
    introTimer += 1;

    if (introTimer % 3 === 0) {
      var randomColor = Math.floor(Math.random() * colors.length);
      var color = colors[randomColor];

      cannonballs.push(new Cannonball(canvas.width / 2, canvas.height / 2, 2, 2, 4, color.cannonballColor, cannon, color.particleColors));
    }

    if (introTimer > 30) {
      isIntroComplete = true;
    }

  }


  // Render cannonballs
  for (var i = 0; i < cannonballs.length; i++) {
      cannonballs[i].update();

      if (cannonballs[i].timeToLive <= 0) {

        // Create particle explosion after time to live expires
        explosions.push(new Explosion(cannonballs[i]));

        cannonballs.splice(i, 1);

      }
  }

  // Render explosions
  for (var j = 0; j < explosions.length; j++) {
        //Do something
        explosions[j].update();

      // Remove explosions from scene once all associated particles are removed
      if (explosions[j].particles.length <= 0) {
        explosions.splice(j, 1);
      }
  }


  if (isMouseDown === true) {
    timer += 1;
    if (timer % 3 === 0) {
      var randomParticleColorIndex = Math.floor(Math.random() * colors.length);
      var randomColors = colors[randomParticleColorIndex];

      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomColors.cannonballColor, cannon, randomColors.particleColors));
    }
  }
}

animate();

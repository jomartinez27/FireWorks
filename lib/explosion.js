import Particle from './particle.js';

const canvas = document.getElementById("canvas");

const c = canvas.getContext('2d');

class Explosion {
  constructor(cannonball) {
    this.particles = [];
    this.rings = [];
    this.source = cannonball;

    this.init = function () {
      for (let i = 0; i < 15; i++) {

        let dx = (Math.random() * 8) - 3;
        let dy = (Math.random() * 8) - 3;
        let randomParticleColor = [
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
          "#460DFF"
              ];

        this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 5, randomParticleColor[i]));
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

export default Explosion

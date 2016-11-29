class Game {
  private particles: Particle[] = [];
  public rowSize: number;
  public width: number;

  constructor(rowSize: number) {
    this.rowSize = rowSize;
    this.width = rowSize;
  }

  addParticle(particle: Particle) {
    if (this.particles.length === this.rowSize) {
      throw new Error('Can not exceed grid size');
    }
    this.particles.push(particle);
  }

  updateParticles() {
    const lastStates = this.particles
      .map((particle) => particle.getState());

    this.particles.forEach((particle, index, arr) => {
      const leftSiblingIndex = index - 1 < 0 ? arr.length -1 : index - 1;
      const rightSiblingIndex = index + 1 === arr.length ? 0 : index + 1;
      particle.nextState(lastStates[leftSiblingIndex], lastStates[rightSiblingIndex]);
    });
  }

  getParticleStates() {
    return this.particles
      .map((particle) => particle.getState());
  }
}

class Particle {
  public x: number;
  private active: boolean;

  constructor(x: number) {
    this.x = x;
    this.active = Math.random() > 0.95;
  }

  getState() {
    return this.active;
  }

  nextState(a: boolean, b: boolean) {
    if (this.active === true) {
      if (a && b) {
        this.active = false;
      } else if ((a && !b) || (!a && b)) {
        this.active = true;
      } else if (!a && !b) {
        this.active = false;
      }
    } else {
      if (a && b) {
        this.active = false;
      } else if ((a && !b) || (!a && b)) {
        this.active = false;
      } else if (!a && !b) {
        this.active = true;
      }
    }

    return this.active;
  }
}

const game = new Game(151);

const particles = Array.apply(null, Array(game.rowSize)).map((_: any, index: number) => {
  return new Particle(index + 1);
})
.forEach((particle: Particle) => game.addParticle(particle));

function draw() {
  requestAnimationFrame(() => {
    draw();
    const rowElement = document.createElement('div');
    rowElement.className = 'row';

    game.updateParticles();

    game.getParticleStates()
      .forEach((state) => {
        const particleEle = document.createElement('div');
        particleEle.className = state ? 'active' : '';
        rowElement.appendChild(particleEle);
      });

    if (document.body.children.length > 102) {
      document.body.removeChild(document.body.children[1]);
    }

    document.body.appendChild(rowElement);
  });
}

draw();

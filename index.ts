class Game {
  private particles: Particle[];
  private gridSize: number;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
  }
}

class Particle {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

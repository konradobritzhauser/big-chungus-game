import Projectile from "./Projectiles.js";



export default class EnergyBall extends Projectile {
    constructor(game, x, y, speedX = 0, speedY = 0) {
      super(game, x, y);
      this.image = document.getElementById("energy-ball");
      this.animationSpeed = 0.1;
      this.imageWidth = 201;
      this.imageHeight = 220;
      this.maxFrame = 12;
      this.width = 201 * 0.2;
      this.height = 220 * 0.2;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  }
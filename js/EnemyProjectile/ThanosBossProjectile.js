import EnemyProjectile from "./EnemyProjectile.js";

export default class ThanosBossProjectile extends EnemyProjectile {
  constructor(game, x, y) {
    super(game);

    this.game = game;
    this.x = x;
    this.y = y;

    this.image = document.getElementById("rolling-energy-ball-left");
    this.imageReflected = document.getElementById("rolling-energy-ball-left");

    this.width = 296 * 0.2;
    this.height = 297 * 0.2;
    this.spriteWidth = 296;
    this.spriteHeight = 296;
    this.maxFrame = 120;
    this.animationSpeed = 1;
    this.damage = 2;
    this.speedX = -2;
  }
}



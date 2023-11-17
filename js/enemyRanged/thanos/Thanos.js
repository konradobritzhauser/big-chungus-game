import EnemyRanged from "../EnemyRanged.js";



class Thanos extends EnemyRanged {
    constructor(game) {
      super(game);
      this.game = game;

      this.speedX = Math.random() * -1 - 0.5;
      this.speedY = Math.random() < 0.5 ? 0.3 : -0.3;

      this.lives = 5;
      this.score = this.lives;

      this.projectileImage = document.getElementById(
        "rolling-energy-ball-left"
      );
      this.projectileImageWidth = 296 * 0.2;
      this.projectileImageHeight = 297 * 0.2;
      this.projectileSpriteWidth = 296;
      this.projectileSpriteHeight = 296;
      this.projectileMaxFrame = 120;
      this.projectileAnimationSpeed = 1;
    }
  }
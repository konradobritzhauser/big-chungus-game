import EnemyRanged from "./EnemyRanged.js";


export default class ElmerFudd extends EnemyRanged {
    constructor(game) {
      super(game);
      this.game = game;

      this.speedX = Math.random() * -1 - 0.5;
      this.speedY = Math.random() < 0.5 ? 0.3 : -0.3;

      this.lives = 5;
      this.score = this.lives;

      this.projectileImage = document.getElementById("bullet-cartoon");
      this.projectileImageReflected = document.getElementById(
        "bullet-cartoon-right"
      );
      this.projectileImageWidth = 960 * 0.2;
      this.projectileImageHeight = 300 * 0.2;
      this.projectileSpriteWidth = 960;
      this.projectileSpriteHeight = 300;
      this.projectileMaxFrame = 120;
      this.projectileAnimationSpeed = 1;

      this.width = 233 * 0.8;
      this.height = 314 * 0.8;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.image = document.getElementById("elmer-fudd");
      this.imageWidth = 233;
      this.imageHeight = 314;
      this.maxFrame = 20;
      this.animationSpeed = 0.1;
      this.isAnimated = false;
    }
  }
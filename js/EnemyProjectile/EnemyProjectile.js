export default class EnemyProjectile {
    constructor(
      game,
      x,
      y,
      image,
      width,
      height,
      spriteWidth,
      spriteHeight,
      maxFrame,
      animationSpeed,
      imageReflected,
      projectileDamage
    ) {
      this.game = game;
      this.x = x;
      this.y = y;

      // this.speed = 3;
      this.markedForDeletion = false;

      this.frameX = 0;
      this.frameY = 0;

      this.image = image;
      this.maxFrame = 5;
      this.animationSpeed = animationSpeed;
      this.width = width;
      this.height = height;
      this.spriteWidth = spriteWidth;
      this.spriteHeight = spriteHeight;
      this.maxFrame = maxFrame;
      this.speedX = 0;//should be determined by subclass

      //reflected properties
      this.reflected = false;
      this.imageReflected = imageReflected;
      this.damage=0//should be determined by subclass
    }
    update() {
      this.x += this.speedX;

      if (this.x < 0) this.markedForDeletion = true;
      if (this.reflected) this.image = this.imageReflected;
    }

    draw(context) {
      // context.fillStyle = "yellow";
      // console.log('this', this)
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.spriteWidth,
        Math.floor(this.frameY) * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //animate sprite
      // if (this.frameX < this.maxFrame) {
      //   this.frameX += 1 * this.animationSpeed;
      // } else this.frameX = 0;
    }
  }
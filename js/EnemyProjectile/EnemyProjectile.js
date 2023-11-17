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
      imageReflected
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
      this.imageWidth = spriteWidth;
      this.imageHeight = spriteHeight;
      this.maxFrame = maxFrame;
      this.speed = -2;

      //reflected properties
      this.reflected = false;
      this.imageReflected = imageReflected;
    }
    update() {
      this.x += this.speed;

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
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
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
export default class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;

      // this.speed = 3;
      this.markedForDeletion = false;

      this.frameX = 0;
      this.frameY = 0;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > this.game.width * 0.95) this.markedForDeletion = true;
    }

    draw(context) {
      // context.fillStyle = "yellow";
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
      if (this.frameX < this.maxFrame) {
        this.frameX += 1 * this.animationSpeed;
      } else this.frameX = 0;

      context.save();
      //   context.font = "48px serif";
      //     context.fillText('COCK!!!!!   8::::::::::::)~~~~~~~~~~~   ',this.x, this.y);
      context.restore();
    }
  }
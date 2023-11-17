export default class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      // this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
      this.frameX = 0;
      this.frameY = 0;
    }

    update() {
      this.x += this.speedX;
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }

      //sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX += 1 * this.animationSpeed;
      } else {
        this.frameX = 0;
      }
    }
    draw(context) {
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

      //ENEMY LIFE TEXT
      context.fillStyle = "black";
      context.font = "20px Helve";
      // context.fillText(this.lives, this.x, this.y);
    }
  }
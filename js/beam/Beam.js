export default class Beam {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById("laser-red");

      this.imageWidth = 960;
      this.imageHeight = 300;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 67;
      this.damagePerFrame = 0.05;

      this.width = this.game.width;
      this.height = 50;
      this.animationSpeed = 1;
    }

    update() {
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
    }
  }
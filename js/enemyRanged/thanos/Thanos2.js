class Thanos2 extends Thanos {
    constructor(game) {
      super(game);
      this.width = 498 * 0.5;
      this.height = 280 * 0.5;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.image = document.getElementById("thanos2");
      this.imageWidth = 498;
      this.imageHeight = 280;
      this.maxFrame = 379;
      this.animationSpeed = 0.5;
    }
  }
class Thanos1 extends Thanos {
    constructor(game) {
      super(game);
      this.width = 466 * 0.3;
      this.height = 498 * 0.3;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.image = document.getElementById("thanos1");
      this.imageWidth = 466;
      this.imageHeight = 498;
      this.maxFrame = 20;
      this.animationSpeed = 0.1;
    }
  }
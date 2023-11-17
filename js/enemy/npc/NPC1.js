import NPC from "./NPC.js";


export default class NPC1 extends NPC {
    constructor(game) {
      super(game);
      this.width = 296 * 0.5;
      this.height = 360 * 0.5;

      this.speedX = Math.random() * -1 - 0.5;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.lives = 2;
      this.score = this.lives;

      this.image = document.getElementById("npc1");
      this.imageWidth = 296;
      this.imageHeight = 360;
      this.maxFrame = 2;
      this.animationSpeed = 0.005;
    }
  }
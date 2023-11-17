import NPC from "./NPC.js";


export default class NPC2 extends NPC {
    constructor(game) {
      super(game);
      this.width = 500 * 0.6;
      this.height = 303 * 0.6;

      this.speedX = Math.random() * -1.5 - 0.5;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.lives = 3;
      this.score = this.lives;

      this.image = document.getElementById("npc2");
      this.imageWidth = 500;
      this.imageHeight = 303;
      this.maxFrame = 80;
      this.animationSpeed = 0.1;
    }
  }
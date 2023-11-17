import { ENEMY_TYPE } from "../constants/enemyTypes.js";
import Enemy from "./Enemy.js";


export default class Carrot extends Enemy {
    constructor(game) {
      super(game);
      this.game = game;
      this.width = 480 * 0.2;
      this.height = 480 * 0.2;

      this.speedX = Math.random() * -1 - 0.5;
      this.y = this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.lives = 3;
      this.score = 15;

      this.image = document.getElementById("carrot");
      this.imageWidth = 480;
      this.imageHeight = 480;
      this.maxFrame = 6;
      this.animationSpeed = 0.3;

      this.type = ENEMY_TYPE.CARROT;
    }
  }
import Enemy from "../Enemy.js";


export default class NPC extends Enemy {
    constructor(game) {
      super(game);
      this.game = game;
    }
  }
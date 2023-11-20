import Carrot from "../enemy/Carrot.js";
import NPC1 from "../enemy/npc/NPC1.js";
import NPC2 from "../enemy/npc/NPC2.js";
import ElmerFudd from "../enemyRanged/ElmerFudd.js";
import ThanosBoss from "../enemyRanged/ThanosBoss.js";
import InGame from "./InGame.js";


export default class Level1 extends InGame {

  constructor(game,width,height) {
    super(game,width,height)
    this.game = game;
    this.level = 1;
  }
  // Minute

  addEnemy() {
    // 0-2 minutes
    let randomize = Math.random();

    if (this.gameTime <= 120 * 1000) {
      if (randomize < 0.15) this.enemies.push(new Carrot(this));
      else if (randomize < 0.5) this.enemies.push(new NPC2(this));
      else this.enemies.push(new NPC1(this));
    } else if (this.gameTime <= 240 * 1000) {
      // 2-4 minutes
      if (randomize < 0.15) this.enemies.push(new Carrot(this));
      else if (randomize < 0.2) this.enemies.push(new ElmerFudd(this));
      else if (randomize < 0.7) this.enemies.push(new NPC2(this));
      else this.enemies.push(new NPC1(this));
    } else if (this.gameTime <= 360 * 1000) {
      // 4-6 minutes
      if (randomize < 0.15) this.enemies.push(new Carrot(this));
      else if (randomize < 0.3) this.enemies.push(new ElmerFudd(this));
      else if (randomize < 0.8) this.enemies.push(new NPC2(this));
      else this.enemies.push(new NPC1(this));
    } else {
      // 6+ minutes// bring out boss
      if (randomize < 0.40) this.enemies.push(new Carrot(this));
      else if (randomize < 0.6) this.enemies.push(new ElmerFudd(this));
      else if (randomize < 0.85) this.enemies.push(new NPC2(this));
      else this.enemies.push(new NPC1(this));
    }
  }
  spawnBoss() {
    this.game.inGame.enemies.push(new ThanosBoss(this.outerGame));
  }
}

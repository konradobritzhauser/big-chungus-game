import { ENEMY_TYPE } from "../constants/enemyTypes.js";
import TouchControlsAbilities from "../controls/TouchControlsAbilities.js";
import TouchControlsMovement from "../controls/TouchControlsMovement.js";
import Carrot from "../enemy/Carrot.js";
import NPC1 from "../enemy/npc/NPC1.js";
import NPC2 from "../enemy/npc/NPC2.js";
import ElmerFudd from "../enemyRanged/ElmerFudd.js";
import InputHandler from "../inputHandler/InputHandler.js";
import Player from "../player/Player.js";
import UI from "../ui/UI.js";
export default class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];

      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;

      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 500;

      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10000000000;

      this.gameTime = 0;
      this.timeLimit = 5000 * 500000000;

      this.debug = false;

      //manage paused
      this.paused = false;
      this.clickableElements = [];

      this.touchControlsMovement = new TouchControlsMovement(this);
      this.touchControlsAbilities = new TouchControlsAbilities(this);

      this.lastClickBox = { width: 20, height: 20, x: 0, y: 0 };

      this.reflectedProjectileSFX=document.getElementById("reflectProjectileSFX")
    }
    update(deltaTime) {
      //track game time
      if (!this.gameOver) this.gameTime += deltaTime;

      if (this.gameTime > this.timeLimit) this.gameOver = true;

      //update player
      this.player.update(deltaTime);

      //update ammo timer
      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) {
          this.ammo++;
          this.ammoTimer = 0;
        }
      } else {
        this.ammoTimer += deltaTime;
      }

      //update enemies
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);

        //check if hit player
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          if (enemy.type == ENEMY_TYPE.CARROT) {
            this.ammo += 10;
            this.player.chonkyMeter += 3;
            this.player.health += 1;
            document.getElementById("carrotSFX").play()
          } else {
            this.player.health -= 1;
          }
        }

        //CHECK IF HIT PROJECTILE
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            console.log("enemy collided with projectile");
            enemy.lives--;
            projectile.markedForDeletion = true;
          }
        });

        //check if hit beam
        if (this.player.beam && this.checkCollision(this.player.beam, enemy)) {
          enemy.lives -= this.player.beam.damagePerFrame;
        }

        if (enemy.lives <= 0) {
          enemy.markedForDeletion = true;
          if (this.gameOver == false) this.score += enemy.score;
          if (this.score >= this.winningScore) {
            this.gameOver = true;
          }
        }

        //check if reflected projectiles hit enemy
        if (enemy.projectiles) {
          enemy.projectiles.forEach((projectile) => {
            if (projectile.reflected) {
              this.enemies.forEach((enemy) => {
                if (this.checkCollision(enemy, projectile)) {
                  console.log("Reflected projectile hit enemy");
                  enemy.lives--;
                  projectile.markedForDeletion = true;
                }
              });
            }
          });
        }

        //check if enemy projectiles hit
        if (enemy.projectiles) {
          enemy.projectiles.forEach((projectile) => {
            if (this.checkCollision(this.player, projectile)) {
              console.log("player hit");
              projectile.markedForDeletion = true; //chungus hit
              this.player.health--;
            }

            //check if enemy projectile hits reverse
            if (
              this.player.reverseElem &&
              this.checkCollision(this.player.reverseElem, projectile)
            ) {
              console.log("Reverse reflected projectile");
              projectile.speed = Math.abs(projectile.speed);
              projectile.reflected = true;
              this.reflectedProjectileSFX.currentTime=0;
              this.reflectedProjectileSFX.play()
            }
          });

          //delete enemy projectiles
          enemy.projectiles = enemy.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
          );
        }
      });

      //UPDATE CONTROLS
      this.touchControlsMovement.update();

      //delete enemies
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      this.ui.draw(context);

      this.player.draw(context);

      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });

      //Draw player projectiles
      this.player.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });

      //Render projectiles after the enemies
      this.enemies.forEach((enemy) => {
        if (enemy.projectiles) {
          enemy.projectiles.forEach((projectile) => {
            projectile.draw(context);
          });
        }
      });

      this.touchControlsMovement.draw(context);
      this.touchControlsAbilities.draw(context);
      //last click box

      context.fillRect(
        this.lastClickBox.x,
        this.lastClickBox.y,
        this.lastClickBox.width,
        this.lastClickBox.height
      );

      //TEST CLICK BOX
      // this.clickBox = { width: 200, height: 200, x: 200, y: 200 };
      // context.fillRect(
      //   this.clickBox.x,
      //   this.clickBox.y,
      //   this.clickBox.width,
      //   this.clickBox.height
      // );
    }

    addEnemy() {
      let randomize = Math.random();
      if (randomize < 0.15) this.enemies.push(new Carrot(this));
      if (randomize < 0.2) this.enemies.push(new ElmerFudd(this));
      // if (randomize < 0.35) this.enemies.push(new Thanos2(this));
      else if (randomize < 0.7) this.enemies.push(new NPC2(this));
      else this.enemies.push(new NPC1(this));
      // console.log('this.enemies', this.enemies)
    }

    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    }
  }
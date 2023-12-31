import { ENEMY_TYPE } from "../constants/enemyTypes.js";
import TouchControlsAbilities from "../controls/TouchControlsAbilities.js";
import TouchControlsMovement from "../controls/TouchControlsMovement.js";
import Button from "../controls/button/Button.js";
import IconButton from "../controls/button/IconButton.js";
import TextButton from "../controls/button/TextButton.js";
import Carrot from "../enemy/Carrot.js";
import NPC1 from "../enemy/npc/NPC1.js";
import NPC2 from "../enemy/npc/NPC2.js";
import ElmerFudd from "../enemyRanged/ElmerFudd.js";
import ThanosBoss from "../enemyRanged/ThanosBoss.js";
import InputHandler from "../inputHandler/InputHandler.js";
import PauseScreen from "../pauseScreen/PauseScreen.js";
import Player from "../player/Player.js";
import UI from "../ui/UI.js";

export default class InGame {
  constructor(game, width, height) {
    this.width = width;
    this.height = height;
    this.ui = new UI(this);
    this.outerGame = game;
    this.player = new Player(this.outerGame);

    this.input = new InputHandler(this.outerGame);

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

    this.gameTime = 240*1000*0;
    this.timeLimit = 5000 * 500000000;

    this.debug = false;

    //manage paused
    this.paused = false;

    this.touchControlsMovement = new TouchControlsMovement(this);
    this.touchControlsAbilities = new TouchControlsAbilities(this);

    //pause btn
    this.pauseBtn = new IconButton(
      this.outerGame,
      this.width - 150,
      50,
      100,
      100,
      document.getElementById("pauseBtn")
    );
    this.pauseBtn.mousedown = () => {
      this.pauseScreen.show();
      this.pauseGame();
    };

    this.buttonsArr=[this.pauseBtn]

    this.reflectedProjectileSFX = document.getElementById(
      "reflectProjectileSFX"
    );

    this.inGameMusic = document.getElementById("in-game-music");
    this.inGameMusic.play();

    this.pauseScreen = new PauseScreen(this.outerGame);

    this.bossPhase=false;
    this.bossTime=360*1000
  }
  update(deltaTime) {
    if (this.paused == true) {
        
      
        return;
    }

    //track game time
    if (!this.gameOver) this.gameTime += deltaTime

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
      if (this.outerGame.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        if (enemy.type == ENEMY_TYPE.CARROT) {
          this.ammo += 10;
          this.player.chonkyMeter += 3;
          this.player.health += 1;
          document.getElementById("carrotSFX").play();
        } else if(enemy.type==ENEMY_TYPE.BOSS){
            this.player.health-=.05
        enemy.markedForDeletion = false;

        }else {
          this.player.health -= 1;
        }
      }

      //CHECK IF HIT PROJECTILE
      this.player.projectiles.forEach((projectile) => {
        if (
          projectile.markedForDeletion == false &&
          this.outerGame.checkCollision(projectile, enemy)
        ) {
          console.log("enemy collided with projectile");
          enemy.lives--;
          projectile.markedForDeletion = true;
        }
      });

      //check if hit beam
      if (
        this.player.beam &&
        this.outerGame.checkCollision(this.player.beam, enemy)
      ) {
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
            //   console.log("checking if projectile hit enemy");
              if (
                projectile.markedForDeletion == false &&
                this.outerGame.checkCollision(enemy, projectile)
              ) {
                console.log("Reflected projectile hit enemy");
                enemy.lives-=projectile.damage;
                projectile.markedForDeletion = true;
              }
            });
          }
        });
      }

      //check if enemy projectiles hit
      if (enemy.projectiles) {
        enemy.projectiles.forEach((projectile) => {
          if (this.outerGame.checkCollision(this.player, projectile)) {
            console.log("player hit");
            projectile.markedForDeletion = true; //chungus hit
            this.player.health-=projectile.damage;
          }

          //check if enemy projectile hits reverse
          if (
            this.player.reverseElem &&
            this.outerGame.checkCollision(this.player.reverseElem, projectile)
          ) {
            console.log("Reverse reflected projectile");
            projectile.speedX = Math.abs(projectile.speedX);
            projectile.reflected = true;
            this.reflectedProjectileSFX.currentTime = 0.1;
            this.reflectedProjectileSFX.play();
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


    //check if boss should spawn
    if(this.gameTime>this.bossTime && this.bossPhase==false){
        this.spawnBoss();
        this.bossPhase=true

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
    this.pauseBtn.draw(context);

    //pause screen
    this.pauseScreen.draw(context);
    //last click box

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
    else if (randomize < 0.7) this.enemies.push(new NPC2(this));
    else this.enemies.push(new NPC1(this));
    // console.log('this.enemies', this.enemies)
  }

  pauseGame() {
    this.paused = true;
    this.touchControlsAbilities.disableControls()
    this.touchControlsMovement.disableControls()
    this.inGameMusic.pause()
  }
  unpauseGame() {
    this.paused = false;
    this.touchControlsAbilities.enableControls()
    this.touchControlsMovement.enableControls()
    this.inGameMusic.play();
  }
}

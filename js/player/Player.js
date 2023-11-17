import { keyStrings } from "../constants/buttons.js";
import EnergyBall from "../projectiles/EnergyBall.js";
import Reverse from "../reverse/Reverse.js";
import Beam from "../beam/Beam.js";

export default class Player {
    constructor(game) {
      this.game = game;
      this.regularWidth = 120 * 1.5;
      this.regularHeight = 210 * 1.5;
      this.chonkyMeter = 100;

      this.width = this.regularWidth * (1 + this.chonkyMeter / 100);
      this.height = this.regularHeight * (1 + this.chonkyMeter / 100);
      this.x = 20;
      this.y = 100;

      this.health = 10;

      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 3;

      this.projectiles = []; //contains objects of all player projectile elements
      this.beam = null;

      this.image = document.getElementById("player");
      this.regularImage = document.getElementById("player");
      this.darkModeImage = document.getElementById("player-dark-mode");

      this.darkMode = false;
      this.darkModeTimer = 0;
      this.darkModeLimit = 10000;

      this.reverse = true;
      this.reverseTimer = 0;
      this.reverseLimit = 10000;

      this.reverseElem = null;

      // setTimeout(()=>{this.enterdarkMode()},2000)

      //set eyes location
      this.eyesX = this.x + 135;
      this.eyesY = this.y + 105;

      this.primaryShotSFX=document.getElementById("primaryShotSFX")
    }

    update(deltaTime) {
      //handle chonky scale
      this.width = this.regularWidth * (1 + this.chonkyMeter / 100);
      this.height = this.regularHeight * (1 + this.chonkyMeter / 100);

      //handle Eye location
      this.eyesX = this.x + 135 * (1 + this.chonkyMeter / 100);
      this.eyesY = this.y + 105 * (1 + this.chonkyMeter / 100);

      //HANDLE SPEED Y
      if (this.game.keys.includes(keyStrings.ARROW_UP)) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.includes(keyStrings.ARROW_DOWN)) {
        this.speedY = this.maxSpeed;
      } else this.speedY = 0;

      this.y += this.speedY;

      //SPEED X
      if (this.game.keys.includes(keyStrings.ARROW_LEFT)) {
        this.speedX = -this.maxSpeed;
      } else if (this.game.keys.includes(keyStrings.ARROW_RIGHT)) {
        this.speedX = this.maxSpeed;
      } else this.speedX = 0;

      this.x += this.speedX;

      // handle projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });

      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );

      //handle beam
      if (this.beam) this.beam.update();

      //handle reverse
      if (this.reverseElem) this.reverseElem.update();
      if (this.reverse) {
        if (this.reverseTimer > this.reverseLimit) {
          this.disableReverse();
        } else {
          this.reverseTimer += deltaTime;
        }
      }
      //handle power up
      if (this.darkMode) {
        if (this.darkModeTimer > this.darkModeLimit) {
          this.leaveDarkMode();
        } else {
          this.image = this.darkModeImage;
          this.darkModeTimer += deltaTime;
        }
      }
      //DONT MOVE IF ABOUT TO LEAVE Y BOUNDARY

      // if((this.y+this.speedY)>0 && false ){//CHECK IF UPPER BOUNDARY REACHED
      //     // this.y += this.speedY;
      // }else if((this.y+this.height+this.speedY)<canvas.height){
      //     this.y+=this.speedY
      // }
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);

      //chonky scale

      context.drawImage(this.image, this.x, this.y, this.width, this.height);

      if (this.beam) {
        this.beam.x = this.eyesX;
        this.beam.y = this.eyesY;
        this.beam.draw(context);
      }

      if (this.reverseElem) {
        this.reverseElem.x = this.x + this.width;
        this.reverseElem.y = this.y;
        this.reverseElem.draw(context);
      }
    }

    shootTop() {
      if (this.game.ammo > 0) {
        this.projectiles.push(
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, 0)
        );
        console.log("this.projectiles", this.projectiles);
        this.game.ammo--;
        
        this.primaryShotSFX.currentTime=0
        this.primaryShotSFX.play()
      }
      console.log("this.game.ammo", this.game.ammo);
    }

    shootSpread() {
      if (this.game.ammo > 4) {
        this.projectiles.push(
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, 3.5),
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, 2.5),
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, 1),
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, -1),
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, -2.5),
          new EnergyBall(this.game, this.eyesX, this.eyesY, 5, -3.5)
        );
        this.game.ammo -= 4;
        this.primaryShotSFX.currentTime=0
        this.primaryShotSFX.play()
      }
    }

    enableReverse() {
      console.log("activating reverse");
      if (this.game.ammo > 5) {
        this.reverseElem = new Reverse(this.game, this.x, this.y);
        this.reverse = true;
        this.game.ammo -= 10;
      }
    }
    disableReverse() {
      this.reverse = false;
      this.reverseElem = null;
      this.reverseTimer = 0;
    }

    enterDarkMode() {
      console.log("enter power up");
      this.beam = new Beam(this.game, this.x + 135, this.y + 80);
      this.darkMode = true;
      document.getElementById('beamSFX').play()
    }
    leaveDarkMode() {
      this.darkMode = false;
      this.image = this.regularImage;
      this.beam = null;
      this.darkModeTimer = 0;
      document.getElementById('beamSFX').pause()

    }
  }

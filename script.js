
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

let keyStrings = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
};

let buttonTypes = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ACTION_1:"ACTION_1",
  ACTION_2:"ACTION_2",
  ACTION_3:"ACTION_3"
};

const ENEMY_TYPE = {
  CARROT: "CARROT",
};

window.addEventListener("load", function () {
  //canvas setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;

  class InputHandler {
    constructor(game) {
      this.game = game;

      window.addEventListener("keydown", (e) => {
        // console.log("e", e);
        if (
          (e.key == "ArrowUp" ||
            e.key == "ArrowDown" ||
            e.key == "ArrowLeft" ||
            e.key == "ArrowRight") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === "1") this.game.player.shootTop();
        else if (e.key == "2") this.game.player.shootSpread();
        else if (e.key == "3") this.game.player.enableReverse();
        else if (e.key == "d") this.game.debug = !this.game.debug;
        else if (e.key == "q" && this.game.player.chonkyMeter >= 50) {
          //spend chonky to enter dark mode
          this.game.player.chonkyMeter -= 50;
          this.game.player.enterDarkMode();
        }

        // console.log("this.game.keys", this.game.keys);
      });

      window.addEventListener("keyup", (e) => {
        // console.log("keyup");
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }

        // console.log("this.game.keys", this.game.keys);
      });

      // window.addEventListener("mousedown", (e) => {
      //   console.log("mouse down event", e);
      //   this.game.mousedown = true;
      // });

      // window.addEventListener("mousemove", (e) => {
      //   // console.log('mouse move event', e)
      // });

      // window.addEventListener("mouseup", (e) => {
      //   // console.log('mouse up event', e)
      // });
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;

      // this.speed = 3;
      this.markedForDeletion = false;

      this.frameX = 0;
      this.frameY = 0;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > this.game.width * 0.95) this.markedForDeletion = true;
    }

    draw(context) {
      // context.fillStyle = "yellow";
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //animate sprite
      if (this.frameX < this.maxFrame) {
        this.frameX += 1 * this.animationSpeed;
      } else this.frameX = 0;

      context.save();
      //   context.font = "48px serif";
      //     context.fillText('COCK!!!!!   8::::::::::::)~~~~~~~~~~~   ',this.x, this.y);
      context.restore();
    }
  }
  class EnergyBall extends Projectile {
    constructor(game, x, y, speedX = 0, speedY = 0) {
      super(game, x, y);
      this.image = document.getElementById("energy-ball");
      this.animationSpeed = 0.1;
      this.imageWidth = 201;
      this.imageHeight = 220;
      this.maxFrame = 12;
      this.width = 201 * 0.2;
      this.height = 220 * 0.2;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  }

  class EnemyProjectile {
    constructor(
      game,
      x,
      y,
      image,
      width,
      height,
      spriteWidth,
      spriteHeight,
      maxFrame,
      animationSpeed,
      imageReflected
    ) {
      this.game = game;
      this.x = x;
      this.y = y;

      // this.speed = 3;
      this.markedForDeletion = false;

      this.frameX = 0;
      this.frameY = 0;

      this.image = image;
      this.maxFrame = 5;
      this.animationSpeed = animationSpeed;
      this.width = width;
      this.height = height;
      this.imageWidth = spriteWidth;
      this.imageHeight = spriteHeight;
      this.maxFrame = maxFrame;
      this.speed = -2;

      //reflected properties
      this.reflected = false;
      this.imageReflected = imageReflected;
    }
    update() {
      this.x += this.speed;

      if (this.x < 0) this.markedForDeletion = true;
      if (this.reflected) this.image = this.imageReflected;
    }

    draw(context) {
      // context.fillStyle = "yellow";
      // console.log('this', this)
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //animate sprite
      // if (this.frameX < this.maxFrame) {
      //   this.frameX += 1 * this.animationSpeed;
      // } else this.frameX = 0;
    }
  }

  class Particle {}

  class Beam {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById("laser-red");

      this.imageWidth = 960;
      this.imageHeight = 300;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 67;
      this.damagePerFrame = 0.05;

      this.width = this.game.width;
      this.height = 50;
      this.animationSpeed = 1;
    }

    update() {
      //sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX += 1 * this.animationSpeed;
      } else {
        this.frameX = 0;
      }
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Reverse {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById("reverse");

      this.imageWidth = 1282;
      this.imageHeight = 1920;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 67;
      this.damagePerFrame = 0.05;

      this.height = this.game.player.height;
      this.width = (this.height * this.imageWidth) / this.imageHeight;
      this.animationSpeed = 1;
    }

    update() {
      // //sprite animation
      // if (this.frameX < this.maxFrame) {
      //   this.frameX += 1 * this.animationSpeed;
      // } else {
      //   this.frameX = 0;
      // }
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Player {
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
    }
    leaveDarkMode() {
      this.darkMode = false;
      this.image = this.regularImage;
      this.beam = null;
      this.darkModeTimer = 0;
    }
  }

  class EnemyRanged {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.markedForDeletion = false;
      this.frameX = 0;
      this.frameY = 0;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.xStationary = false;

      this.projectiles = [];
      this.shootTimer = 0;
      this.shootInterval = 5000;
    }

    update(deltaTime) {
      //Move into screen and then stop
      if (this.x > this.game.width - this.game.width * 0.1 - this.width) {
        //enemy not in screen
        this.x += this.speedX;
      } else {
        this.xStationary = true;
        this.y += this.speedY;
        //reverse direciton when it gets close to border
        if (this.y > this.game.height * 0.9) {
          this.speedY = this.speedY * -1;
        } else if (this.y < this.game.height * 0.05) {
          this.speedY = this.speedY * -1;
        }
        //Enemy is in screen and should now move up and down
      }

      //sprite animation
      if (this.isAnimated && this.frameX < this.maxFrame) {
        this.frameX += 1 * this.animationSpeed;
      } else this.frameX = 0;

      //Shooting mechanic
      if (this.shootTimer > this.shootInterval && this.xStationary) {
        this.shootTimer = 0;
        this.shoot();
      } else {
        this.shootTimer += deltaTime;
      }

      //Enemy projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //ENEMY LIFE TEXT
      context.fillStyle = "black";
      context.font = "20px Helve";
      // context.fillText(this.lives, this.x, this.y);

      //Enemy projectiles
      // this.projectiles.forEach((projectile) => {
      //   projectile.draw(context);
      // });
    }

    shoot() {
      this.projectiles.push(
        new EnemyProjectile(
          this.game,
          this.x,
          this.y,
          this.projectileImage,
          this.projectileImageWidth,
          this.projectileImageHeight,
          this.projectileSpriteWidth,
          this.projectileSpriteHeight,
          this.projectileMaxFrame,
          this.projectileAnimationSpeed,
          this.projectileImageReflected
        )
      );
    }
  }

  class ElmerFudd extends EnemyRanged {
    constructor(game) {
      super(game);
      this.game = game;

      this.speedX = Math.random() * -1 - 0.5;
      this.speedY = Math.random() < 0.5 ? 0.3 : -0.3;

      this.lives = 5;
      this.score = this.lives;

      this.projectileImage = document.getElementById("bullet-cartoon");
      this.projectileImageReflected = document.getElementById(
        "bullet-cartoon-right"
      );
      this.projectileImageWidth = 960 * 0.2;
      this.projectileImageHeight = 300 * 0.2;
      this.projectileSpriteWidth = 960;
      this.projectileSpriteHeight = 300;
      this.projectileMaxFrame = 120;
      this.projectileAnimationSpeed = 1;

      this.width = 233 * 0.8;
      this.height = 314 * 0.8;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.image = document.getElementById("elmer-fudd");
      this.imageWidth = 233;
      this.imageHeight = 314;
      this.maxFrame = 20;
      this.animationSpeed = 0.1;
      this.isAnimated = false;
    }
  }

  class Thanos extends EnemyRanged {
    constructor(game) {
      super(game);
      this.game = game;

      this.speedX = Math.random() * -1 - 0.5;
      this.speedY = Math.random() < 0.5 ? 0.3 : -0.3;

      this.lives = 5;
      this.score = this.lives;

      this.projectileImage = document.getElementById(
        "rolling-energy-ball-left"
      );
      this.projectileImageWidth = 296 * 0.2;
      this.projectileImageHeight = 297 * 0.2;
      this.projectileSpriteWidth = 296;
      this.projectileSpriteHeight = 296;
      this.projectileMaxFrame = 120;
      this.projectileAnimationSpeed = 1;
    }
  }

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

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      // this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
      this.frameX = 0;
      this.frameY = 0;
    }

    update() {
      this.x += this.speedX;
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }

      //sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX += 1 * this.animationSpeed;
      } else {
        this.frameX = 0;
      }
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //ENEMY LIFE TEXT
      context.fillStyle = "black";
      context.font = "20px Helve";
      // context.fillText(this.lives, this.x, this.y);
    }
  }

  class Carrot extends Enemy {
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

  class NPC extends Enemy {
    constructor(game) {
      super(game);
      this.game = game;
    }
  }
  class NPC1 extends NPC {
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

  class NPC2 extends NPC {
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

  class Layer {}

  class Background {}

  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 65;
      this.fontFamily = "Helvetica";
      this.color = "white";
    }

    draw(context) {
      context.save();

      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.font = this.fontSize + "px" + this.fontFamily;

      //score
      context.fillText("Score: " + this.game.score, 20, 40);

      //ammo
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillStyle="yellow"
        context.fillRect(20 + 10 * i, 50, 5, 40);
      }

      //timer
      const formattedTime = this.game.gameTime * 0.001;
      context.fillText(`Timer: ${formattedTime.toFixed(1)}`, 20, 100);

      //HEALTH
      context.fillText("Health", 20, 130);
      for (let i = 0; i < this.game.player.health; i++) {
        context.fillStyle="red"
        context.fillRect(20 + 10 * i, 140, 5, 30);
      }

      //CHUNKY LEVEL
      context.font = `20px serif`;
      context.fillText(
        "Chonky Meter: " + this.game.player.chonkyMeter,
        20,
        195
      );

      //game over messages
      if (this.game.gameOver) {
        context.textAlign = "center";
        let message1;
        let message2;
        if (this.game.score >= this.game.winningScore) {
          message1 = "You Win!";
          message2 = "Well done!";
        } else {
          message1 = "You Lose!";
          message2 = "Try again next time!";
        }
        context.font = `50px ${this.fontFamily}`;
        context.fillText(
          message1,
          this.game.width * 0.5,
          this.game.height * 0.5 - 40
        );
        context.font = `25px ${this.fontFamily}`;
        context.fillText(
          message2,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      }

      context.restore();
    }
  }

  class TouchButton {
    constructor(game, type) {
      this.game = game;
      this.type = type;
      this.game.clickableElements.push(this);
    }
    update() {
      //HANDLE BEHAVIOR WHEN CLICKED
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    mousedown() {
      if (
        this.type == buttonTypes.ARROW_UP ||
        this.type == buttonTypes.ARROW_RIGHT ||
        this.type == buttonTypes.ARROW_DOWN ||
        this.type == buttonTypes.ARROW_LEFT
      ) {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: this.type }));
      }else if(this.type==buttonTypes.ACTION_1)window.dispatchEvent(new KeyboardEvent("keydown", { key: '1' }));
       else if(this.type==buttonTypes.ACTION_2)window.dispatchEvent(new KeyboardEvent("keydown", { key: '2' }));
       else if(this.type==buttonTypes.ACTION_3)window.dispatchEvent(new KeyboardEvent("keydown", { key: '3' }));
      
    }
    mouseup() {
      if (
        this.type == buttonTypes.ARROW_UP ||
        this.type == buttonTypes.ARROW_RIGHT ||
        this.type == buttonTypes.ARROW_DOWN ||
        this.type == buttonTypes.ARROW_LEFT
      ) {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: this.type }));
      }
    }
  }
  class MoveButton extends TouchButton {
    constructor(game, buttonType, anchorX, anchorY) {
      super(game, buttonType);
      this.width = 150;
      this.height = 150;
      this.anchorX = anchorX;
      this.anchorY = anchorY;
      this.type = buttonType;

      if (buttonType == buttonTypes.ARROW_UP) {
        this.x = this.anchorX - this.width / 2;
        this.y = this.anchorY - this.height;
        this.image = document.getElementById("arrow-key-up");
      } else if (buttonType == buttonTypes.ARROW_RIGHT) {
        this.x = this.anchorX + this.width / 2;
        this.y = this.anchorY;
        this.image = document.getElementById("arrow-key-right");
      } else if (buttonType == buttonTypes.ARROW_DOWN) {

        this.x = this.anchorX - this.width / 2;
        this.y = this.anchorY + this.height;
        this.image = document.getElementById("arrow-key-down");
      } else if (buttonType == buttonTypes.ARROW_LEFT) {
        this.x = this.anchorX - this.width - this.width / 2;
        this.y = this.anchorY;
        this.image = document.getElementById("arrow-key-left");
      }
    }
  }

  class ActionButton extends TouchButton {
    constructor(game, buttonType, anchorX, anchorY) {
      super(game, buttonType);
      this.width = 150;
      this.height = 150;
      this.anchorX = anchorX;
      this.anchorY = anchorY;
      this.type = buttonType;

      this.margin=20
      if (buttonType == buttonTypes.ACTION_1) {
        console.log("starting action 1 button");
        this.x = this.anchorX +this.width*2+this.margin*2
        this.y = this.anchorY
        this.image = document.getElementById("action1");
      } else if (buttonType == buttonTypes.ACTION_2) {
        console.log("starting action 2 button");
        this.x = this.anchorX + this.width+this.margin
        this.y = this.anchorY;
        this.image = document.getElementById("action2");
      } else if (buttonType == buttonTypes.ACTION_3) {
        console.log("starting down button");

        this.x = this.anchorX 
        this.y = this.anchorY 
        this.image = document.getElementById("action3");
      } 
    }
  }


  class TouchControlsAbilities{
    constructor(game) {
      this.controlsAnchorX = 1400;
      this.controlsAnchorY = 850;
      this.action1 = new ActionButton(
        game,
        buttonTypes.ACTION_1,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
      this.action2 = new ActionButton(
        game,
        buttonTypes.ACTION_2,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
      this.action3 = new ActionButton(
        game,
        buttonTypes.ACTION_3,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
      
    }

    update() {}
    draw(context) {
      context.fillRect(
        this.controlsAnchorX,
        this.controlsAnchorY,
        10,
        10
      );
      this.action1.draw(context);
      this.action2.draw(context);
      this.action3.draw(context);
    }
  }

  class TouchControlsMovement {
    constructor(game) {
      this.moveControlsAnchorX = 220;
      this.moveControlsAnchorY = 750;
      this.arrowKeyUp = new MoveButton(
        game,
        buttonTypes.ARROW_UP,
        this.moveControlsAnchorX,
        this.moveControlsAnchorY
      );
      this.arrowKeyRight = new MoveButton(
        game,
        buttonTypes.ARROW_RIGHT,
        this.moveControlsAnchorX,
        this.moveControlsAnchorY
      );
      this.arrowKeyDown = new MoveButton(
        game,
        buttonTypes.ARROW_DOWN,
        this.moveControlsAnchorX,
        this.moveControlsAnchorY
      );
      this.arrowKeyLeft = new MoveButton(
        game,
        buttonTypes.ARROW_LEFT,
        this.moveControlsAnchorX,
        this.moveControlsAnchorY
      );
    }

    update() {}
    draw(context) {
      context.fillRect(
        this.moveControlsAnchorX,
        this.moveControlsAnchorY,
        10,
        10
      );
      this.arrowKeyUp.draw(context);
      this.arrowKeyRight.draw(context);
      this.arrowKeyDown.draw(context);
      this.arrowKeyLeft.draw(context);
    }
  }

  class Game {
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
            this.player.chonkyMeter += 1;
            this.player.health += 1;
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

  const game = new Game(canvas.width, canvas.height);
  window.game = game;
  let lastTime = 0;

  //ADD CLICK BEHAVIOR

  canvas.addEventListener("touchstart", (e) => {
    console.log("Canvas clicked");
    console.log('e', e)

    //get canvas current scale size
    let canvasDOMRectList = canvas.getClientRects();
    let canvasRealWidth = canvasDOMRectList[0].width;
    let canvasRealHeight = canvasDOMRectList[0].height;
    console.log("canvasRealWidth", canvasRealWidth);
    console.log("canvasRealHeight", canvasRealHeight);

    // let mouseX = e.x;
    // let mouseY = e.y;
    // let event=await e.touches[0]
let mouseX = e.changedTouches[0].clientX
    let mouseY = e.changedTouches[0].clientY
    

    console.log("mouseX", mouseX);
    console.log("mouseY", mouseY);

    let scaledX = (mouseX * canvas.width) / canvasRealWidth;
    console.log("scaledX", scaledX);

    let scaledY = (mouseY * canvas.height) / canvasRealHeight;
    console.log("scaledY", scaledY);

    this.game.lastClickBox.x = scaledX;
    this.game.lastClickBox.y = scaledY;

    // let clickBox = this.game.clickBox;
    // console.log("clickBox.x", clickBox.x);
    // console.log("clickBox.y", clickBox.y);

    let clickableElements = this.game.clickableElements;
    clickableElements.forEach((element) => {
      let isClicked = this.game.checkCollision(element, this.game.lastClickBox);
      if (isClicked) {
        console.log(element, "is clicked");
        element.mousedown()
        let touchIdentifier=e.changedTouches[0].identifier



        const handleTouchEnd=(e) => {
          //get canvas current scale size
          console.log('handling touchend')
      
          // let mouseX = e.x;
          // let mouseY = e.y;
          console.log('e', e)
          console.log('element', element)
          console.log('touchend change identifier',e.changedTouches[0].identifier)
          
          
          
          //IF CORRECT TOUCH EVENT
          if(e.changedTouches[0].identifier==touchIdentifier){
            console.log('click for ended for',element)
            element.mouseup()
            canvas.removeEventListener('touchend',handleTouchEnd)
          }
        }
        //add and remove touchend event listener
        canvas.addEventListener("touchend", handleTouchEnd);
      }
    });


    

  })


  //KEEP TO MAKE IT GLOBAL. HAS ISSUE WHEN THERE ARE MULTIPLE TOUCHES AT THE SAME TIME
  // canvas.addEventListener("touchend", (e) => {
  //   //get canvas current scale size
  //   let canvasDOMRectList = canvas.getClientRects();
  //   let canvasRealWidth = canvasDOMRectList[0].width;
  //   let canvasRealHeight = canvasDOMRectList[0].height;
  //   console.log("canvasRealWidth", canvasRealWidth);
  //   console.log("canvasRealHeight", canvasRealHeight);

  //   // let mouseX = e.x;
  //   // let mouseY = e.y;
  //   console.log('e', e)
  //   let mouseX = e.changedTouches[0].clientX
  //   let mouseY = e.changedTouches[0].clientY

  //   console.log("mouseX", mouseX);
  //   console.log("mouseY", mouseY);

  //   let scaledX = (mouseX * canvas.width) / canvasRealWidth;
  //   console.log("scaledX", scaledX);

  //   let scaledY = (mouseY * canvas.height) / canvasRealHeight;
  //   console.log("scaledY", scaledY);

  //   // this.game.lastClickBox.x = scaledX;
  //   // this.game.lastClickBox.y = scaledY;

  //   // let clickBox = this.game.clickBox;
  //   // console.log("clickBox.x", clickBox.x);
  //   // console.log("clickBox.y", clickBox.y);

  //   let clickableElements = this.game.clickableElements;
  //   clickableElements.forEach((element) => {
  //     let isClicked = this.game.checkCollision(element, this.game.lastClickBox);
  //     if (isClicked) {
  //       console.log(element, "is clicked");
  //       //trigger click method
  //       element.mouseup();
  //     }
  //   });
  // });

  //animate loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log('deltaTime', deltaTime)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
